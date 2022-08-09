import { Carousel, Col, Divider, Image, Row, Skeleton, Spin } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPOIByIdService } from "../../services/poi_service";
import POIMarker from "../map/components/markers/poi_marker";
import { CustomMap } from "../../../@app/components/map/map";
import { convertTime } from "../../../@app/utils/date_util";

export const SpecificPOIPage = ({ }) => {
    const { id } = useParams();
    const [poi, setPOI] = useState();
    const getPOIFunction = async () => {
        try {
            let res = await getPOIByIdService(id);
            setPOI(res.data);
            console.log(res.data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPOIFunction();
    }, [])

    const contentStyle = {
        height: "300px",
        color: "#fff",
        lineHeight: "160px",
        textAlign: "center",
        contentAlign: "center",
        background: "#364d79",
        width: '40%'
    };
    return <>
        {poi ?
            <div style={{ height: "100vh" }}>
                <Row>
                    <Col span={24} style={{ backgroundColor: 'black' }}>
                        <img src={poi.thumbnail.link} alt="" height={250} width={1920} style={{ opacity: 0.6 }} />
                    </Col>
                    <div style={{ zIndex: 1, position: 'relative', width: '40%', color: 'white', marginTop: -200, marginLeft: 30, fontWeight: 'bold', fontSize: 16 }}>
                        <div dangerouslySetInnerHTML={{ __html: poi?.description }} />
                    </div>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Col offset={1} span={11} style={{ background: 'yellow' }}>
                        <Carousel
                            style={{ margin: 10, textAlign: "center", alignItems: "center" }}
                            autoplay
                            autoplaySpeed={2000}
                        >
                            {poi ? (
                                poi.listImage?.map((image) => {
                                    return (
                                        <div style={contentStyle}>
                                            <Image
                                                style={{ textAlign: "center" }}
                                                key={image.id}
                                                src={image.link}
                                            />
                                        </div>
                                    );
                                })
                            ) : (
                                <Spin className="center" />
                            )}
                        </Carousel>
                    </Col>
                    <Col span={12}>
                        <Row justify="center" align="middle">
                            <div style={{ backgroundColor: 'white', width: '600px', padding: 30, borderRadius: 20, boxShadow: ' 2px 2px 4px #303134', marginTop: -100 }}>
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
                            <div style={{ backgroundColor: 'black', width: '800px', height: '500px' }}>
                                <CustomMap marker={<POIMarker item={poi} setItem={() => { }} />} />
                            </div>
                        </Row>
                    </Col>
                </Row>

            </div>
            : <Skeleton />}
    </>
}