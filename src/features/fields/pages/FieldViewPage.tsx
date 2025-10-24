import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FieldMapProvider } from '../contexts/FieldMapContext';
import { useField } from '../hooks/fields.hooks';
import ErrorDisplay from '@/components/ErrorDisplay';
import AddFieldConditionModal from '../components/modals/AddFieldConditionModal';
import FieldViewHeader from '../components/view/FieldViewHeader';
import FieldMapSection from '../components/view/FieldMapSection';
import BasicInformationCard from '../components/card/BasicInformationCard.tsx';
import CurrentCropCard from '../components/card/CurrentCropCard.tsx';
import CropRequirementsCard from '../components/card/CropRequirementsCard.tsx';
import SoilInformationCard from '../components/card/SoilInformationCard.tsx';
import AdditionalNotesCard from '../components/card/AdditionalNotesCard.tsx';
import FieldConditionHistorySection from '../components/view/FieldConditionHistorySection';
import {
  calculateFieldArea,
  getSoilTypeLabel,
  getCropInfo,
  calculateExpectedHarvestDate,
  formatDayMonth,
} from '../utils/fieldCalculations';
import FieldConditionTableSection from '@/features/fields/components/view/FieldConditionTableSection.tsx';

const FieldViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const fieldId = parseInt(id || '0', 10);
  const [isConditionModalOpen, setIsConditionModalOpen] = useState(false);

  const { data: field, isLoading, error } = useField(fieldId);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження інформації про поле...
          </p>
        </div>
      </div>
    );
  }

  if (error || !field) {
    return (
      <ErrorDisplay
        error={error || new Error('Поле не знайдено')}
        title="Не вдалося завантажити інформацію про поле"
        showHomeButton
        homeRoute="/fields"
      />
    );
  }

  const cropInfo = getCropInfo(field);
  const fieldArea = calculateFieldArea(field);
  const expectedHarvestDate = calculateExpectedHarvestDate(field);
  const soilTypeLabel = getSoilTypeLabel(field);

  return (
    <FieldMapProvider>
      <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
        <div className="w-full max-w-7xl space-y-6">
          <FieldViewHeader
            fieldId={field.id}
            fieldName={field.name}
            onAddCondition={() => setIsConditionModalOpen(true)}
          />

          <FieldMapSection field={field} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <BasicInformationCard field={field} fieldArea={fieldArea} />

            <CurrentCropCard
              field={field}
              cropInfo={cropInfo}
              expectedHarvestDate={expectedHarvestDate}
            />

            <CropRequirementsCard
              field={field}
              formatDayMonth={formatDayMonth}
            />

            <SoilInformationCard field={field} soilTypeLabel={soilTypeLabel} />
          </div>

          {field.currentCrop?.additionalNotes && (
            <AdditionalNotesCard notes={field.currentCrop.additionalNotes} />
          )}

          <FieldConditionHistorySection
            fieldId={field.id}
            fieldName={field.name}
          />

          <FieldConditionTableSection
            fieldId={field.id}
            fieldName={field.name}
          />
        </div>
      </div>

      <AddFieldConditionModal
        fieldId={field.id}
        fieldName={field.name}
        isOpen={isConditionModalOpen}
        onClose={() => setIsConditionModalOpen(false)}
      />
    </FieldMapProvider>
  );
};

export default FieldViewPage;
