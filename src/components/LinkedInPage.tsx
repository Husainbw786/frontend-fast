import { useState } from 'react';
import { Users, Search, Loader2, ArrowLeft } from 'lucide-react';
import { JobDescription, LinkedInApiResponse, LinkedInCandidate } from '../types';
import { jobDescriptions } from '../data/jobs';
import { API_ENDPOINTS } from '../config/api';
import JobCard from './JobCard';
import LinkedInCandidateTable from './LinkedInCandidateTable';
import LinkedInCandidateDetails from './LinkedInCandidateDetails';

interface LinkedInPageProps {
  onNavigateBack: () => void;
}

export default function LinkedInPage({ onNavigateBack }: LinkedInPageProps) {
  const [selectedJob, setSelectedJob] = useState<JobDescription | null>(null);
  const [linkedInCandidates, setLinkedInCandidates] = useState<LinkedInCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLinkedInCandidate, setSelectedLinkedInCandidate] = useState<LinkedInCandidate | null>(null);

  const handleJobSelect = async (job: JobDescription) => {
    setSelectedJob(job);
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_ENDPOINTS.FIND_CANDIDATES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'sec-ch-ua-platform': '"macOS"',
          'Referer': 'https://linked-in-scraping-api-frontend.vercel.app/',
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
          'sec-ch-ua': '"Chromium";v="140", "Not=A?Brand";v="24", "Google Chrome";v="140"',
          'sec-ch-ua-mobile': '?0',
        },
        body: JSON.stringify({
          job_description: job.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch LinkedIn candidates');
      }

      const data: LinkedInApiResponse = await response.json();
      setLinkedInCandidates(data.candidates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching LinkedIn candidates');
      setLinkedInCandidates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewLinkedInDetails = (candidate: LinkedInCandidate) => {
    setSelectedLinkedInCandidate(candidate);
  };

  const handleCloseLinkedInDetails = () => {
    setSelectedLinkedInCandidate(null);
  };

  const handleClearSelection = () => {
    setSelectedJob(null);
    setLinkedInCandidates([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                title="Back to Resume Matcher"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                in
              </div>
              <h1 className="text-2xl font-bold text-gray-900">LinkedIn Candidate Search</h1>
            </div>
            {selectedJob && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Search className="w-4 h-4" />
                <span>Searching LinkedIn for: <span className="font-semibold">{selectedJob.title}</span></span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedJob && (
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Find LinkedIn Candidates</h2>
            <p className="text-gray-600 mb-8">Select a job position to search for candidates on LinkedIn</p>
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
                <h2 className="text-2xl font-bold text-gray-900">LinkedIn Search Results</h2>
                <p className="text-gray-600 mt-1">
                  {loading ? 'Searching LinkedIn...' : `Found ${linkedInCandidates.length} LinkedIn candidates`}
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
                <span className="ml-3 text-gray-600">Searching LinkedIn for matching candidates...</span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {!loading && !error && linkedInCandidates.length > 0 && (
              <LinkedInCandidateTable
                candidates={linkedInCandidates}
                jobDescription={selectedJob.description}
                jobTitle={selectedJob.title}
                onViewDetails={handleViewLinkedInDetails}
              />
            )}

            {!loading && !error && linkedInCandidates.length === 0 && selectedJob && (
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No LinkedIn candidates found for this position.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {selectedLinkedInCandidate && selectedJob && (
        <LinkedInCandidateDetails
          candidate={selectedLinkedInCandidate}
          jobDescription={selectedJob.description}
          jobTitle={selectedJob.title}
          onClose={handleCloseLinkedInDetails}
        />
      )}
    </div>
  );
}
