import { HOST } from "../../@app/constants/host";
import request from "../../@app/utils/http_client";

export const getKioskTemplate=async(kioskId:any)=>{
    const response = await request.get(
      `${HOST}/v1/kiosks/testSendNoti?id=${kioskId}`
    );
    return response.data;
  }