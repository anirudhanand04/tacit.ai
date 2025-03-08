import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import brainLogo from '../assets/brain-logo.jpeg';

const Landing = () => {
  const navigate = useNavigate();
  const [workEmail, setWorkEmail] = useState('');

  const handleSuccess = (credentialResponse) => {
    localStorage.setItem('googleToken', credentialResponse.credential);
    navigate('/dashboard');
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email signup logic here
    console.log('Email signup:', workEmail);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src={brainLogo} 
              alt="Brain Logo" 
              className="w-8 h-8 object-contain"
            />
            <h1 className="text-2xl font-bold">tacit.ai</h1>
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/workspace')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/workspace')}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
            >
              Try Demo
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col items-center min-h-[calc(100vh-140px)]">
          {/* Hero Section */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              AI-Powered Workspace
              <br />
              <span className="text-blue-500">for the Future</span>
            </h1>
            
            <p className="text-lg text-gray-400 max-w-2xl mb-8">
              Transform your workflow with AI. Chat with your documents, 
              get instant insights, and collaborate seamlessly with your team.
            </p>

            <div className="flex flex-col items-center gap-3">
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.log('Login Failed')}
              />
              
              <div className="flex items-center w-full max-w-sm my-2">
                <div className="flex-1 h-px bg-gray-800"></div>
                <span className="px-3 text-xs text-gray-500">or</span>
                <div className="flex-1 h-px bg-gray-800"></div>
              </div>

              <div className="w-full max-w-sm">
                <form onSubmit={handleEmailSubmit} className="space-y-2">
                  <input
                    type="email"
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@work-email.com"
                    className="w-full px-3 py-2 bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-[#111111] border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Enter your work email
                  </button>
                </form>
              </div>
              
              {/* Terms Text */}
              <p className="text-xs text-gray-400 mt-2">
                By signing up, you agree to the{' '}
                <a href="/terms" className="text-blue-400 hover:text-blue-300">
                  Terms of Use
                </a>
                ,{' '}
                <a href="/privacy" className="text-blue-400 hover:text-blue-300">
                  Privacy Notice
                </a>
                , and{' '}
                <a href="/cookies" className="text-blue-400 hover:text-blue-300">
                  Cookie Notice
                </a>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="bg-[#111111] p-4 rounded-xl border border-gray-800">
                <div className="text-blue-500 text-2xl mb-2">🤖</div>
                <h3 className="text-lg font-bold mb-1">AI-Powered Analysis</h3>
                <p className="text-sm text-gray-400">
                  Get instant insights and summaries from your documents
                </p>
              </div>
              
              <div className="bg-[#111111] p-4 rounded-xl border border-gray-800">
                <div className="text-blue-500 text-2xl mb-2">💬</div>
                <h3 className="text-lg font-bold mb-1">Natural Conversations</h3>
                <p className="text-sm text-gray-400">
                  Chat naturally with your documents and data
                </p>
              </div>

              <div className="bg-[#111111] p-4 rounded-xl border border-gray-800">
                <div className="text-blue-500 text-2xl mb-2">🔄</div>
                <h3 className="text-lg font-bold mb-1">Seamless Integration</h3>
                <p className="text-sm text-gray-400">
                  Works with your existing tools and workflows
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="py-6">
            <nav className="flex items-center justify-center space-x-6">
              <button className="text-gray-400 hover:text-white transition-colors text-sm">
                Overview
              </button>
              <button className="text-gray-400 hover:text-white transition-colors text-sm">
                Pricing
              </button>
              <button className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy and terms
              </button>
              <button className="text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing; 