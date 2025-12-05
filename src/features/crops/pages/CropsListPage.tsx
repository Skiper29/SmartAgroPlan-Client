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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Show 12 crops per page (4x3 grid)

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedCrops.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCrops = filteredAndSortedCrops.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedType, sortBy]);

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
            {filteredAndSortedCrops.length > itemsPerPage && (
              <span className="text-sm ml-2">
                (показано {startIndex + 1}-{Math.min(endIndex, filteredAndSortedCrops.length)})
              </span>
            )}
          </p>
        </div>

        {/* Crops Grid */}
        {filteredAndSortedCrops.length === 0 ? (
          <CropsEmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedCrops.map((crop) => (
                <CropCard key={crop.id} crop={crop} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Попередня
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1);

                    const showEllipsis =
                      (page === 2 && currentPage > 3) ||
                      (page === totalPages - 1 && currentPage < totalPages - 2);

                    if (showEllipsis) {
                      return (
                        <span key={page} className="px-2 text-gray-500 dark:text-gray-400">
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                          currentPage === page
                            ? 'bg-green-600 text-white shadow-lg scale-110'
                            : 'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Наступна
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CropsListPage;
