'use client';

import { useEffect, useRef } from 'react';
import { User, CheckCircle, Ban, Shield } from 'lucide-react';
import gsap from 'gsap';

interface UsersStatsProps {
  stats: {
    total: number;
    active: number;
    blocked: number;
    admins: number;
  };
}

export default function UsersStats({ stats }: UsersStatsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const valueRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  const cards = [
    { 
      label: 'Total Users', 
      value: stats.total, 
      icon: <User className="w-5 h-5" />, 
      color: 'blue' 
    },
    { 
      label: 'Active Users', 
      value: stats.active, 
      icon: <CheckCircle className="w-5 h-5" />, 
      color: 'green' 
    },
    { 
      label: 'Blocked Users', 
      value: stats.blocked, 
      icon: <Ban className="w-5 h-5" />, 
      color: 'red' 
    },
    { 
      label: 'Admin Users', 
      value: stats.admins, 
      icon: <Shield className="w-5 h-5" />, 
      color: 'purple' 
    },
  ];

  const colorClasses = {
    'blue': {
      bg: 'bg-blue-50',
      icon: 'text-blue-600',
      text: 'text-blue-700'
    },
    'green': {
      bg: 'bg-green-50',
      icon: 'text-green-600',
      text: 'text-green-700'
    },
    'red': {
      bg: 'bg-red-50',
      icon: 'text-red-600',
      text: 'text-red-700'
    },
    'purple': {
      bg: 'bg-purple-50',
      icon: 'text-purple-600',
      text: 'text-purple-700'
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2
      });

      gsap.from(cardRefs.current, {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.2)",
        delay: 0.4
      });

      valueRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const finalValue = cards[index].value;
        gsap.from(ref, {
          innerText: 0,
          duration: 1.5,
          snap: { innerText: 1 },
          ease: "power2.out",
          delay: 0.6 + (index * 0.1),
          onUpdate: function() {
            ref.textContent = Math.ceil(Number(this.targets()[0].innerText)).toString();
          }
        });
      });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            y: -5,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out"
          });
          
          const icon = card.querySelector('.stat-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1.2,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
          
          const icon = card.querySelector('.stat-icon');
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              duration: 0.3,
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {cards.map((c, index) => {
        const colors = colorClasses[c.color as keyof typeof colorClasses];
        
        return (
          <div
            key={c.label}
            ref={el => { cardRefs.current[index] = el; }}
            className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{c.label}</p>
                <p 
                  ref={el => { if (el) valueRefs.current[index] = el; }}
                  className={`text-3xl font-bold mt-2 ${colors.text}`}
                >
                  {c.value}
                </p>
              </div>
              <div className={`p-3 ${colors.bg} rounded-lg`}>
                <div className={`stat-icon ${colors.icon}`}>
                  {c.icon}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}