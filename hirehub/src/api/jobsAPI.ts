import { Job } from '../types';
import jobsData from '../data/jobs.json';

// simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchJobs = async (): Promise<Job[]> => {
  await delay(500);
  return jobsData as Job[];
};

export const fetchJobById = async (id: string): Promise<Job | null> => {
  await delay(300);
  const job = jobsData.find(job => job.id === id);
  return job ? (job as Job) : null;
};

export const fetchLocations = async (): Promise<string[]> => {
  await delay(200);
  return Array.from(new Set(jobsData.map(job => job.location)));
};
