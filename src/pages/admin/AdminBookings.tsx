
import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Search } from 'lucide-react';

// Mock booking data
const bookings = [
  {
    id: '1001',
    customer: 'Jane Cooper',
    customerEmail: 'jane@example.com',
    service: 'Meeting Room A',
    date: '2023-05-15',
    time: '14:00 - 16:00',
    status: 'confirmed',
    amount: '$50.00',
  },
  {
    id: '1002',
    customer: 'Wade Warren',
    customerEmail: 'wade@example.com',
    service: 'Conference Hall',
    date: '2023-05-16',
    time: '09:00 - 13:00',
    status: 'pending',
    amount: '$200.00',
  },
  {
    id: '1003',
    customer: 'Esther Howard',
    customerEmail: 'esther@example.com',
    service: 'Meeting Room B',
    date: '2023-05-17',
    time: '10:00 - 11:30',
    status: 'confirmed',
    amount: '$35.00',
  },
  {
    id: '1004',
    customer: 'Cameron Williamson',
    customerEmail: 'cameron@example.com',
    service: 'Office Space',
    date: '2023-05-18',
    time: 'All day',
    status: 'cancelled',
    amount: '$100.00',
  },
  {
    id: '1005',
    customer: 'Brooklyn Simmons',
    customerEmail: 'brooklyn@example.com',
    service: 'Meeting Room C',
    date: '2023-05-19',
    time: '13:00 - 15:00',
    status: 'confirmed',
    amount: '$50.00',
  },
  {
    id: '1006',
    customer: 'Leslie Alexander',
    customerEmail: 'leslie@example.com',
    service: 'Conference Hall',
    date: '2023-05-20',
    time: '15:00 - 17:00',
    status: 'pending',
    amount: '$100.00',
  },
];

const statusOptions = ['all', 'confirmed', 'pending', 'cancelled'];

const AdminBookings = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter((booking) => {
    const matchesQuery =
      booking.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesQuery && matchesStatus;
  });

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <Button>Add Booking</Button>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium">{booking.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{booking.customer}</p>
                      <p className="text-sm text-muted-foreground">{booking.customerEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{booking.service}</TableCell>
                  <TableCell>
                    <div>
                      <p>{booking.date}</p>
                      <p className="text-sm text-muted-foreground">{booking.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusBadgeVariant(booking.status)}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.amount}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit booking</DropdownMenuItem>
                        <DropdownMenuItem>Contact customer</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminBookings;
