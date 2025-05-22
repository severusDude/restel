import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Room, User, Review } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface RoomShowProps {
    auth: {
        user: User | null;
    };
    room: Room & {
        reviews: (Review & { user: User })[];
    };
}

interface ReservationFormData {
    room_id: string;
    start_date: string;
    end_date: string;
}

export default function RoomShow({ auth, room }: RoomShowProps) {
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const { post, processing } = useForm<ReservationFormData>();

    const handleBooking = () => {
        if (!startDate || !endDate) return;

        post(route('reservations.store'), {
            data: {
                room_id: room.id,
                start_date: format(startDate, 'yyyy-MM-dd'),
                end_date: format(endDate, 'yyyy-MM-dd'),
            },
        });
    };

    const calculateTotalPrice = () => {
        if (!startDate || !endDate) return 0;
        const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        return days * room.price;
    };

    return (
        <MainLayout user={auth.user || undefined}>
            <Head title={room.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
                        {/* Room Details */}
                        <div className="lg:col-span-1">
                            <div className="aspect-w-16 aspect-h-9 mb-8">
                                <img
                                    src={room.image_url || '/images/room-placeholder.jpg'}
                                    alt={room.name}
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            <h1 className="text-3xl font-bold text-gray-900">{room.name}</h1>
                            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                                <span>{room.type}</span>
                                <span>•</span>
                                <span>{room.capacity} guests</span>
                                <span>•</span>
                                <span>{room.location}</span>
                            </div>

                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                                <p className="mt-2 text-gray-500">{room.description}</p>
                            </div>

                            {room.facilities.length > 0 && (
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Facilities</h2>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        {room.facilities.map((facility) => (
                                            <div
                                                key={facility.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <div className="h-8 w-8">
                                                    <img
                                                        src={facility.default_image?.path || '/images/facility-placeholder.jpg'}
                                                        alt={facility.name}
                                                        className="h-full w-full object-cover rounded"
                                                    />
                                                </div>
                                                <span className="text-gray-600">{facility.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Reviews Section */}
                            {room.reviews.length > 0 && (
                                <div className="mt-12">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Guest Reviews
                                    </h2>
                                    <div className="mt-6 space-y-6">
                                        {room.reviews.map((review) => (
                                            <Card key={review.id}>
                                                <CardContent className="pt-6">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <p className="font-medium text-gray-900">
                                                                {review.user.name}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                {format(new Date(review.created_at), 'PP')}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center">
                                                            <span className="text-yellow-400">
                                                                {'★'.repeat(review.rating)}
                                                                {'☆'.repeat(5 - review.rating)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {review.comment && (
                                                        <p className="mt-4 text-gray-600">
                                                            {review.comment}
                                                        </p>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Booking Card */}
                        <div className="mt-10 lg:mt-0 lg:col-span-1">
                            <div className="sticky top-8">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex items-baseline justify-between">
                                            <span className="text-2xl font-bold">${room.price}</span>
                                            <span className="text-gray-500">per night</span>
                                        </div>

                                        <div className="mt-6 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Check-in
                                                </label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                'w-full justify-start text-left font-normal mt-1',
                                                                !startDate && 'text-muted-foreground'
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {startDate ? format(startDate, 'PPP') : 'Pick a date'}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={startDate}
                                                            onSelect={setStartDate}
                                                            initialFocus
                                                            disabled={(date: Date) =>
                                                                date < new Date() || (endDate ? date > endDate : false)
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Check-out
                                                </label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                'w-full justify-start text-left font-normal mt-1',
                                                                !endDate && 'text-muted-foreground'
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {endDate ? format(endDate, 'PPP') : 'Pick a date'}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={endDate}
                                                            onSelect={setEndDate}
                                                            initialFocus
                                                            disabled={(date: Date) =>
                                                                date < new Date() || (startDate ? date < startDate : false)
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            {startDate && endDate && (
                                                <div className="pt-4 border-t">
                                                    <div className="flex justify-between">
                                                        <span>Total</span>
                                                        <span className="font-semibold">
                                                            ${calculateTotalPrice()}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}

                                            <Button
                                                className="w-full mt-6"
                                                disabled={!startDate || !endDate || processing}
                                                onClick={handleBooking}
                                            >
                                                {processing ? 'Processing...' : 'Book Now'}
                                            </Button>

                                            {!auth.user && (
                                                <p className="mt-2 text-sm text-gray-500 text-center">
                                                    Please{' '}
                                                    <a
                                                        href={route('login')}
                                                        className="text-primary hover:underline"
                                                    >
                                                        log in
                                                    </a>{' '}
                                                    to make a reservation
                                                </p>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
} 