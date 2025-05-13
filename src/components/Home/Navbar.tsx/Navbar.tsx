import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'sonner';
import { LogOut, Menu,  X } from 'lucide-react';
import { Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../Redux/hook';
import { logout } from '../../../Redux/Features/Auth/authSlice';
import { persistor } from '../../../Redux/store';
import logo from '../../../assets/logo.png';




const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    persistor.purge();
    toast.success('Logged out successfully');
    setMobileMenuOpen(false);
  };
 
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/allbooks', label: 'All Books' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/faq', label: 'FAQ' }
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 dark:bg-gray-900 dark:border-gray-800'>
      <div className='max-w-[90%] mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex '>
            <button
              className='lg:hidden p-2 rounded-md text-gray-700 hover:bg-green-50 hover:text-[#4C765E] focus:outline-none dark:text-gray-300 dark:hover:bg-gray-800'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
            <Link to='/' className='flex items-center' onClick={closeMobileMenu}>
              <img src={logo} alt='Logo' className='h-14 w-auto' />
            </Link>
          </div>

          <nav className='hidden lg:flex items-center space-x-1'>
            
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-lg font-medium transition-colors duration-300 ${
                    isActive ? 'underline text-[#4C765E]' : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className='flex items-center gap-8'>
             
            {user?.email ? (
              <div className='relative group'>
                <button className='flex items-center space-x-2 focus:outline-none'>
                  <Avatar
                    className='bg-[#51c081] hover:bg-[#4C765E] transition-colors'
                    icon={<UserOutlined />}
                  />
                </button>
                <div className='absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 dark:bg-gray-800 dark:ring-gray-700'>
                 {
                    user?.role === 'admin' ? (
                      <Link
                        to='/admin/dashboard'
                        className='block px-4 py-2 text-md text-gray-700 hover:bg-[#51c081] hover:text-white dark:text-gray-300 dark:hover:bg-[#4C765E] dark:hover:text-white'
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link to="/user/dashboard"
                        className='block px-4 py-2 text-md text-gray-700 hover:bg-[#51c081] hover:text-white dark:text-gray-300 dark:hover:bg-[#4C765E] dark:hover:text-white'
                      >
                        Profile
                      </Link>
                      
                    )
                    
                  }
                
                  <button
                    onClick={handleLogout}
                    className='w-full text-left px-4 py-2 text-md text-gray-700  hover:bg-[#4C765E] flex items-center gap-2'
                  >
                    <LogOut size={16} />
                    <span>Log out</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to='/login'
                className='px-4 py-2 rounded-md text-md font-medium bg-[#51c081] hover:bg-[#4C765E] border-2'
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className='block px-3 py-2 rounded-md text-base font-medium'
              onClick={closeMobileMenu}
            >
              {link.label}
            </NavLink>
          ))}

       </div>
      </div>
    </header>
  );
};

export default Navbar;
