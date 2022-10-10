import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getAddressService = async (longitude: any, latitude: any) => {
    const response = await request.get(
        `${HOST}/v1/map/geocode/reverse/lat/${latitude}/lng/${longitude}`
    );
    return response.data;
}