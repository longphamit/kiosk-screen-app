import { Col, Divider, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPOIByIdService } from "../../services/poi_service";
import POIMarker from "../map/components/markers/poi_marker";
import { CustomMap } from "../../../@app/components/map/map";
import { convertTime } from "../../../@app/utils/date_util";
import { BannerCard } from "../../../@app/components/card/banner_card";
import { CarouselCard } from "../../../@app/components/card/carousel_card";
import "./styles.css"
import Slider from "react-slick";
import { getDirectionGoongMapService } from "../../services/goong_map_service";
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
export const SpecificPOIPage = ({ }) => {

    const { id } = useParams();
    const [poi, setPOI] = useState();
    const [direction, setDirection] = useState()
    const getPOIFunction = async () => {
        try {
            let res = await getPOIByIdService(id);
            setPOI(res.data);
            console.log(res.data)
            navigator.geolocation.getCurrentPosition(async (position) => {
                const resDirection = await getDirectionGoongMapService(
                    "bike",
                    position.coords.longitude,
                    position.coords.latitude,
                    res.data.longtitude,
                    res.data.latitude,
                )
                console.log(resDirection)
                setDirection(resDirection)

            });
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPOIFunction();
    }, [])
    return <>
        {poi ?
            <div style={{ height: "100%", marginBottom: 200 }}>
                <BannerCard item={poi} />
                <Row style={{ marginTop: 50 }}>
                    <Col span={13} >
                        <div className="poi-image-box">
                            {
                                <Slider
                                    {...sliderSettings}
                                    style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                                    autoplay
                                    autoplaySpeed={2000}
                                >
                                    {
                                        poi?.listImage.map(e => {
                                            return (
                                                <div  >
                                                    <img className="center" style={{ width: "90%", height: 600 }} key={e.id} src={e.link} />
                                                </div>)
                                        })
                                    }
                                </Slider>
                            }
                        </div>
                    </Col>
                    <Col span={10}>
                        <Row justify="center" align="middle">
                            <div style={{ backgroundColor: 'white', width: '600px', padding: 30, borderRadius: 20, boxShadow: ' 2px 2px 4px #303134', marginTop: -250 }}>
                                <Row justify="center" align="middle" style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    {poi.name}
                                </Row>
                                <Row>
                                    <Col span={4}>
                                        Open time
                                    </Col>
                                    <Col offset={1} span={18}>
                                        {convertTime(poi.openTime.hours,
                                            poi.openTime.minutes,
                                            poi.openTime.seconds).format("HH:mm")} ~  {convertTime(poi.closeTime.hours,
                                                poi.closeTime.minutes,
                                                poi.closeTime.seconds).format("HH:mm")} <br />({poi.dayOfWeek.split('-').join(' - ')})
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                                <Row>
                                    <Col span={4}>
                                        Location
                                    </Col>
                                    <Col offset={1} span={18}>
                                        <p>
                                            {`${poi.address} - ${poi.ward} ${poi.district} ${poi.city} `}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                        <Row justify="center" align="middle" style={{ marginTop: 60 }}>
                            <div className="poi-map-box" style={{ width: '800px', height: '500px' }}>
                                {
                                    direction ?
                                        <CustomMap direction={direction} marker={<POIMarker item={poi} setItem={() => { }} />} /> : null
                                }
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>
            : <Skeleton />}
    </>
}