import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';
import {
  User,
  Heart,
  ShoppingBag,
  MapPin,
  CreditCard,
  LogOut,
  CheckCircle,
  Truck,
  Camera // Added Camera icon for the upload overlay
} from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('My Profile');
  const { user, logout } = useAuth();
  const { getUserOrders } = useOrders();
  const { wishlist } = useWishlist();

  const userOrders = getUserOrders();
  
  // Hidden input reference for triggering file upload
  const fileInputRef = useRef(null);
  
  // State for the profile image
  const [profileImage, setProfileImage] = useState(null);

  // Load saved image from localStorage on mount based on user email/ID if available
  useEffect(() => {
    const storageKey = user?.email ? `profile_img_${user.email}` : 'profile_image';
    const savedImage = localStorage.getItem(storageKey);
    if (savedImage) {
      setProfileImage(savedImage);
    }
  }, [user?.email]);

  const [profileData, setProfileData] = useState({
    firstName: user?.name?.split(' ')[0] || 'User',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    address: 'Kingston, 5236, United State',
    phone: '+1 234 567 8900',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle local image conversion and storage
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic validation to check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfileImage(base64String);
        
        // Save to browser localStorage linked to user email to keep unique profiles
        const storageKey = user?.email ? `profile_img_${user.email}` : 'profile_image';
        localStorage.setItem(storageKey, base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    alert('Profile saved successfully!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const sidebarItems = [
    { id: 'My Profile', label: 'My Profile', icon: User },
    { id: 'My Orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'My Wishlist', label: 'My Wishlist', icon: Heart },
    { id: 'Address Book', label: 'Address Book', icon: MapPin },
    { id: 'Payment Methods', label: 'Payment Methods', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'My Profile':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
              <p className="text-gray-500">Manage your account details and preferences</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-8">
              {/* Hidden File Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                className="hidden" 
              />

              {/* Profile Picture Section */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                {/* Clickable Avatar Container */}
                <div 
                  onClick={() => fileInputRef.current.click()}
                  className="group relative w-20 h-20 rounded-full overflow-hidden flex items-center justify-center cursor-pointer shadow-lg transition-transform hover:scale-105 select-none"
                >
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#A47A46] to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{user?.name || 'User'}</h3>
                  <p className="text-gray-500 text-sm">{user?.email || 'user@email.com'}</p>
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="text-xs font-semibold text-[#A47A46] hover:text-amber-700 mt-1 underline underline-offset-2"
                  >
                    Change Image
                  </button>
                </div>
              </div>

              {/* Personal Info Section */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={profileData.firstName} 
                      onChange={handleProfileChange} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A47A46]/20 focus:border-[#A47A46] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={profileData.lastName} 
                      onChange={handleProfileChange} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A47A46]/20 focus:border-[#A47A46] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={profileData.email} 
                      onChange={handleProfileChange} 
                      readOnly
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={profileData.phone} 
                      onChange={handleProfileChange} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A47A46]/20 focus:border-[#A47A46] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      name="currentPassword" 
                      placeholder="••••••••" 
                      value={profileData.currentPassword} 
                      onChange={handleProfileChange} 
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A47A46]/20 focus:border-[#A47A46] transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input 
                        type="password" 
                        name="newPassword" 
                        placeholder="••••••••" 
                        value={profileData.newPassword} 
                        onChange={handleProfileChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A47A46]/20 focus:border-[#A47A46] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                      <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="••••••••" 
                        value={profileData.confirmPassword} 
                        onChange={handleProfileChange} 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#A47A46]/20 focus:border-[#A47A46] transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button 
                  type="button" 
                  onClick={logout} 
                  className="px-6 py-3 text-gray-600 hover:text-red-600 font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-3 bg-gradient-to-r from-[#A47A46] to-amber-600 hover:from-[#8e673e] hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all transform active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );

      case 'My Orders':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
              <p className="text-gray-500">Track and manage your orders</p>
            </div>
            
            {userOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <ShoppingBag size={64} className="text-gray-200 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Orders Yet</h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">You haven't placed any orders yet. Start shopping to see your orders here!</p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-gradient-to-r from-[#A47A46] to-amber-600 hover:from-[#8e673e] hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                    <div className="flex flex-wrap justify-between items-center gap-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Order {order.orderNumber}</p>
                        <p className="text-xs text-gray-400">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-medium text-xs px-3 py-1.5 rounded-full">
                          <CheckCircle size={12} />
                          {order.status}
                        </span>
                        <p className="text-xl font-bold text-gray-900">₹{order.total}</p>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                            <div className="w-20 h-20 rounded-xl bg-gray-50 overflow-hidden border border-gray-100 flex-shrink-0">
                              <img 
                                src={item.image || (item.images && item.images[0]) || 'https://via.placeholder.com/100'} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-semibold text-gray-900 truncate">{item.title}</h4>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                                {item.selectedSize && (
                                  <span className="text-[10px] bg-gray-100 text-gray-600 border border-gray-200/40 font-bold px-2 py-0.5 rounded uppercase">
                                    Size: {item.selectedSize}
                                  </span>
                                )}
                                {item.selectedColor && (
                                  <span className="text-[10px] bg-gray-100 text-gray-600 border border-gray-200/40 font-bold px-2 py-0.5 rounded capitalize">
                                    Color: {typeof item.selectedColor === 'object' ? item.selectedColor.name : item.selectedColor}
                                  </span>
                                )}
                              </div>
                              <p className="text-base font-bold text-gray-900 mt-1">₹{item.price * item.quantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'My Wishlist':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
              <p className="text-gray-500">Items you've saved for later</p>
            </div>
            
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <Heart size={64} className="text-gray-200 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your Wishlist is Empty</h3>
                <p className="text-gray-500 mb-6 text-center max-w-md">Save items you love to your wishlist and come back anytime!</p>
                <button 
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-gradient-to-r from-[#A47A46] to-amber-600 hover:from-[#8e673e] hover:to-amber-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlist.map((item) => (
                  <div key={item.id} className="transform hover:scale-[1.02] transition-transform">
                    <ProductCard product={item} isWishlistItem={true} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'Address Book':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Address Book</h1>
              <p className="text-gray-500">Manage your shipping addresses</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#A47A46]/5 to-amber-50 p-6 rounded-2xl border-2 border-[#A47A46]/30 relative">
                <span className="absolute top-4 right-4 bg-[#A47A46] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Default
                </span>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{profileData.firstName} {profileData.lastName}</h3>
                <p className="text-gray-700 mb-1">{profileData.address}</p>
                <p className="text-gray-700 mb-4">Kingston, 5236, United State</p>
                <p className="text-gray-700 font-medium">{profileData.phone}</p>
                <div className="flex gap-3 mt-6">
                  <button className="px-4 py-2 text-[#A47A46] font-medium text-sm hover:bg-[#A47A46]/10 rounded-lg transition-colors">
                    Edit
                  </button>
                  <button className="px-4 py-2 text-gray-600 font-medium text-sm hover:bg-gray-100 rounded-lg transition-colors">
                    Delete
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#A47A46] hover:bg-[#A47A46]/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-gray-400">+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Add New Address</h3>
                <p className="text-gray-500 text-sm">Add a new shipping address</p>
              </div>
            </div>
          </div>
        );

      case 'Payment Methods':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Methods</h1>
              <p className="text-gray-500">Manage your saved payment options</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10" />
                <div className="flex justify-between items-start mb-8">
                  <CreditCard size={24} className="opacity-80" />
                  <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Default
                  </span>
                </div>
                <div className="mb-6">
                  <p className="text-xl tracking-widest font-medium">•••• •••• •••• 4242</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Card Holder</p>
                    <p className="font-medium">{profileData.firstName} {profileData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Expires</p>
                    <p className="font-medium">12/29</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#A47A46] hover:bg-[#A47A46]/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-gray-400">+</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Add New Payment Method</h3>
                <p className="text-gray-500 text-sm">Add a credit or debit card</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-amber-50/20 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-8 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* User Info Card */}
              <div className="p-6 bg-gradient-to-br from-[#A47A46] to-amber-600 text-white flex flex-col items-center text-center lg:items-start lg:text-left">
                {/* Visual sync with sidebar avatar */}
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 overflow-hidden shadow-md border border-white/20">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[#A47A46]">
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
                <p className="text-white/80 text-sm mt-1">{user?.email || 'user@email.com'}</p>
              </div>

              {/* Navigation */}
              <nav className="p-4 space-y-1">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-[#A47A46]/10 to-amber-100 text-[#A47A46] font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                      }`}
                    >
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <div className="p-4 border-t border-gray-100">
                <button 
                  onClick={logout} 
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 font-medium transition-colors"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;