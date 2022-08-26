import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

export const CustomCard = ({ colSpan, imgSrc, title, link }) => {
    let navigate = useNavigate();
    return <>
        <Col span={1}></Col>
        <Col
            span={colSpan}
            style={{ marginBottom: 20, marginTop: 20, border: '.5px solid #d8d9d7', background: 'white', borderRadius: 20, padding: 20 }}
            onClick={() => { navigate(`${link}`) }}
        >
            <Row align="middle" justify="center" >
                <div>
                    <img
                        height={'160px'}
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

        </Col>
        <Col span={1}></Col>
    </>
}