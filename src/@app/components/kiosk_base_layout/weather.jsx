import { Row } from "antd";
import { useEffect, useState } from "react";
import { getWeatherService } from "../../services/weather_service";
import {
    TbCloudRain,
    TbSun,
    TbTemperatureCelsius
} from "react-icons/tb";
const WeatherView = () => {
    const [isInitedData, setIsInitedData] = useState(false)
    const [maxTemp, setMaxTemp] = useState()
    const [minTemp, setMinTemp] = useState()
    const [weatherCategory, setWeatherCategory] = useState()
    const convertFtoC = (f) => {
        return Math.round((f - 32) * 5 / 9);
    }
    const initData = async () => {
        const res = await getWeatherService()
        const minTempSet = convertFtoC(res.data.DailyForecasts[0].Temperature.Minimum.Value);
        const maxTempSet = convertFtoC(res.data.DailyForecasts[0].Temperature.Maximum.Value);
        setMaxTemp(maxTempSet)
        setMinTemp(minTempSet)
        setWeatherCategory(res.data.Headline.Category)
        setIsInitedData(true)
    }
    useEffect(() => {
        initData()
    }, []);
    return <div>
        <Row>
            {
                isInitedData ? <div style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: "bold"
                }}>
                    <div>
                        {
                            weatherCategory ? weatherCategory === "rain" ? <TbCloudRain style={{marginRight:10,fontSize:25}}/> : <TbSun style={{marginRight:10,fontSize:25}}/> : null
                        }{minTemp}<TbTemperatureCelsius /> - {maxTemp}<TbTemperatureCelsius />
                    </div>
                </div> : null
            }


        </Row>
    </div>
}
export default WeatherView;