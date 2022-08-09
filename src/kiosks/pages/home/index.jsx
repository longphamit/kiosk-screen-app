import {
  Carousel,
  Col,
  Descriptions,
  Image,
  Modal,
  Rate,
  Row,
  Skeleton,
  Spin,
  Typography,
} from "antd";
import "./styles.css";
import { Card, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import useSelector from "../../../@app/hooks/use_selector";
import { PRIMARY_COLOR } from "../../../@app/constants/colors";
import { useEffect, useState } from "react";
import { getLocationByIdService } from "../../../@app/services/kiosk_location_service";
import { toast } from "react-toastify";
import { FaAngry, FaFrownOpen, FaGrinAlt, FaGrinBeam, FaGrinHearts, FaGrinStars } from 'react-icons/fa';
import {
  PhoneFilled,
  MailFilled,
  InfoCircleFilled,
  ArrowRightOutlined,
  Location,
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import ModalLocationDescription from "../kiosk_location/modalLocationDescrtiption";
import { getKioskInfoService, getKioskTemplate, getKioskTemplateService } from "../../services/kiosk_service";
import { Carousel as PrimeFaceCarousel } from "primereact/carousel";
import ScrollContainer from "react-indiana-drag-scroll";
import { SpecificEventLocation } from "../map/components/location-infomation/specfic-event-location";
import { getEventByIdService } from "../../services/event_service";
import { kioskRatingService } from "../../services/kiosk_rating_service";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, KIOSK_ID } from "../../../@app/constants/key";
import { getHomeBannerService } from "../../services/home_service";
const { Meta } = Card;
const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  contentAlign: "center",
  background: "#364d79",
};
const HomePage = () => {
  const [banners, setBanners] = useState()
  const getHomeBanner = async () => {
    const res = await getHomeBannerService();
    setBanners(res.data)
  }
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      localStorage.setItem(CURRENT_LOCATION_LATITUDE, position.coords.latitude)
      localStorage.setItem(CURRENT_LOCATION_LONGITUDE, position.coords.longitude)
      console.log(position)
    });
  }
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getHomeBanner();
    getCurrentLocation();
  }, []);
  const onClickBanner = (banner) => {
    if (banner.keyType === "app_image") {
      navigator(`/iframe-interface?id=${banner.keyId}`)
    }
    if (banner.keyType === "event_image") {
      alert("event_image")
    }
    if (banner.keyType === "poi_image") {

    }

  }

  return (
    <>
      <div style={{ marginTop: 10, marginLeft: 50, marginRight: 50, height: "100vh" }}>
        <Row>
          <Col span={24}>
            <Carousel
              style={{ margin: 10, textAlign: "center", alignItems: "center" }}
              autoplay
              autoplaySpeed={2000}
            >
              {banners?.map((image) => {
                return (
                  <div style={contentStyle}>
                    <Image
                      onClick={() => { onClickBanner(image) }}
                      style={{ textAlign: "center" }}
                      key={image.keyId}
                      src={image.link}
                    />
                  </div>
                );
              }
              )}
            </Carousel>
          </Col>
        </Row>

      </div>
    </>
  );
};
export default HomePage;
