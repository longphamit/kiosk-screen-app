import { HOST } from "../../@app/constants/host";
import { KIOSK_ID } from "../../@app/constants/key";
import request from "../../@app/utils/http_client";

export const getPOINearbyService = async (
  longtitude: any,
  latitude: any
) => {
  let response = await getPOINearby(longtitude, latitude);
  return response;
};

export const getAllPOICategoriesService = async () => {
  const response = await request.get(
    `${HOST}/v1/poiCategories?size=-1&page=1`
  );
  return response.data;
}

export const getPOINearbyByCategoryIdService = async (
  longtitude: any,
  latitude: any,
  categoryId: any
) => {
  let response = await getPOINearby(longtitude, latitude, categoryId);
  return response;
};
export const getPOIByIdService = async (id: any) => {
  const response = await request.get(
    `${HOST}/v1/pois/${id}`
  );
  return response.data;
}
const getPOINearby = async (
  longtitude: any = '',
  latitude: any = '',
  categoryId: string = '',
  address: string = '',
  pageNum = 1,
  name: any = '',
  categoryName: string = ''
) => {
  const response = await request.get(
    `${HOST}/v1/pois/nearby?kioskId=${localStorage.getItem(KIOSK_ID)}&Name=${name}&Longtitude=${longtitude}` +
    `&Latitude=${latitude}&Address=${address}&PoicategoryId=${categoryId}&PoicategoryName=${categoryName}&pageNum=${pageNum}`
  );
  return response.data;
}