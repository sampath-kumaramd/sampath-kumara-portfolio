import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection(from: "${new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()}", to: "${new Date().toISOString()}") {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              weekday
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  if (!GITHUB_TOKEN || !GITHUB_USERNAME) {
    console.error('Missing GitHub configuration');
    return NextResponse.json(
      { error: 'GitHub configuration missing' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: {
          username: GITHUB_USERNAME,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('GitHub API error:', errorText);
      throw new Error('GitHub API request failed');
    }

    const data = await response.json();

    if (!data?.data?.user) {
      console.error('Invalid user data:', data);
      throw new Error('Invalid user data received');
    }

    const calendar =
      data.data.user.contributionsCollection.contributionCalendar;
    console.log('Total contributions:', calendar.totalContributions);

    const contributions = calendar.weeks.map((week: any) => ({
      days: week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
        color: day.color,
        level: getContributionLevel(day.contributionCount),
      })),
    }));

    return NextResponse.json({
      contributions,
      totalContributions: calendar.totalContributions,
    });
  } catch (error) {
    console.error('Error fetching GitHub contributions:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch GitHub contributions',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}
