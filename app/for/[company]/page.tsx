'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import nikeData from '@/content/companies/nike.json';
import portfolio from '@/content/portfolio.json';
import { generateStrategy, GenerationProgress } from '@/lib/generate-strategy';

import Hero from '@/components/Hero';
import PositioningSection from '@/components/PositioningSection';
import IdentitySection from '@/components/IdentitySection';
import CampaignsSection from '@/components/CampaignsSection';
import MeasurementSection from '@/components/MeasurementSection';
import AboutSection from '@/components/AboutSection';
import ViewToggle from '@/components/ViewToggle';

type ViewType = 'built' | 'proposed';

interface StoredCompany {
  companyName: string;
  industry: string;
  createdBy: string;
  roleNote: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const companyJsonMap: Record<string, any> = {
  nike: nikeData,
};
/* eslint-enable @typescript-eslint/no-explicit-any */

function GeneratingScreen({ progress }: { progress: GenerationProgress }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
            <div
              className="absolute inset-0 border-2 border-[#C2410C] rounded-full animate-spin"
              style={{
                borderTopColor: 'transparent',
                borderRightColor: 'transparent',
              }}
            />
            <div className="absolute inset-3 bg-[#C2410C]/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>

          <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
            {progress.stage}
          </h2>
          <p className="text-gray-500 font-sans text-lg mb-8">
            {progress.detail}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
          <div
            className="bg-[#C2410C] h-1.5 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress.percent}%` }}
          />
        </div>
        <p className="text-sm text-gray-400 font-sans">
          This typically takes 15-20 seconds
        </p>
      </div>
    </div>
  );
}

function NoApiKeyScreen({ companyName }: { companyName: string }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-[#C2410C]/10 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          AI Strategy for {companyName}
        </h2>
        <p className="text-gray-500 font-sans text-lg mb-8 max-w-md mx-auto">
          To generate a custom brand strategy, add your Anthropic API key on the home page under
          &quot;AI-Powered Strategy Generation.&quot;
        </p>

        <a
          href="/"
          className="inline-block bg-[#C2410C] hover:bg-[#a8370a] text-white font-medium py-3 px-8 rounded-lg transition-colors font-sans"
        >
          Go Back & Add API Key
        </a>

        <p className="text-sm text-gray-400 mt-6 font-sans">
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
  );
}

function ErrorScreen({ error, companyName, onRetry }: { error: string; companyName: string; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-6">
      <div className="w-full max-w-lg text-center">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl font-bold text-gray-900 mb-3">
          Generation Failed
        </h2>
        <p className="text-gray-500 font-sans mb-2">
          Could not generate strategy for {companyName}.
        </p>
        <p className="text-sm text-red-500 font-sans mb-8 max-w-md mx-auto">
          {error}
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onRetry}
            className="bg-[#C2410C] hover:bg-[#a8370a] text-white font-medium py-3 px-8 rounded-lg transition-colors font-sans"
          >
            Try Again
          </button>
          <a
            href="/"
            className="border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-3 px-8 rounded-lg transition-colors font-sans"
          >
            Go Back
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CompanyPage() {
  const params = useParams();
  const companySlug = params.company as string;

  const [activeView, setActiveView] = useState<ViewType>('built');
  const [companyName, setCompanyName] = useState('');
  const [creatorName, setCreatorName] = useState('Madison');
  const [roleName, setRoleName] = useState('Brand Strategist');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [companyData, setCompanyData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress>({
    stage: 'Initializing',
    detail: 'Preparing strategy generation...',
    percent: 0,
  });
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [needsApiKey, setNeedsApiKey] = useState(false);

  const trackSectionVisibility = useCallback(() => {
    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible) {
        console.log(`Section visible: ${section.getAttribute('data-section')}`);
      }
    });
  }, []);

  const triggerGeneration = useCallback(async (name: string, industry: string) => {
    let apiKey = '';
    try {
      apiKey = localStorage.getItem('anthropic-api-key') || '';
    } catch {
      // pass
    }

    if (!apiKey) {
      setNeedsApiKey(true);
      setIsLoading(false);
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      const strategy = await generateStrategy(name, industry, apiKey, setGenerationProgress);

      // Cache the generated strategy in localStorage
      try {
        localStorage.setItem(`strategy--${companySlug}`, JSON.stringify(strategy));
      } catch {
        // Storage full or unavailable
      }

      setCompanyData(strategy);
      setIsGenerating(false);
      setIsLoading(false);
      // Auto-switch to the proposed view since that is what was just generated
      setActiveView('proposed');
    } catch (err) {
      setGenerationError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsGenerating(false);
      setIsLoading(false);
    }
  }, [companySlug]);

  useEffect(() => {
    // 1. Check for pre-built company JSON
    const jsonData = companyJsonMap[companySlug];
    if (jsonData) {
      setCompanyName(jsonData.company);
      setRoleName(jsonData.role || 'Brand Strategist');
      setCompanyData(jsonData);
      setIsLoading(false);
      window.addEventListener('scroll', trackSectionVisibility);
      return () => window.removeEventListener('scroll', trackSectionVisibility);
    }

    // 2. Check for cached AI-generated strategy
    let cachedStrategy = null;
    try {
      const cached = localStorage.getItem(`strategy--${companySlug}`);
      if (cached) {
        cachedStrategy = JSON.parse(cached);
      }
    } catch {
      // pass
    }

    // 3. Load company info from localStorage (set by intake form)
    let storedCompanyName = '';
    let storedIndustry = '';
    try {
      const stored = localStorage.getItem(`company--${companySlug}`);
      if (stored) {
        const parsed: StoredCompany = JSON.parse(stored);
        storedCompanyName = parsed.companyName;
        storedIndustry = parsed.industry;
        setCompanyName(parsed.companyName);
        setCreatorName(parsed.createdBy || 'Madison');
        setRoleName(parsed.roleNote || 'Brand Strategist');
      } else {
        storedCompanyName = companySlug
          .split('-')
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');
        setCompanyName(storedCompanyName);
      }
    } catch {
      storedCompanyName = companySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      setCompanyName(storedCompanyName);
    }

    if (cachedStrategy) {
      setCompanyData(cachedStrategy);
      setIsLoading(false);
    } else {
      // 4. No cached strategy -- trigger AI generation
      triggerGeneration(storedCompanyName, storedIndustry);
    }

    window.addEventListener('scroll', trackSectionVisibility);
    return () => window.removeEventListener('scroll', trackSectionVisibility);
  }, [companySlug, trackSectionVisibility, triggerGeneration]);

  // Show API key needed screen
  if (needsApiKey) {
    return <NoApiKeyScreen companyName={companyName} />;
  }

  // Show generation error screen
  if (generationError) {
    return (
      <ErrorScreen
        error={generationError}
        companyName={companyName}
        onRetry={() => {
          setGenerationError(null);
          setIsLoading(true);
          let industry = '';
          try {
            const stored = localStorage.getItem(`company--${companySlug}`);
            if (stored) {
              industry = JSON.parse(stored).industry;
            }
          } catch {
            // pass
          }
          triggerGeneration(companyName, industry);
        }}
      />
    );
  }

  // Show generating screen
  if (isGenerating) {
    return <GeneratingScreen progress={generationProgress} />;
  }

  // Show initial loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#C2410C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-sans">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF8]">
      <ViewToggle
        activeView={activeView}
        setActiveView={setActiveView}
        companyName={companyName}
      />

      <div data-section="hero">
        <Hero
          companyName={companyName}
          creatorName={creatorName}
          activeView={activeView}
          roleName={roleName}
        />
      </div>

      <div data-section="positioning">
        <PositioningSection
          activeView={activeView}
          companyName={companyName}
          portfolioData={portfolio}
          companyData={companyData}
        />
      </div>

      <div data-section="identity">
        <IdentitySection
          activeView={activeView}
          companyName={companyName}
          portfolioData={portfolio}
          companyData={companyData}
        />
      </div>

      <div data-section="campaigns">
        <CampaignsSection
          activeView={activeView}
          companyName={companyName}
          portfolioData={portfolio}
          companyData={companyData}
        />
      </div>

      <div data-section="measurement">
        <MeasurementSection
          activeView={activeView}
          companyName={companyName}
          portfolioData={portfolio}
          companyData={companyData}
        />
      </div>

      <div data-section="about">
        <AboutSection companyName={companyName} creatorName={creatorName} />
      </div>
    </div>
  );
}
