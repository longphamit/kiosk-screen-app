import { Col, Row, Skeleton, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPOIByIdService } from "../../services/poi_service";
import POIMarker from "../map/components/markers/poi_marker";
import { CustomMap } from "../../../@app/components/map/map";
import "./styles.css"
import { getDirectionGoongMapService } from "../../services/goong_map_service";
import { PoiBannerCard } from "../../../@app/components/card/banner_poi";
import Slider from "react-slick";
import ScrollContainer from "react-indiana-drag-scroll";
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
            <div>
                <ScrollContainer ignoreElements={".prevent-drag-scroll"} className="specific-poi-event-scroll" vertical={true}>
                    <div className="prevent-drag-scroll">
                        <PoiBannerCard poi={poi} />
                    </div>
                    <div className="prevent-drag-scroll">
                        <Row style={{ marginTop: 5 }}>
                            <Col span={10} className="prevent-drag-scroll">
                                <div className="poi-image-box prevent-drag-scroll" style={{ zIndex: 10 }}>
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
                                                            <img className="center" style={{ width: "100%", height: 500 }} key={e.id} src={e.link} />
                                                        </div>)
                                                })
                                            }
                                        </Slider>
                                    }
                                </div>
                            </Col>
                            <Col span={14}>
                                <Row justify="center" align="middle" style={{ marginTop: 30 }}>
                                    <div className="poi-map-box prevent-drag-scroll" style={{ width: 1000, height: 600 }}>
                                        {
                                            direction ?
                                                <CustomMap direction={direction} marker={<POIMarker item={poi} setItem={() => { }} />} /> : <Row span={24}><Spin className="center" /></Row>
                                        }
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </ScrollContainer>



            </div>
            : <Skeleton />}
    </>
}