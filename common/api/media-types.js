const MEDIA_TYPE_PREFIX = "application/";
const NAMESPACE = "vnd.Analyttica.TreasureHunt.";
const MEDIA_TYPE_SUFFIX = "+json";
const mediaType = type =>
  `${MEDIA_TYPE_PREFIX}${NAMESPACE}${type}${MEDIA_TYPE_SUFFIX}`;
export const MARKETPLACE_COURSE = mediaType("MarketPlaceCourse");
export const MARKETPLACE_COURSE_COLLECTION = mediaType(
  "MarketPlaceCourseCollection"
);
export const TOKEN = mediaType("Token");
export const DATA_SET = mediaType("DataSet");
export const TEXT_CSV = "text/csv";
export const IMAGE_PNG = "image/png";
export const TEXT_PLAIN = "text/plain";
export const STEP_RESULT = mediaType("StepResult");
export const USER_STEP = mediaType("UserStep");
export const USER_STEP_COLLECTION = mediaType("UserStepCollection");
export const FUNCTION_SUGGESTIONS = mediaType("FunctionSuggestions");
export const FUNCTION = mediaType("Function");
export const FUNCTION_COLLECTION = mediaType("FunctionCollection");
export const FUNCTION_CATEGORY_COLLECTION = mediaType(
  "FunctionCategoryCollection"
);
export const MATERIAL = mediaType("Material");
export const REFERENCE_STEP = mediaType("StepComparison");
export const USER_SIMULATION = mediaType("UserSimulation");
export const USER_SOLVE = mediaType("UserSolve");
export const USER_APPLY = mediaType("UserApply");
export const USER_MODULE = mediaType("UserModule");
export const MODULE = mediaType("Module");
export const SETTINGS = mediaType("AthSettings");
export const ALL_TENANTS = mediaType("Tenants");
