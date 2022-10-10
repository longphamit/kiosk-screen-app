import request from "../utils/http_client"
const HOST_WEATHER="http://dataservice.accuweather.com/forecasts/v1/daily/1day";
const API_KEY="A2FNvUqUmx6Ist3EX1HeAv7qK95fmEGa"
const HCM_KEY="353981"
export const getWeatherService=async()=>{
    return await request.get_notConfig(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/353981?apikey=A2FNvUqUmx6Ist3EX1HeAv7qK95fmEGa`)
}