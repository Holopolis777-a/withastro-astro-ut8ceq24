import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Menu, Dialog } from '@headlessui/react';
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
  const { user, logout, profileImage, updateProfileImage } = useAuthStore();
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

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically update the user profile through your API
    console.log('Profile update:', formData);
    setProfileOpen(false);
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
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100">
          <Settings className="w-6 h-6" />
        </button>

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
              Vervollständige Dein Profil!
            </Dialog.Title>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <Input
                label="Vollständiger Name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <Input
                label="Straße"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
              />
              <Input
                label="Hausnummer"
                value={formData.houseNumber}
                onChange={(e) =>
                  setFormData({ ...formData, houseNumber: e.target.value })
                }
              />
              <Input
                label="Postleitzahl"
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
              />
              <Input
                label="Ort"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <Input
                label="Telefonnummer"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <Button type="submit" fullWidth>
                Bestätigen
              </Button>
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