export type SkillCategory = (typeof skillCategories)[number];

interface TechInfo {
  Icon: React.ElementType;
  name: string;
  link: string;
}

export interface Skill extends TechInfo {
  category: SkillCategory[];
  proficiency: number; // 1-100
}
