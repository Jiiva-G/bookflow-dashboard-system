import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { CreditCard } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Download, FileText } from 'lucide-react';

// Mock transaction data
const transactions = [
  {
    id: 'tx1001',
    service: 'Meeting Room A',
    date: '2023-05-10',
    invoiceNumber: 'INV-2023-001',
    amount: '$50.00',
    status: 'paid',
  },
  {
    id: 'tx1002',
    service: 'Conference Hall',
    date: '2023-05-05',
    invoiceNumber: 'INV-2023-002',
    amount: '$200.00',
    status: 'paid',
  },
  {
    id: 'tx1003',
    service: 'Meeting Room B',
    date: '2023-04-20',
    invoiceNumber: 'INV-2023-003',
    amount: '$35.00',
    status: 'paid',
  },
  {
    id: 'tx1004',
    service: 'Office Space',
    date: '2023-04-15',
    invoiceNumber: 'INV-2023-004',
    amount: '$100.00',
    status: 'paid',
  },
  {
    id: 'tx1005',
    service: 'Meeting Room A',
    date: '2023-04-02',
    invoiceNumber: 'INV-2023-005',
    amount: '$50.00',
    status: 'paid',
  },
];

const CustomerTransactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredTransactions = transactions.filter((tx) =>
    tx.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total spent
  const totalSpent = transactions.reduce((sum, tx) => {
    return sum + parseFloat(tx.amount.replace('$', ''));
  }, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Transaction History</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">across {transactions.length} transactions</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
        
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.invoiceNumber}</TableCell>
                  <TableCell>{tx.service}</TableCell>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    <Badge variant="success">{tx.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Invoice
                    </Button>
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

export default CustomerTransactions;
