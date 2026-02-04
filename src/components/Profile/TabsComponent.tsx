'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { User, Shield, Settings } from 'lucide-react';

type TabKey = "personal" | "security" | "account";

interface TabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export default function TabsComponent({ activeTab, onTabChange }: TabsProps) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabsRef.current) return;

    gsap.fromTo(tabsRef.current.children,
      {
        y: -30,
        opacity: 0,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)"
      }
    );
  }, []);

  useEffect(() => {
    if (!indicatorRef.current || !tabsRef.current) return;

    const activeButton = tabsRef.current.querySelector(`[data-tab="${activeTab}"]`);
    if (!activeButton) return;

    const { width, left, top } = activeButton.getBoundingClientRect();
    const containerLeft = tabsRef.current.getBoundingClientRect().left;

    gsap.to(indicatorRef.current, {
      left: left - containerLeft,
      width: width,
      duration: 0.6,
      ease: "power4.out"
    });

    // Animate icon
    const icon = activeButton.querySelector('.tab-icon');
    if (icon) {
      gsap.fromTo(icon,
        { rotateY: -180, scale: 0 },
        {
          rotateY: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [activeTab]);

  const handleTabClick = (tab: TabKey, e: React.MouseEvent) => {
    onTabChange(tab);

    // Create ripple effect
    const button = e.currentTarget as HTMLButtonElement;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('div');
    ripple.className = 'absolute rounded-full bg-white/30';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '0px';
    ripple.style.height = '0px';
    button.appendChild(ripple);

    gsap.to(ripple, {
      width: Math.max(rect.width, rect.height) * 2,
      height: Math.max(rect.width, rect.height) * 2,
      x: -Math.max(rect.width, rect.height),
      y: -Math.max(rect.width, rect.height),
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      onComplete: () => ripple.remove()
    });

    // Button press animation
    gsap.to(button, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });
  };

  const tabs = [
    { key: "personal", label: "Personal Info", icon: User },
    { key: "security", label: "Security", icon: Shield },
    { key: "account", label: "Account", icon: Settings }
  ];

  return (
    <div className="
  sticky top-0 z-50
  bg-linear-to-b from-white/95 via-white/90 to-white/85
  backdrop-blur-xl
  border border-gray-200/50
  rounded-2xl
  shadow-lg shadow-blue-500/5
  px-4 sm:px-8 pt-6
">

  
      <div
        ref={tabsRef}
        className="flex gap-1 sm:gap-2 relative"
      >
        <div className="absolute inset-0 -m-2 rounded-2xl bg-linear-to-br from-gray-50 to-white/50 border border-gray-100/80 shadow-inner" />

        <div className="absolute inset-0 -m-2 rounded-2xl bg-linear-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 blur-xl opacity-50" />

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              data-tab={tab.key}
              className={`
                group relative flex-1 flex flex-col items-center justify-center 
                py-4 px-3 sm:px-4 rounded-2xl transition-all duration-300
                overflow-hidden z-10
                ${isActive
                  ? 'text-blue-700 bg-linear-to-b from-white to-blue-50/50 shadow-lg shadow-blue-500/20'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white/80 hover:shadow-md'
                }
              `}
              onClick={(e) => handleTabClick(tab.key as TabKey, e)}
            >
              <div className="absolute inset-0 bg-linear-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {isActive && (
                <div className="absolute inset-0 rounded-2xl p-px bg-linear-to-r from-blue-400 via-purple-400 to-cyan-400">
                  <div className="absolute inset-0 rounded-2xl bg-white" />
                </div>
              )}

              <div className="relative flex flex-col items-center gap-2 sm:gap-3">
                <div className={`
                  relative p-2.5 sm:p-3 rounded-xl transition-all duration-300
                  ${isActive
                    ? 'bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30'
                    : 'bg-linear-to-br from-gray-100 to-gray-50 group-hover:from-blue-50 group-hover:to-blue-100/50'
                  }
                `}>
                  <Icon className={`
                    w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 tab-icon
                    ${isActive ? 'text-white scale-110' : 'text-gray-500 group-hover:text-blue-500'}
                  `} />

                  {/* Icon Glow */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-linear-to-br from-blue-400 to-blue-500 blur-md opacity-50" />
                  )}
                </div>

                {/* Label */}
                <span className={`
                  text-xs sm:text-sm font-semibold transition-all duration-300
                  ${isActive ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-600'}
                `}>
                  {tab.label}
                </span>
              </div>

              {/* Active Indicator Dot */}
              <div className={`
                absolute -bottom-1 w-1.5 h-1.5 rounded-full transition-all duration-300
                ${isActive
                  ? 'bg-linear-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50 scale-100'
                  : 'bg-gray-300 group-hover:bg-blue-400 scale-0'
                }
              `} />
            </button>
          );
        })}
      </div>

      {/* Floating Indicator */}
      <div className="relative mt-6">
        <div
          ref={indicatorRef}
          className="absolute -bottom-2 h-1.5 rounded-full bg-linear-to-r from-blue-500 via-blue-600 to-cyan-500 shadow-lg shadow-blue-500/40 transition-all duration-500"
        />

        {/* Indicator Glow */}
        <div className="absolute -bottom-2 h-1.5 rounded-full bg-linear-to-r from-blue-400 via-blue-500 to-cyan-400 blur-md opacity-60 transition-all duration-500" />
      </div>

      {/* Decorative Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-300/50 to-transparent" />

      {/* Reflective Gloss */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-b from-white/60 to-transparent rounded-t-2xl" />
    </div>
  );
}