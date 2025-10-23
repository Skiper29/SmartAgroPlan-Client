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
import DeleteFieldModal from '../modals/DeleteFieldModal';
import { SoilType, SoilTypeLabels } from '@/models/field/soil.model';
import { CropType, CropTypeLabels } from '@/models/crop/crop.model';
import { useFieldMap } from '@/features/fields/contexts/FieldMapContext';
import { useNavigate } from 'react-router-dom';
import { Locate, SquarePen, Trash2, DatabaseZap } from 'lucide-react';
import AddFieldConditionModal from '@/features/fields/components/modals/AddFieldConditionModal.tsx';

interface FieldCardProps {
  field: Field;
  className?: string;
}

export const FieldCard: React.FC<FieldCardProps> = ({ field, className }) => {
  const { navigateToField } = useFieldMap();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

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
            <Locate />
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
              <SquarePen />
              Редагувати
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsConditionModalOpen(true)}
              className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/40 transition-colors rounded-md"
              title="Додати дані про стан"
            >
              <DatabaseZap />
              Стан
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDeleteModalOpen(true)}
              className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors rounded-md"
              title="Видалити поле"
            >
              <Trash2 />
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

      {/* Add Field Condition Modal */}
      <AddFieldConditionModal
        fieldId={field.id}
        fieldName={field.name}
        isOpen={isConditionModalOpen}
        onClose={() => setIsConditionModalOpen(false)}
      />
    </>
  );
};

export default FieldCard;
