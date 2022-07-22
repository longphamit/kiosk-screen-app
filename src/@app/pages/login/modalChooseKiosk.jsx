import { Button, Form, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../kiosks/layouts/form_layout";
import { KIOSK_ID } from "../../constants/key";

const ModalChooseKiosk = ({ isModalChooseKioskVisible, handleCancelModal }) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinishChooseKiosk = async (values) => {
    setIsLoading(true);
    try {
      if (true) {
        localStorage.setItem(KIOSK_ID, "abc");
        navigate("/home-page");
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
              <Option key="1" value="1">
                1
              </Option>
              {/* {listProvinces
                ? listProvinces.map((item) => (
                    <Option key={item.code} value={item.code}>
                      {item.name}
                    </Option>
                  ))
                : null} */}
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
