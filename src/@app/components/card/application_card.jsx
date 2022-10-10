import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import './styles.css'
export const ApplicationCard = ({ app, colSpan = 7 }) => {
    let navigator = useNavigate();
    return <Col span={colSpan} offset={1} style={{
        marginBottom: colSpan === 10 ? 10 : 50,
        marginTop: colSpan === 10 ? 10 : 50,
    }}>
        <div
            style={{
                marginBottom: 10,
                marginTop: 15,
                marginRight: 30,
                border: '.5px solid #d8d9d7',
                background: 'white',
                borderRadius: 20,
                padding: 20
            }}
            onClick={() => {
                navigator({
                    pathname:
                        "/./iframe-interface?link=" +
                        app.link +
                        "&id=" +
                        app.id,
                });
            }}
        >
            <Row align="middle" justify="center" style={{ marginBottom: 10, padding: '10px 50px 20px 50px' }}>
                <img
                    height={colSpan === 10 ? '160px' : '160px'}
                    width={colSpan === 10 ? '160px' : '160px'}
                    alt="example"
                    src={app.logo}
                />
            </Row>
            <Row align="middle" justify="center" >
                <label style={{ fontSize: 22, fontWeight: 'bold' }}>
                    {app.name}
                </label>
            </Row>

        </div>
    </Col>
}