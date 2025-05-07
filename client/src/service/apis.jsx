// const BASE_URL = "http://localhost:4000/api/v1";
const BASE_URL = "https://ciao-laguno.onrender.com/api/v1";

export const auth = {
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  USER_DETAILS_API: BASE_URL + "/user/user-details",
};

export const certificate = {
  CREATE_CERTIFICATE_API: BASE_URL + "/certificate/create-certificate",
  GET_ALL_CERTIFICATES_API: BASE_URL + "/certificate/get-all-certificate",
  DELETE_CERTIFICATE_API: BASE_URL + "/certificate/delete-certificate",
  CERTIFICATE_API: BASE_URL + "/certificate",
};

export const generateCertificateId = {
  GENERATE_CERTIFICATE_ID_API: BASE_URL + "/generate/generate-certificateId",
  SEARCH_CERTIFICATE_ID_API: BASE_URL + "/generate/search/certificate",
};
