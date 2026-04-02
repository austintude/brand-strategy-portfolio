import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Madison | Brand Strategy Portfolio',
  description:
    'Generate a personalized brand strategy microsite. Professional brand positioning, identity, campaigns, and measurement frameworks.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans bg-[#FAFAF8] text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
