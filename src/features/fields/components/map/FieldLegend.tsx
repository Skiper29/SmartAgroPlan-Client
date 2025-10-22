import { FieldTypeLabels } from '@/models/field/field.model';
import { getAllFieldColors } from '@/utils/fieldColors';

const FieldLegend = () => {
  const fieldColors = getAllFieldColors();

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border border-gray-200 dark:border-gray-700">
      <h4 className="font-semibold text-sm mb-3 text-gray-900 dark:text-white">
        Field Types
      </h4>
      <div className="space-y-2">
        {fieldColors.map(({ type, config }) => (
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
              {FieldTypeLabels[type]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FieldLegend;
