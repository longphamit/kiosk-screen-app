import {
  Layout,
  Row,
  Col,
} from "antd";
import "./styles.css";
import { useState, useEffect } from "react";
import Iframe from "react-iframe";
import { useNavigate, useSearchParams } from "react-router-dom";
import useDispatch from "../../../@app/hooks/use_dispatch";
import { hide, show } from "../../../@app/redux/slices/back_button_slice";
import { getApplicationByIdService } from "../../services/application_service";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";

const IframeInterface = () => {
  const [searchParams] = useSearchParams();
  const [link, setLink] = useState();
  const [id, setId] = useState();
  const kioskId = localStorage.getItem("KIOSK_ID")
  const dispatch = useDispatch()
  let navigate = useNavigate();
  const onNavigate = (url) => {
    navigate(url);
  };

  const getInitValue = async () => {
    let link = searchParams.get("link");
    let id = searchParams.get("id");
    if (id == null) {
      onNavigate("/././unauth");
      return;
    }
    if (link == null) {
      // getLink
      try {
        let res = await getApplicationByIdService(id);
        setLink(res.data.data[0].serviceApplicationLink)
      } catch (e) {
        console.error(e);
        setLink('')
      }
    } else {
      setLink(link);
    }
    setId(id);
    if (link !== null && link.length !== 0) {
      dispatch(show({ backToPageUrl: "/./app-list?id=" + id, isBackButton: true }))
    }
  };
  function handleBlur() {
    console.log("document blurred");
  }

  function handleFocus() {
    console.log("document focused");
  }
  useEffect(() => {
    getInitValue();
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      dispatch(hide())
    };
  }, []);
  return (
    <Layout>
      <Row style={{ height: "100vh" }}>
        {link && id ?
          link.length === 0 ?
            <></> :
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
          :
          <LoadingPageCard />
        }
      </Row>

    </Layout>
  );
};
export default IframeInterface;
