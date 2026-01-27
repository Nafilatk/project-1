'use client';

import { useEffect, useRef } from 'react';
import { Users, BookOpen, PlayCircle, UserX } from "lucide-react";
import gsap from 'gsap';

export default function StatsCards({ stats }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const cards = [
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <Users className="w-5 h-5" />,
      bg: "bg-blue-50",
      color: "text-blue-700"
    },
    {
      label: "Courses",
      value: stats.courses,
      icon: <BookOpen className="w-5 h-5" />,
      bg: "bg-gray-100",
      color: "text-gray-800"
    },
    {
      label: "Videos",
      value: stats.totalVideos,
      icon: <PlayCircle className="w-5 h-5" />,
      bg: "bg-green-50",
      color: "text-green-700"
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      icon: <UserX className="w-5 h-5" />,
      bg: "bg-red-50",
      color: "text-red-700"
    },
  ];

  // GSAP Animations
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Container entry animation
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.1
      });

      // Card stagger animation
      gsap.from(cardRefs.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.3
      });

      // Icon animation
      gsap.from(iconRefs.current, {
        scale: 0,
        rotation: -15,
        duration: 0.4,
        stagger: 0.08,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
      });

      // Value counting animation
      valueRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const cardValue = cards[index].value;
        gsap.from(ref, {
          innerText: 0,
          duration: 1.2,
          snap: { innerText: 1 },
          ease: "power2.out",
          delay: 0.7 + (index * 0.1),
          onUpdate: function() {
            if (ref) {
              ref.textContent = Math.ceil(Number(this.targets()[0].innerText)).toLocaleString();
            }
          }
        });
      });

      // Hover animations
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -3,
            duration: 0.2,
            ease: "power2.out"
          });
          
          const icon = iconRefs.current[index];
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
          
          const icon = iconRefs.current[index];
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              duration: 0.2,
              ease: "power2.out"
            });
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {cards.map((c, i) => (
        <div
          key={i}
          ref={el => { cardRefs.current[i] = el; }}
          className="
            bg-white
            border border-gray-200
            rounded-xl
            p-6
            shadow-sm
            hover:shadow-md
            transition-all
            duration-300
          "
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{c.label}</p>
              <p 
                ref={el => { valueRefs.current[i] = el; }}
                className={`text-3xl font-bold mt-2 ${c.color}`}
              >
                {c.value.toLocaleString()}
              </p>
            </div>

            <div className={`p-3 rounded-lg ${c.bg}`}>
              <div 
                ref={el => { iconRefs.current[i] = el; }}
                className={c.color}
              >
                {c.icon}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}