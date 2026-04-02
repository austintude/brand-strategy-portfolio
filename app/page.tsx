'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function IntakePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: '',
    industry: '',
    name: 'Madison',
    role: '',
  });
  const [isLoading, setIsLoading] = useState(false);

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
                <option value="technology">Technology</option>
                <option value="finance">Finance & Banking</option>
                <option value="retail">Retail & E-commerce</option>
                <option value="healthcare">Healthcare</option>
                <option value="athletic">Athletic & Lifestyle</option>
                <option value="food-beverage">Food & Beverage</option>
                <option value="travel">Travel & Hospitality</option>
                <option value="real-estate">Real Estate</option>
                <option value="saas">SaaS & Enterprise</option>
                <option value="consumer-goods">Consumer Goods</option>
                <option value="other">Other</option>
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
