// src/features/fields/components/table/FieldConditionsTable.tsx
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, ArrowLeft, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import type { FieldCondition } from '@/models/field/field-condition.model';
import { useFieldConditions } from '@/features/fields/hooks/fieldConditions.hooks';
import DeleteFieldConditionModal from '../modals/DeleteFieldConditionModal'; // Create this next
import AddFieldConditionModal from '../modals/AddFieldConditionModal';
import ErrorDisplay from '@/components/ErrorDisplay';
import { Loader2 } from 'lucide-react';

interface FieldConditionsTableProps {
  fieldId: number;
  fieldName: string;
}

const ITEMS_PER_PAGE = 10;

const FieldConditionsTable: React.FC<FieldConditionsTableProps> = ({
  fieldId,
  fieldName,
}) => {
  const {
    data: conditions = [],
    isLoading,
    error,
    refetch,
  } = useFieldConditions(fieldId);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCondition, setSelectedCondition] =
    useState<FieldCondition | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedConditions = useMemo(() => {
    return [...conditions].sort(
      (a, b) =>
        new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
    );
  }, [conditions]);

  const totalPages = Math.ceil(sortedConditions.length / ITEMS_PER_PAGE);
  const paginatedConditions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedConditions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedConditions, currentPage]);

  const openDeleteModal = (condition: FieldCondition) => {
    setSelectedCondition(condition);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedCondition(null);
    setIsDeleteModalOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження даних стану поля"
        onRetry={refetch}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Додати Запис
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableCaption>
            {conditions.length === 0
              ? 'Немає записів про стан поля.'
              : `Показано ${paginatedConditions.length} з ${conditions.length} записів.`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Дата запису</TableHead>
              <TableHead>Вологість (%)</TableHead>
              <TableHead>pH</TableHead>
              <TableHead>N (кг/га)</TableHead>
              <TableHead>P (кг/га)</TableHead>
              <TableHead>K (кг/га)</TableHead>
              <TableHead>Темп. (°C)</TableHead>
              <TableHead>Опади (мм)</TableHead>
              <TableHead className="text-center">Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-800">
            {paginatedConditions.map((condition) => (
              <TableRow key={condition.id}>
                <TableCell className="font-medium">
                  {format(new Date(condition.recordedAt), 'Pp', { locale: uk })}
                </TableCell>
                <TableCell>
                  {condition.soilMoisture?.toFixed(2) ?? '—'}
                </TableCell>
                <TableCell>{condition.soilPh?.toFixed(1) ?? '—'}</TableCell>
                <TableCell>{condition.nitrogen?.toFixed(1) ?? '—'}</TableCell>
                <TableCell>{condition.phosphorus?.toFixed(1) ?? '—'}</TableCell>
                <TableCell>{condition.potassium?.toFixed(1) ?? '—'}</TableCell>
                <TableCell>
                  {condition.temperature?.toFixed(1) ?? '—'}
                </TableCell>
                <TableCell>{condition.rainfall?.toFixed(1) ?? '—'}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/40"
                    onClick={() => openDeleteModal(condition)}
                    aria-label="Видалити запис"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Назад
          </Button>
          <span className="text-sm font-medium">
            Сторінка {currentPage} з {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Вперед
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Modals */}
      <AddFieldConditionModal
        fieldId={fieldId}
        fieldName={fieldName}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          setCurrentPage(1);
        }}
      />
      <DeleteFieldConditionModal
        condition={selectedCondition}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onSuccess={() => {
          if (paginatedConditions.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      />
    </div>
  );
};

export default FieldConditionsTable;
