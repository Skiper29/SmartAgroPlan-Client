import { FieldType } from '@/models/field/field.model';
import type Field from '@/models/field/field.model';
import { type Crop, CropType } from '@/models/crop/crop.model';
import type Soil from '@/models/field/soil.model';

// Mock soils
export const mockSoils: Soil[] = [
  {
    id: 1,
    type: 'Loamy',
    waterRetention: 60,
    acidity: 6.5,
    nutrientContent: 1200,
    organicMatter: 3.2,
    soilDensity: 1.3,
    erosionRisk: 10,
    optimalCrops: [],
    fields: [],
  },
  {
    id: 2,
    type: 'Clay',
    waterRetention: 75,
    acidity: 7.0,
    nutrientContent: 1500,
    organicMatter: 2.8,
    soilDensity: 1.4,
    erosionRisk: 15,
    optimalCrops: [],
    fields: [],
  },
];

// Mock crops
export const mockCrops: Crop[] = [
  {
    id: 1,
    name: 'Пшениця',
    cropType: CropType.Wheat,
    waterRequirement: 500,
    fertilizerRequirement: 120,
    growingDuration: 120,
    sowingStart: { day: 15, month: 3 },
    sowingEnd: { day: 10, month: 4 },
    minTemperature: 5,
    maxTemperature: 30,
    harvestYield: 6.5,
    optimalSoil: mockSoils[0],
    additionalNotes: 'Стійка до посухи',
    fields: [],
    fieldCropHistories: [],
  },
  {
    id: 2,
    name: 'Кукурудза',
    cropType: CropType.Corn,
    waterRequirement: 600,
    fertilizerRequirement: 140,
    growingDuration: 110,
    sowingStart: { day: 1, month: 4 },
    sowingEnd: { day: 20, month: 4 },
    minTemperature: 8,
    maxTemperature: 32,
    harvestYield: 7.2,
    optimalSoil: mockSoils[1],
    additionalNotes: 'Висока врожайність',
    fields: [],
    fieldCropHistories: [],
  },
];

// Mock fields
export const mockFields: Field[] = [
  {
    id: 1,
    name: 'Поле №1',
    location: 'Київська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [30.5234, 50.4501],
          [30.5334, 50.4501],
          [30.5334, 50.4601],
          [30.5234, 50.4601],
          [30.5234, 50.4501],
        ],
      ],
    }),
    fieldType: FieldType.Arable,
    currentCrop: mockCrops[0],
    soil: mockSoils[0],
    createdDate: new Date('2024-01-10'),
    updatedDate: new Date('2024-09-01'),
  },
  {
    id: 2,
    name: 'Поле №2',
    location: 'Вінницька область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [28.4681, 49.2331],
          [28.4781, 49.2331],
          [28.4781, 49.2431],
          [28.4681, 49.2431],
          [28.4681, 49.2331],
        ],
      ],
    }),
    fieldType: FieldType.Pasture,
    currentCrop: mockCrops[1],
    soil: mockSoils[1],
    createdDate: new Date('2023-05-15'),
    updatedDate: new Date('2024-08-20'),
  },
  {
    id: 3,
    name: 'Сад №1',
    location: 'Львівська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [24.0297, 49.8397],
          [24.0397, 49.8397],
          [24.0397, 49.8497],
          [24.0297, 49.8497],
          [24.0297, 49.8397],
        ],
      ],
    }),
    fieldType: FieldType.Orchard,
    currentCrop: mockCrops[0],
    soil: mockSoils[0],
    createdDate: new Date('2022-03-12'),
    updatedDate: new Date('2024-07-15'),
  },
  {
    id: 4,
    name: 'Виноградник №1',
    location: 'Закарпатська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [22.7183, 48.6208],
          [22.7283, 48.6208],
          [22.7283, 48.6308],
          [22.7183, 48.6308],
          [22.7183, 48.6208],
        ],
      ],
    }),
    fieldType: FieldType.Vineyard,
    currentCrop: mockCrops[1],
    soil: mockSoils[1],
    createdDate: new Date('2023-04-20'),
    updatedDate: new Date('2024-06-10'),
  },
  {
    id: 5,
    name: 'Теплиця №1',
    location: 'Харківська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [36.2304, 49.9935],
          [36.2354, 49.9935],
          [36.2354, 49.9985],
          [36.2304, 49.9985],
          [36.2304, 49.9935],
        ],
      ],
    }),
    fieldType: FieldType.Greenhouse,
    currentCrop: mockCrops[0],
    soil: mockSoils[0],
    createdDate: new Date('2023-11-15'),
    updatedDate: new Date('2024-05-25'),
  },
  {
    id: 6,
    name: 'Пара №1',
    location: 'Полтавська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [34.5514, 49.5883],
          [34.5614, 49.5883],
          [34.5614, 49.5983],
          [34.5514, 49.5983],
          [34.5514, 49.5883],
        ],
      ],
    }),
    fieldType: FieldType.Fallow,
    currentCrop: mockCrops[1],
    soil: mockSoils[1],
    createdDate: new Date('2024-02-01'),
    updatedDate: new Date('2024-08-30'),
  },
  {
    id: 7,
    name: 'Пара №1',
    location: 'Полтавська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [34.5514, 49.5883],
          [34.5614, 49.5883],
          [34.5614, 49.5983],
          [34.5514, 49.5983],
          [34.5514, 49.5883],
        ],
      ],
    }),
    fieldType: FieldType.Fallow,
    currentCrop: mockCrops[1],
    soil: mockSoils[1],
    createdDate: new Date('2024-02-01'),
    updatedDate: new Date('2024-08-30'),
  },
  {
    id: 8,
    name: 'Пара №1',
    location: 'Полтавська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [34.5514, 49.5883],
          [34.5614, 49.5883],
          [34.5614, 49.5983],
          [34.5514, 49.5983],
          [34.5514, 49.5883],
        ],
      ],
    }),
    fieldType: FieldType.Fallow,
    currentCrop: mockCrops[1],
    soil: mockSoils[1],
    createdDate: new Date('2024-02-01'),
    updatedDate: new Date('2024-08-30'),
  },
  {
    id: 9,
    name: 'Пара №1',
    location: 'Полтавська область',
    boundary: JSON.stringify({
      type: 'Polygon',
      coordinates: [
        [
          [34.5514, 49.5883],
          [34.5614, 49.5883],
          [34.5614, 49.5983],
          [34.5514, 49.5983],
          [34.5514, 49.5883],
        ],
      ],
    }),
    fieldType: FieldType.Fallow,
    currentCrop: mockCrops[1],
    soil: mockSoils[1],
    createdDate: new Date('2024-02-01'),
    updatedDate: new Date('2024-08-30'),
  },
];
