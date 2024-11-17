export type Project = {
  name: string;
  description: string;
  client: string;
  client_logo?: string;
  client_link?: string;
  role: string;
  status: string;
  startDate: string;
  endDate: string;
  heroImage: string;
  images: string[];
  skills: {
    name: string;
  }[];
  features: {
    title: string;
    description: string;
  }[];
  github_link?: string;
  hosted_link?: string;
};
