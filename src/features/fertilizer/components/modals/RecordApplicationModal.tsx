import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  CheckCircle2,
  Calendar,
  Thermometer,
  Wind,
  Droplets,
  Package,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { FertilizerApplication } from '@/models/fertilizer';
import type { RecordApplicationRequest } from '@/models/fertilizer/record-application.model';
import { formatDateLong } from '../../utils/fertilizerUtils';
import { cn } from '@/lib/utils';

interface RecordApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: FertilizerApplication;
  fieldId: number;
  onSubmit: (data: RecordApplicationRequest) => void;
  isSubmitting?: boolean;
}

const RecordApplicationModal: React.FC<RecordApplicationModalProps> = ({
  isOpen,
  onClose,
  application,
  fieldId,
  onSubmit,
  isSubmitting = false,
}) => {
  // Form state
  const [applicationDate, setApplicationDate] = useState<string>('');
  const [productsUsed, setProductsUsed] = useState<Record<number, number>>({});
  const [notes, setNotes] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [windSpeed, setWindSpeed] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with application data
  useEffect(() => {
    if (isOpen && application) {
      // Set current date/time as default
      const now = new Date();
      setApplicationDate(
        now.toISOString().slice(0, 16), // Format for datetime-local input
      );

      // Initialize products with planned quantities
      const initialProducts: Record<number, number> = {};
      if (application.products) {
        application.products.forEach((product) => {
          initialProducts[product.product.id] = product.totalQuantityKg.toFixed(
            2,
          ) as unknown as number;
        });
      }
      setProductsUsed(initialProducts);

      // Reset other fields
      setNotes('');
      setTemperature('');
      setWindSpeed('');
      setHumidity('');
      setErrors({});
    }
  }, [isOpen, application]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!applicationDate) {
      newErrors.applicationDate = "Дата обов'язкова";
    }

    if (Object.keys(productsUsed).length === 0) {
      newErrors.products = 'Додайте хоча б один продукт';
    }

    // Validate product quantities
    Object.entries(productsUsed).forEach(([productId, quantity]) => {
      if (quantity <= 0) {
        newErrors[`product_${productId}`] = 'Кількість має бути більше 0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const data: RecordApplicationRequest = {
      fieldId,
      applicationDate: new Date(applicationDate).toISOString(),
      applicationMethodId: 1, // Default method, can be made configurable
      productsUsed,
      applicationPlanId: application.id,
      notes: notes.trim() || null,
      temperature: temperature ? parseFloat(temperature) : null,
      windSpeed: windSpeed ? parseFloat(windSpeed) : null,
      humidity: humidity ? parseFloat(humidity) : null,
    };

    onSubmit(data);
  };

  const handleProductQuantityChange = (productId: number, value: string) => {
    const quantity = parseFloat(value);
    if (!isNaN(quantity)) {
      setProductsUsed((prev) => ({ ...prev, [productId]: quantity }));
    } else {
      setProductsUsed((prev) => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
            Записати внесення добрив
          </DialogTitle>
          <DialogDescription className="text-base">
            Заповніть фактичні дані про внесення добрив для запису в історію
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Planned Application Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Запланований запис
            </h3>
            <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
              <p>
                <span className="font-medium">Дата:</span>{' '}
                {formatDateLong(application.recommendedDate)}
              </p>
              <p>
                <span className="font-medium">Етап:</span>{' '}
                {application.cropStage}
              </p>
            </div>
          </div>

          {/* Application Date */}
          <div className="space-y-2">
            <Label
              htmlFor="applicationDate"
              className="text-base font-semibold"
            >
              Фактична дата внесення *
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="applicationDate"
                type="datetime-local"
                value={applicationDate}
                onChange={(e) => setApplicationDate(e.target.value)}
                className={cn(
                  'pl-10 text-base',
                  errors.applicationDate && 'border-red-500',
                )}
              />
            </div>
            {errors.applicationDate && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.applicationDate}
              </p>
            )}
          </div>

          {/* Products */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Фактично використані добрива *
            </Label>
            <div className="space-y-3">
              {application.products && application.products.length > 0 ? (
                application.products.map((product) => (
                  <div
                    key={product.product.id}
                    className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-purple-900 dark:text-purple-100">
                          {product.product.name}
                        </p>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          NPK: {product.product.nitrogenContent}-
                          {product.product.phosphorusContent}-
                          {product.product.potassiumContent}
                        </p>
                      </div>
                      <div className="w-32">
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            step="0.1"
                            min="0"
                            value={productsUsed[product.product.id] || ''}
                            onChange={(e) =>
                              handleProductQuantityChange(
                                product.product.id,
                                e.target.value,
                              )
                            }
                            placeholder="0.0"
                            className={cn(
                              'text-right',
                              errors[`product_${product.product.id}`] &&
                                'border-red-500',
                            )}
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                            кг/га
                          </span>
                        </div>
                        {errors[`product_${product.product.id}`] && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors[`product_${product.product.id}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  Немає запланованих продуктів
                </p>
              )}
            </div>
            {errors.products && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.products}
              </p>
            )}
          </div>

          {/* Weather Conditions */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              Погодні умови (опціонально)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Temperature */}
              <div className="space-y-2">
                <Label
                  htmlFor="temperature"
                  className="text-sm flex items-center gap-1"
                >
                  <Thermometer className="h-3 w-3" />
                  Температура
                </Label>
                <div className="flex items-center gap-1">
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="20"
                    className="text-right"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    °C
                  </span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="space-y-2">
                <Label
                  htmlFor="windSpeed"
                  className="text-sm flex items-center gap-1"
                >
                  <Wind className="h-3 w-3" />
                  Швидкість вітру
                </Label>
                <div className="flex items-center gap-1">
                  <Input
                    id="windSpeed"
                    type="number"
                    step="0.1"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(e.target.value)}
                    placeholder="5"
                    className="text-right"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    км/год
                  </span>
                </div>
              </div>

              {/* Humidity */}
              <div className="space-y-2">
                <Label
                  htmlFor="humidity"
                  className="text-sm flex items-center gap-1"
                >
                  <Droplets className="h-3 w-3" />
                  Вологість
                </Label>
                <div className="flex items-center gap-1">
                  <Input
                    id="humidity"
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    placeholder="60"
                    className="text-right"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-base font-semibold">
              Примітки (опціонально)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Додаткова інформація про внесення (особливості, спостереження, тощо)"
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Скасувати
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Збереження...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Зберегти запис
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecordApplicationModal;
