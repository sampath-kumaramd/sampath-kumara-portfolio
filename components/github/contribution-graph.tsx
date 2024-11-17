'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  date: string;
  count: number;
  weekday: number;
  color: string;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionWeek {
  days: ContributionDay[];
}

interface ContributionGraphProps {
  className?: string;
}

export function ContributionGraph({ className }: ContributionGraphProps) {
  const [contributions, setContributions] = useState<ContributionWeek[]>([]);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContributions();
  }, []);

  const fetchContributions = async () => {
    try {
      const response = await fetch('/api/github-contributions');
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        throw new Error('Failed to fetch contributions');
      }
      const data = await response.json();
      console.log('Contribution data:', data);
      setContributions(data.contributions);
      setTotalContributions(data.totalContributions);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(
        err instanceof Error ? err.message : 'Failed to load contributions'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getContributionColor = (color: string) => {
    // Map GitHub's colors to Tailwind classes
    const colorMap: { [key: string]: string } = {
      '#ebedf0': 'bg-[#ebedf0] dark:bg-[#2d333b]', // No contributions
      '#9be9a8': 'bg-[#9be9a8] dark:bg-[#0e4429]', // Level 1
      '#40c463': 'bg-[#40c463] dark:bg-[#006d32]', // Level 2
      '#30a14e': 'bg-[#30a14e] dark:bg-[#26a641]', // Level 3
      '#216e39': 'bg-[#216e39] dark:bg-[#39d353]', // Level 4
    };
    return colorMap[color] || colorMap['#ebedf0'];
  };

  if (isLoading) {
    return <ContributionGraphSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load contribution data
      </div>
    );
  }

  const weekdays = ['Mon', '', 'Wed', '', 'Fri'];

  return (
    <div className={className}>
      <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
        {totalContributions} contributions in the last year
      </div>
      <div className="relative flex">
        {/* Weekday labels */}
        <div className="mr-2 flex flex-col justify-between text-xs text-gray-400">
          {weekdays.map((day, index) => (
            <div key={index} className="h-[10px] leading-[10px]">
              {day}
            </div>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="scrollbar-hide-if-not-needed flex w-full gap-[2px] overflow-x-auto pb-2">
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.days.map((day, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: weekIndex * 0.01,
                  }}
                  className={`group relative h-[10px] w-[10px] rounded-sm ${getContributionColor(
                    day.color
                  )}`}
                >
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-700">
                    {day.count} contributions on{' '}
                    {new Date(day.date).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-600 dark:text-gray-400">
        <span>Less</span>
        {['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'].map(
          (color) => (
            <div
              key={color}
              className={`h-[10px] w-[10px] rounded-sm ${getContributionColor(color)}`}
            />
          )
        )}
        <span>More</span>
      </div>
    </div>
  );
}

const ContributionGraphSkeleton = () => {
  return (
    <div className="h-[100px] w-full animate-pulse rounded-md bg-gray-200"></div>
  );
};
