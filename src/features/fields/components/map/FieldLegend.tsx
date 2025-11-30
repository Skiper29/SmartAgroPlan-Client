import { FieldTypeLabels } from '@/models/field/field.model';
import { CropTypeLabels } from '@/models/crop/crop.model';
import { getAllFieldColors, getAllCropColors } from '@/utils/fieldColors';

interface FieldLegendProps {
  colorBy: 'fieldType' | 'cropType';
}

const FieldLegend = ({ colorBy }: FieldLegendProps) => {
  const fieldColors = getAllFieldColors();
  const cropColors = getAllCropColors();

  const isFieldType = colorBy === 'fieldType';
  const colors = isFieldType ? fieldColors : cropColors;
  const labels = isFieldType ? FieldTypeLabels : CropTypeLabels;
  const title = isFieldType ? 'Типи полів' : 'Типи культур';

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-200px)] overflow-y-auto">
      <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">
        {title}
      </h4>
      <div className="space-y-2">
        {colors.map(({ type, config }) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded border flex-shrink-0"
              style={{
                backgroundColor: config.fillColor,
                borderColor: config.color,
                borderWidth: '1px',
              }}
            />
            <span className="text-xs text-gray-700 dark:text-gray-300">
              {labels[type as keyof typeof labels]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldLegend;
