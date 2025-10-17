import { X, ExternalLink, MapPin, Users, Mail, Globe, Building, GraduationCap, Calendar, Briefcase } from 'lucide-react';
import { LinkedInCandidate, LinkedInEmployer, LinkedInEducation } from '../types';

interface LinkedInCandidateDetailsProps {
  candidate: LinkedInCandidate;
  jobDescription: string;
  jobTitle: string;
  onClose: () => void;
}

export default function LinkedInCandidateDetails({
  candidate,
  jobDescription: _jobDescription, // Reserved for future job matching analysis
  jobTitle,
  onClose
}: LinkedInCandidateDetailsProps) {
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch {
      return dateStr;
    }
  };

  const calculateDuration = (startDate: string, endDate: string | null) => {
    try {
      const start = new Date(startDate);
      const end = endDate ? new Date(endDate) : new Date();
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
      
      if (diffMonths < 12) {
        return `${diffMonths} month${diffMonths !== 1 ? 's' : ''}`;
      } else {
        const years = Math.floor(diffMonths / 12);
        const remainingMonths = diffMonths % 12;
        if (remainingMonths === 0) {
          return `${years} year${years !== 1 ? 's' : ''}`;
        }
        return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
      }
    } catch {
      return 'Duration unknown';
    }
  };

  const renderEmploymentHistory = () => (
    <div className="space-y-4">
      {candidate.employer.map((job: LinkedInEmployer, index: number) => (
        <div key={job.position_id || index} className="border-l-2 border-blue-200 pl-4 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-gray-900">{job.title}</h4>
                {job.is_default && (
                  <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded">
                    Current
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Building className="w-4 h-4" />
                <span className="font-medium">{job.company_name}</span>
                {job.location && (
                  <>
                    <span>•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{job.location}</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : 'Present'}
                </span>
                <span>•</span>
                <span>{calculateDuration(job.start_date, job.end_date)}</span>
              </div>
              {job.description && (
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  {job.description}
                </p>
              )}
            </div>
            {job.company_logo_url && (
              <img
                src={job.company_logo_url}
                alt={job.company_name}
                className="w-12 h-12 rounded object-cover ml-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => (
    <div className="space-y-4">
      {candidate.education_background.map((edu: LinkedInEducation, index: number) => (
        <div key={edu.institute_linkedin_id || index} className="border-l-2 border-purple-200 pl-4 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{edu.institute_name}</h4>
              <div className="text-sm text-gray-600 mb-1">
                {edu.degree_name && <span className="font-medium">{edu.degree_name}</span>}
                {edu.degree_name && edu.field_of_study && <span> in </span>}
                {edu.field_of_study && <span>{edu.field_of_study}</span>}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                </span>
              </div>
            </div>
            {edu.institute_logo_url && (
              <img
                src={edu.institute_logo_url}
                alt={edu.institute_name}
                className="w-12 h-12 rounded object-cover ml-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              {candidate.profile_picture_url && (
                <img
                  src={candidate.profile_picture_url}
                  alt={candidate.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white/20"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div>
                <h2 className="text-2xl font-bold mb-1">{candidate.name}</h2>
                <p className="text-blue-100 mb-2">{candidate.headline}</p>
                <div className="flex items-center gap-4 text-sm text-blue-100">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{candidate.num_of_connections} connections</span>
                  </div>
                  <a
                    href={candidate.linkedin_profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="p-6 space-y-8">
            {/* Contact Information */}
            {(candidate.emails.length > 0 || candidate.websites.length > 0) && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  {candidate.emails.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Email: </span>
                      {candidate.emails.map((email, index) => (
                        <a
                          key={index}
                          href={`mailto:${email}`}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          {email}
                        </a>
                      ))}
                    </div>
                  )}
                  {candidate.websites.length > 0 && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Websites: </span>
                      {candidate.websites.map((website, index) => (
                        <a
                          key={index}
                          href={website.startsWith('http') ? website : `https://${website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                        >
                          <Globe className="w-3 h-3" />
                          {website}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Summary */}
            {candidate.summary && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {candidate.summary}
                  </p>
                </div>
              </div>
            )}

            {/* Experience */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                Work Experience ({candidate.years_of_experience})
              </h3>
              {renderEmploymentHistory()}
            </div>

            {/* Education */}
            {candidate.education_background.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </h3>
                {renderEducation()}
              </div>
            )}

            {/* Skills */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Match Information */}
            {candidate.match_score > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Match Analysis</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(candidate.match_score)}%
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700">Match Score</div>
                      <div className="text-xs text-gray-500">for {jobTitle}</div>
                    </div>
                  </div>
                  {candidate.match_explanation && (
                    <p className="text-sm text-gray-700">
                      {candidate.match_explanation}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
