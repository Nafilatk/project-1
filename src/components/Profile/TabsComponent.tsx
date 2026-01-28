'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type TabKey = "personal" | "security" | "account";

interface TabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function TabsComponent({ activeTab, onTabChange }: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsRef.current) return;

    // Entrance animation for tabs
    gsap.fromTo(tabsRef.current.children,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
      }
    );
  }, []);

  useEffect(() => {
    if (!indicatorRef.current) return;

    const activeButton = tabsRef.current?.querySelector(`[data-tab="${activeTab}"]`);
    if (!activeButton) return;

    const { width, left } = activeButton.getBoundingClientRect();
    const containerLeft = tabsRef.current?.getBoundingClientRect().left || 0;

    // Animate indicator to active tab
    gsap.to(indicatorRef.current, {
      left: left - containerLeft,
      width: width,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [activeTab]);

  const handleTabClick = (tab: TabKey) => {
    onTabChange(tab);
    
    // Button click animation
    const button = tabsRef.current?.querySelector(`[data-tab="${tab}"]`);
    if (button) {
      gsap.fromTo(button,
        { scale: 1 },
        {
          scale: 0.95,
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power2.out"
        }
      );
    }
  };

  return (
<div className="sticky top-0 z-30 border-b border-blue-200 
                bg-blue-600 backdrop-blur px-8 pt-6 shadow-sm">
      <div ref={tabsRef} className="flex gap-8 text-sm font-bold">
        <button
          data-tab="personal"
          className={`group relative pb-4 px-1 transition-all duration-300 ${
            activeTab === "personal"
              ? "text-blue-100"
              : "text-gray-800 hover:text-blue-200 hover:scale-105"
          }`}
          onClick={() => handleTabClick("personal")}
        >
          <span className="relative z-10">Personal Info</span>
          <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
        
        <button
          data-tab="security"
          className={`group relative pb-4 px-1 transition-all duration-300 ${
            activeTab === "security"
              ? "text-blue-100"
              : "text-gray-800 hover:text-blue-200 hover:scale-105"
          }`}
          onClick={() => handleTabClick("security")}
        >
          <span className="relative z-10">Login & Security</span>
          <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
        
        <button
          data-tab="account"
          className={`group relative pb-4 px-1 transition-all duration-300 ${
            activeTab === "account"
              ? "text-blue-100"
              : "text-gray-800 hover:text-blue-200 hover:scale-105"
          }`}
          onClick={() => handleTabClick("account")}
        >
          <span className="relative z-10">Account</span>
          <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </button>
      </div>

      {/* Animated indicator */}
      <div className="relative">
        <div 
          ref={indicatorRef}
          className="absolute bottom-0 h-1 bg-linear-to-r from-blue-500 to-blue-600 rounded-full shadow-md shadow-blue-500/30 transition-all duration-300"
        />
      </div>
    </div>
  );
}