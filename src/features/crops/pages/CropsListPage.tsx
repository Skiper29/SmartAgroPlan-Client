import React, { useState, useMemo } from 'react';
import { Sprout, Loader2 } from 'lucide-react';
import { useCrops } from '@/features/crops/hooks/crop.hooks';
import { CropTypeLabels } from '@/models/crop/crop.model';
import ErrorDisplay from '@/components/ErrorDisplay';
import CropsStatistics from '@/features/crops/components/CropsStatistics';
import CropsFilters from '@/features/crops/components/CropsFilters';
import CropCard from '@/features/crops/components/CropCard';
import CropsEmptyState from '@/features/crops/components/CropsEmptyState';

const CropsListPage: React.FC = () => {
  const { data: crops, isLoading, error } = useCrops();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'duration' | 'yield'>('name');

  // Filter and sort crops
  const filteredAndSortedCrops = useMemo(() => {
    if (!crops) return [];

    const filtered = [...crops].filter((crop) => {
      const matchesSearch =
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        CropTypeLabels[crop.cropType]
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesType =
        selectedType === 'all' || crop.cropType === selectedType;

      return matchesSearch && matchesType;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name, 'uk');
        case 'duration':
          return a.growingDuration - b.growingDuration;
        case 'yield':
          return b.harvestYield - a.harvestYield;
        default:
          return 0;
      }
    });

    return filtered;
  }, [crops, searchQuery, selectedType, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    if (!crops) return null;
    return {
      total: crops.length,
      avgDuration: Math.round(
        crops.reduce((sum, c) => sum + c.growingDuration, 0) / crops.length,
      ),
      avgYield: (
        crops.reduce((sum, c) => sum + c.harvestYield, 0) / crops.length
      ).toFixed(1),
      avgWater: Math.round(
        crops.reduce((sum, c) => sum + c.waterRequirement, 0) / crops.length,
      ),
    };
  }, [crops]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Loader2 className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Завантаження культур...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження культур"
        showHomeButton
        homeRoute="/dashboard"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Sprout className="h-10 w-10 text-green-600 dark:text-green-400" />
              Список культур
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              База знань про сільськогосподарські культури
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        {stats && <CropsStatistics stats={stats} />}

        {/* Filters */}
        <CropsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-gray-600 dark:text-gray-400">
            Знайдено культур:{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredAndSortedCrops.length}
            </span>
          </p>
        </div>

        {/* Crops Grid */}
        {filteredAndSortedCrops.length === 0 ? (
          <CropsEmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedCrops.map((crop) => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropsListPage;
