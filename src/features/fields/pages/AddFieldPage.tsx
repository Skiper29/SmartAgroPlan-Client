import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import FieldForm, { type FieldFormData } from '../components/FieldForm';
import FieldMapEditor from '../components/FieldMapEditor';
import { useCreateField } from '../hooks/fields.hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { FieldCreate } from '@/models/field/field.model';

const AddFieldPage: React.FC = () => {
  const [boundaryGeoJson, setBoundaryGeoJson] = useState('');
  const navigate = useNavigate();

  const createFieldMutation = useCreateField();

  const handleBoundaryChange = (geoJson: string) => {
    setBoundaryGeoJson(geoJson);
  };

  const handleFormSubmit = async (data: FieldFormData) => {
    try {
      // Prepare field data for creation
      const fieldData: FieldCreate = {
        name: data.name,
        location: data.location || '',
        boundaryGeoJson: data.boundaryGeoJson || boundaryGeoJson,
        fieldType: data.fieldType,
        currentCropId: parseInt(data.currentCrop), // Assuming currentCrop contains the ID
        soilId: parseInt(data.soil), // Assuming soil contains the ID
      };

      await createFieldMutation.mutateAsync(fieldData);

      toast.success('Поле успішно додано!');

      // Reset form and map
      setBoundaryGeoJson('');

      // Navigate to field list
      navigate('/fields');
    } catch (error) {
      console.error('Error creating field:', error);
      toast.error('Помилка при створенні поля. Спробуйте ще раз.');
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-start py-8 px-2">
      <div className="w-full max-w-7xl space-y-8">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl shadow-md flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl font-extrabold text-green-700 dark:text-green-200 tracking-tight">
            Додати нове поле
          </h1>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/fields')}
            className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Назад
          </Button>
        </header>

        {/* Main Content - Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Form */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 lg:col-span-1">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
                  Інформація про поле
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Заповніть форму нижче, щоб додати нове поле до вашої ферми.
                </p>
              </div>

              <FieldForm
                onSubmit={handleFormSubmit}
                onBoundaryChange={handleBoundaryChange}
                boundaryGeoJson={boundaryGeoJson}
                isSubmitting={createFieldMutation.isPending}
              />
            </div>
          </section>

          {/* Right Side - Interactive Map */}
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 lg:col-span-2">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
                  Межі поля
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Використовуйте інструменти карти для позначення меж вашого
                  поля.
                </p>
              </div>

              {/* Map Instructions */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Інструкції:
                </h3>
                <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                  <li>
                    • Натисніть на іконку многокутника для малювання меж поля
                  </li>
                  <li>• Клікайте на карті, щоб створити точки межі</li>
                  <li>• Подвійний клік для завершення малювання</li>
                  <li>
                    • Використовуйте інструменти редагування для коригування
                  </li>
                </ul>
              </div>

              <FieldMapEditor
                onBoundaryChange={handleBoundaryChange}
                initialBoundary={boundaryGeoJson}
                center={[49.0, 32.0]} // Ukraine coordinates
                zoom={6}
              />

              {/* Boundary Status */}
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-3 h-3 rounded-full ${boundaryGeoJson ? 'bg-green-500' : 'bg-gray-300'}`}
                />
                <span
                  className={
                    boundaryGeoJson
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500'
                  }
                >
                  {boundaryGeoJson
                    ? 'Межі поля визначено'
                    : 'Межі поля не визначено'}
                </span>
              </div>
            </div>
          </section>
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
