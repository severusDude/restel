import { Link } from '@inertiajs/react';
import { User } from '@/types';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { useForm } from '@inertiajs/react';

interface MainLayoutProps {
    children: React.ReactNode;
    user?: User;
}

export default function MainLayout({ children, user }: MainLayoutProps) {
    const { post } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation */}
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link href="/" className="flex items-center">
                                <span className="text-xl font-bold text-gray-800">Restel</span>
                            </Link>
                            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                                <Link
                                    href={route('rooms.index')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Rooms
                                </Link>
                                <Link
                                    href={route('facilities.index')}
                                    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
                                >
                                    Facilities
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost">{user.name}</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem asChild>
                                            <Link href={route('profile.edit')}>Profile</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={route('reservations.index')}>My Reservations</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <div className="flex space-x-4">
                                    <Link href={route('login')}>
                                        <Button variant="ghost">Login</Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button>Register</Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">About Restel</h3>
                            <p className="text-gray-300">
                                Your perfect stay begins with us. Discover comfort and luxury at Restel.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link href={route('rooms.index')} className="text-gray-300 hover:text-white">
                                        Rooms
                                    </Link>
                                </li>
                                <li>
                                    <Link href={route('facilities.index')} className="text-gray-300 hover:text-white">
                                        Facilities
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <p className="text-gray-300">
                                Email: info@restel.com<br />
                                Phone: +1 234 567 890<br />
                                Address: 123 Hotel Street, City
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
                        <p>&copy; {new Date().getFullYear()} Restel. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
} 