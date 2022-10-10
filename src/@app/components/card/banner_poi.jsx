import { Col, Divider, Row } from "antd"
import { PRIMARY_COLOR } from "../../constants/colors"
import { convertTime } from "../../utils/date_util"
import "./styles.css"
export const PoiBannerCard = ({ poi }) => {
    console.log(poi)
    return <>
        <Row>
            <Col span={24} style={{
                backgroundColor: 'black',
                height: 350,
                backgroundImage: `url(${poi.banner ? poi.banner : 'https://img.timviec.com.vn/2021/07/banner-la-gi-5.jpg'})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>

            </Col>
            <Col span={24}>
                <Row span={24}>
                    <Col span={16}>
                        <div style={{ zIndex: 1, position: 'relative', width: '70%', color: "#000", marginTop: -240, marginLeft: 30, fontWeight: 'bold', fontSize: 16 }}>
                            <div className="banner-card-description">
                                <div dangerouslySetInnerHTML={{ __html: poi.description }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <div className="banner-card-baseinfo" style={{ marginTop: -250 }}>
                                <Row justify="center" align="middle" style={{ fontWeight: 'bold', fontSize: 28, fontFamily: '"Fern", serif', color: PRIMARY_COLOR }}>
                                    {poi.name}
                                </Row>
                                <Row >
                                    <Col span={5} style={{ fontWeight: 'bold', fontSize: 20 }}>
                                        Open time
                                    </Col>
                                    <Col offset={1} span={18} style={{ fontSize: 20 }}>
                                        {convertTime(poi.openTime.hours,
                                            poi.openTime.minutes,
                                            poi.openTime.seconds).format("HH:mm")} ~  {convertTime(poi.closeTime.hours,
                                                poi.closeTime.minutes,
                                                poi.closeTime.seconds).format("HH:mm")} <br />({poi.dayOfWeek.split('-').join(' - ')})
                                    </Col>
                                </Row>
                                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                                <Row>
                                    <Col span={5} style={{ fontWeight: 'bold', fontSize: 20 }}>
                                        Location
                                    </Col>
                                    <Col offset={1} span={18}>
                                        <p style={{ fontSize: 20 }}>
                                            {`${poi.address} - ${poi.ward} ${poi.district} ${poi.city} `}
                                        </p>
                                    </Col>
                                </Row>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Col>

        </Row>
    </>

}