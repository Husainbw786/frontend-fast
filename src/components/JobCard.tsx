import { MapPin, DollarSign, Clock, Briefcase, FileText } from 'lucide-react';
import { JobDescription } from '../types';

interface JobCardProps {
  job: JobDescription;
  onSelect: (job: JobDescription) => void;
  isSelected: boolean;
}

export default function JobCard({ job, onSelect, isSelected }: JobCardProps) {
  return (
    <div
      onClick={() => onSelect(job)}
      className={`bg-white rounded-lg border-2 p-6 cursor-pointer transition-all hover:shadow-lg ${
        isSelected ? 'border-blue-500 shadow-md' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {job.visaStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <DollarSign className="w-4 h-4 mr-2" />
          {job.salary}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          {job.type}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          {job.level}
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex items-start text-sm text-gray-700">
          <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-3">{job.description}</p>
        </div>
      </div>
    </div>
  );
}
