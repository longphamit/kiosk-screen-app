import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getEventNearbyService = async (
    longtitude: any,
    latitude: any,
    partyId: any
) => {
    const response = await request.get(
        `${HOST}/v1/events/nearby?partyId=${partyId}&Longtitude=${longtitude}&Latitude=${latitude}&&pageNum=1`
    );
    return response.data;
};

export const getEventByIdService = async (id: any) => {
    const response = await request.get(`${HOST}/v1/events/${id}`);
    return response.data;

}