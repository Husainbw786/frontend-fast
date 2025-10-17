export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume_url: string;
  file_name: string;
  skills: string[];
  experience_years: number;
  job_titles: string[];
  companies: string[];
  education: string[];
  summary: string;
  match_score: number;
  match_explanation: string;
}

export interface ApiResponse {
  candidates: Candidate[];
  total_found: number;
  search_query: string;
  search_time_ms: number;
  timestamp: string;
}

export interface JobDescription {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  level: string;
  visaStatus: string;
  description: string;
}

// LinkedIn API Types
export interface LinkedInEmployer {
  title: string;
  company_name: string;
  company_linkedin_id: string | null;
  company_logo_url: string | null;
  start_date: string;
  end_date: string | null;
  position_id: number;
  description: string | null;
  location: string | null;
  is_default: boolean;
  rich_media: any[];
}

export interface LinkedInEducation {
  degree_name: string | null;
  institute_name: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  institute_linkedin_id: string;
  institute_linkedin_url: string;
  institute_logo_url: string | null;
}

export interface LinkedInCandidate {
  name: string;
  location: string;
  linkedin_profile_url: string;
  linkedin_profile_urn: string;
  default_position_title: string;
  headline: string;
  summary: string;
  num_of_connections: number;
  skills: string[];
  current_title: string;
  profile_picture_url: string | null;
  employer: LinkedInEmployer[];
  education_background: LinkedInEducation[];
  emails: string[];
  websites: string[];
  years_of_experience: string;
  match_score: number;
  match_explanation: string;
}

export interface LinkedInApiResponse {
  candidates: LinkedInCandidate[];
}
