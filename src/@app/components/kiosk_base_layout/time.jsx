import {
    ClockCircleOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { PRIMARY_COLOR } from "../../constants/colors";
const TimeView = () => {
    const [time, setTime] = useState(new Date().toLocaleString());
    useEffect(() => {
        setInterval(() => setTime(new Date().toLocaleString()), 1000);
    });
    return (
        <div
            style={{
                color: PRIMARY_COLOR,
                fontSize: 20,
                fontWeight:"bold"
            }}
        >
            <ClockCircleOutlined style={{ marginRight: 10 }} />
            {time}
        </div>
    )
}
export default TimeView