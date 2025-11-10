import type { NutrientRequirement } from './nutrient-requirement.model';
import type { FertilizerProduct } from './fertilizer-product.model';

export const ApplicationMethod = {
  Broadcasting: 'Broadcasting',
  Fertigation: 'Fertigation',
  FoliarApplication: 'Foliar Application',
  Injection: 'Injection',
  TopDressing: 'Top Dressing',
  Banding: 'Banding',
  SideDressing: 'Side Dressing',
} as const;

export type ApplicationMethod =
  (typeof ApplicationMethod)[keyof typeof ApplicationMethod];

export const ApplicationMethodLabels: Record<ApplicationMethod, string> = {
  [ApplicationMethod.Broadcasting]: 'Розкидання',
  [ApplicationMethod.Fertigation]: 'Фертигація',
  [ApplicationMethod.FoliarApplication]: 'Листкове внесення',
  [ApplicationMethod.Injection]: "Ін'єкція в ґрунт",
  [ApplicationMethod.TopDressing]: 'Поверхневе підживлення',
  [ApplicationMethod.Banding]: 'Стрічкове внесення',
  [ApplicationMethod.SideDressing]: 'Підкормка біля рядків',
};

export const CropStage = {
  Germination: 'Germination',
  Vegetative: 'Vegetative',
  Tillering: 'Tillering',
  StemExtension: 'Stem Extension',
  Heading: 'Heading',
  Flowering: 'Flowering',
  GrainFilling: 'Grain Filling',
  Maturity: 'Maturity',
} as const;

export type CropStage = (typeof CropStage)[keyof typeof CropStage];

export const CropStageLabels: Record<CropStage, string> = {
  [CropStage.Germination]: 'Проростання',
  [CropStage.Vegetative]: 'Вегетація',
  [CropStage.Tillering]: 'Кущення',
  [CropStage.StemExtension]: 'Вихід у трубку',
  [CropStage.Heading]: 'Колосіння',
  [CropStage.Flowering]: 'Цвітіння',
  [CropStage.GrainFilling]: 'Наливання зерна',
  [CropStage.Maturity]: 'Дозрівання',
};

export interface FertilizerApplication {
  id: number | null;
  recommendedDate: string;
  cropStage: CropStage | string;
  daysAfterPlanting: number;
  nutrientsToApply: NutrientRequirement;
  products: FertilizerProduct[];
  applicationMethod: ApplicationMethod | string;
  rationale: string;
  weatherConsiderations?: string;
  warnings?: string | null;
  isCompleted: boolean;
  actualApplicationDate?: string | null;
}
