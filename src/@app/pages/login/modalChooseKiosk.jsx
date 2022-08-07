import { Button, Form, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../kiosks/layouts/form_layout";
import { KIOSK_ID, USER_ID } from "../../constants/key";
import { changeStatusKioskService, getListKioskService } from "../../services/kiosk_service";

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
      await changeStatusKioskService(values.Kiosk,true);
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
        title="Choose your kiosk"
        visible={isModalChooseKioskVisible}
        onCancel={handleCancelPoiInModal}
        footer={null}
      >
        <Form
          {...formItemLayout}
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
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
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
