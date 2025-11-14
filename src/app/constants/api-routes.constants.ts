export const API_ROUTES = {
  BASE: '/',
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    REFRESH_TOKEN: 'auth/refreshToken',
  },
  FIELDS: {
    GET_ALL: 'field/getAll',
    GET_BY_ID: 'field/getById',
    CREATE: 'field/create',
    UPDATE: 'field/update',
    DELETE: 'field/delete',
  },
  SOILS: {
    GET_ALL: 'soil/getAll',
    GET_BY_ID: 'soil/getById',
    GET_BY_SOIL_TYPE: 'soil/getBySoilType',
  },
  CROPS: {
    GET_ALL: 'crop/getAll',
    GET_BY_ID: 'crop/getById',
    GET_BY_CROP_TYPE: 'crops/getByCropType',
    CREATE: 'crop/create',
    UPDATE: 'crop/update',
    DELETE: 'crop/delete',
  },
  FIELD_CONDITIONS: {
    GET_ALL: 'fieldCondition/getAll',
    GET_BY_ID: 'fieldCondition/getById',
    GET_BY_FIELD_ID: 'fieldCondition/getByFieldId',
    CREATE: 'fieldCondition/create',
    DELETE: 'fieldCondition/delete',
  },

  IRRIGATION: {
    GET_RECOMMENDATION: 'Irrigation/recommendation',
    GET_BATCH_RECOMMENDATIONS: 'Irrigation/recommendations/batch',
    GET_WEEKLY_SCHEDULE: 'Irrigation/schedule/weekly',
  },

  // ===== FERTILIZER PLANNING API =====
  FERTILIZER: {
    PLANNING: {
      CALCULATE_PLAN: 'fertilizer/planning/season-plan', // GET
      SAVE_PLAN: 'fertilizer/planning/season-plan', // POST
      GET_CURRENT_REC: 'fertilizer/planning/current-recommendation', // GET
    },
    APPLICATION: {
      RECORD_APP: 'fertilizer/applications', // POST
      GET_APP_HISTORY: 'fertilizer/applications/history', // GET
      GET_APP_RECORD: 'fertilizer/applications', // GET /{recordId}
      UPDATE_APP_RECORD: 'fertilizer/applications', // PUT /{recordId}
      DELETE_APP_RECORD: 'fertilizer/applications', // DELETE /{recordId}
      GET_APP_SUMMARY: 'fertilizer/applications/summary', // GET
      GET_SAVED_PLANS: 'fertilizer/applications/plans', // GET
      GET_UPCOMING: 'fertilizer/applications/upcoming', // GET
      GET_BY_DATE_RANGE: 'fertilizer/applications/date-range', // GET
      UPDATE_PLAN: 'fertilizer/applications/plans', // PUT /{planId}
      COMPLETE_PLAN: 'fertilizer/applications/plans', // POST /{planId}/complete
      DELETE_PLAN: 'fertilizer/applications/plans', // DELETE /{planId}
    },
    CALCULATIONS: {
      CALCULATE_REQ: 'fertilizer/calculations/nutrient-requirement', // GET
      CALCULATE_SOIL_SUPPLY: 'fertilizer/calculations/soil-nutrient-supply', // GET
      OPTIMIZE_PRODUCTS: 'fertilizer/calculations/optimize-products', // POST
    },
    ANALYSIS: {
      GET_BALANCE: 'fertilizer/analysis/nutrient-balance', // GET
      GET_DEFICIT: 'fertilizer/analysis/nutrient-deficit', // GET
    },
    PRODUCTS: {
      GET_ALL: 'fertilizer/products', // GET
      GET_BY_TYPE: 'fertilizer/products/by-type', // GET
      SEARCH: 'fertilizer/products/search', // GET
      GET_BY_ID: 'fertilizer/products', // GET /{productId}
      CREATE: 'fertilizer/products', // POST
      UPDATE: 'fertilizer/products', // PUT /{productId}
      DELETE: 'fertilizer/products', // DELETE /{productId}
    },
  },
};
