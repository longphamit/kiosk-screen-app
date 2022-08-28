import { Button, Col, Result, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { localStorageGetUserIdService } from "../../services/localstorage_service";

const NotFoundPage: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div style={{ marginTop: 100 }}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <>
            {localStorageGetUserIdService() ? (
              <Button
                style={{ margin: 10 }}
                type="primary"
                onClick={() => navigate("/home-page")}
              >
                Home
              </Button>
            ) : (
              <>
                <Button
                  style={{ margin: 10 }}
                  type="primary"
                  onClick={() => navigate("/signin")}
                >
                  Sign in
                </Button>
              </>
            )}
          </>
        }
      />
    </div>
  );
};
export default NotFoundPage;
