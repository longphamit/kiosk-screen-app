import { Col, Row, Skeleton, Tag } from "antd"
import { STATUS_COMING_SOON, STATUS_ON_GOING } from "../../../../../@app/constants/event_constants";
import "./../../styles.css";
import { TagStyle } from "./utils";
const defaultImg = 'https://product.hstatic.net/1000068876/product/may-tra-cuu-thong-tin-kisok-32-goodm-grande_1e7f9647ea464053852d0f723cc7c4ad.png';
export const ListLocationInformation = ({ locations, setCurrentItem }) => {

    return <>
        <div className="list-location-infomation">
            {locations ?
                locations.map((e) => {
                    return <>
                        <div className="card-location-information" onClick={() => { setCurrentItem(e) }}>
                            <Row style={{ margin: '20px 20px' }}>
                                <Col span={18} style={{ marginRight: 15 }}>
                                    <div style={{ fontWeight: 'bold', fontSize: 20 }}>
                                        {e.name.length > 30 ? e.name.slice(0, 27) + '...' : e.name}
                                    </div>

                                    {e.timeStart ?
                                        <div className='list-info-tag'>
                                            {e.status === STATUS_COMING_SOON ? (
                                                <Tag color={"yellow"} >
                                                    <div style={TagStyle}>
                                                        Up coming
                                                    </div>
                                                </Tag>
                                            ) : e.status === STATUS_ON_GOING ?
                                                (
                                                    <Tag color={"green"}>
                                                        <div style={TagStyle}>
                                                            On going
                                                        </div>
                                                    </Tag>
                                                ) :
                                                (
                                                    <Tag color={"grey"}>
                                                        <div style={TagStyle}>
                                                            End
                                                        </div>
                                                    </Tag>
                                                )
                                            }
                                        </div > :
                                        e.poicategoryName ?
                                            <Tag color={"blue"} style={{ marginTop: 15 }}>
                                                <div style={TagStyle}>
                                                    {e.poicategoryName}
                                                </div>
                                            </Tag> : null
                                    }

                                </Col>
                                <Col span={4}>
                                    <img
                                        src={e.thumbnail ? e.thumbnail.link : defaultImg}
                                        style={{ width: 70, height: 70, borderRadius: 10 }}
                                    />
                                </Col>
                            </Row>
                        </div>
                    </>
                })
                : <Skeleton />
            }
        </div>
    </>
}