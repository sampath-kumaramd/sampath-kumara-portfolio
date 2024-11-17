export type Testimonial = {
  content: string;
  country?: string;
  link?: string;
  author: string;
  role: string;
  avatar?: string;
  date: string;
  rating: number;
  platform: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  projectType: string;
};
