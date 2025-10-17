import { useState } from 'react';
import ResumePage from './components/ResumePage';
import LinkedInPage from './components/LinkedInPage';

type CurrentPage = 'resume' | 'linkedin';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('resume');

  const handleNavigateToLinkedIn = () => {
    setCurrentPage('linkedin');
  };

  const handleNavigateToResume = () => {
    setCurrentPage('resume');
  };

  return (
    <>
      {currentPage === 'resume' && (
        <ResumePage onNavigateToLinkedIn={handleNavigateToLinkedIn} />
      )}
      {currentPage === 'linkedin' && (
        <LinkedInPage onNavigateBack={handleNavigateToResume} />
      )}
    </>
  );
}

export default App;
