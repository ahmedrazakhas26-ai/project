
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import JobCard from './components/JobCard';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { MOCK_JOBS, MOCK_USER_SEEKER, MOCK_USER_EMPLOYER } from './constants';
import { User, Job, Application, UserRole } from './types';
import { Search, Filter, Sparkles, BrainCircuit, X } from 'lucide-react';
import { generateJobDescription } from './services/gemini';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(MOCK_USER_SEEKER);
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState<Job[]>(MOCK_JOBS);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiDrawerOpen, setIsAiDrawerOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Authentication Mock Logic
  const handleLogout = () => {
    setUser(null);
    setActiveTab('login');
  };

  const handleLogin = (role: UserRole) => {
    if (role === UserRole.JOB_SEEKER) setUser(MOCK_USER_SEEKER);
    else setUser(MOCK_USER_EMPLOYER);
    setActiveTab('dashboard');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleApply = (jobId: string) => {
    if (!user) {
      setActiveTab('login');
      return;
    }
    const job = jobs.find(j => j.id === jobId);
    if (job && !applications.find(a => a.jobId === jobId)) {
      const newApp: Application = {
        id: Math.random().toString(36).substr(2, 9),
        jobId: job.id,
        userId: user.id,
        status: 'Pending',
        appliedAt: new Date().toISOString().split('T')[0],
        resumeUrl: 'mock-resume-url',
        jobTitle: job.title,
        companyName: job.company
      };
      setApplications([...applications, newApp]);
    }
  };

  const handleAiGenerate = async () => {
    setIsGenerating(true);
    const result = await generateJobDescription(aiPrompt, "Your Company", "Innovation, team leadership, React expertise");
    setAiResult(result || "Could not generate at this time.");
    setIsGenerating(false);
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'jobs':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Section */}
            <div className="relative rounded-3xl bg-slate-900 overflow-hidden px-8 py-16 text-center text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/50 to-transparent pointer-events-none"></div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
                  Your Future Career <span className="text-indigo-400">Starts Here</span>
                </h1>
                <p className="text-slate-400 text-lg mb-10 font-medium">
                  Connect with over 10,000 top companies hiring for remote and on-site positions globally.
                </p>
                
                <div className="flex flex-col md:flex-row bg-white rounded-2xl p-2 shadow-2xl max-w-3xl mx-auto">
                  <div className="flex-1 flex items-center px-4 border-b md:border-b-0 md:border-r border-slate-100 py-3 md:py-0">
                    <Search className="w-5 h-5 text-slate-400 mr-3" />
                    <input 
                      type="text" 
                      placeholder="Job title, skills, or company"
                      className="w-full outline-none text-slate-900 text-sm font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="flex-1 flex items-center px-4 py-3 md:py-0">
                    <Filter className="w-5 h-5 text-slate-400 mr-3" />
                    <select className="w-full outline-none text-slate-500 text-sm font-medium bg-transparent">
                      <option>All Locations</option>
                      <option>Remote</option>
                      <option>Europe</option>
                      <option>North America</option>
                    </select>
                  </div>
                  <button className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/25">
                    Search Jobs
                  </button>
                </div>
                
                <div className="mt-8 flex items-center justify-center space-x-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                  <span>Trustpilot ★ 4.9</span>
                  <span>|</span>
                  <span>50k+ Placements</span>
                </div>
              </div>
            </div>

            {/* AI Assistant Banner */}
            {user?.role === UserRole.EMPLOYER && (
              <div 
                onClick={() => setIsAiDrawerOpen(true)}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 flex items-center justify-between cursor-pointer group hover:shadow-xl hover:shadow-indigo-200 transition-all"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <BrainCircuit className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Hire smarter with AI Assistant</h3>
                    <p className="text-white/80 text-sm">Generate descriptions and match candidates instantly using Gemini AI</p>
                  </div>
                </div>
                <button className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl group-hover:px-8 transition-all">
                  Open AI Tools
                </button>
              </div>
            )}

            {/* Listings */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <JobCard 
                  key={job.id} 
                  job={job} 
                  onApply={handleApply}
                  onViewDetails={(id) => console.log('View', id)}
                  isApplied={!!applications.find(a => a.jobId === job.id)}
                />
              ))}
            </div>
          </div>
        );
      case 'dashboard':
        return user ? (
          <Dashboard user={user} jobs={jobs} applications={applications} />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
            <p className="text-slate-500 mb-8">Please login to view your personalized dashboard.</p>
            <button onClick={() => setActiveTab('login')} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700">Go to Login</button>
          </div>
        );
      case 'profile':
        return user ? (
          <Profile user={user} onUpdate={handleUpdateProfile} />
        ) : null;
      case 'login':
        return (
          <div className="max-w-md mx-auto py-12">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome Back</h2>
              <p className="text-slate-500 mb-8">Select a role to preview the application as.</p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => handleLogin(UserRole.JOB_SEEKER)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-indigo-50 border-2 border-transparent hover:border-indigo-200 rounded-2xl transition-all group"
                >
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Job Seeker</p>
                    <p className="text-xs text-slate-500">I'm looking for a new opportunity</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-slate-300 group-hover:text-indigo-400" />
                </button>
                <button 
                  onClick={() => handleLogin(UserRole.EMPLOYER)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-emerald-50 border-2 border-transparent hover:border-emerald-200 rounded-2xl transition-all group"
                >
                  <div className="text-left">
                    <p className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Employer</p>
                    <p className="text-xs text-slate-500">I want to hire top talent</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-slate-300 group-hover:text-emerald-400" />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">New to HireVision? <button onClick={() => setActiveTab('signup')} className="font-bold text-indigo-600 hover:underline">Create an account</button></p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Tab not implemented yet.</div>;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}

      {/* AI Assistant Drawer */}
      {isAiDrawerOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsAiDrawerOpen(false)}></div>
          <div className="relative w-full max-w-lg bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center space-x-3">
                <BrainCircuit className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900">Gemini AI Tools</h2>
              </div>
              <button onClick={() => setIsAiDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">What are you hiring for?</label>
                <div className="flex space-x-3">
                  <input 
                    type="text" 
                    placeholder="e.g. Lead Designer at Figma"
                    className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 focus:bg-white outline-none transition-all"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                  />
                  <button 
                    disabled={isGenerating || !aiPrompt}
                    onClick={handleAiGenerate}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isGenerating ? <span>Working...</span> : <><span>Generate</span> <Sparkles className="w-4 h-4" /></>}
                  </button>
                </div>
              </div>

              {aiResult && (
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Generated Content</span>
                    <button onClick={() => navigator.clipboard.writeText(aiResult)} className="text-xs font-bold text-indigo-600 hover:underline">Copy All</button>
                  </div>
                  <div className="prose prose-sm text-slate-600 whitespace-pre-wrap font-medium leading-relaxed">
                    {aiResult}
                  </div>
                </div>
              )}

              <div className="pt-8 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 mb-4">AI Features Included:</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <p className="text-xs font-bold text-indigo-700 mb-1">Description Writer</p>
                    <p className="text-[10px] text-indigo-600/80">Draft perfect job posts in seconds based on your needs.</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <p className="text-xs font-bold text-emerald-700 mb-1">Candidate Scoring</p>
                    <p className="text-[10px] text-emerald-600/80">Rank resumes by job match automatically.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <p className="text-[10px] text-slate-400 text-center font-medium leading-relaxed">
                Powered by Gemini 3 Flash. AI-generated content may require review before publication.
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
