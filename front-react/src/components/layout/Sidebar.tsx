import { Link, useLocation } from 'react-router-dom';
import { Users, ClipboardEdit, Key } from 'lucide-react';
import { useAuthStore } from '@/auth/stores/authStore';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
    const location = useLocation();
    const user = useAuthStore(state => state.user);

    const menuItems = [
        {
            href: '/employees',
            icon: Users,
            label: 'Employees',
            roles: ['employee', 'manager', 'hr']
        },
        {
            href: '/reviews',
            icon: ClipboardEdit,
            label: 'Reviews',
            roles: ['manager', 'hr']
        },
        {
            href: '/api-keys',
            icon: Key,
            label: 'API Keys',
            roles: ['hr']
        }
    ];

    const filteredMenuItems = menuItems.filter(
        item => item.roles.includes(user?.role || '')
    );

    return (
        <div className="w-64 min-h-screen border-r bg-white">
            <nav className="p-4">
                <ul className="space-y-2">
                    {filteredMenuItems.map(({ href, icon: Icon, label }) => (
                        <li key={href}>
                            <Link
                                to={href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-colors hover:text-gray-900",
                                    location.pathname === href && "bg-gray-100 text-gray-900"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};