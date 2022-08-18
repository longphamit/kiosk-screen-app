import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getListApplicationService = async (Name:any,PartyName:any,PartyEmail:any,AppCategoryId:any,AppCategoryName:any,Status:any, size: any,page: any) => {
  const response = await request.get(
    `${HOST}/v1/serviceApplications?Name=${Name}&PartyName=${PartyName}&PartyEmail=${PartyEmail}&AppCategoryId=${AppCategoryId}&AppCategoryName=${AppCategoryName}&Status=${Status}&size=${size}&page=${page}`
  );
  return response.data;
};
export const getListApplicationServiceByTemplateId = async (templateId:any) => {
  const response = await request.get(
    `${HOST}/v1/my-app/template?templateId=${templateId}`
  );
  return response.data;
};