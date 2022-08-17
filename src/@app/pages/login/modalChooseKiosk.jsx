import { Button, Form, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../kiosks/layouts/form_layout";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE, KIOSK_ID, USER_ID } from "../../constants/key";
import { changeStatusKioskService, getKioskByIdService, getListKioskService, updateKioskService } from "../../services/kiosk_service";

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
      await changeStatusKioskService(values.Kiosk, true);
      const res = await getKioskByIdService(values.Kiosk)
      console.log(res)
      navigator.geolocation.getCurrentPosition(async (position) => {
        localStorage.setItem(CURRENT_LOCATION_LATITUDE, position.coords.latitude)
        localStorage.setItem(CURRENT_LOCATION_LONGITUDE, position.coords.longitude)
        updateKioskService(values.Kiosk, res.data.name, position.coords.longitude, position.coords.latitude, res.data.kioskLocationId);
      });
      navigate("/home-page");
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
      setListKiosk(res.data.data);

    } catch (e) {
      console.log(e)
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
        <Form
          style={{margin:30}}
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

          <Form.Item {...tailFormItemLayout}>
            {isLoading ? (
              <Spin />
            ) : (
              <Button type="primary" htmlType="submit">
                OK
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ModalChooseKiosk;
