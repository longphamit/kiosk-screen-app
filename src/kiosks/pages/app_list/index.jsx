import { Col, Form, Row, Typography } from "antd";
import "./styles.css";
import { Card } from "antd";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListApplicationService } from "../../services/application_service";
const { Title } = Typography;
const { Meta } = Card;

const AppListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listApp, setListApp] = useState([]);
  const [id, setId] = useState(null);

  let navigate = useNavigate();
  const [form] = Form.useForm();
  const onNavigate = (url) => {
    navigate(url);
  };

  const getInitValue = async () => {
    let id = searchParams.get("id");
    if (id == null) {
      onNavigate("/././unauth");
      return;
    }
    try {
      const res = await getListApplicationService(
        "",
        "",
        "",
        id,
        "",
        "",
        -1,
        1
      );
      setId(id);
      setListApp(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(async () => {
    await getInitValue();
  }, []);
  return (
    <>
      <div style={{ margin: 40 }}>
        <Col span={24}>
          <Row span={24}>
            <Title level={2}>App List</Title>
          </Row>

          <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {listApp
                ? listApp.map((items) => {
                    return (
                      <Col xl={6} span={12}>
                        <div
                          className="app-box"
                          onClick={() => {
                            onNavigate({
                              pathname:
                                "/./iframe-interface?link=" +
                                items.link +
                                "&id=" +
                                id,
                            });
                          }}
                        >
                          <img
                            style={{ height: 100 }}
                            className="app-image"
                            alt="example"
                            src={items.logo}
                          />
                          <Meta
                            style={{ marginTop: 10, marginBottom: 10 }}
                            title={items.name}
                          />
                        </div>
                      </Col>
                    );
                  })
                : null}
            </Row>
          </div>
        </Col>
      </div>
    </>
  );
};
export default AppListPage;
