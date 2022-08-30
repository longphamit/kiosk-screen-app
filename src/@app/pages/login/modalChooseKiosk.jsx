import { Button, Col, Form, Modal, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, KIOSK_ID, USER_ID } from "../../constants/key";
import { changeStatusKioskService, getKioskByIdService, getListKioskService, updateKioskService } from "../../services/kiosk_service";
import { localStorageClearService } from "../../services/localstorage_service";
import kiosk_img from './../../../assets/images/kiosk_empty.webp';

const ModalChooseKiosk = ({
  isModalChooseKioskVisible,
  handleCancelModal,
  partyId
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [listKiosk, setListKiosk] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const onFinishChooseKiosk = async (values) => {
    setIsLoading(true);
    try {
      localStorage.setItem(KIOSK_ID, values.Kiosk);
      try {
        await changeStatusKioskService(values.Kiosk, true);
        const res = await getKioskByIdService(values.Kiosk)
        console.log(res)
        navigator.geolocation.getCurrentPosition(async (position) => {
          localStorage.setItem(CURRENT_LOCATION_LATITUDE, position.coords.latitude)
          localStorage.setItem(CURRENT_LOCATION_LONGITUDE, position.coords.longitude)
          updateKioskService(values.Kiosk, res.data.name, position.coords.longitude, position.coords.latitude, res.data.kioskLocationId);
        });
        navigate("/home-page");
      } catch (e) {
        console.error(e)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCancelPoiInModal = () => {
    handleCancelModal();
  };
  const getListKiosk = async () => {
    try {
      const res = await getListKioskService(
        partyId,
        "deactivate",
        1,
        -1
      );
      setListKiosk(res.data.data.filter(e => e.kioskLocationId != null));
    } catch (e) {
      console.error(e)
      // No kiosk active
      if (e.response.status === 404) {
        localStorageClearService()
      }
    }
  }

  useEffect(() => {
    getListKiosk();
  }, []);
  return (
    <>
      <Modal
        visible={isModalChooseKioskVisible}
        onCancel={handleCancelPoiInModal}
        footer={null}
      >
        {
          listKiosk.length === 0 ?
            <div>
              <Row align="middle" justify="center">
                <img src={kiosk_img} alt="" width={400} height={400} />
                <div style={{ color: 'red', fontStyle: 'italic', fontSize: "16px", textAlign: 'center', marginTop: -20, marginBottom: 50 }}>
                  *No kiosk is available. Please check your kiosk at the managment web.
                </div>
              </Row>
            </div> :
            <Form
              style={{ margin: 30 }}
              form={form}
              name="chooseKiosk"
              onFinish={onFinishChooseKiosk}
              scrollToFirstError
            >
              <Form.Item
                name="Kiosk"
                label="Kiosk"
                rules={[
                  {
                    required: true,
                    message: "Please choose your kiosk!",
                  },
                ]}
              >
                <Select name="selectProvince">
                  {listKiosk
                    ? listKiosk.map((item) => (
                      item.kioskLocationId ? <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option> : null
                    ))
                    : null}
                </Select>
              </Form.Item>
              <Row align="center" justify="middle" >
                <Form.Item >
                  {isLoading ? (
                    <Spin />
                  ) : (
                    <Button type="primary" htmlType="submit">
                      Launch
                    </Button>
                  )}
                </Form.Item>
              </Row>
            </Form>
        }
      </Modal>
    </>
  );
};
export default ModalChooseKiosk;
