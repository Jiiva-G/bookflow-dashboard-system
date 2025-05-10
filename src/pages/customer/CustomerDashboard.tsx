
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CreditCard, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

// Mock data for upcoming bookings
const upcomingBookings = [
  {
    id: '1001',
    service: 'Meeting Room A',
    date: '2023-05-15',
    time: '14:00 - 16:00',
    status: 'confirmed',
  },
  {
    id: '1002',
    service: 'Conference Hall',
    date: '2023-05-20',
    time: '09:00 - 13:00',
    status: 'pending',
  },
];

// Mock data for recent transactions
const recentTransactions = [
  {
    id: 'tx1001',
    service: 'Meeting Room A',
    date: '2023-05-10',
    amount: '$50.00',
    status: 'paid',
  },
  {
    id: 'tx1002',
    service: 'Conference Hall',
    date: '2023-05-05',
    amount: '$200.00',
    status: 'paid',
  },
];

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'default';
      case 'cancelled':
        return 'destructive';
      case 'paid':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingBookings.length}</div>
              <p className="text-xs text-muted-foreground">scheduled services</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$250.00</div>
              <p className="text-xs text-muted-foreground">over the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Booking</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5 hours</div>
              <p className="text-xs text-muted-foreground">per booking</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Upcoming Bookings</CardTitle>
                <CardDescription>Your next scheduled services</CardDescription>
              </div>
              <Button size="sm" onClick={() => navigate('/dashboard/bookings')}>View All</Button>
            </CardHeader>
            <CardContent>
              {upcomingBookings.length > 0 ? (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <div className="flex space-x-2 text-sm text-muted-foreground">
                          <span>{booking.date}</span>
                          <span>•</span>
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <Badge variant={statusBadgeVariant(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">No upcoming bookings</p>
              )}
              <div className="mt-4 flex justify-center">
                <Button onClick={() => navigate('/dashboard/new-booking')}>Create New Booking</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your recent payments</CardDescription>
              </div>
              <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/transactions')}>
                View All
              </Button>
            </CardHeader>
            <CardContent>
              {recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div>
                        <p className="font-medium">{transaction.service}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{transaction.amount}</span>
                        <Badge variant={statusBadgeVariant(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">No recent transactions</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
