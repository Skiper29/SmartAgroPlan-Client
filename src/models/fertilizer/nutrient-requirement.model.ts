export interface NutrientRequirement {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  sulfur: number;
  calcium: number;
  magnesium: number;
  boron: number;
  zinc: number;
  manganese: number;
  copper: number;
  iron: number;
  molybdenum: number;
}

export const createEmptyNutrientRequirement = (): NutrientRequirement => ({
  nitrogen: 0,
  phosphorus: 0,
  potassium: 0,
  sulfur: 0,
  calcium: 0,
  magnesium: 0,
  boron: 0,
  zinc: 0,
  manganese: 0,
  copper: 0,
  iron: 0,
  molybdenum: 0,
});
