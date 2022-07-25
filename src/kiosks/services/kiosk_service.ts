import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getKioskTemplate = async (kioskId: any) => {
  const response = await request.get(
    `${HOST}/v1/kiosks/testSendNoti?id=${kioskId}`
  );
  return response.data;
}

export const getKioskInfoService = async (kioskId: any) => {
  const response = await request.get(`${HOST}/v1/kiosks/${kioskId}`);
  return response.data;
};

export const getKioskNearbyService = async (longitude: any, latitude: any) => {
  const response = await request.get(
    `${HOST}/v1/kiosks/nearby?Longtitude=${longitude}&&Latitude=${latitude}&pageNum=1`
  );
  return response.data;
}
