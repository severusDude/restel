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
      <MainHome />
      
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Cari Kamar Hotel</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">Lihat berbagai pilihan kamar hotel yang tersedia dan temukan akomodasi sempurna untuk perjalanan Anda.</p>
        <Link
          href={route('rooms.index')}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Lihat Kamar
        </Link>
      </div>
      
      <Footer />
    </>
  );
}