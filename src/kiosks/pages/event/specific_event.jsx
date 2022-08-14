import { Col, Divider, Row, Skeleton, Tag } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomMap } from "../../../@app/components/map/map";
import { getEventByIdService } from "../../services/event_service";
import moment from 'moment';
import { STATUS_COMING_SOON, STATUS_ON_GOING } from "../../../@app/constants/event_constants";
import EventMarker from "../map/components/markers/event_marker";
import { BannerCard } from "../../../@app/components/card/banner_card";
import { CarouselCard } from "../../../@app/components/card/carousel_card";
import Slider from "react-slick";
import { getDirectionGoongMapService } from "../../services/goong_map_service";
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
            setEvent({})
            console.error(e)
        }
    }

    useEffect(() => {
        getEventFunction();
    }, [])

    return <>
        {event ?
            <div style={{ height: "100%", marginBottom: 200 }}>
                <BannerCard item={event} />

                <Row style={{ marginTop: 50 }}>
                    <Col span={13} >
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
                                                    <img className="center" style={{ width: "90%", height: 500 }} key={e.id} src={e.link} />
                                                </div>)
                                        })
                                    }
                                </Slider>
                            }
                        </div>
                    </Col>
                    <Col span={11}>
                        <Row justify="center" align="middle" >
                            <div style={{ backgroundColor: 'white', width: '600px', padding: 30, borderRadius: 20, boxShadow: ' 2px 2px 4px #303134', marginTop: -250 }}>
                                <Row justify="center" align="middle" style={{ fontWeight: 'bold', fontSize: 18 }}>
                                    {event.name}
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4}>
                                        Start time
                                    </Col>
                                    <Col offset={1}>
                                        {moment(event.timeStart).format('HH:mm DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4}>
                                        End time
                                    </Col>
                                    <Col offset={1}>
                                        {moment(event.timeEnd).format('HH:mm DD/MM/YYYY')}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: 5 }}>
                                    <Col span={4}>
                                        Status
                                    </Col>
                                    <Col offset={1} span={17}>
                                        {event.status === STATUS_COMING_SOON ? (
                                            <Tag color={"yellow"} >
                                                <div style={{ padding: 5, fontWeight: 'bold' }}>
                                                    Up coming
                                                </div>
                                            </Tag>
                                        ) : event.status === STATUS_ON_GOING ?
                                            (
                                                <Tag color={"green"}>
                                                    <div style={{ padding: 5, fontWeight: 'bold' }}>
                                                        On going
                                                    </div>
                                                </Tag>
                                            ) :
                                            (
                                                <Tag color={"grey"}>
                                                    <div style={{ padding: 5, fontWeight: 'bold' }}>
                                                        End
                                                    </div>
                                                </Tag>
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                                <Row>
                                    <Col span={4}>
                                        Location
                                    </Col>
                                    <Col offset={1} span={17}>
                                        <p>
                                            {`${event.address} - ${event.ward} ${event.district} ${event.city} `}
                                        </p>
                                    </Col>
                                </Row>


                            </div>
                        </Row>
                        <Row>
                            <div className="event-map-box" style={{width: '800px', height: '400px' }}>
                                {
                                    direction?<CustomMap direction={direction} marker={<EventMarker item={event} setItem={() => { }} />} />:null
                                }
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>
            : <Skeleton />}
    </>
}