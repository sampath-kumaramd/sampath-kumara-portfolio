import HeroSection from '@/components/homepage/heroSection';
import Image from 'next/image';
import JsonLd from '@/components/json-ld';
import { Footer } from '@/components/footer';

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sampath Kumara',
    jobTitle: 'Full Stack Developer',
    url: 'https://sampathkumara.me',
    sameAs: [
      'https://github.com/sampath-kumaramd',
      'https://linkedin.com/in/sampathkumaramd',
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <div className="flex h-screen flex-col justify-center dark:bg-background">
        <HeroSection />
        <Footer />
      </div>
    </>
  );
}
