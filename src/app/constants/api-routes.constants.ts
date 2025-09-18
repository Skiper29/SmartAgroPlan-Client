export const API_ROUTES = {
  BASE: '/',
  AUTH: {
    LOGIN: 'auth/login',
    REGISTER: 'auth/register',
    REFRESH_TOKEN: 'auth/refreshToken',
  },
  FIELDS: {
    GET_ALL: 'field/getAll',
    GET_BY_ID: `field/getById`,
    CREATE: 'field/create',
    UPDATE: `field/update`,
    DELETE: `field/delete`,
  },
  SOILS: {
    GET_ALL: 'soil/getAll',
    GET_BY_ID: `soil/getById`,
    GET_BY_SOIL_TYPE: 'soil/getBySoilType',
  },
  CROPS: {
    GET_ALL: 'crop/getAll',
    GET_BY_ID: `crop/getById`,
    GET_BY_CROP_TYPE: 'crops/getByCropType',
    CREATE: 'crop/create',
    UPDATE: `crop/update`,
    DELETE: `crop/delete`,
  },
};
