import {
    ClockCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";

const TimeView = () => {
    const [time, setTime] = useState(new Date().toLocaleString());
    useEffect(() => {
        setInterval(() => setTime(new Date().toLocaleString()), 1000);
    });
    return (
        <div
            style={{
                color: "#fff",
                fontSize: 20,
                fontWeight:"bold"
            }}
        >
            <ClockCircleOutlined style={{ marginRight: 10 }} />
            {moment(time).format('DD/MM/YYYY HH:mm')}
        </div>
    )
}
export default TimeView