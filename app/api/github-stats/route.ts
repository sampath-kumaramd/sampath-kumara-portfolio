import { NextResponse } from 'next/server';

export async function GET() {
  try {
    if (!process.env.GITHUB_ACCESS_TOKEN) {
      console.error('GITHUB_ACCESS_TOKEN is not defined');
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            viewer {
              contributionsCollection {
                totalCommitContributions
                totalPullRequestContributions
                totalIssueContributions
                totalPullRequestReviewContributions
                restrictedContributionsCount
              }
              repositories(first: 100, ownerAffiliations: [OWNER, COLLABORATOR, ORGANIZATION_MEMBER  ]) {
                totalCount
              }
              createdAt
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      console.error('GitHub GraphQL API error:', await response.text());
      return NextResponse.json(
        { error: 'GitHub API request failed' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const totalContributions =
      data.data.viewer.contributionsCollection.totalCommitContributions +
      data.data.viewer.contributionsCollection.totalPullRequestContributions +
      data.data.viewer.contributionsCollection.totalIssueContributions +
      data.data.viewer.contributionsCollection
        .totalPullRequestReviewContributions +
      data.data.viewer.contributionsCollection.restrictedContributionsCount;

    // Get repositories
    const reposResponse = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
      },
    });

    if (!reposResponse.ok) {
      console.error('GitHub Repos API error:', await reposResponse.text());
      return NextResponse.json(
        { error: 'GitHub Repos API request failed' },
        { status: reposResponse.status }
      );
    }

    const repos = await reposResponse.json();

    // Extract unique languages from repositories
    const technologies = Array.from(
      new Set(
        repos
          .map((repo: { language: string | null }) => repo.language)
          .filter(Boolean)
      )
    );

    // Calculate years of experience from account creation date
    const createdAt = new Date(data.data.viewer.createdAt);
    const now = new Date();
    const yearsOfExperience = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24 * 365)
    );

    // Get total projects (repositories) contributed to
    const totalProjects = data.data.viewer.repositories.totalCount;

    return NextResponse.json({
      ...data,
      totalContributions,
      technologies,
      yearsOfExperience,
      totalProjects,
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub stats' },
      { status: 500 }
    );
  }
}
