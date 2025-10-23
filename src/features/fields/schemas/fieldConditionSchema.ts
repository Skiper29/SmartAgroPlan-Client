import * as z from 'zod';

/**
 * Zod validation schema for the field condition form.
 */
export const fieldConditionSchema = z.object({
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

/**
 * Type inferred from the fieldConditionSchema for form data.
 */
export type FieldConditionFormData = z.infer<typeof fieldConditionSchema>;
