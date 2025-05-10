/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, } from './ui/dialog';

import { useAppSelector } from '../Redux/hook';
import { selectCurrentUser } from '../Redux/Features/Auth/authSlice';
import { DialogContent } from './ui/dialog';
import { DialogHeader } from './ui/dialog';
import { DialogTitle } from './ui/dialog';
import { DialogDescription } from './ui/dialog';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const user = useAppSelector(selectCurrentUser);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`https://book-store-server-eta.vercel.app/api/v1/users/${user?._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        onClose(); // Close modal after successful update
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      toast.error('An error occurred while updating.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-6 space-y-4">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
          <DialogDescription>Edit your information and save changes.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Email"
            disabled
          />
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Phone Number"
          />
        </div>

        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className={`w-full p-2 mt-4 text-white bg-green-600 rounded-lg ${
            isUpdating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Save Changes'}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileModal;

