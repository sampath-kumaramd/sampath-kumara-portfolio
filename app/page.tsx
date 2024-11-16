import HeroSection from '@/components/homepage/heroSection';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-screen flex-col justify-center dark:bg-background">
      <HeroSection />
    </div>
  );
}
