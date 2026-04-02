'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import nikeData from '@/content/companies/nike.json';
import portfolio from '@/content/portfolio.json';

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

  useEffect(() => {
    // Check for pre-built company JSON
    const jsonData = companyJsonMap[companySlug];
    if (jsonData) {
      setCompanyName(jsonData.company);
      setRoleName(jsonData.role || 'Brand Strategist');
      setCompanyData(jsonData);
    } else {
      // Try localStorage
      try {
        const stored = localStorage.getItem(`company--${companySlug}`);
        if (stored) {
          const parsed: StoredCompany = JSON.parse(stored);
          setCompanyName(parsed.companyName);
          setCreatorName(parsed.createdBy || 'Madison');
          setRoleName(parsed.roleNote || 'Brand Strategist');
        } else {
          // Fallback -- format slug as title
          setCompanyName(
            companySlug
              .split('-')
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
          );
        }
      } catch {
        setCompanyName(
          companySlug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
        );
      }
      setCompanyData(null);
    }

    setIsLoading(false);

    window.addEventListener('scroll', trackSectionVisibility);
    return () => window.removeEventListener('scroll', trackSectionVisibility);
  }, [companySlug, trackSectionVisibility]);

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
