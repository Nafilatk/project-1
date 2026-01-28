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

  /* ---------------- REFS ---------------- */
  const titleRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const courseCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  /* ---------------- AUTH ---------------- */
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  /* ---------------- FETCH ---------------- */
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

      setTimeout(animatePage, 100);
    } catch (error) {
      console.error('Progress fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ANIMATIONS ---------------- */
  const animatePage = () => {
    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
          },
        }
      );
    }

    gsap.fromTo(
      sectionsRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionsRef.current,
          start: 'top 80%',
        },
      }
    );
  };

  /* ---------------- HELPERS ---------------- */
  const calculateProgress = (completed: number[], total: number) =>
    total > 0 ? Math.round((completed.length / total) * 100) : 0;

  const toggleCourseDetails = (courseId: string) => {
    setActiveCourse(prev => (prev === courseId ? null : courseId));
  };

  /* ---------------- STATES ---------------- */
  if (loading || authLoading) {
    return <LoadingScreen />;
  }

  if (watchHistory.length === 0) {
    return <EmptyProgress />;
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-blue-50 to-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <DashboardHeader
          titleRef={titleRef}
          statsRef={statsRef}
          watchHistory={watchHistory}
          courses={courses}
        />

        <div ref={sectionsRef}>
          {/* COMPLETED COURSES */}
          <CompletedCourses
            watchHistory={watchHistory}
            courses={courses}
            courseDetails={courseDetails}
            toggleCourseDetails={toggleCourseDetails}
            courseCardsRef={courseCardsRef}
          />

          {/* ACTIVE COURSES */}
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
