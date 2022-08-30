import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  tailFormItemLayout,
} from "../../../kiosks/layouts/form_layout";
import {
  ACCESS_TOKEN,
  KIOSK_ID,
  USER_EMAIL,
  USER_FIRST_NAME,
  USER_ID,
} from "../../constants/key";
import { LENGTH_PASSWORD_REQUIRED } from "../../constants/number_constants";
import { logoutRedux } from "../../redux/stores";
import { signInService } from "../../services/auth_service";
import {
  changeStatusKioskService,
  getListKioskService,
} from "../../services/kiosk_service";
import { localStorageClearService } from "../../services/localstorage_service";

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
      await changeStatusKioskService(currenKiosk, true);

      localStorage.setItem(KIOSK_ID, values.Kiosk);
      await changeStatusKioskService(values.Kiosk, true);
      handleCancelModal();
      setIsCorrectPassword(false);
      navigate("/home-page");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };
  const handleCancelPoiInModal = () => {
    handleCancelModal();
  };
  const onFinishConfirmPassword = async (values) => {
    setIsLoading(true);
    try {
      const userEmail = localStorage.getItem(USER_EMAIL);
      const userId = localStorage.getItem(USER_ID);
      const res = await signInService(userEmail, values.password);
      localStorage.setItem(ACCESS_TOKEN, res.data.token);
      localStorage.setItem(USER_ID, res.data.id);
      localStorage.setItem(USER_EMAIL, res.data.email);
      localStorage.setItem(USER_FIRST_NAME, res.data.firstName);
      if (res.code === 200) {
        const res = await getListKioskService(userId, "deactivate", 1, -1);
        let temp = res.data.data.filter(e => e.kioskLocationId != null)
        setListKiosk(temp);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsCorrectPassword(true);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const currenKiosk = localStorage.getItem(KIOSK_ID);
      if (currenKiosk) {
        await changeStatusKioskService(currenKiosk, false);
      }
      localStorageClearService();
      logoutRedux();
      navigate("/signin");
    } catch (error) {
      localStorageClearService();
      logoutRedux();
      navigate("/signin");
      console.log(error);
    } finally {
      setIsLoading(false);
      window.location.reload();
    }
  };
  return (
    <>
      {isCorrectPassword ? (
        <Modal
          visible={isChangeCurrentKioskModal}
          onCancel={handleCancelPoiInModal}
          footer={null}
        >
          <Form
            style={{ margin: '50px 30px 0px 30px' }}
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
                <Row style={{ marginTop: 10 }}>
                  <Col span={6}>
                    <Button type="primary" htmlType="submit">
                      OK
                    </Button>
                  </Col>
                  <Col span={6}>
                    <Button type="primary" onClick={() => logout()}>
                      Log Out
                    </Button>
                  </Col>
                </Row>
              )}
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Modal
          visible={isChangeCurrentKioskModal}
          onCancel={handleCancelPoiInModal}
          footer={null}
        >
          <Form
            style={{ margin: '50px 30px 0px 30px' }}
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
            <Row align="middle" justify="center">
              <Form.Item>
                {isLoading ? (
                  <Spin />
                ) : (
                  <Button type="primary" htmlType="submit" style={{ marginTop: 10 }}>
                    OK
                  </Button>
                )}
              </Form.Item>
            </Row>
          </Form>
        </Modal>
      )
      }
    </>
  );
};
export default ModalChangeCurrenKiosk;
