import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getHomeBannerService = async (partyId:any,kioskId:any) => {
    const response = await request.get(`${HOST}/v1/home?partyId=${partyId}&kioskId=${kioskId}`);
    return response.data;

}