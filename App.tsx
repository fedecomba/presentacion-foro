
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Slide2 from './components/Slide2';
import Slide3 from './components/Slide3';

const ArrowButton: React.FC<{ direction: 'left' | 'right'; onClick: () => void; disabled?: boolean }> = ({ direction, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`fixed top-1/2 -translate-y-1/2 z-10 bg-white/70 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-30 disabled:cursor-not-allowed ${direction === 'left' ? 'left-4' : 'right-4'}`}
    aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {direction === 'left' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  const goToNextSlide = () => {
    setCurrentSlide(prev => (prev < totalSlides ? prev + 1 : prev));
  };

  const goToPrevSlide = () => {
    setCurrentSlide(prev => (prev > 1 ? prev - 1 : prev));
  };

  const renderSlide = () => {
    switch(currentSlide) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Slide2 />;
      case 3:
        return <Slide3 />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <main className="bg-slate-100 min-h-screen w-full flex items-start justify-center font-sans p-4 py-12 md:py-16 relative overflow-y-auto">
      <ArrowButton direction="left" onClick={goToPrevSlide} disabled={currentSlide === 1} />
      
      <div key={currentSlide} className="w-full animate-fade-in flex justify-center mb-8">
        {renderSlide()}
      </div>

      <ArrowButton direction="right" onClick={goToNextSlide} disabled={currentSlide === totalSlides} />

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-600 font-semibold bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm shadow z-20">
        {currentSlide} / {totalSlides}
      </div>
    </main>
  );
};

export default App;