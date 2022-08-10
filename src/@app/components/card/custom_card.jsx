import { Button, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

export const CustomCard = ({ colSpan, imgSrc, title, link }) => {
    let navigate = useNavigate();
    return <>
        <Col span={1}></Col>
        <Col span={colSpan} style={{ marginBottom: 50, border: '.5px solid #d8d9d7', background: 'white', borderRadius: 10 }}>
            <Row align="middle" justify="center" >
                <div>
                    <img
                        height={'250px'}
                        width={'100%'}
                        alt="example"
                        src={imgSrc}
                    />
                </div>
            </Row>
            <Row align="middle" justify="center" >
                <p style={{ fontWeight: 'bold', fontSize: 18, marginTop: 15 }}>
                    {title}
                </p>
            </Row>
            <Row align="middle" justify="center" >
                <Button type="primary" style={{ borderRadius: 15, padding: '0px 50px ', marginBottom: 15 }} onClick={() => { navigate(`${link}`) }}>
                    See More
                </Button>
            </Row>
        </Col>
        <Col span={1}></Col>
    </>
}