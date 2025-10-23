import React, { useState, useEffect } from 'react';
import { useUpdateField, useField } from '../hooks/fields.hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { type FieldUpdate } from '@/models/field/field.model';
import {
  type FieldFormData,
  convertFieldToFormData,
} from '../schemas/fieldFormSchema';
import UnifiedFieldForm from '../components/form/UnifiedFieldForm';
import FieldPageHeader from '../components/layout/FieldPageHeader';
import FieldFormSection from '../components/layout/FieldFormSection';
import FieldMapSection from '../components/layout/FieldMapSection';
import ErrorDisplay from '@/components/ErrorDisplay.tsx';

const EditFieldPage: React.FC = () => {
  const [boundaryGeoJson, setBoundaryGeoJson] = useState('');
  const [formData, setFormData] = useState<FieldFormData | undefined>(
    undefined,
  );
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fieldId = id ? parseInt(id) : 0;
  const { data: field, isLoading, error } = useField(fieldId);
  const updateFieldMutation = useUpdateField();

  // Initialize form when field is loaded
  useEffect(() => {
    if (field) {
      const convertedData = convertFieldToFormData(field);
      setFormData(convertedData);
      setBoundaryGeoJson(field.boundaryGeoJson);
    }
  }, [field]);

  const handleBoundaryChange = (geoJson: string) => {
    setBoundaryGeoJson(geoJson);
  };

  const handleFormSubmit = async (data: FieldFormData) => {
    if (!field) return;

    try {
      const updateData: FieldUpdate = {
        id: field.id,
        name: data.name,
        location: data.location || undefined,
        fieldType: data.fieldType,
        currentCropId: data.currentCropId,
        sowingDate: data.sowingDate,
        soilId: data.soilId,
        boundaryGeoJson: data.boundaryGeoJson,
      };

      await updateFieldMutation.mutateAsync(updateData);
      toast.success('Поле успішно оновлено!');
      navigate('/fields');
    } catch (error) {
      console.error('Error updating field:', error);
      toast.error('Помилка при оновленні поля. Спробуйте ще раз.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Завантаження поля...
          </p>
        </div>
      </div>
    );
  }

  if (error || !field) {
    return (
      <ErrorDisplay
        error={error || new Error('Поле не знайдено.')}
        showHomeButton={true}
        homeRoute="/fields"
      />
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
      <div className="w-full max-w-7xl space-y-8">
        <FieldPageHeader title={`Редагувати поле "${field.name}"`} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FieldFormSection
            title="Інформація про поле"
            description="Редагуйте параметри поля у формі нижче."
          >
            {formData ? (
              <UnifiedFieldForm
                onSubmit={handleFormSubmit}
                boundaryGeoJson={boundaryGeoJson}
                isSubmitting={updateFieldMutation.isPending}
                isEdit={true}
                defaultValues={formData}
              />
            ) : (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              </div>
            )}
          </FieldFormSection>

          <FieldMapSection
            title="Межі поля"
            description="Використовуйте інструменти карти для редагування меж поля."
            onBoundaryChange={handleBoundaryChange}
            initialBoundary={field.boundaryGeoJson}
            boundaryGeoJson={boundaryGeoJson}
            center={[49.0, 32.0]}
            zoom={8}
            isEdit={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditFieldPage;
