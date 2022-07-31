import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";


export const kioskRatingService = async (data: any) => {
    const response = await request.post(`${HOST}/v1/kioskFeedbacks`, data);
    return response.data;
  };
