import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getPOINearbyService = async (
  kioskId: string,
  longtitude: any,
  latitude: any
) => {
  const response = await request.get(
    `${HOST}/v1/pois/nearby?kioskId=${kioskId}&lng=${longtitude}&lat=${latitude}`
  );
  return response.data;
};
