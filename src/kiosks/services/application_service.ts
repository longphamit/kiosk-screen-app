import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getListApplicationService = async (Name: any, PartyName: any, PartyEmail: any, AppCategoryId: any, AppCategoryName: any, Status: any, size: any, page: any) => {
  const response = await request.get(
    `${HOST}/v1/my-app?Name=${Name}&PartyName=${PartyName}&PartyEmail=${PartyEmail}&AppCategoryId=${AppCategoryId}&AppCategoryName=${AppCategoryName}&Status=${Status}&size=${size}&page=${page}`
  );
  return response.data;
};
export const getListMyApplicationService = async (appcategoryId: any, partyId: any) => {
  const response = await request.get(
    `${HOST}/v1/my-app/categoryId/${appcategoryId}/partyId/${partyId}`
  );
  return response.data;
};
export const getListApplicationServiceByTemplateIdService = async (templateId: any) => {
  const response = await request.get(
    `${HOST}/v1/my-app/template?templateId=${templateId}`
  );
  return response.data;
};
export const getMyInstalledApplicationsService = async () => {
  const response = await request.get(
    `${HOST}/v1/my-app?Status=installed&page=1 `
  );
  return response.data;
}
export const getApplicationByIdService = async (id: any) => {
  const response = await request.get(
    `${HOST}/v1/my-app?ServiceApplicationId=${id}&Status=installed&page=1`
  );
  return response.data;

}