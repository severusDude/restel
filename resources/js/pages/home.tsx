import { RestelBanner } from '@/components/restel-banner';
import { Header }from '@/components/restel-header';
import { MainHome } from '@/components/restel-main-home';
import { Footer } from '@/components/restel-footer';

export  default function Home() {
  return (
    <>
      <Header />
      <RestelBanner />
      <div className="h-28"></div>
      <MainHome />
      <Footer />
    </>
  )
}