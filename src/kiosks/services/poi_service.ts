import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getPOINearbyService = async (
  kioskId: string,
  longtitude: any,
  latitude: any
) => {
  const response = await request.get(
    `${HOST}/v1/pois/nearby?kioskId=${kioskId}&Longtitude=${longtitude}&Latitude=${latitude}&&pageNum=1`
  );
  return response.data;
};
export const getAllPOICategoriesService=async()=>{
  const response = await request.get(
    `${HOST}/v1/poiCategories?size=-1&page=1`
  );
  return response.data;
}