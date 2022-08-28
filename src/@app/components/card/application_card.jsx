import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";
import './styles.css'
export const ApplicationCard = ({ app }) => {
    let navigator = useNavigate();
    return <Col xl={6} xs={4} offset={1}>

        <div
            className="app-box"
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
            <Row align="middle" justify="center" style={{ marginBottom: 10 }}>
                <img
                    style={{ height: 200 }}
                    className="app-image"
                    alt="example"
                    src={app.logo}
                />
            </Row>

            <label style={{ fontSize: 22, fontWeight: 'bold' }}>
                {app.name}
            </label>
        </div>
    </Col>
}