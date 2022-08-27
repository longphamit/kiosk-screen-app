import { Col } from "antd";
import { useNavigate } from "react-router-dom";
import './styles.css'
export const ApplicationCard = ({ app }) => {
    let navigator = useNavigate();
    return <Col xl={8} xs={5} offset={1}>
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
            <img
                style={{ height: 200 }}
                className="app-image"
                alt="example"
                src={app.logo}
            />
            <label style={{ fontSize: 22, fontWeight: 'bold' }}>
                {app.name}
            </label>
        </div>
    </Col>
}