'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function IntakePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    name: 'Madison',
    role: '',
    apiKey: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Load saved API key from localStorage on mount
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('anthropic-api-key');
      if (savedKey) {
        setFormData((prev) => ({ ...prev, apiKey: savedKey }));
      }
    } catch {
      // localStorage may not be available
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.company.trim() || !formData.industry.trim()) {
      return;
    }

    setIsLoading(true);

    const slug = formData.company.toLowerCase().replace(/\s+/g, '-');

    const companyInfo = {
      companyName: formData.company,
      industry: formData.industry,
      createdBy: formData.name,
      roleNote: formData.role,
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem(`company--${slug}`, JSON.stringify(companyInfo));
      // Save API key separately so it persists across sessions
      if (formData.apiKey.trim()) {
        localStorage.setItem('anthropic-api-key', formData.apiKey.trim());
      }
    } catch {
      // localStorage may not be available
    }

    router.push(`/for/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6 animate-fade-in">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold mb-4 text-gray-900">
            Brand Strategy Portfolio
          </h1>
          <p className="text-lg text-gray-500 font-sans">
            Generate a personalized brand strategy microsite
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 sm:p-12"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-900 mb-2 font-sans"
              >
                Target Company Name{' '}
                <span className="text-[#C2410C]">*</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Nike, Apple, Patagonia"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/20 transition-colors placeholder-gray-400 font-sans"
                required
              />
            </div>

            <div>
              <label
                htmlFor="industry"
                className="block text-sm font-medium text-gray-900 mb-2 font-sans"
              >
                Industry Vertical{' '}
                <span className="text-[#C2410C]">*</span>
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/20 transition-colors text-gray-900 font-sans"
                required
              >
                <option value="">Select an industry</option>
                <option value="Technology">Technology</option>
                <option value="Finance & Banking">Finance & Banking</option>
                <option value="Retail & E-commerce">Retail & E-commerce</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Athletic & Lifestyle">Athletic & Lifestyle</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Travel & Hospitality">Travel & Hospitality</option>
                <option value="Real Estate">Real Estate</option>
                <option value="SaaS & Enterprise">SaaS & Enterprise</option>
                <option value="Consumer Goods">Consumer Goods</option>
                <option value="Entertainment & Media">Entertainment & Media</option>
                <option value="Automotive">Automotive</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 mb-2 font-sans"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/20 transition-colors placeholder-gray-400 font-sans"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-900 mb-2 font-sans"
              >
                Role Note{' '}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="e.g., Applying for Senior Brand Strategist"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/20 transition-colors placeholder-gray-400 font-sans"
              />
            </div>

            {/* AI Strategy Generation -- BYOK */}
            <div className="border-t border-gray-100 pt-6">
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors font-sans"
              >
                <svg
                  className={`w-4 h-4 transition-transform ${showApiKey ? 'rotate-90' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                AI-Powered Strategy Generation
              </button>

              {showApiKey && (
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-gray-500 font-sans">
                    Add your Anthropic API key to generate custom brand strategies for any company using AI.
                    Without a key, only pre-built strategies (like Nike) are available.
                    Your key is stored locally in your browser and never sent to our servers.
                  </p>
                  <div>
                    <label
                      htmlFor="apiKey"
                      className="block text-sm font-medium text-gray-900 mb-2 font-sans"
                    >
                      Anthropic API Key
                    </label>
                    <input
                      type="password"
                      id="apiKey"
                      name="apiKey"
                      value={formData.apiKey}
                      onChange={handleChange}
                      placeholder="sk-ant-..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C2410C] focus:ring-1 focus:ring-[#C2410C]/20 transition-colors placeholder-gray-400 font-sans font-mono text-sm"
                    />
                    <p className="mt-1.5 text-xs text-gray-400 font-sans">
                      Get your key at{' '}
                      <a
                        href="https://console.anthropic.com/settings/keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C2410C] hover:underline"
                      >
                        console.anthropic.com
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 bg-[#C2410C] hover:bg-[#a8370a] text-white font-medium py-3.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-sans"
          >
            {isLoading ? 'Generating...' : 'Generate Portfolio'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-8 font-sans">
          Your data is saved locally in your browser
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
