import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Navbar } from '@/components/restel-navbar';

export function Header() {
  const { auth } = usePage<PageProps>().props;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <Navbar />
      </header>
    </>
  );
}
