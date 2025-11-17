# Fertilizer API Documentation

This directory contains the API client implementations for all fertilizer-related endpoints. The APIs are organized by functional controllers for better maintainability and separation of concerns.

## Structure

The API layer is divided into the following controller-based modules:

### 1. **fertilizer-planning.api.ts**
Handles season planning and current recommendations.

**Methods:**
- `calculateSeasonPlan(fieldId, targetYield?, sowingDate?)` - Calculate a complete season fertilizer plan
- `saveSeasonPlan(data)` - Save a calculated season plan
- `getCurrentRecommendation(fieldId)` - Get the current fertilizer recommendation for a field

### 2. **fertilizer-applications.api.ts**
Manages fertilizer application records, history, and plan management.

**Methods:**
- `recordApplication(data)` - Record a new fertilizer application
- `getApplicationHistory(fieldId, fromDate?, toDate?, pageNumber?, pageSize?)` - Get application history
- `getApplicationRecord(recordId)` - Get a specific application record
- `updateApplicationRecord(recordId, data)` - Update an existing record
- `deleteApplicationRecord(recordId)` - Delete an application record
- `getApplicationSummary(fieldId, fromDate, toDate)` - Get summary of applications
- `getSavedPlans(fieldId, includeCompleted?)` - Get saved fertilizer plans
- `getUpcomingApplications(fieldId, daysAhead?)` - Get upcoming applications
- `getApplicationsByDateRange(fieldId, startDate, endDate)` - Get applications by date range
- `updateApplicationPlan(planId, data)` - Update an application plan
- `completeApplicationPlan(planId, data)` - Mark a plan as complete
- `deleteApplicationPlan(planId)` - Delete a saved plan

### 3. **fertilizer-calculations.api.ts**
Handles nutrient calculations and product optimization.

**Methods:**
- `calculateNutrientRequirement(fieldId, targetYield?)` - Calculate nutrient requirements
- `calculateSoilNutrientSupply(fieldId)` - Calculate soil nutrient supply
- `optimizeProducts(data)` - Optimize fertilizer product selection

### 4. **fertilizer-analysis.api.ts**
Provides nutrient balance and deficit analysis.

**Methods:**
- `getNutrientBalance(fieldId)` - Get nutrient balance for a field
- `analyzeNutrientDeficit(fieldId)` - Analyze nutrient deficits

### 5. **fertilizer-products.api.ts**
Manages fertilizer product CRUD operations.

**Methods:**
- `getAllProducts()` - Get all fertilizer products
- `getProductsByType(type)` - Get products by fertilizer type
- `searchProducts(query)` - Search for products
- `getProductById(productId)` - Get a specific product
- `createProduct(data)` - Create a new product
- `updateProduct(productId, data)` - Update an existing product
- `deleteProduct(productId)` - Delete a product

## Usage

### Importing Individual Controllers

```typescript
import { 
  fertilizerPlanningApi,
  fertilizerApplicationsApi,
  fertilizerCalculationsApi,
  fertilizerAnalysisApi,
  fertilizerProductsApi
} from '@/features/fertilizer/api';

// Example: Get current recommendation
const recommendation = await fertilizerPlanningApi.getCurrentRecommendation(fieldId);

// Example: Record an application
const applicationId = await fertilizerApplicationsApi.recordApplication({
  fieldId: 1,
  applicationDate: '2025-11-14T10:00:00Z',
  applicationMethodId: 1,
  productsUsed: { 1: 100, 2: 50 },
  notes: 'Pre-planting application'
});
```

### Legacy API (Backward Compatibility)

The legacy `fertilizerApi` is still available for backward compatibility but is deprecated:

```typescript
import { fertilizerApi } from '@/features/fertilizer/api';

// This still works but is deprecated
const plan = await fertilizerApi.calculateSeasonPlan(fieldId);
```

## Models

All API methods use TypeScript models from `@/models/fertilizer`:

- `SeasonFertilizerPlan` - Complete season plan with applications
- `CurrentRecommendation` - Current fertilizer recommendation
- `FertilizerApplication` - Single application in a plan
- `FertilizerApplicationRecordDto` - Detailed application record
- `RecordApplicationRequest` - Request to record an application
- `UpdateApplicationRecordDto` - Update application record data
- `NutrientApplicationSummary` - Summary of nutrient applications
- `NutrientRequirement` - Nutrient quantities
- `NutrientBalance` - Balance analysis result
- `NutrientDeficitAnalysis` - Deficit analysis result
- `FertilizerProduct` - Product information
- `CreateFertilizerProductDto` - Create product request
- `UpdateFertilizerProductDto` - Update product request
- `OptimizeProductsRequest` - Product optimization request
- `ProductRecommendationDto` - Optimization result

## API Routes

All API routes are defined in `@/app/constants/api-routes.constants.ts` under the `FERTILIZER` namespace:

- `FERTILIZER.PLANNING.*` - Planning endpoints
- `FERTILIZER.APPLICATION.*` - Application endpoints
- `FERTILIZER.CALCULATIONS.*` - Calculation endpoints
- `FERTILIZER.ANALYSIS.*` - Analysis endpoints
- `FERTILIZER.PRODUCTS.*` - Product endpoints

## Error Handling

All API methods use the centralized `Agent` from `@/app/api/agent.api.ts` which includes:
- Automatic JWT token injection
- Error interceptors with toast notifications
- Consistent error handling

## Migration Guide

If you're using the old `fertilizerApi`, migrate to the new controller-based APIs:

### Before:
```typescript
import { fertilizerApi } from '@/features/fertilizer/api/fertilizer.api';
await fertilizerApi.calculateSeasonPlan(fieldId);
```

### After:
```typescript
import { fertilizerPlanningApi } from '@/features/fertilizer/api';
await fertilizerPlanningApi.calculateSeasonPlan(fieldId);
```

## Benefits of Controller-Based Structure

1. **Better Organization** - Related endpoints are grouped together
2. **Easier Maintenance** - Changes to one controller don't affect others
3. **Improved Type Safety** - Specific imports reduce bundled code
4. **Clear Responsibilities** - Each controller has a single, well-defined purpose
5. **Scalability** - Easy to add new controllers as the API grows

