import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import {Sidebar} from "@/components/layout/Sidebar.tsx";

interface PageLayoutProps {
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="flex">
                <Sidebar />
                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};