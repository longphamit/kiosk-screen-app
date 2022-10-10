import { GOONG_ACCESS_API_KEY, GOONG_ACCESS_MAP_KEY } from "../../@app/constants/key";
import request from "../../@app/utils/http_client";

export const getDirectionGoongMapService = async (
    vehical:any,
    longStart:any,
    latStart:any,
    longEnd:any,
    latEnd:any) => {
    const response = await request.get_notConfig(`https://rsapi.goong.io/Direction?origin=${latStart},${longStart}&destination=${latEnd},${longEnd}&vehicle=${vehical}&api_key=${GOONG_ACCESS_API_KEY}`);
    return response.data;
}