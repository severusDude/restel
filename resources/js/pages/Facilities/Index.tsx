import { Head } from '@inertiajs/react';
import MainLayout from '@/layouts/MainLayout';
import { Facility, User } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FacilitiesIndexProps {
    auth: {
        user: User | null;
    };
    facilities: Facility[];
}

export default function FacilitiesIndex({ auth, facilities }: FacilitiesIndexProps) {
    // Group facilities by type
    const groupedFacilities = facilities.reduce<Record<string, Facility[]>>((acc, facility) => {
        if (!acc[facility.type]) {
            acc[facility.type] = [];
        }
        acc[facility.type].push(facility);
        return acc;
    }, {});

    return (
        <MainLayout user={auth.user || undefined}>
            <Head title="Facilities" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Our Facilities</h1>
                        <p className="mt-2 text-gray-600">
                            Explore the amenities and services available at our hotel
                        </p>
                    </div>

                    <div className="space-y-12">
                        {Object.entries(groupedFacilities).map(([type, facilities]) => (
                            <div key={type}>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </h2>
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {facilities.map((facility) => (
                                        <Card key={facility.id}>
                                            <div className="aspect-w-16 aspect-h-9">
                                                <img
                                                    src={facility.default_image?.path || '/images/facility-placeholder.jpg'}
                                                    alt={facility.name}
                                                    className="object-cover w-full h-48 rounded-t-lg"
                                                />
                                            </div>
                                            <CardHeader>
                                                <CardTitle>{facility.name}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex items-center space-x-2">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                        {facility.type}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {facilities.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-900">
                                    No facilities found
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    Please check back later for updates on our facilities.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 