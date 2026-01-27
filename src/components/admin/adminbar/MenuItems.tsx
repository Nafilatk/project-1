import { LayoutDashboard, BookOpen, Users } from 'lucide-react';

export const menuItems = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Dashboard',
    href: '/Admin',
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    label: 'Courses',
    href: '/Admin/Admincourses',
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: 'Users',
    href: '/Admin/users',
  },
];
