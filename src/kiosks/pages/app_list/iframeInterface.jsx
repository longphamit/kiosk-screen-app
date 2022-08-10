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
  Affix,
} from "antd";
import { ArrowLeftOutlined, DownOutlined } from "@ant-design/icons";
import "./styles.css";
import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { useNavigate, useSearchParams } from "react-router-dom";
import { formItemLayout } from "../../layouts/form_layout";
import useDispatch from "../../../@app/hooks/use_dispatch";
import { hide, show } from "../../../@app/redux/slices/back_button_slice";

const { Header, Content, Sider } = Layout;

const IframeInterface = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [link, setLink] = useState(null);
  const [id, setId] = useState(null);
  const [form] = Form.useForm();
  const [top, setTop] = useState(10);
  const [bottom, setBottom] = useState(10);
  const kioskId = localStorage.getItem("KIOSK_ID")
  const dispatch = useDispatch()
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
    dispatch(show({ backToPageUrl: "/./app-list?id=" + id, isBackButton: true }))
  };
  useEffect(() => {
    getInitValue();
    return () => {
      console.log("hello cleaned")
      dispatch(hide())
    }
  }, []);
  return (
    <Layout>

      <Row style={{ height: "100vh" }}>
  
        <Col span={24}>
          <div className="iframe-app-box">
            <Iframe
              url={`${link}?kioskId=${kioskId}&serviceApplicationId=${id}`}
              width="100%"
              height="100%"
              id="myId"
              display="initial"
              position="relative"
            />
          </div>
        </Col>

      </Row>
      {/* <Affix offsetBottom={bottom}>
        <Button type="primary" onClick={() => setBottom(bottom + 10)}>
          Affix bottom
        </Button>
      </Affix> */}
    </Layout>
  );
};
export default IframeInterface;
