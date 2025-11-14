// Nutrient models
export type { NutrientRequirement } from './nutrient-requirement.model';
export { createEmptyNutrientRequirement } from './nutrient-requirement.model';

// Product models
export type {
  FertilizerProduct,
  FertilizerType,
  ProductForm,
  CreateFertilizerProductDto,
  UpdateFertilizerProductDto,
} from './fertilizer-product.model';
export {
  FertilizerType as FertilizerTypeEnum,
  FertilizerTypeLabels,
  ProductForm as ProductFormEnum,
  ProductFormLabels,
} from './fertilizer-product.model';

// Application models
export type {
  FertilizerApplication,
  ApplicationMethod,
  CropStage,
} from './fertilizer-application.model';
export {
  ApplicationMethod as ApplicationMethodEnum,
  ApplicationMethodLabels,
  CropStage as CropStageEnum,
  CropStageLabels,
} from './fertilizer-application.model';

// Season plan models
export type {
  SeasonFertilizerPlan,
  SaveSeasonPlanRequest,
} from './season-plan.model';

// Current recommendation models
export {
  type CurrentRecommendation,
  RecommendationPriority,
} from './current-recommendation.model';
export {
  RecommendationPriority as RecommendationPriorityEnum,
  RecommendationPriorityLabels,
} from './current-recommendation.model';

// Nutrient balance models
export type {
  NutrientBalance,
  NutrientBalanceStatus,
  NutrientDeficit,
  DeficitUrgency,
  NutrientDeficitAnalysis,
} from './nutrient-balance.model';
export {
  NutrientBalanceStatus as NutrientBalanceStatusEnum,
  NutrientBalanceStatusLabels,
  NutrientBalanceStatusColors,
  DeficitUrgency as DeficitUrgencyEnum,
  DeficitUrgencyLabels,
} from './nutrient-balance.model';

// Application summary models
export type {
  NutrientApplicationSummary,
  ApplicationSummaryItem,
} from './application-summary.model';

// Record application models
export type { RecordApplicationRequest } from './record-application.model';

// Application record models (detailed)
export type {
  FertilizerApplicationRecordDto,
  ApplicationRecordProductDto,
  UpdateApplicationRecordDto,
} from './application-record.model';

// Application plan models
export type {
  UpdateApplicationPlanDto,
  CompleteApplicationRequest,
} from './application-plan.model';

// Product optimization models
export type {
  OptimizeProductsRequest,
  RecommendedProductDto,
  ProductRecommendationDto,
  OptimizationStrategy,
} from './product-optimization.model';
export {
  OptimizationStrategy as OptimizationStrategyEnum,
  OptimizationStrategyLabels,
} from './product-optimization.model';
