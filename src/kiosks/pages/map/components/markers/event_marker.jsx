import { CustomMarker } from "./custom_marker";
const EventMarker = ({ item, setItem }) => {
    return <div>
        <div onClick={() => { setItem({ data: [item], type: 'event' }) }}>
            <CustomMarker imgSrc={require("../../../../../assets/images/event-marker.png")} item={item} type='event' />
        </div>
    </div>
}
export default EventMarker;