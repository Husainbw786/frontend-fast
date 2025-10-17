import { useState } from 'react';
import { Users, Search, Loader2, Linkedin } from 'lucide-react';
import { JobDescription, ApiResponse, Candidate } from '../types';
import { jobDescriptions } from '../data/jobs';
import JobCard from './JobCard';
import CandidateTable from './CandidateTable';
import CandidateDetails from './CandidateDetails';

interface ResumePageProps {
  onNavigateToLinkedIn: () => void;
}

export default function ResumePage({ onNavigateToLinkedIn }: ResumePageProps) {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const handleJobSelect = async (job: JobDescription) => {
    setSelectedJob(job);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://ec2-15-207-107-54.ap-south-1.compute.amazonaws.com:8000/api/v1/match-resumes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          job_description: job.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch candidates');
      }

      const data: ApiResponse = await response.json();
      setCandidates(data.candidates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleCloseDetails = () => {
    setSelectedCandidate(null);
  };

  const handleClearSelection = () => {
    setSelectedJob(null);
    setCandidates([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Resume Matcher</h1>
            </div>
            <div className="flex items-center gap-4">
              {selectedJob && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Search className="w-4 h-4" />
                  <span>Showing results for: <span className="font-semibold">{selectedJob.title}</span></span>
                </div>
              )}
              <button
                onClick={onNavigateToLinkedIn}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>Search LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedJob && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find the Perfect Candidate</h2>
            <p className="text-gray-600 mb-8">Select a job position to view matching candidates from our resume database</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {jobDescriptions.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onSelect={handleJobSelect}
              isSelected={selectedJob?.id === job.id}
            />
          ))}
        </div>

        {selectedJob && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Matching Candidates</h2>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Searching...' : `Found ${candidates.length} matching candidates`}
                </p>
              </div>
              <button
                onClick={handleClearSelection}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Selection
              </button>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                <span className="ml-3 text-gray-600">Finding matching candidates...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!loading && !error && candidates.length > 0 && (
              <CandidateTable
                candidates={candidates}
                jobDescription={selectedJob.description}
                jobTitle={selectedJob.title}
                onViewDetails={handleViewDetails}
              />
            )}

            {!loading && !error && candidates.length === 0 && selectedJob && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No matching candidates found for this position.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedCandidate && selectedJob && (
        <CandidateDetails
          candidateName={selectedCandidate.name}
          candidateTitle={selectedCandidate.job_titles[0] || 'Not specified'}
          candidateCompany={selectedCandidate.companies[0] || 'Not specified'}
          resumeUrl={selectedCandidate.resume_url}
          jobDescription={selectedJob.description}
          jobTitle={selectedJob.title}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}
