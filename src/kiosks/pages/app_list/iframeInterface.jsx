import {
  Layout,
  Menu,
  Space,
  Dropdown,
  Row,
  Col,
  Modal,
  Form,
  Button,
} from "antd";
import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import "./styles.css";
import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formItemLayout } from "../../layouts/form_layout";

const { Header, Content, Sider } = Layout;

const IframeInterface = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [link, setLink] = useState(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const kioskId=localStorage.getItem("KIOSK_ID")
  let navigate = useNavigate();
  const onNavigate = (url) => {
    navigate(url);
  };

  const getInitValue = async () => {
    let link = searchParams.get("link");
    let id = searchParams.get("id");
    if (link == null) {
      onNavigate("/././unauth");
      return;
    }
    if (id == null) {
      onNavigate("/././unauth");
      return;
    }
    setId(id);
    setLink(link);
  };
  useEffect(async () => {
    await getInitValue();
  }, []);
  return (
    <Layout>
      <Row>
        <Col span={10}>
          {" "}
          <Button
            type="primary"
            danger
            onClick={() => {
              onNavigate({
                pathname: "/./app-list?id=" + id,
              });
            }}
          >
            Back
          </Button>
        </Col>
      </Row>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Layout style={{ height: "100%", width: "100%" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Iframe
              url={`${link}?kioskId=${kioskId}`}
              width="100%"
              height="100%"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Content>
        </Layout>
      </Row>
    </Layout>
  );
};
export default IframeInterface;
