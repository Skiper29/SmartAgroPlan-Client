export const FertilizerType = {
  Nitrogen: 'Nitrogen',
  Phosphorus: 'Phosphorus',
  Potassium: 'Potassium',
  NPK: 'NPK',
  Organic: 'Organic',
  Micronutrient: 'Micronutrient',
  Lime: 'Lime',
  Sulfur: 'Sulfur',
  Calcium: 'Calcium',
  Magnesium: 'Magnesium',
  SlowRelease: 'SlowRelease',
  Liquid: 'Liquid',
  Foliar: 'Foliar',
} as const;

export type FertilizerType =
  (typeof FertilizerType)[keyof typeof FertilizerType];

export const FertilizerTypeLabels: Record<FertilizerType, string> = {
  [FertilizerType.Nitrogen]: 'Азотні',
  [FertilizerType.Phosphorus]: 'Фосфорні',
  [FertilizerType.Potassium]: 'Калійні',
  [FertilizerType.NPK]: 'Комплексні NPK',
  [FertilizerType.Organic]: 'Органічні',
  [FertilizerType.Micronutrient]: 'Мікродобрива',
  [FertilizerType.Lime]: 'Вапнякові',
  [FertilizerType.Sulfur]: 'Сірчані',
  [FertilizerType.Calcium]: 'Кальцієві',
  [FertilizerType.Magnesium]: 'Магнієві',
  [FertilizerType.SlowRelease]: 'Повільного вивільнення',
  [FertilizerType.Liquid]: 'Рідкі',
  [FertilizerType.Foliar]: 'Листкові',
};

export const ProductForm = {
  Granular: 'Granular',
  Prilled: 'Prilled',
  Liquid: 'Liquid',
  WaterSolublePowder: 'WaterSolublePowder',
  SolubleConcentrate: 'SolubleConcentrate',
} as const;

export type ProductForm = (typeof ProductForm)[keyof typeof ProductForm];

export const ProductFormLabels: Record<ProductForm, string> = {
  [ProductForm.Granular]: 'Гранульовані',
  [ProductForm.Prilled]: 'Прильовані гранули',
  [ProductForm.Liquid]: 'Рідкі',
  [ProductForm.WaterSolublePowder]: 'Водорозчинний порошок',
  [ProductForm.SolubleConcentrate]: 'Розчинний концентрат',
};

export interface FertilizerProduct {
  id: number;
  name: string;
  type: FertilizerType;
  form: ProductForm;
  nitrogenContent: number;
  phosphorusContent: number;
  potassiumContent: number;
  sulfurContent?: number | null;
  calciumContent?: number | null;
  magnesiumContent?: number | null;
  ironContent?: number | null;
  zincContent?: number | null;
  boronContent?: number | null;
  manganeseContent?: number | null;
  copperContent?: number | null;
  molybdenumContent?: number | null;
  description?: string | null;
  manufacturer?: string | null;
}

// DTOs for creating/updating products
export interface CreateFertilizerProductDto {
  name: string;
  type: FertilizerType;
  form: ProductForm;
  nitrogenContent: number;
  phosphorusContent: number;
  potassiumContent: number;
  sulfurContent?: number | null;
  calciumContent?: number | null;
  magnesiumContent?: number | null;
  ironContent?: number | null;
  zincContent?: number | null;
  boronContent?: number | null;
  manganeseContent?: number | null;
  copperContent?: number | null;
  molybdenumContent?: number | null;
  description?: string | null;
  manufacturer?: string | null;
}

export type UpdateFertilizerProductDto = CreateFertilizerProductDto;
