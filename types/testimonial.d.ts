export type Testimonial = {
  content: string;
  author: string;
  role: string;
  avatar: string;
  date: string;
  rating: number;
  platform: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  projectType: string;
};
