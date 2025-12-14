'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Cpu, ChevronRight, LogOut } from 'lucide-react';
import { gsap } from 'gsap';
// import authService from '@/services/auth';

interface UserData {
  user: {
    name: string;
    avatar?: string;
  };
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<UserData | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    router.push('/');
    window.location.reload();
  };

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Courses', path: '/courses' },
    { name: 'Ebooks', path: '/ebooks' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMenuOpen ? 'glass' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900 group-hover:text-blue-900 transition-colors">
              learnest<span className="text-blue-600">.ai</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img
                    src={
                      user.user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.user.name
                      )}`
                    }
                    alt={user.user.name}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1"
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <button className="btn-primary flex items-center gap-2 group text-sm px-5 py-2">
                    Sign up
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg transition-all duration-300 origin-top ${
          isMenuOpen
            ? 'opacity-100 scale-y-100'
            : 'opacity-0 scale-y-0 h-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              href={link.path}
              onClick={toggleMenu}
              className={`block px-4 py-3 rounded-xl text-base font-medium ${
                isActive(link.path)
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-blue-600'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-100 flex flex-col gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2">
                  <img
                    src={
                      user.user.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.user.name
                      )}`
                    }
                    alt={user.user.name}
                    className="w-8 h-8 rounded-full border"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.user.name}
                  </span>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-center py-2.5 text-red-600 font-medium hover:bg-red-50 rounded-xl"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={toggleMenu}
                  className="w-full text-center py-2.5 text-gray-600 font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  onClick={toggleMenu}
                  className="w-full text-center btn-primary"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
