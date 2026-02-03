'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useAuth } from '@/context/auth-context';
import { Course, CourseDetail } from '@/lib/types/courses';

import DashboardHeader from '@/components/progress/progressheader';
import CompletedCourses from '@/components/progress/CompletedCourses';
import ActiveCourses from '@/components/progress/ActiveCourses';
import EmptyProgress from '@/components/progress/EmptyProgress';
import LoadingScreen from '@/components/progress/LoadingScreen';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type WatchHistory = {
  id: string;
  userId: string;
  courseId: string;
  completedVideos: number[];
  isCourseCompleted: boolean;
};

export default function ProgressPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [watchHistory, setWatchHistory] = useState<WatchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState<string | null>(null);

  // Refs for GSAP scoping and targeting
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const courseCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.id) fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [coursesRes, detailsRes, historyRes] = await Promise.all([
        axios.get('http://localhost:3001/courses'),
        axios.get('http://localhost:3001/courseDetails'),
        axios.get(`http://localhost:3001/watchHistory?userId=${user!.id}`),
      ]);

      setCourses(coursesRes.data);
      setCourseDetails(detailsRes.data);
      setWatchHistory(historyRes.data);
    } catch (error) {
      console.error('Progress fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Main Animation Logic using GSAP Context
  useEffect(() => {
    if (loading || authLoading || watchHistory.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Initial Container Fade-in
      gsap.from(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // 2. Header & Stats Stagger
      if (titleRef.current || statsRef.current) {
        const headerElements = [];
        if (titleRef.current) headerElements.push(titleRef.current);
        if (statsRef.current) headerElements.push(...Array.from(statsRef.current.children));

        gsap.from(headerElements, {
          y: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3
        });
      }

      // 3. Section Entry (Completed & Active sections)
      if (sectionsRef.current) {
        gsap.from(sectionsRef.current.children, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          delay: 0.6
        });
      }

      // 4. Individual Card Micro-Interactions (Hover)
      courseCardsRef.current.forEach((card) => {
        if (!card) return;

        // Card Entrance animation (Slide from left as per your snippet)
        gsap.from(card, {
          x: -20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });

        // Hover listeners
        const onEnter = () => {
          gsap.to(card, {
            y: -5,
            scale: 1.01,
            backgroundColor: 'rgba(37, 99, 235, 0.02)', // Subtle blue tint
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            backgroundColor: 'transparent',
            duration: 0.3,
            ease: "power2.out"
          });
        };

        card.addEventListener('mouseenter', onEnter);
        card.addEventListener('mouseleave', onLeave);
      });

    }, containerRef); // Scoped to this container

    return () => ctx.revert(); // Cleanup all GSAP animations/ScrollTriggers
  }, [loading, authLoading, watchHistory]);

  const calculateProgress = (completed: number[], total: number) =>
    total > 0 ? Math.round((completed.length / total) * 100) : 0;

  const toggleCourseDetails = (courseId: string) => {
    setActiveCourse(prev => (prev === courseId ? null : courseId));
  };

  if (loading || authLoading) {
    return <LoadingScreen />;
  }

  if (watchHistory.length === 0) {
    return <EmptyProgress />;
  }

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-linear-to-br from-white via-blue-50 to-white p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <DashboardHeader
          titleRef={titleRef}
          statsRef={statsRef}
          watchHistory={watchHistory}
          courses={courses}
        />

        <div ref={sectionsRef}>
          <CompletedCourses
            watchHistory={watchHistory}
            courses={courses}
            courseDetails={courseDetails}
            toggleCourseDetails={toggleCourseDetails}
            courseCardsRef={courseCardsRef}
          />

          <ActiveCourses
            watchHistory={watchHistory}
            courses={courses}
            courseDetails={courseDetails}
            activeCourse={activeCourse}
            toggleCourseDetails={toggleCourseDetails}
            calculateProgress={calculateProgress}
            router={router}
            courseCardsRef={courseCardsRef}
          />
        </div>
      </div>
    </div>
  );
}