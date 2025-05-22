import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Room, User } from '@/types';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';

interface HomeProps {
    auth: {
        user: User | null;
    };
    featuredRooms: Room[];
}

export default function Home({ auth, featuredRooms }: HomeProps) {
    return (
        <MainLayout user={auth.user}>
            <Head title="Home" />

            {/* Hero Section */}
            <div className="relative bg-gray-900 h-[600px]">
                <div className="absolute inset-0">
                    <img
                        src="/images/hero.jpg"
                        alt="Hotel"
                        className="w-full h-full object-cover opacity-50"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                            Welcome to Restel
                        </h1>
                        <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl">
                            Experience luxury and comfort in our carefully curated rooms.
                            Book your perfect stay today.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Link href={route('rooms.index')}>
                                <Button size="lg" className="text-lg">
                                    View Our Rooms
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Rooms Section */}
            <div className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Featured Rooms
                        </h2>
                        <p className="mt-4 text-lg text-gray-500">
                            Discover our most popular accommodations
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredRooms.map((room) => (
                            <Card key={room.id}>
                                <CardHeader>
                                    <CardTitle>{room.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-w-16 aspect-h-9 mb-4">
                                        <img
                                            src={room.image_url || '/images/room-placeholder.jpg'}
                                            alt={room.name}
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                    <p className="text-gray-500">{room.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-semibold">${room.price}/night</p>
                                            <p className="text-sm text-gray-500">
                                                {room.type} • {room.capacity} guests
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Link href={route('rooms.show', room.slug)} className="w-full">
                                        <Button className="w-full">View Details</Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="mt-12 text-center">
                        <Link href={route('rooms.index')}>
                            <Button variant="outline" size="lg">
                                View All Rooms
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                            Why Choose Restel?
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-3">
                        <div className="text-center">
                            <div className="flex justify-center">
                                <svg
                                    className="h-12 w-12 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold">Best Rates Guaranteed</h3>
                            <p className="mt-2 text-gray-500">
                                We offer competitive prices for all our rooms and services.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center">
                                <svg
                                    className="h-12 w-12 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold">24/7 Support</h3>
                            <p className="mt-2 text-gray-500">
                                Our team is available round the clock to assist you.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="flex justify-center">
                                <svg
                                    className="h-12 w-12 text-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold">Prime Locations</h3>
                            <p className="mt-2 text-gray-500">
                                All our properties are situated in premium locations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}