import { ClockCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { useEffect, useState } from "react";
const TimeView = () => {
  const [time, setTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    setInterval(
      () =>
        setTime(
          moment(new Date()).format("DD/MM/YYYY HH:mm").toLocaleString()
        ),
      1000
    );
  });
  return (
    <div
      style={{
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
      }}
    >
      <ClockCircleOutlined style={{ marginRight: 10 }} />
      {time}
    </div>
  );
};
export default TimeView;
