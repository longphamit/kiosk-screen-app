import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  formItemLayout,
  tailFormItemLayout,
} from "../../../kiosks/layouts/form_layout";
import { KIOSK_ID, USER_EMAIL, USER_ID } from "../../constants/key";
import { LENGTH_PASSWORD_REQUIRED } from "../../constants/number_constants";
import { signInService } from "../../services/auth_service";
import {
  changeStatusKioskService,
  getListKioskService,
} from "../../services/kiosk_service";

const ModalChangeCurrenKiosk = ({
  isChangeCurrentKioskModal,
  handleCancelModal,
}) => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [isLoading, setIsLoading] = useState(false);
  const [listKiosk, setListKiosk] = useState();
  const [isCorrectPassword, setIsCorrectPassword] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    form.resetFields();
  }, [isLoading]);

  const onFinishChooseKiosk = async (values) => {
    setIsLoading(true);
    try {
      const currenKiosk = localStorage.getItem(KIOSK_ID);
      await changeStatusKioskService(currenKiosk);

      localStorage.setItem(KIOSK_ID, values.Kiosk);
      await changeStatusKioskService(values.Kiosk);
      handleCancelModal();
      setIsCorrectPassword(false);
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
  const onFinishConfirmPassword = async (values) => {
    try {
      const userEmail = localStorage.getItem(USER_EMAIL);
      const userId = localStorage.getItem(USER_ID);
      const res = await signInService(userEmail, values.password);
      if (res.code === 200) {
        const res = await getListKioskService(userId, "deactivate", 1, -1);
        setListKiosk(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
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
