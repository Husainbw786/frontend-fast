import { Eye, Clock, Trash2, ExternalLink, MapPin, Users } from 'lucide-react';
import { LinkedInCandidate } from '../types';

interface LinkedInCandidateTableProps {
  candidates: LinkedInCandidate[];
  jobDescription: string;
  jobTitle: string;
  onViewDetails: (candidate: LinkedInCandidate) => void;
}

export default function LinkedInCandidateTable({ 
  candidates, 
  jobDescription: _jobDescription, // Reserved for future job matching features
  jobTitle: _jobTitle, // Reserved for future job matching features
  onViewDetails 
}: LinkedInCandidateTableProps) {
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-green-500';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-500';
    return 'text-red-500';
  };


  const getCurrentCompany = (candidate: LinkedInCandidate) => {
    const currentEmployer = candidate.employer.find(emp => emp.is_default) || candidate.employer[0];
    return currentEmployer?.company_name || 'Not specified';
  };

  const formatExperience = (experienceStr: string) => {
    // Convert "6 to 10 years" format to a more compact display
    if (experienceStr.includes('to')) {
      const parts = experienceStr.split(' ');
      return `${parts[0]}-${parts[2]} yrs`;
    }
    if (experienceStr.includes('More than')) {
      return '10+ yrs';
    }
    if (experienceStr.includes('2 to 6')) {
      return '2-6 yrs';
    }
    return experienceStr;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidate name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Current Title / Employer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tech-stack match
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {candidates.map((candidate, index) => (
              <tr key={candidate.linkedin_profile_urn || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    {candidate.profile_picture_url && (
                      <img
                        src={candidate.profile_picture_url}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                        <a
                          href={candidate.linkedin_profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View LinkedIn Profile"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Users className="w-3 h-3" />
                        <span>{candidate.num_of_connections} connections</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {candidate.current_title || candidate.default_position_title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {getCurrentCompany(candidate)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatExperience(candidate.years_of_experience)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate max-w-32" title={candidate.location}>
                      {candidate.location}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      in
                    </div>
                    <span className="text-sm text-gray-500">LinkedIn</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm font-semibold ${getMatchScoreColor(candidate.match_score)}`}>
                    {candidate.match_score > 0 ? `${Math.round(candidate.match_score)}%` : 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-gray-500">
                        +{candidate.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewDetails(candidate)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                      title="View detailed profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Clock className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
