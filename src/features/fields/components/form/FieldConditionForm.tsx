import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fieldConditionSchema,
  type FieldConditionFormData,
} from '../../schemas/fieldConditionSchema';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { DateTimePicker } from '@/components/ui/date-time-picker';
import {
  Droplets,
  Thermometer,
  FlaskConical,
  Beaker,
  Zap,
  Info,
  CloudRain,
} from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import { toast } from 'react-toastify';
import type {
  FieldConditionCreate,
  FieldCondition,
} from '@/models/field/field-condition.model.ts';
import { useCreateFieldCondition } from '../../hooks/fieldConditions.hooks';
import { type ApiError, extractErrorMessage } from '@/types/api-error.type.ts';
import { FormInput } from './FormInput';
import { DialogDescription, DialogFooter } from '@/components/ui/dialog';

interface FieldConditionFormProps {
  fieldId: number;
  existingConditions?: FieldCondition[];
  isLoadingConditions: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const FieldConditionForm: React.FC<FieldConditionFormProps> = ({
  fieldId,
  existingConditions,
  isLoadingConditions,
  onClose,
  onSuccess,
}) => {
  const createMutation = useCreateFieldCondition();
  const [latestRecordDate, setLatestRecordDate] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldConditionFormData>({
    resolver: zodResolver(fieldConditionSchema),
    defaultValues: {
      fieldId: fieldId,
      recordedAt: new Date(),
      soilMoisture: null,
      soilPh: null,
      nitrogen: null,
      phosphorus: null,
      potassium: null,
      sulfur: null,
      calcium: null,
      magnesium: null,
      temperature: null,
      rainfall: null,
      notes: '',
    },
  });

  // Effect to pre-fill form with the latest data
  // This runs when the component mounts (i.e., when modal opens) and data arrives
  useEffect(() => {
    if (existingConditions && existingConditions.length > 0) {
      const sortedConditions = [...existingConditions].sort(
        (a, b) =>
          new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
      );
      const latestCondition = sortedConditions[0];

      reset({
        fieldId: fieldId,
        recordedAt: latestCondition.recordedAt
          ? new Date(latestCondition.recordedAt)
          : new Date(),
        soilMoisture: latestCondition.soilMoisture ?? null,
        soilPh: latestCondition.soilPh ?? null,
        nitrogen: latestCondition.nitrogen ?? null,
        phosphorus: latestCondition.phosphorus ?? null,
        potassium: latestCondition.potassium ?? null,
        sulfur: latestCondition.sulfur ?? null,
        calcium: latestCondition.calcium ?? null,
        magnesium: latestCondition.magnesium ?? null,
        temperature: latestCondition.temperature ?? null,
        rainfall: latestCondition.rainfall ?? null,
        notes: latestCondition.notes ?? '',
      });
      setLatestRecordDate(new Date(latestCondition.recordedAt));
    } else {
      // Reset to default if no existing conditions
      reset({
        fieldId: fieldId,
        recordedAt: new Date(),
        soilMoisture: null,
        soilPh: null,
        nitrogen: null,
        phosphorus: null,
        potassium: null,
        sulfur: null,
        calcium: null,
        magnesium: null,
        temperature: null,
        rainfall: null,
        notes: '',
      });
      setLatestRecordDate(null);
    }
  }, [existingConditions, fieldId, reset]);

  const onSubmit = async (data: FieldConditionFormData) => {
    try {
      const apiData: FieldConditionCreate = {
        ...data,
        recordedAt: data.recordedAt || new Date(),
        soilMoisture: data.soilMoisture ? Number(data.soilMoisture) : null,
        soilPh: data.soilPh ? Number(data.soilPh) : null,
        nitrogen: data.nitrogen ? Number(data.nitrogen) : null,
        phosphorus: data.phosphorus ? Number(data.phosphorus) : null,
        potassium: data.potassium ? Number(data.potassium) : null,
        sulfur: data.sulfur ? Number(data.sulfur) : null,
        calcium: data.calcium ? Number(data.calcium) : null,
        magnesium: data.magnesium ? Number(data.magnesium) : null,
        temperature: data.temperature ? Number(data.temperature) : null,
        rainfall: data.rainfall ? Number(data.rainfall) : null,
        notes: data.notes || null,
      };

      await createMutation.mutateAsync(apiData);
      toast.success('Дані про стан поля додано!');
      onSuccess?.();
      onClose(); // Trigger modal close
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('Error adding field condition:', error);
      toast.error(
        `Помилка: ${extractErrorMessage(apiError) || 'Не вдалося додати дані.'}`,
      );
    }
  };

  // This component's "cancel" handler
  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <DialogDescription>
        Введіть показники стану ґрунту та погоди для цього поля.
        {latestRecordDate && (
          <span className="mt-1 flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
            <Info size={14} />
            Форма попередньо заповнена даними від:{' '}
            {format(latestRecordDate, 'PPP HH:mm', { locale: uk })}
          </span>
        )}
        {isLoadingConditions && !latestRecordDate && (
          <span className="mt-1 block text-xs text-muted-foreground">
            Завантаження попередніх даних...
          </span>
        )}
      </DialogDescription>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
      >
        {/* Recorded At Date Picker */}
        <div className="space-y-1">
          <Label htmlFor="recordedAt" className="text-sm">
            Дата запису
          </Label>
          <Controller
            name="recordedAt"
            control={control}
            render={({ field }) => (
              <DateTimePicker
                date={field.value ?? undefined}
                onDateChange={field.onChange}
                disabled={(date) => date > new Date()}
                placeholder="Оберіть дату та час"
                error={!!errors.recordedAt}
                modal={true}
              />
            )}
          />
          {errors.recordedAt && (
            <p className="text-xs text-red-500">{errors.recordedAt.message}</p>
          )}
        </div>

        {/* Grid for numerical inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FormInput<FieldConditionFormData>
            label="Вологість ґрунту"
            id="soilMoisture"
            unit="м³/м³"
            register={register}
            errors={errors}
            icon={Droplets}
            step={0.01}
          />
          <FormInput<FieldConditionFormData>
            label="pH ґрунту"
            id="soilPh"
            register={register}
            errors={errors}
            icon={FlaskConical}
            step={0.1}
          />
          <FormInput<FieldConditionFormData>
            label="Азот (N)"
            id="nitrogen"
            unit="кг/га"
            register={register}
            errors={errors}
            icon={Zap}
            step={1}
          />
          <FormInput<FieldConditionFormData>
            label="Фосфор (P)"
            id="phosphorus"
            unit="кг/га"
            register={register}
            errors={errors}
            icon={Beaker}
            step={1}
          />
          <FormInput<FieldConditionFormData>
            label="Калій (K)"
            id="potassium"
            unit="кг/га"
            register={register}
            errors={errors}
            icon={Beaker}
            step={1}
          />
          <FormInput<FieldConditionFormData>
            label="Сірка (S)"
            id="sulfur"
            unit="кг/га"
            register={register}
            errors={errors}
            icon={Beaker}
            step={1}
          />
          <FormInput<FieldConditionFormData>
            label="Кальцій (Ca)"
            id="calcium"
            unit="кг/га"
            register={register}
            errors={errors}
            icon={Beaker}
            step={1}
          />
          <FormInput<FieldConditionFormData>
            label="Магній (Mg)"
            id="magnesium"
            unit="кг/га"
            register={register}
            errors={errors}
            icon={Beaker}
            step={1}
          />
          <FormInput<FieldConditionFormData>
            label="Температура"
            id="temperature"
            unit="°C"
            register={register}
            errors={errors}
            icon={Thermometer}
            step={0.1}
          />
          <FormInput<FieldConditionFormData>
            label="Опади"
            id="rainfall"
            unit="мм"
            register={register}
            errors={errors}
            icon={CloudRain}
            step={0.5}
          />
        </div>

        {/* Notes Textarea */}
        <div className="space-y-1 col-span-1 md:col-span-2 lg:col-span-3">
          <Label htmlFor="notes" className="text-sm">
            Нотатки
          </Label>
          <Textarea
            id="notes"
            {...register('notes')}
            placeholder="Додаткова інформація (спостереження, проведені роботи тощо)..."
            className={errors.notes ? 'border-red-500' : ''}
            rows={3}
          />
          {errors.notes && (
            <p className="text-xs text-red-500">
              {errors.notes.message?.toString()}
            </p>
          )}
        </div>

        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={createMutation.isPending}
          >
            Скасувати
          </Button>
          <Button
            type="submit"
            disabled={createMutation.isPending || isLoadingConditions}
          >
            {createMutation.isPending ? 'Збереження...' : 'Зберегти дані'}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
};
