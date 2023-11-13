//Paths that will bypass api-key JWT middleware
export const allowedUriPathsApiKey = [
  'v1.0/task/migrate',
  'v1.0/task/connection/update',
  'v1.0/task/clone-definition',
  'v1.0/task/database/query',
  'v1.0/task/consistency/check',
];

//Paths that will bypass passport JWT middleware
export const allowedUriPathsJWT = [
  'v1.0/task/migrate',
  'v1.0/task/connection/update',
  'v1.0/task/clone-definition',
  'v1.0/task/database/query',
  'v1.0/task/consistency/check',
];

export const version = 'v1';
