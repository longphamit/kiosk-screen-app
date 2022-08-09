import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getHomeBannerService = async () => {
    const response = await request.get(`${HOST}/v1/home`);
    return response.data;

}