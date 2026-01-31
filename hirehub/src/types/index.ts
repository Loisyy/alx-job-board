// job experience levels 
export type ExperienceLevel = 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead' | 'Internship';

// job types 
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Remote';

// job category
export type JobCategory = 
  | 'Frontend'
  | 'Backend'
  | 'Fullstack'
  | 'Design'
  | 'Marketing'
  | 'Data Science'
  | 'DevOps'
  | 'Product';

// main job interface
export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    experienceLevel: ExperienceLevel;
    jobType: JobType;
    category: JobCategory;
    salary: {
        min: number;
        max: number;
        currency: string;
    };
    description: string;
    responsibilities: string[];
    qualifications: string[];
    benefits?: string[];       
    companyDescription: string; 
    companyWebsite?: string;
    companyLinkedin?: string;
    postedDate: string;
}

// Filter state interface
export interface FilterState {
    category: JobCategory | 'All Categories';
    location: string | 'All locations';
    experience: ExperienceLevel | 'All Experience';
    searchQuery: string;
}

// Application form interface
export interface JobApplication {
    jobId: string;
    jobTitle: string;
    applicantName: string;
    applicantEmail: string;
    resume: File | null;
}
