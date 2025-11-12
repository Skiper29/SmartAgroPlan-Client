import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Package, Beaker, Factory, Info } from 'lucide-react';
import {
  FertilizerTypeLabels,
  ProductFormLabels,
  type FertilizerProduct,
} from '@/models/fertilizer/fertilizer-product.model';

interface ProductDetailsModalProps {
  product: FertilizerProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  if (!product) return null;

  const mainNutrients = [
    { label: 'Азот (N)', value: product.nitrogenContent, color: 'blue' },
    { label: 'Фосфор (P)', value: product.phosphorusContent, color: 'orange' },
    { label: 'Калій (K)', value: product.potassiumContent, color: 'purple' },
  ];

  const secondaryNutrients = [
    { label: 'Сірка (S)', value: product.sulfurContent },
    { label: 'Кальцій (Ca)', value: product.calciumContent },
    { label: 'Магній (Mg)', value: product.magnesiumContent },
  ];

  const micronutrients = [
    { label: 'Залізо (Fe)', value: product.ironContent },
    { label: 'Цинк (Zn)', value: product.zincContent },
    { label: 'Бор (B)', value: product.boronContent },
    { label: 'Марганець (Mn)', value: product.manganeseContent },
    { label: 'Мідь (Cu)', value: product.copperContent },
    { label: 'Молібден (Mo)', value: product.molybdenumContent },
  ];

  const hasSecondaryNutrients = secondaryNutrients.some(
    (n) => n.value && n.value > 0,
  );
  const hasMicronutrients = micronutrients.some((n) => n.value && n.value > 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Package className="h-6 w-6 text-primary" />
            {product.name}
          </DialogTitle>
          <DialogDescription>Детальна інформація про добриво</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Type and Form */}
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-3">
              {FertilizerTypeLabels[product.type]}
            </Badge>
            <Badge variant="outline" className="text-sm py-1 px-3">
              {ProductFormLabels[product.form]}
            </Badge>
          </div>

          {/* Main Nutrients NPK */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
              <Beaker className="h-5 w-5 text-primary" />
              Основні поживні речовини
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mainNutrients.map((nutrient) => (
                <div
                  key={nutrient.label}
                  className={`bg-gradient-to-br ${
                    nutrient.color === 'blue'
                      ? 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 border-blue-300 dark:border-blue-700'
                      : nutrient.color === 'orange'
                        ? 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 border-orange-300 dark:border-orange-700'
                        : 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 border-purple-300 dark:border-purple-700'
                  } rounded-lg p-4 border-2`}
                >
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {nutrient.label}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {nutrient.value}%
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Nutrients */}
          {hasSecondaryNutrients && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Beaker className="h-5 w-5 text-primary" />
                Вторинні поживні речовини
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {secondaryNutrients
                  .filter((n) => n.value && n.value > 0)
                  .map((nutrient) => (
                    <div
                      key={nutrient.label}
                      className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/30 rounded-lg p-3 border border-teal-200 dark:border-teal-800"
                    >
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {nutrient.label}
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {nutrient.value}%
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Micronutrients */}
          {hasMicronutrients && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Beaker className="h-5 w-5 text-primary" />
                Мікроелементи
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {micronutrients
                  .filter((n) => n.value && n.value > 0)
                  .map((nutrient) => (
                    <div
                      key={nutrient.label}
                      className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/30 rounded-lg p-3 border border-amber-200 dark:border-amber-800"
                    >
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {nutrient.label}
                      </p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {nutrient.value}%
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Manufacturer */}
          {product.manufacturer && (
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-2">
                <Factory className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Виробник
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-gray-100 mt-1">
                    {product.manufacturer}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                    Опис
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsModal;
