'use client';

import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  cardRef?: (el: HTMLDivElement | null) => void;
  completed?: boolean;
};

export default function CourseCard({
  children,
  onClick,
  cardRef,
  completed = false,
}: Props) {
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`relative bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 overflow-hidden group cursor-pointer
        ${
          completed
            ? 'border border-blue-300 hover:shadow-2xl hover:border-blue-400 hover:scale-[1.02]'
            : 'border border-blue-200 hover:shadow-xl hover:border-blue-300'
        }`}
    >
      {children}
    </div>
  );
}
