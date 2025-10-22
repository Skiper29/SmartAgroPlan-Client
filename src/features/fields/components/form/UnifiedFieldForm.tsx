import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fieldFormSchema } from '../../schemas/fieldFormSchema';
import type { FieldFormData } from '../../schemas/fieldFormSchema';
import FieldNameInput from './FieldNameInput';
import FieldLocationInput from './FieldLocationInput';
import FieldTypeSelectField from './FieldTypeSelectField';
import CropSelectField from './CropSelectField';
import SowingDatePicker from './SowingDatePicker';
import SoilSelectField from './SoilSelectField';
import FieldFormSubmitButton from './FieldFormSubmitButton';

interface UnifiedFieldFormProps {
  onSubmit: (data: FieldFormData) => void;
  boundaryGeoJson: string;
  isSubmitting?: boolean;
  isEdit?: boolean;
  defaultValues?: FieldFormData;
}

const UnifiedFieldForm: React.FC<UnifiedFieldFormProps> = ({
  onSubmit,
  boundaryGeoJson,
  isSubmitting = false,
  isEdit = false,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<FieldFormData>({
    resolver: zodResolver(fieldFormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: defaultValues,
  });

  // Update form when default values change (for edit mode)
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  // Update boundary in form when it changes from map
  useEffect(() => {
    if (boundaryGeoJson) {
      setValue('boundaryGeoJson', boundaryGeoJson, { shouldValidate: true });
    }
  }, [boundaryGeoJson, setValue]);

  const handleClearError = (field: keyof FieldFormData) => {
    clearErrors(field);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldNameInput register={register} errors={errors} />

      <FieldLocationInput register={register} />

      <FieldTypeSelectField
        control={control}
        errors={errors}
        onClearError={handleClearError}
      />

      <CropSelectField
        watch={watch}
        setValue={setValue}
        errors={errors}
        onClearError={handleClearError}
      />

      <SowingDatePicker
        watch={watch}
        setValue={setValue}
        errors={errors}
        onClearError={handleClearError}
      />

      <SoilSelectField
        watch={watch}
        setValue={setValue}
        errors={errors}
        onClearError={handleClearError}
      />

      {/* Hidden field for boundary */}
      <input type="hidden" {...register('boundaryGeoJson')} />
      {errors.boundaryGeoJson && (
        <p className="text-sm text-red-500">{errors.boundaryGeoJson.message}</p>
      )}

      <FieldFormSubmitButton isSubmitting={isSubmitting} isEdit={isEdit} />
    </form>
  );
};

export default UnifiedFieldForm;
