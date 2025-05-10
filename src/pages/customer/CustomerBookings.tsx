
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

// Mock booking data
const myBookings = [
  {
    id: '1001',
    service: 'Meeting Room A',
    date: '2023-05-15',
    time: '14:00 - 16:00',
    status: 'confirmed',
    amount: '$50.00',
  },
  {
    id: '1002',
    service: 'Conference Hall',
    date: '2023-05-20',
    time: '09:00 - 13:00',
    status: 'pending',
    amount: '$200.00',
  },
  {
    id: '1003',
    service: 'Meeting Room B',
    date: '2023-06-08',
    time: '10:00 - 11:30',
    status: 'confirmed',
    amount: '$35.00',
  },
  {
    id: '1004',
    service: 'Office Space',
    date: '2023-06-12',
    time: 'All day',
    status: 'cancelled',
    amount: '$100.00',
  },
];

const CustomerBookings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();
  
  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Filter bookings for upcoming and past
  const currentDate = new Date();
  const upcomingBookings = myBookings.filter(
    booking => new Date(booking.date) >= currentDate
  );
  const pastBookings = myBookings.filter(
    booking => new Date(booking.date) < currentDate
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <Button onClick={() => navigate('/dashboard/new-booking')}>New Booking</Button>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold">{booking.service}</h3>
                              <div className="flex space-x-2 text-sm text-muted-foreground mt-1">
                                <span>{booking.date}</span>
                                <span>•</span>
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                              <Badge variant={statusBadgeVariant(booking.status)}>
                                {booking.status}
                              </Badge>
                              <span className="font-medium">{booking.amount}</span>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                      <p className="text-muted-foreground mb-4">No upcoming bookings</p>
                      <Button onClick={() => navigate('/dashboard/new-booking')}>
                        Create a booking
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {pastBookings.length > 0 ? (
                  <div className="space-y-4">
                    {pastBookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h3 className="font-semibold">{booking.service}</h3>
                              <div className="flex space-x-2 text-sm text-muted-foreground mt-1">
                                <span>{booking.date}</span>
                                <span>•</span>
                                <span>{booking.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between md:justify-end space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
                              <Badge variant={statusBadgeVariant(booking.status)}>
                                {booking.status}
                              </Badge>
                              <span className="font-medium">{booking.amount}</span>
                              <Button variant="outline" size="sm">
                                Book Again
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center text-muted-foreground">
                      No past bookings
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border calendar-container"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerBookings;
