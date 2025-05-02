
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, CreditCard, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';

// Mock data for stats
const stats = [
  {
    title: 'Total Bookings',
    value: '124',
    change: '+12%',
    icon: Calendar,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
  },
  {
    title: 'Total Revenue',
    value: '$12,483',
    change: '+8.2%',
    icon: CreditCard,
    color: 'text-green-500',
    bgColor: 'bg-green-100',
  },
  {
    title: 'Active Users',
    value: '57',
    change: '+4%',
    icon: Users,
    color: 'text-purple-500',
    bgColor: 'bg-purple-100',
  },
  {
    title: 'Growth Rate',
    value: '18.2%',
    change: '+2.1%',
    icon: TrendingUp,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
  },
];

// Mock data for revenue chart
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 6000 },
  { name: 'May', revenue: 4500 },
  { name: 'Jun', revenue: 7000 },
  { name: 'Jul', revenue: 8500 },
];

// Mock data for recent bookings
const recentBookings = [
  {
    id: '1',
    customer: 'Jane Cooper',
    service: 'Meeting Room A',
    date: '2023-05-15',
    time: '14:00 - 16:00',
    status: 'Confirmed',
  },
  {
    id: '2',
    customer: 'Wade Warren',
    service: 'Conference Hall',
    date: '2023-05-16',
    time: '09:00 - 13:00',
    status: 'Pending',
  },
  {
    id: '3',
    customer: 'Esther Howard',
    service: 'Meeting Room B',
    date: '2023-05-17',
    time: '10:00 - 11:30',
    status: 'Confirmed',
  },
  {
    id: '4',
    customer: 'Cameron Williamson',
    service: 'Office Space',
    date: '2023-05-18',
    time: 'All day',
    status: 'Cancelled',
  },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  <p className="text-xs text-green-500 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Revenue trends for the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest booking activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{booking.customer}</p>
                      <p className="text-xs text-muted-foreground">{booking.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">{booking.date}</p>
                      <p 
                        className={`text-xs ${
                          booking.status === 'Confirmed' 
                            ? 'text-green-500' 
                            : booking.status === 'Pending' 
                            ? 'text-yellow-500' 
                            : 'text-red-500'
                        }`}
                      >
                        {booking.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
