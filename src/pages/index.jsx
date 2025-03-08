import React from "react";


export default function Main() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#0A0A0A] border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">tacit.ai</h1>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Workspace</a>
              <a href="#" className="text-gray-400 hover:text-white">Chat</a>
              <a href="#" className="text-gray-400 hover:text-white">Files</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              Upload
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-700"></div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="py-12 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Your AI-powered workspace
            </h2>
            <p className="text-gray-400 text-xl mb-8">
              Chat with all your files and get work done faster
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg">
                Get Started
              </button>
              <button className="border border-gray-600 hover:border-gray-500 px-6 py-3 rounded-lg">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="mt-8 bg-[#111111] rounded-xl p-6">
            <div className="min-h-[400px] flex flex-col justify-end">
              {/* Messages would go here */}
              <div className="space-y-4">
                <div className="bg-[#1A1A1A] p-4 rounded-lg max-w-2xl">
                  <p className="text-gray-300">
                    Welcome to tacit.ai! I can help you analyze documents, answer questions, and get work done faster. What would you like to do?
                  </p>
                </div>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="mt-6 flex items-center space-x-2">
              <div className="flex-1 bg-[#1A1A1A] rounded-lg p-3">
                <input 
                  type="text"
                  placeholder="Message tacit.ai..."
                  className="w-full bg-transparent outline-none"
                />
              </div>
              <button className="p-3 rounded-lg bg-blue-600 hover:bg-blue-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-[#111111] p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Chat with Files</h3>
              <p className="text-gray-400">
                Upload documents and chat with them instantly
              </p>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Smart Search</h3>
              <p className="text-gray-400">
                Find information across all your documents
              </p>
            </div>
            <div className="bg-[#111111] p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-2">Collaborate</h3>
              <p className="text-gray-400">
                Share and work together with your team
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
