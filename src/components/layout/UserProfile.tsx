import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Menu, Dialog } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import {
  Bell,
  Settings,
  ChevronDown,
  User,
  Camera,
  Lock,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ImageUploadDialog } from '../profile/ImageUploadDialog';

interface ProfileFormData {
  fullName: string;
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  phone: string;
}

export function UserProfile() {
  const { user, updateProfile, logout, profileImage, updateProfileImage } = useAuthStore();
  const [isProfileOpen, setProfileOpen] = React.useState(false);
  const [isImageUploadOpen, setImageUploadOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<ProfileFormData>({
    fullName: user?.name || '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    phone: '',
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile({ name: formData.fullName });
      toast.success('Profil erfolgreich aktualisiert');
      setProfileOpen(false);
    } catch (error) {
      toast.error('Fehler beim Aktualisieren des Profils');
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      updateProfileImage(imageUrl);
      setImageUploadOpen(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <div className="flex items-center gap-4">
        {/* Profile Menu */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-600 font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              )}
            </div>
            <div className="text-left">
              <div className="text-sm font-medium">{user?.name || 'User'}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </Menu.Button>

          <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-10">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setProfileOpen(true)}
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profil bearbeiten
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setImageUploadOpen(true)}
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <Camera className="w-4 h-4 mr-3" />
                  Profilbild ändern
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                >
                  <Lock className="w-4 h-4 mr-3" />
                  Passwort ändern
                </button>
              )}
            </Menu.Item>
            <div className="border-t border-gray-100 my-1" />
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } flex items-center w-full px-4 py-2 text-sm text-red-600`}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Abmelden
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>

      {/* Profile Edit Dialog */}
      <Dialog
        open={isProfileOpen}
        onClose={() => setProfileOpen(false)}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-white rounded-xl max-w-md w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-6">
              Profil bearbeiten
            </Dialog.Title>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                label="Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />

              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setProfileOpen(false)}
                >
                  Abbrechen
                </Button>
                <Button type="submit">
                  Speichern
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Image Upload Dialog */}
      <ImageUploadDialog
        isOpen={isImageUploadOpen}
        onClose={() => setImageUploadOpen(false)}
        onUpload={handleImageUpload}
      />
    </>
  );
}