import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Room, User } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Link } from '@inertiajs/react';

interface RoomsIndexProps {
    auth: {
        user: User | null;
    };
    rooms: Room[];
    types: string[];
}

export default function RoomsIndex({ auth, rooms: initialRooms, types }: RoomsIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState<string>('');
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    const [capacity, setCapacity] = useState<string>('');

    const filteredRooms = initialRooms.filter((room) => {
        const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.description?.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesType = !selectedType || room.type === selectedType;
        
        const matchesMinPrice = !minPrice || room.price >= parseFloat(minPrice);
        const matchesMaxPrice = !maxPrice || room.price <= parseFloat(maxPrice);
        
        const matchesCapacity = !capacity || room.capacity >= parseInt(capacity);

        return matchesSearch && matchesType && matchesMinPrice && matchesMaxPrice && matchesCapacity;
    });

    return (
        <MainLayout user={auth.user || undefined}>
            <Head title="Rooms" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Our Rooms</h1>
                        <p className="mt-2 text-gray-600">
                            Find your perfect room for a comfortable stay
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                        <Input
                            type="text"
                            placeholder="Search rooms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />

                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Room Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Types</SelectItem>
                                {types.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input
                            type="number"
                            placeholder="Min Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />

                        <Input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />

                        <Input
                            type="number"
                            placeholder="Min Capacity"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                        />
                    </div>

                    {/* Room Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredRooms.map((room) => (
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
                                    <p className="text-gray-500 line-clamp-2">{room.description}</p>
                                    <div className="mt-4 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-semibold">
                                                ${room.price}/night
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                {room.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                                            <span>{room.capacity} guests</span>
                                            <span>{room.location}</span>
                                        </div>
                                        {room.facilities.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {room.facilities.slice(0, 3).map((facility) => (
                                                    <span
                                                        key={facility.id}
                                                        className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                                                    >
                                                        {facility.name}
                                                    </span>
                                                ))}
                                                {room.facilities.length > 3 && (
                                                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                                        +{room.facilities.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
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

                    {filteredRooms.length === 0 && (
                        <div className="text-center py-12">
                            <h3 className="text-lg font-medium text-gray-900">No rooms found</h3>
                            <p className="mt-2 text-gray-500">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
} 