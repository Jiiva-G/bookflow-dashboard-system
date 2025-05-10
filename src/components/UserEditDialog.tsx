
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/sonner';
import { UserRole } from '@/contexts/AuthContext';

interface UserEditDialogProps {
  user?: AdminUser | null;
  onSave: (user: AdminUser) => void;
  trigger?: React.ReactNode;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
}

const UserEditDialog = ({ user, onSave, trigger }: UserEditDialogProps) => {
  const isNewUser = !user;
  
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'customer' as UserRole,
    status: user?.status || 'active' as const,
    createdAt: user?.createdAt || new Date().toISOString().split('T')[0]
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Add validation here
    if (!formData.name || !formData.email) {
      toast("Validation error", {
        description: "Please fill all required fields"
      });
      return;
    }
    
    // Create new user with ID if it's a new user
    const updatedUser: AdminUser = {
      ...formData,
      id: isNewUser ? `${Math.random().toString(36).substr(2, 9)}` : formData.id,
      role: formData.role as UserRole,
      status: formData.status as 'active' | 'inactive'
    };
    
    onSave(updatedUser);
    setOpen(false);
    
    toast(`User ${isNewUser ? 'created' : 'updated'}`, {
      description: `${updatedUser.name} has been successfully ${isNewUser ? 'added' : 'updated'}.`
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Edit User</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isNewUser ? 'Add New User' : 'Edit User'}</DialogTitle>
            <DialogDescription>
              {isNewUser 
                ? 'Create a new user account.' 
                : 'Make changes to the user account here.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="email" className="text-right text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="role" className="text-right text-sm font-medium">
                Role
              </label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => handleSelectChange('role', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="status" className="text-right text-sm font-medium">
                Status
              </label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange('status', value as 'active' | 'inactive')}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isNewUser ? 'Create' : 'Save changes'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditDialog;
