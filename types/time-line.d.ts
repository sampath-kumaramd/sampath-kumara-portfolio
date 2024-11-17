export interface Timeline {
  experiences: {
    duration: string;
    position: string;
    company: string;
    companyLink?: string;
    skills: { name: string }[];
  }[];
}
