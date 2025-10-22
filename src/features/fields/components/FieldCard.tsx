import React, { useState } from 'react';
import type Field from '@/models/field/field.model';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FieldTypeBadge from './FieldTypeBadge';
import DeleteFieldModal from './DeleteFieldModal';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model';
import { useFieldMap } from '../contexts/FieldMapContext';
import { useNavigate } from 'react-router-dom';

interface FieldCardProps {
  field: Field;
  className?: string;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, className }) => {
  const { navigateToField } = useFieldMap();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Process soil type from backend (handle integer enum values)
  const getSoilTypeLabel = () => {
    if (!field.soil?.type) return '—';

    const soilType =
      typeof field.soil.type === 'number'
        ? (Object.values(SoilType)[field.soil.type] as SoilType)
        : field.soil.type;

    return SoilTypeLabels[soilType] || '—';
  };

  // Process crop type from backend (handle integer enum values)
  const getCropInfo = () => {
    if (!field.currentCrop) return { name: '—', type: '' };

    const cropType =
      typeof field.currentCrop.cropType === 'number'
        ? (Object.values(CropType)[field.currentCrop.cropType] as CropType)
        : field.currentCrop.cropType;

    const typeLabel = CropTypeLabels[cropType] || '';

    return {
      name: field.currentCrop.name,
      type: typeLabel,
    };
  };

  const cropInfo = getCropInfo();

  const handleGoToMap = () => {
    navigateToField(field);
    // Scroll to map section
    const mapSection = document.querySelector('[data-map-section]');
    if (mapSection) {
      mapSection.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  const handleEditField = () => {
    navigate(`/fields/edit/${field.id}`);
  };

  const handleDeleteSuccess = () => {
    // The field list will be automatically refreshed by React Query
    setIsDeleteModalOpen(false);
  };

  const handleViewField = () => {
    navigate(`/fields/view/${field.id}`);
  };

  return (
    <>
      <Card className={`w-full max-w-md ${className ?? ''}`.trim()}>
        <CardHeader className="flex flex-row items-center gap-3 border-b pb-4">
          <FieldTypeBadge fieldType={field.fieldType} />
          <CardTitle
            className="text-lg font-bold flex-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            onClick={handleViewField}
            title="Переглянути деталі поля"
          >
            {field.name}
          </CardTitle>

          {/* Only Map button in header */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleGoToMap}
            className="flex items-center gap-1 text-xs shrink-0"
            title="Показати на карті"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
            Карта
          </Button>
        </CardHeader>

        {/* Card content */}
        <div className="px-6 py-4 flex flex-col gap-2">
          <CardDescription className="text-sm text-muted-foreground">
            <span className="font-medium">Локація:</span>{' '}
            {field.location ?? '—'}
          </CardDescription>
          <CardDescription className="text-sm">
            <span className="font-medium">Культура:</span> {cropInfo.name}
            {cropInfo.type && (
              <span className="text-xs text-muted-foreground ml-2">
                ({cropInfo.type})
              </span>
            )}
          </CardDescription>
          <CardDescription className="text-sm">
            <span className="font-medium">Ґрунт:</span> {getSoilTypeLabel()}
          </CardDescription>
          <CardDescription className="text-xs text-gray-500">
            <span className="font-medium">Створено:</span>{' '}
            {field.createdAt
              ? new Date(field.createdAt).toLocaleDateString()
              : '—'}
          </CardDescription>
          <CardDescription className="text-xs text-gray-500">
            <span className="font-medium">Оновлено:</span>{' '}
            {field.updatedAt
              ? new Date(field.updatedAt).toLocaleDateString()
              : '—'}
          </CardDescription>
        </div>

        {/* Action buttons at bottom */}
        <CardFooter className="px-6 border-t dark:bg-gray-800/70 dark:border-gray-700 rounded-b-lg">
          <div className="flex items-center justify-between gap-2 w-full">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEditField}
              className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/40 transition-colors rounded-md"
              title="Редагувати поле"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Редагувати
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors rounded-md"
              title="Видалити поле"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Видалити
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Delete Modal */}
      <DeleteFieldModal
        field={field}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
};

export default FieldCard;
