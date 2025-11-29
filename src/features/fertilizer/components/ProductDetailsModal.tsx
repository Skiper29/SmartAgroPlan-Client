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
import {
  getNutrientNameUA,
  getNutrientContainerClasses,
} from '@/features/fertilizer/utils/fertilizerUtils.ts';

interface ProductDetailsModalProps {
  product: FertilizerProduct | null;
  isOpen: boolean;
  onClose: () => void;
  quantityKgPerHa?: number;
  totalQuantityKg?: number;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  isOpen,
  onClose,
  quantityKgPerHa,
  totalQuantityKg,
}) => {
  if (!product) return null;

  const mainNutrients = [
    {
      label: getNutrientNameUA('nitrogen'),
      value: product.nitrogenContent,
      variant: 'N' as const,
    },
    {
      label: getNutrientNameUA('phosphorus'),
      value: product.phosphorusContent,
      variant: 'P' as const,
    },
    {
      label: getNutrientNameUA('potassium'),
      value: product.potassiumContent,
      variant: 'K' as const,
    },
  ];

  const secondaryNutrients = [
    {
      label: getNutrientNameUA('sulfur'),
      value: product.sulfurContent,
    },
    {
      label: getNutrientNameUA('calcium'),
      value: product.calciumContent,
    },
    {
      label: getNutrientNameUA('magnesium'),
      value: product.magnesiumContent,
    },
  ];

  const micronutrients = [
    { label: getNutrientNameUA('iron'), value: product.ironContent },
    { label: getNutrientNameUA('zinc'), value: product.zincContent },
    { label: getNutrientNameUA('boron'), value: product.boronContent },
    { label: getNutrientNameUA('manganese'), value: product.manganeseContent },
    { label: getNutrientNameUA('copper'), value: product.copperContent },
    {
      label: getNutrientNameUA('molybdenum'),
      value: product.molybdenumContent,
    },
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

          {/* Quantity Information */}
          {(quantityKgPerHa !== undefined || totalQuantityKg !== undefined) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quantityKgPerHa !== undefined && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Норма внесення на га
                  </p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {quantityKgPerHa.toFixed(2)} кг/га
                  </p>
                </div>
              )}
              {totalQuantityKg !== undefined && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg p-4 border border-amber-200 dark:border-amber-800">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Загальна кількість
                  </p>
                  <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                    {totalQuantityKg.toFixed(2)} кг
                  </p>
                </div>
              )}
            </div>
          )}

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
                  className={getNutrientContainerClasses(nutrient.variant)}
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
                      className={getNutrientContainerClasses('secondary')}
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
                      className={getNutrientContainerClasses('micro')}
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
