import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Leaf, Calendar, TrendingUp, Droplets } from 'lucide-react';

interface CropsStatisticsProps {
  stats: {
    total: number;
    avgDuration: number;
    avgYield: string;
    avgWater: number;
  };
}

const CropsStatistics: React.FC<CropsStatisticsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Всього культур
              </p>
              <p className="text-3xl font-bold text-green-700 dark:text-green-400">
                {stats.total}
              </p>
            </div>
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
              <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Середня тривалість
              </p>
              <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {stats.avgDuration}
                <span className="text-lg ml-1">днів</span>
              </p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
              <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-yellow-200 dark:border-yellow-800 bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-950/20 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Середня врожайність
              </p>
              <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                {stats.avgYield}
                <span className="text-lg ml-1">т/га</span>
              </p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full">
              <TrendingUp className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-cyan-200 dark:border-cyan-800 bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/20 dark:to-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 font-medium">
                Середня потреба у воді
              </p>
              <p className="text-3xl font-bold text-cyan-700 dark:text-cyan-400">
                {stats.avgWater}
                <span className="text-lg ml-1">мм</span>
              </p>
            </div>
            <div className="bg-cyan-100 dark:bg-cyan-900/30 p-3 rounded-full">
              <Droplets className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropsStatistics;
