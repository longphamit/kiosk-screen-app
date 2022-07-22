import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../kiosks/layouts/form_layout";
import { KIOSK_ID, USER_ID } from "../../constants/key";
import { LENGTH_PASSWORD_REQUIRED } from "../../constants/number_constants";
import { localStorageGetUserIdService } from "../../services/localstorage_service";

const ModalChangeCurrenKiosk = ({
  isChangeCurrentKioskModal,
  handleCancelModal,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  const [userPassWord, setUserPassword] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    form.resetFields();
  }, []);

  const onFinishChooseKiosk = async (values) => {
    setIsLoading(true);
    try {
      if (true) {
        localStorage.setItem(KIOSK_ID, "abc");
        handleCancelModal();
        setIsCorrectPassword(false);
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
  const onFinishConfirmPassword = (values) => {
    const userId = localStorageGetUserIdService();
    console.log(userId);
    setUserPassword("1234567");
    if (values.password === userPassWord) {
      setIsCorrectPassword(true);
    }
  };
  return (
    <>
      {isCorrectPassword ? (
        <Modal
          title="Choose your kiosk"
          visible={isChangeCurrentKioskModal}
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
      ) : (
        <Modal
          title="Confirm password"
          visible={isChangeCurrentKioskModal}
          onCancel={handleCancelPoiInModal}
          footer={null}
        >
          <Form
            {...formItemLayout}
            form={form}
            name="confirmPassword"
            onFinish={onFinishConfirmPassword}
            scrollToFirstError
          >
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  type: "string",
                  min: LENGTH_PASSWORD_REQUIRED,
                },
              ]}
            >
              <Input.Password />
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
      )}
    </>
  );
};
export default ModalChangeCurrenKiosk;
