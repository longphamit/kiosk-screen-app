import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getListApplicationCategoryService = async (Name:any,size: any,page: any) => {
  const response = await request.get(
    `${HOST}/v1/categories?Name=${Name}&size=${size}&page=${page}`
  );
  return response.data;
};
export const getAllApplicationCategoryService = async () => {
  const response = await request.get_notConfig(
    `${HOST}/v1/categories?&size=${1000}&page=${-1}`
  );
  return response.data;
};
export const getAppCategoryByIdService = async (id:any) => {
  const response = await request.get(
    `${HOST}/v1/categories/${id}`
  );
  return response.data;
};