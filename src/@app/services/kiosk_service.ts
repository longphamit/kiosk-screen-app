import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getListKioskService = async (
    partyId: string,
    status:any,
    page: any,
    size: any,
    
  ) => {
    const response = await request.get(
      `${HOST}/v1/kiosks?PartyId=${partyId}&Status=${status}&page=${page}&size=${size}`
    );
    return response.data;
  };

  export const changeStatusKioskService = async (id: string,isKioskSetup:boolean) => {
    const response = await request.patch(`${HOST}/v1/kiosks/status?id=${id}&isKioskSetup=${isKioskSetup}`,null);
    return response.data;
  };
  export const updateKioskService = async (id: string,name:any,longtitude:any,latitude:any,kioskLocationId:any) => {
    const response = await request.put(`${HOST}/v1/kiosks`,{
      id:id,
      name:name,
      longtitude:longtitude,
      latitude:latitude,
      kioskLocationId:kioskLocationId
    });
    return response.data;
  };
  export const getKioskByIdService = async (id: string) => {
    const response = await request.get(`${HOST}/v1/kiosks/${id}`);
    return response.data;
  };