import React, { useEffect, useState } from 'react';
import {
  useForm,
  Controller,
  type UseFormRegister,
  type FieldErrors,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import type { FieldConditionCreate } from '@/models/field/field-condition.model.ts';
import {
  useCreateFieldCondition,
  useFieldConditions,
} from '../../hooks/fieldConditions.hooks';
import type { LucideIcon } from 'lucide-react';
import { type ApiError, extractErrorMessage } from '@/types/api-error.type.ts';

// --- Zod Schema ---
const fieldConditionSchema = z.object({
  fieldId: z.number().int().positive('Field ID is required'),
  recordedAt: z.date().optional().nullable(),
  soilMoisture: z.number().min(0).max(100).optional().nullable(),
  soilPh: z.number().min(0).max(14).optional().nullable(),
  nitrogen: z.number().min(0).optional().nullable(),
  phosphorus: z.number().min(0).optional().nullable(),
  potassium: z.number().min(0).optional().nullable(),
  sulfur: z.number().min(0).optional().nullable(),
  calcium: z.number().min(0).optional().nullable(),
  magnesium: z.number().min(0).optional().nullable(),
  temperature: z.number().optional().nullable(),
  rainfall: z.number().min(0).optional().nullable(),
  notes: z.string().max(500, 'Notes are too long').optional().nullable(),
});

type FieldConditionFormData = z.infer<typeof fieldConditionSchema>;

// --- Component Props (no changes needed) ---
interface AddFieldConditionModalProps {
  fieldId: number;
  fieldName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

// --- Helper Component Props Interface ---
interface FormInputProps {
  label: string;
  id: keyof FieldConditionFormData; // Use keys from the form data type
  register: UseFormRegister<FieldConditionFormData>;
  errors: FieldErrors<FieldConditionFormData>;
  type?: React.HTMLInputTypeAttribute; // Use standard HTML input types
  unit?: string;
  icon?: LucideIcon; // Type the icon prop
  step?: number | string;
}

// --- Helper Component for Inputs (Typed Props) ---
const FormInput: React.FC<FormInputProps> = ({
  label,
  id,
  register,
  errors,
  type = 'number',
  unit,
  icon: Icon,
  step,
}) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-sm flex items-center gap-1">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      {label}{' '}
      {unit && <span className="text-xs text-muted-foreground">({unit})</span>}
    </Label>
    <Input
      id={id}
      type={type}
      step={type === 'number' ? (step !== undefined ? step : 'any') : undefined}
      {...register(id, {
        valueAsNumber: type === 'number',
        setValueAs: (value) => {
          if (value === '' || value === null || value === undefined)
            return null;
          if (type === 'number') {
            const num = Number(value);
            return isNaN(num) ? null : num;
          }
          return value;
        },
      })}
      className={errors[id] ? 'border-red-500' : ''}
    />
    {errors[id] && (
      <p className="text-xs text-red-500">{errors[id]?.message?.toString()}</p>
    )}
  </div>
);

// --- Main Modal Component ---
const AddFieldConditionModal: React.FC<AddFieldConditionModalProps> = ({
  fieldId,
  fieldName,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const createMutation = useCreateFieldCondition();
  // Fetch existing conditions for pre-filling
  const { data: existingConditions, isLoading: isLoadingConditions } =
    useFieldConditions(fieldId);

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
  useEffect(() => {
    if (isOpen && existingConditions && existingConditions.length > 0) {
      // Find the most recent record
      const sortedConditions = [...existingConditions].sort(
        (a, b) =>
          new Date(b.recordedAt).getTime() - new Date(a.recordedAt).getTime(),
      );
      const latestCondition = sortedConditions[0];

      // Reset the form with the latest data
      reset({
        fieldId: fieldId,
        // Ensure date is a Date object for the calendar
        recordedAt: latestCondition.recordedAt
          ? new Date(latestCondition.recordedAt)
          : new Date(),
        // Use nullish coalescing for optional fields
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
      setLatestRecordDate(new Date(latestCondition.recordedAt)); // Store the date for display
    } else if (isOpen) {
      // Reset to default if no existing conditions or modal just opened without data yet
      reset({
        fieldId: fieldId,
        recordedAt: new Date(),
        // ... reset other fields to null/empty
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
      setLatestRecordDate(null); // Clear the previous record date display
    }
  }, [isOpen, existingConditions, fieldId, reset]); // Rerun when modal opens or data loads

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
        notes: data.notes || null, // Ensure empty string becomes null if needed by backend
      };

      await createMutation.mutateAsync(apiData);
      toast.success('Дані про стан поля додано!');
      // Don't reset here immediately, let handleClose do it
      onSuccess?.();
      onClose(); // Trigger handleClose which includes reset
    } catch (error: unknown) {
      // Use unknown for catch block
      const apiError = error as ApiError; // Type assertion after checking
      console.error('Error adding field condition:', error);
      toast.error(
        `Помилка: ${extractErrorMessage(apiError) || 'Не вдалося додати дані.'}`,
      );
    }
  };

  // Close modal and reset form state to defaults for next open
  const handleClose = () => {
    reset({
      // Reset explicitly to defaults, not last filled data
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
    setLatestRecordDate(null); // Clear display state
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Додати дані про стан поля "{fieldName}"</DialogTitle>
          <DialogDescription>
            Введіть показники стану ґрунту та погоди для цього поля.
            {/* Display date of the data used for pre-filling */}
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
        </DialogHeader>

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
              <p className="text-xs text-red-500">
                {errors.recordedAt.message}
              </p>
            )}
          </div>

          {/* Grid for numerical inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormInput
              label="Вологість ґрунту"
              id="soilMoisture"
              unit="м³/м³"
              register={register}
              errors={errors}
              icon={Droplets}
              step={0.01}
            />
            <FormInput
              label="pH ґрунту"
              id="soilPh"
              register={register}
              errors={errors}
              icon={FlaskConical}
              step={0.1}
            />
            <FormInput
              label="Азот (N)"
              id="nitrogen"
              unit="кг/га"
              register={register}
              errors={errors}
              icon={Zap}
              step={1}
            />
            <FormInput
              label="Фосфор (P)"
              id="phosphorus"
              unit="кг/га"
              register={register}
              errors={errors}
              icon={Beaker}
              step={1}
            />
            <FormInput
              label="Калій (K)"
              id="potassium"
              unit="кг/га"
              register={register}
              errors={errors}
              icon={Beaker}
              step={1}
            />
            <FormInput
              label="Сірка (S)"
              id="sulfur"
              unit="кг/га"
              register={register}
              errors={errors}
              icon={Beaker}
              step={1}
            />
            <FormInput
              label="Кальцій (Ca)"
              id="calcium"
              unit="кг/га"
              register={register}
              errors={errors}
              icon={Beaker}
              step={1}
            />
            <FormInput
              label="Магній (Mg)"
              id="magnesium"
              unit="кг/га"
              register={register}
              errors={errors}
              icon={Beaker}
              step={1}
            />
            <FormInput
              label="Температура"
              id="temperature"
              unit="°C"
              register={register}
              errors={errors}
              icon={Thermometer}
              step={0.1}
            />
            <FormInput
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
              onClick={handleClose} // Use the new handler
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
      </DialogContent>
    </Dialog>
  );
};

export default AddFieldConditionModal;
