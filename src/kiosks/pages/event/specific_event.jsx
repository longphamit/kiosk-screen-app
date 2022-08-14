import { Col,Row, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomMap } from "../../../@app/components/map/map";
import { getEventByIdService } from "../../services/event_service";
import EventMarker from "../map/components/markers/event_marker";
import Slider from "react-slick";
import "./styles.css"
import { getDirectionGoongMapService } from "../../services/goong_map_service";
import { EventBannerCard } from "../../../@app/components/card/banner_event";
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};
export const SpecificEventPage = ({ }) => {
    const { id } = useParams();
    const [event, setEvent] = useState();
    const [direction, setDirection] = useState()
    const getEventFunction = async () => {
        try {
            let res = await getEventByIdService(id);
            setEvent(res.data);
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
            console.log(res.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getEventFunction();
    }, [])

    return <>
        {event ?
            <div style={{ height: "100%", marginBottom: 200 }}>
                <EventBannerCard event={event} />
                <Row style={{ marginTop: 5 }}>
                    <Col span={10} >
                        <div className="event-image-box">
                            {
                                <Slider
                                    {...sliderSettings}
                                    style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                                    autoplay
                                    autoplaySpeed={2000}
                                >
                                    {
                                        event?.listImage.map(e => {
                                            return (
                                                <div >
                                                    <img className="center" style={{ width: "100%", height: 500 }} key={e.id} src={e.link} />
                                                </div>)
                                        })
                                    }
                                </Slider>
                            }
                        </div>
                    </Col>
                    <Col span={14}>
                        <Row>
                            <div className="event-map-box" style={{ width: 1000, height: 600 }}>
                                {
                                    direction ? <CustomMap direction={direction} marker={<EventMarker item={event} setItem={() => { }} />} /> : null
                                }
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>
            : <Skeleton />}
    </>
}