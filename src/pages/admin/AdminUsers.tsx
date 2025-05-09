
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Search, UserPlus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import UserEditDialog, { AdminUser } from '@/components/UserEditDialog';

// Mock user data
const initialUsers: AdminUser[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Customer User',
    email: 'customer@example.com',
    role: 'customer',
    status: 'active',
    createdAt: '2023-02-20',
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    status: 'inactive',
    createdAt: '2023-03-10',
  },
  {
    id: '4',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'customer',
    status: 'active',
    createdAt: '2023-04-05',
  },
  {
    id: '5',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'customer',
    status: 'active',
    createdAt: '2023-04-20',
  },
  {
    id: '6',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'customer',
    status: 'inactive',
    createdAt: '2023-05-12',
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveUser = (updatedUser: AdminUser) => {
    setUsers(prevUsers => {
      const userIndex = prevUsers.findIndex(u => u.id === updatedUser.id);
      if (userIndex >= 0) {
        // Update existing user
        const newUsers = [...prevUsers];
        newUsers[userIndex] = updatedUser;
        return newUsers;
      } else {
        // Add new user
        return [...prevUsers, updatedUser];
      }
    });
    
    setSelectedUser(null);
    toast("User updated", {
      description: `${updatedUser.name}'s information has been updated`
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    toast("User deleted", {
      description: "The user has been removed from the system",
      variant: "destructive"
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <UserEditDialog 
            onSave={handleSaveUser}
            trigger={
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            }
          />
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'success' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.createdAt}</TableCell>
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
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          Edit user
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"
                          onClick={() => handleDeleteUser(user.id)}>
                          Delete user
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {selectedUser && (
          <UserEditDialog 
            user={selectedUser} 
            onSave={handleSaveUser}
            trigger={<div className="hidden" />} 
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers;
