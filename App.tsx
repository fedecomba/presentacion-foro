
import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <main className="bg-slate-100 min-h-screen w-full flex items-start justify-center font-sans p-4 py-12 md:py-16 relative overflow-y-auto">
      <div className="w-full animate-fade-in flex justify-center mb-8">
        <Dashboard />
      </div>
    </main>
  );
};

export default App;
