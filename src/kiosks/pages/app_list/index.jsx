import { Col, Form, Image, Modal, Row, Typography } from "antd";
import "./styles.css";
import { Card, Avatar } from "antd";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Iframe from "react-iframe";
import { getListApplicationService } from "../../services/application_service";
import { formItemLayout } from "../../layouts/form_layout";
const { Title } = Typography;
const { Meta } = Card;

const style = { background: "#0092ff", padding: "8px 0" };

const AppListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listApp, setListApp] = useState([]);
  const [isIframe, setIsIframe] = useState(false);
  const [linkIframe, setLinkIframe] = useState([]);

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
      setListApp(res.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const showIframe = () => {
    setIsIframe(true);
  };

  const cancelIframe = () => {
    setIsIframe(false);
  };

  useEffect(async () => {
    await getInitValue();
  }, []);
  const navigator = useNavigate();
  return (
    <>
      <Modal title="" visible={isIframe} onCancel={cancelIframe} footer={null}>
        <Form {...formItemLayout} form={form} name="iframe" scrollToFirstError>
          <Iframe
            url={linkIframe}
            width="600px"
            height="600px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Form>
      </Modal>
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
                            showIframe();
                            setLinkIframe(items.link);
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
