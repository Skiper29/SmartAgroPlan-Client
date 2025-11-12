import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, RefreshCw, History, AlertCircle } from 'lucide-react';
import {
  useApplicationSummary,
  useApplicationsByDateRange,
} from '../hooks/fertilizer.hooks';
import { useField } from '@/features/fields/hooks/fields.hooks';
import DateRangeFilter from '../components/DateRangeFilter';
import ApplicationSummaryCard from '../components/ApplicationSummaryCard';
import ApplicationCard from '../components/ApplicationCard';
import ProductDetailsModal from '../components/ProductDetailsModal';
import ErrorDisplay from '@/components/ErrorDisplay';
import { sortApplicationsByDate } from '../utils/fertilizerUtils';
import { cn } from '@/lib/utils';
import type { FertilizerProduct } from '@/models/fertilizer';

const FertilizerHistoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const fieldId = Number(id);

  // Date range for filtering
  const [startDate, setStartDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3); // 3 months ago
    date.setHours(0, 0, 0, 0); // Start of day
    return date;
  });
  const [endDate, setEndDate] = useState<Date | undefined>(() => {
    const date = new Date();
    date.setMonth(date.getMonth() + 3); // 3 months ahead
    date.setHours(23, 59, 59, 999); // End of day
    return date;
  });

  // Product details modal
  const [selectedProduct, setSelectedProduct] = useState<FertilizerProduct | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleProductClick = (product: FertilizerProduct) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const { data: field, isLoading: isLoadingField } = useField(fieldId);

  // Convert dates to ISO strings for API calls
  const startDateStr = startDate ? startDate.toISOString().split('T')[0] : '';
  const endDateStr = endDate ? endDate.toISOString().split('T')[0] : '';

  const {
    data: summary,
    isLoading: isLoadingSummary,
    error: summaryError,
    refetch: refetchSummary,
  } = useApplicationSummary(fieldId, startDateStr, endDateStr);

  const {
    data: applications = [],
    isLoading: isLoadingApplications,
    refetch: refetchApplications,
  } = useApplicationsByDateRange(fieldId, startDateStr, endDateStr);

  const handleRefresh = () => {
    refetchSummary();
    refetchApplications();
  };

  const sortedApplications = useMemo(() => {
    return sortApplicationsByDate(applications, false); // Most recent first
  }, [applications]);

  const isLoading = isLoadingField || isLoadingSummary || isLoadingApplications;

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження історії...
          </p>
        </div>
      </div>
    );
  }

  if (summaryError) {
    return <ErrorDisplay error={summaryError} onRetry={handleRefresh} />;
  }

  if (!field) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Поле не знайдено</p>
        <Button onClick={() => navigate('/fertilizer')} className="mt-4">
          Повернутися до огляду
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md px-8 py-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/fertilizer')}
              className="shrink-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <History className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 truncate">
                  {field.name}
                </h1>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {field.currentCrop?.name || 'Немає культури'} • Історія внесень
                добрив
              </p>
            </div>
          </div>
          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            variant="outline"
            size="default"
            className="shrink-0"
          >
            <RefreshCw
              className={cn('h-4 w-4 mr-2', isLoading && 'animate-spin')}
            />
            Оновити
          </Button>
        </div>
      </header>

      {/* Date Filter */}
      <section>
        <DateRangeFilter
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onApply={handleRefresh}
          isLoading={isLoading}
        />
      </section>

      {/* Summary */}
      {summary && (
        <section>
          <ApplicationSummaryCard summary={summary} />
        </section>
      )}

      {/* Applications List */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
            Історія внесень
          </h2>
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Всього:{' '}
            </span>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {sortedApplications.length}
            </span>
          </div>
        </div>

        {sortedApplications.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {sortedApplications.map((application, index) => (
              <ApplicationCard
                key={application.id || index}
                application={application}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700">
            <CardContent className="text-center py-16">
              <AlertCircle className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                Немає внесень за вибраний період
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Спробуйте розширити діапазон дат або перевірте інший період
              </p>
            </CardContent>
          </Card>
        )}
      </section>

      {/* Product Details Modal */}
      <ProductDetailsModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
      />
    </div>
  );
};

export default FertilizerHistoryPage;
