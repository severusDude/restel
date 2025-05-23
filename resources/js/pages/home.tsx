import { RestelBanner } from '@/components/home/restel-banner';
import { Header }from '@/components/restel-header';
import { MainHome } from '@/components/home/restel-main-home';
import { Footer } from '@/components/restel-footer';
import { Link } from '@inertiajs/react';

export default function Home() {
  return (
    <>
      <Header />
      <RestelBanner />
      <div className="h-28"></div>
      <MainHome rooms={rooms} />
      <Footer />
    </>
  );
}