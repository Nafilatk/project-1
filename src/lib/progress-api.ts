const API_URL = 'http://localhost:3001';

export interface CourseProgress {
  id: string;
  courseId: string;
  completedVideos: number[];
  isCourseCompleted: boolean;
  completedAt: string | null;
}

export interface UserProgress {
  id: string;
  userId: string;
  courses: CourseProgress[];
}

/**
 * Fetch user progress by userId
 * Returns the user's progress object with all courses
 */
export async function fetchUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const res = await fetch(`${API_URL}/userProgress?userId=${userId}`);
    if (!res.ok) {
      console.warn(`Failed to fetch user progress: ${res.status}`);
      return null;
    }
    const data = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return null;
  }
}

/**
 * Create user progress object for new user
 */
export async function createUserProgress(userId: string): Promise<UserProgress> {
  const newProgress: UserProgress = {
    id: `up_${Date.now()}`,
    userId,
    courses: [],
  };

  try {
    const res = await fetch(`${API_URL}/userProgress`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProgress),
    });

    if (!res.ok) {
      throw new Error(`Failed to create user progress: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error creating user progress:', error);
    return newProgress;
  }
}

/**
 * Mark a video as completed for a user in a specific course
 * Handles creating course progress if it doesn't exist
 */
export async function markVideoComplete(
  userId: string,
  courseId: string,
  videoId: number,
  totalVideosInCourse: number
): Promise<UserProgress> {
  try {
    // Step 1: Fetch or create user progress
    let userProgress = await fetchUserProgress(userId);

    if (!userProgress) {
      userProgress = await createUserProgress(userId);
    }

    // Step 2: Find course progress
    let courseProgress = userProgress.courses.find(c => c.courseId === courseId);

    // Step 3: Create course progress if doesn't exist
    if (!courseProgress) {
      courseProgress = {
        id: `cp_${Date.now()}`,
        courseId,
        completedVideos: [],
        isCourseCompleted: false,
        completedAt: null,
      };
      userProgress.courses.push(courseProgress);
    }

    // Step 4: Add video if not already completed
    if (!courseProgress.completedVideos.includes(videoId)) {
      courseProgress.completedVideos.push(videoId);
    }

    // Step 5: Check if course is fully completed
    if (courseProgress.completedVideos.length === totalVideosInCourse) {
      courseProgress.isCourseCompleted = true;
      courseProgress.completedAt = new Date().toISOString();
    }

    // Step 6: Update user progress in database
    const res = await fetch(`${API_URL}/userProgress/${userProgress.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userProgress),
    });

    if (!res.ok) {
      throw new Error(`Failed to update user progress: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error marking video complete:', error);
    throw error;
  }
}

/**
 * Get course progress for a specific course
 */
export async function getCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress | null> {
  try {
    const userProgress = await fetchUserProgress(userId);
    if (!userProgress) return null;
    return userProgress.courses.find(c => c.courseId === courseId) || null;
  } catch (error) {
    console.error('Error getting course progress:', error);
    return null;
  }
}

/**
 * Get all completed videos for a course
 */
export async function getCompletedVideos(
  userId: string,
  courseId: string
): Promise<number[]> {
  try {
    const courseProgress = await getCourseProgress(userId, courseId);
    return courseProgress?.completedVideos || [];
  } catch (error) {
    console.error('Error getting completed videos:', error);
    return [];
  }
}
