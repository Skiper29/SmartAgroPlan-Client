# Fertilizer Hooks

This directory contains React Query hooks for the Fertilizer Planning system, organized by API controller.

## Structure

The hooks are organized to mirror the API structure:

```
hooks/
├── fertilizer-planning.hooks.ts      # Season planning and current recommendations
├── fertilizer-applications.hooks.ts  # Application recording and management
├── fertilizer-calculations.hooks.ts  # Nutrient calculations and optimizations
├── fertilizer-analysis.hooks.ts      # Nutrient balance and deficit analysis
├── fertilizer-products.hooks.ts      # Product management and queries
├── index.ts                          # Central export file
└── README.md                         # This file
```

## Modules

### 1. Planning Hooks (`fertilizer-planning.hooks.ts`)

Handles season fertilizer planning and current recommendations.

**Hooks:**
- `useCalculateSeasonPlan` - Calculate season fertilizer plan for a field
- `useSaveSeasonPlan` - Save a season fertilizer plan
- `useCurrentRecommendation` - Get current fertilizer recommendation

**Query Keys:** `FERTILIZER_PLANNING_KEYS`

### 2. Applications Hooks (`fertilizer-applications.hooks.ts`)

Handles recording, managing, and querying fertilizer applications.

**Hooks:**
- `useRecordApplication` - Record a new fertilizer application
- `useApplicationHistory` - Get application history with pagination
- `useApplicationRecord` - Get a specific application record
- `useUpdateApplicationRecord` - Update an existing application record
- `useDeleteApplicationRecord` - Delete an application record
- `useApplicationSummary` - Get nutrient application summary
- `useSavedPlans` - Get saved fertilizer plans
- `useUpcomingApplications` - Get upcoming applications
- `useApplicationsByDateRange` - Get applications within a date range
- `useUpdateApplicationPlan` - Update an application plan
- `useCompleteApplicationPlan` - Mark a plan as complete
- `useDeleteApplicationPlan` - Delete a saved plan

**Query Keys:** `FERTILIZER_APPLICATIONS_KEYS`

### 3. Calculations Hooks (`fertilizer-calculations.hooks.ts`)

Handles nutrient calculations and product optimizations.

**Hooks:**
- `useCalculateNutrientRequirement` - Calculate nutrient requirements
- `useCalculateSoilNutrientSupply` - Calculate soil nutrient supply
- `useOptimizeProducts` - Optimize fertilizer product selection (mutation)

**Query Keys:** `FERTILIZER_CALCULATIONS_KEYS`

### 4. Analysis Hooks (`fertilizer-analysis.hooks.ts`)

Handles nutrient balance and deficit analysis.

**Hooks:**
- `useNutrientBalance` - Get nutrient balance for a field
- `useNutrientDeficit` - Analyze nutrient deficit for a field

**Query Keys:** `FERTILIZER_ANALYSIS_KEYS`

### 5. Products Hooks (`fertilizer-products.hooks.ts`)

Handles fertilizer product management and queries.

**Hooks:**
- `useAllProducts` - Get all fertilizer products
- `useProductsByType` - Get products by fertilizer type
- `useSearchProducts` - Search for products
- `useProductById` - Get a specific product
- `useCreateProduct` - Create a new product
- `useUpdateProduct` - Update an existing product
- `useDeleteProduct` - Delete a product

**Query Keys:** `FERTILIZER_PRODUCTS_KEYS`

## Usage Examples

### Basic Query Hook

```typescript
import { useCurrentRecommendation } from '@/features/fertilizer/hooks';

function MyComponent({ fieldId }: { fieldId: number }) {
  const { data, isLoading, error } = useCurrentRecommendation(fieldId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render recommendation */}</div>;
}
```

### Mutation Hook

```typescript
import { useRecordApplication } from '@/features/fertilizer/hooks';

function MyComponent() {
  const mutation = useRecordApplication();
  
  const handleSubmit = (data: RecordApplicationRequest) => {
    mutation.mutate(data, {
      onSuccess: (applicationId) => {
        console.log('Application recorded:', applicationId);
      },
      onError: (error) => {
        console.error('Failed to record application:', error);
      },
    });
  };
  
  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
}
```

### Conditional Query

```typescript
import { useCalculateSeasonPlan } from '@/features/fertilizer/hooks';

function MyComponent({ fieldId, enabled }: Props) {
  const { data } = useCalculateSeasonPlan(
    fieldId,
    undefined, // targetYield
    undefined, // sowingDate
    enabled    // Only fetch when enabled is true
  );
  
  return <div>{/* Render plan */}</div>;
}
```

### Query with Parameters

```typescript
import { useApplicationHistory } from '@/features/fertilizer/hooks';

function MyComponent({ fieldId }: { fieldId: number }) {
  const { data, fetchNextPage } = useApplicationHistory(
    fieldId,
    '2024-01-01', // fromDate
    '2024-12-31', // toDate
    1,            // pageNumber
    20            // pageSize
  );
  
  return <div>{/* Render history with pagination */}</div>;
}
```

## Features

### Automatic Cache Invalidation

All mutation hooks automatically invalidate related queries:

- Creating/updating/deleting applications invalidates history, summaries, and analysis
- Saving plans invalidates current recommendations and saved plans
- Product changes invalidate all product lists and searches

### Optimized Stale Times

Queries are configured with appropriate stale times:

- **Short (1-2 min)**: Current recommendations, balances, deficits, upcoming applications
- **Medium (3-5 min)**: Season plans, nutrient requirements, application summaries
- **Long (10 min)**: Products, soil supply (data that changes infrequently)

### Type Safety

All hooks are fully typed with TypeScript, using models from `@/models/fertilizer`.

### Enabled Flag

All query hooks support an `enabled` boolean parameter to conditionally enable/disable queries.

## Query Key Organization

Query keys are organized hierarchically for efficient invalidation:

```typescript
['fertilizer', 'planning', 'season-plans', { fieldId, targetYield, sowingDate }]
['fertilizer', 'applications', 'history', { fieldId, fromDate, toDate, pageNumber, pageSize }]
['fertilizer', 'products', 'list']
['fertilizer', 'analysis', 'balances', fieldId]
```

This structure allows:
- Invalidating all fertilizer queries: `['fertilizer']`
- Invalidating all planning queries: `['fertilizer', 'planning']`
- Invalidating specific resource: `['fertilizer', 'applications', 'history']`

## Migration from Legacy Hooks

The old `fertilizer.hooks.ts` file has been replaced with this new modular structure. To migrate:

1. Update imports:
   ```typescript
   // Old
   import { useCurrentRecommendation } from '@/features/fertilizer/hooks/fertilizer.hooks';
   
   // New
   import { useCurrentRecommendation } from '@/features/fertilizer/hooks';
   ```

2. Most hooks have the same API, but check the new documentation for any differences.

3. New hooks have been added for additional API endpoints not covered by the legacy hooks.

## Best Practices

1. **Always use the exported query keys** for manual cache operations
2. **Use the `enabled` flag** to prevent unnecessary requests
3. **Handle loading and error states** in your components
4. **Leverage automatic refetching** - queries refetch on window focus and network reconnect
5. **Use mutations' onSuccess/onError callbacks** for side effects like navigation or notifications

## Related Documentation

- [API Implementation Summary](../api/README.md)
- [React Query Documentation](https://tanstack.com/query/latest)

