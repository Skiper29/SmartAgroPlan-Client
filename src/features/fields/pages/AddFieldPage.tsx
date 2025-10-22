import React, { useState } from 'react';
import { useCreateField } from '../hooks/fields.hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { FieldCreate } from '@/models/field/field.model';
import type { FieldFormData } from '../schemas/fieldFormSchema';
import UnifiedFieldForm from '../components/form/UnifiedFieldForm';
import FieldPageHeader from '../components/layout/FieldPageHeader';
import FieldFormSection from '../components/layout/FieldFormSection';
import FieldMapSection from '../components/layout/FieldMapSection';

const AddFieldPage: React.FC = () => {
  const [boundaryGeoJson, setBoundaryGeoJson] = useState('');
  const navigate = useNavigate();

  const createFieldMutation = useCreateField();

  const handleBoundaryChange = (geoJson: string) => {
    setBoundaryGeoJson(geoJson);
  };

  const handleFormSubmit = async (data: FieldFormData) => {
    try {
      const fieldData: FieldCreate = {
        name: data.name,
        location: data.location || '',
        boundaryGeoJson: data.boundaryGeoJson,
        fieldType: data.fieldType,
        currentCropId: data.currentCropId,
        sowingDate: data.sowingDate,
        soilId: data.soilId,
      };

      await createFieldMutation.mutateAsync(fieldData);
      toast.success('Поле успішно додано!');
      navigate('/fields');
    } catch (error) {
      console.error('Error creating field:', error);
      toast.error('Помилка при створенні поля. Спробуйте ще раз.');
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
      <div className="w-full max-w-7xl space-y-8">
        <FieldPageHeader title="Додати нове поле" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FieldFormSection
            title="Інформація про поле"
            description="Заповніть форму нижче, щоб додати нове поле до вашої ферми."
          >
            <UnifiedFieldForm
              onSubmit={handleFormSubmit}
              boundaryGeoJson={boundaryGeoJson}
              isSubmitting={createFieldMutation.isPending}
              isEdit={false}
            />
          </FieldFormSection>

          <FieldMapSection
            title="Межі поля"
            description="Використовуйте інструменти карти для позначення меж вашого поля."
            onBoundaryChange={handleBoundaryChange}
            initialBoundary={boundaryGeoJson}
            boundaryGeoJson={boundaryGeoJson}
            center={[49.0, 32.0]}
            zoom={6}
            isEdit={false}
          />
        </div>

        {/* Additional Information */}
        <section className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
              Додаткова інформація
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Після додавання поля ви зможете переглядати його статистику,
              планувати сівозміну, відстежувати врожайність та отримувати
              рекомендації щодо агротехніки.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddFieldPage;
