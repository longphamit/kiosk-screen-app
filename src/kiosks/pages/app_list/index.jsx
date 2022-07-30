import { Col, Form, Row, Spin, Typography } from "antd";
import "./styles.css";
import { Card } from "antd";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getListApplicationService } from "../../services/application_service";
import { getAppCategoryByIdService } from "../../services/app_category_service";
const { Title } = Typography;
const { Meta } = Card;

const AppListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [appCategory,setAppCategory]=useState()
  const [listApp, setListApp] = useState();
  const [id, setId] = useState(null);

  let navigate = useNavigate();
  const [form] = Form.useForm();
  const onNavigate = (url) => {
    navigate(url);
  };
  const getInitValue = async () => {
    let id = searchParams.get("id");
    if (id == null) {
      onNavigate("/././unauth");
      return;
    }
    try {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      const resAppCategory= await getAppCategoryByIdService(id);
      const res = await getListApplicationService(
        "",
        "",
        "",
        id,
        "",
        "",
        -1,
        1
      );
      setId(id);
      setListApp(res.data.data);
      setAppCategory(resAppCategory.data)
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(async () => {
    await getInitValue();
  }, []);
  return (
    <>
      <div style={{ margin: 40, height: '100vh' }}>
        <Col span={24}>
          <Row span={24}>
            <Col span={24}><Title style={{textAlign:"center",color:"#fff"}} className="center" level={2}>{appCategory?.name}</Title></Col>
          </Row>

          <div>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {listApp
                ? listApp.map((items) => {
                  return (
                    <Col xl={6} span={12}>
                      <div
                        className="app-box"
                        onClick={() => {
                          onNavigate({
                            pathname:
                              "/./iframe-interface?link=" +
                              items.link +
                              "&id=" +
                              id,
                          });
                        }}
                      >
                        <img
                          style={{ height: 200 }}
                          className="app-image"
                          alt="example"
                          src={items.logo}
                        />
                        <Meta
                          style={{ marginTop: 10, marginBottom: 10 }}
                          title={items.name}
                        />
                      </div>
                    </Col>
                  );
                })
                : <Spin size="large" className="center"/>}
            </Row>
          </div>
        </Col>
      </div>
    </>
  );
};
export default AppListPage;
