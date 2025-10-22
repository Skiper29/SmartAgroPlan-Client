import React from 'react';
import FieldMapEditor from '../map-editor/FieldMapEditor';

interface FieldMapSectionProps {
  title: string;
  description: string;
  onBoundaryChange: (geoJson: string) => void;
  initialBoundary: string;
  boundaryGeoJson: string;
  center?: [number, number];
  zoom?: number;
  isEdit?: boolean;
}

const FieldMapSection: React.FC<FieldMapSectionProps> = ({
  title,
  description,
  onBoundaryChange,
  initialBoundary,
  boundaryGeoJson,
  center = [49.0, 32.0],
  zoom = 6,
  isEdit = false,
}) => {
  return (
    <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-8 lg:col-span-2">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-green-800 dark:text-green-200">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>

        {/* Map Instructions */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 dark:text-blue-200 mb-2">
            Інструкції:
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            {isEdit ? (
              <>
                <li>
                  • Використовуйте інструмент редагування для зміни існуючих меж
                </li>
                <li>• Перетягуйте вершини для коригування форми поля</li>
                <li>
                  • Натисніть на іконку видалення для повного перемалювання
                </li>
                <li>
                  • Натисніть на іконку многокутника для створення нових меж
                </li>
              </>
            ) : (
              <>
                <li>
                  • Натисніть на іконку многокутника для малювання меж поля
                </li>
                <li>• Клікайте на карті, щоб створити точки межі</li>
                <li>• Подвійний клік для завершення малювання</li>
                <li>
                  • Використовуйте інструменти редагування для коригування
                </li>
              </>
            )}
          </ul>
        </div>

        <FieldMapEditor
          onBoundaryChange={onBoundaryChange}
          initialBoundary={initialBoundary}
          center={center}
          zoom={zoom}
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
            {boundaryGeoJson ? 'Межі поля визначено' : 'Межі поля не визначено'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default FieldMapSection;
