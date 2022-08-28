import { CustomMarker } from "./custom_marker";

const POIMarker = ({ item, setItem }) => {
    return <div>
        <div onClick={() => { setItem({ data: [item], type: 'poi' }) }}>
            <CustomMarker imgSrc={require("../../../../../assets/images/marker-2.png")} item={item} type='poi' />
        </div>
    </div>
}
export default POIMarker;