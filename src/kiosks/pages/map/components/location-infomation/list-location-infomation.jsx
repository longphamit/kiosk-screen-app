import { Col, Row } from "antd"
import { useEffect, useState } from "react";
import "./../../styles.css";

const defaultImg = 'https://product.hstatic.net/1000068876/product/may-tra-cuu-thong-tin-kisok-32-goodm-grande_1e7f9647ea464053852d0f723cc7c4ad.png';
export const ListLocationInformation = ({ locations, setCurrentItem }) => {
    useEffect(() => {
        console.log(locations)
    }, []);
    return <>
        <div className="list-location-infomation">
            {locations.map((e) => {
                return <>
                    <div className="card-location-information" onClick={() => { setCurrentItem(e) }}>
                        <Row style={{ margin: '20px 20px' }}>
                            <Col span={16} style={{ marginRight: 15 }}>
                                <div style={{ fontWeight: 'bold' }}>
                                    {e.name.length > 23 ? e.name.slice(0, 20) + '...' : e.name}
                                </div>
                                <p>
                                    {e.description?.length > 23 ? e.description.slice(0, 20) + '...' : e.description}
                                </p>
                            </Col>
                            <Col span={6}>
                                <img
                                    src={e.thumbnail ? e.thumbnail.link : defaultImg}
                                    style={{ width: 70, height: 70 }}
                                />
                            </Col>
                        </Row>
                    </div>
                </>
            })}
        </div>
    </>
}