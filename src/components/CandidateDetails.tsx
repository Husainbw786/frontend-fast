import { X, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CategoryScore {
  score: number;
  feedback: string;
  red_flags: string[];
}

interface JobAlignment {
  job_match_score: number;
  relevant_skills_found: string[];
  missing_critical_skills: string[];
  experience_level_match: string;
  job_specific_recommendations: string[];
}

interface ATSScoreResponse {
  overall_score: number;
  category_scores: {
    tech_stack_consistency: CategoryScore;
    linkedin_authenticity: CategoryScore;
    project_depth: CategoryScore;
    format_quality: CategoryScore;
    content_authenticity: CategoryScore;
    timeline_coherence: CategoryScore;
    education_validation: CategoryScore;
  };
  summary: string;
  recommendations: string[];
  risk_level: string;
  confidence_score: number;
  job_alignment: JobAlignment;
  parsing_note: string | null;
  error: string | null;
  timestamp: string;
}

interface CandidateDetailsProps {
  candidateName: string;
  candidateTitle: string;
  candidateCompany: string;
  resumeUrl: string;
  jobDescription: string;
  jobTitle: string;
  onClose: () => void;
}

export default function CandidateDetails({
  candidateName,
  candidateTitle,
  candidateCompany,
  resumeUrl,
  jobDescription,
  jobTitle,
  onClose,
}: CandidateDetailsProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [atsData, setAtsData] = useState<ATSScoreResponse | null>(null);

  useEffect(() => {
    const fetchATSScore = async () => {
      try {
        const response = await fetch(
          'http://ec2-15-207-107-54.ap-south-1.compute.amazonaws.com:8000/api/v1/calculate-ats-score',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              resume_url: resumeUrl,
              job_description: jobDescription,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch ATS score');
        }

        const data = await response.json();
        console.log('ATS API Response:', data);
        setAtsData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchATSScore();
  }, [resumeUrl, jobDescription]);

  const getNumericScoreBadgeColor = (score: number) => {
    const percentage = score >= 15 ? (score / 20) * 100 : (score / 15) * 100;
    if (percentage >= 80) return 'bg-green-100 text-green-800';
    if (percentage >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getOverallScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{candidateName}</h2>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                AI screening
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                1st round
              </span>
              {!loading && !error && atsData && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                  atsData.job_alignment.job_match_score > 60
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {atsData.job_alignment.job_match_score > 60 ? (
                    <><CheckCircle className="w-3 h-3" /> Verified</>
                  ) : (
                    <><XCircle className="w-3 h-3" /> Unverified</>
                  )}
                </span>
              )}
            </div>
            <p className="text-gray-600">{candidateCompany}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-3 text-gray-600">Analyzing resume...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {!loading && !error && atsData && (
            <>
              <div className="flex gap-4 mb-8">
                <div className="flex-1 bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-green-700 mb-1">
                    {atsData.overall_score}
                  </div>
                  <div className="text-sm text-green-600 font-medium">Overall score</div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-gray-700 mb-1">
                    {atsData.job_alignment.job_match_score}%
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Resume match</div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Tech Stack Consistency</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getNumericScoreBadgeColor(atsData.category_scores.tech_stack_consistency.score)}`}>
                        {atsData.category_scores.tech_stack_consistency.score}/20
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{atsData.category_scores.tech_stack_consistency.feedback}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">LinkedIn Authenticity</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getNumericScoreBadgeColor(atsData.category_scores.linkedin_authenticity.score)}`}>
                        {atsData.category_scores.linkedin_authenticity.score}/15
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{atsData.category_scores.linkedin_authenticity.feedback}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Project Depth</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getNumericScoreBadgeColor(atsData.category_scores.project_depth.score)}`}>
                        {atsData.category_scores.project_depth.score}/20
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{atsData.category_scores.project_depth.feedback}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Education Validation
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getNumericScoreBadgeColor(atsData.category_scores.education_validation.score)}`}>
                        {atsData.category_scores.education_validation.score}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{atsData.category_scores.education_validation.feedback}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Alignment Analysis</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Job Match Score</span>
                        <span className="text-lg font-semibold text-gray-900">{atsData.job_alignment.job_match_score}%</span>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            atsData.job_alignment.job_match_score > 60 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${atsData.job_alignment.job_match_score}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Relevant Skills Found</h4>
                        <div className="flex flex-wrap gap-1">
                          {atsData.job_alignment.relevant_skills_found.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Missing Critical Skills</h4>
                        <div className="flex flex-wrap gap-1">
                          {atsData.job_alignment.missing_critical_skills.map((skill, index) => (
                            <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Experience Level Match</h4>
                      <p className="text-sm text-gray-600">{atsData.job_alignment.experience_level_match}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <button className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    Reject
                  </button>
                  <button 
                    onClick={() => window.open('https://screening-tool-pi.vercel.app/dashboard', '_blank')}
                    className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">✓</span>
                    Advance to round 2
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
