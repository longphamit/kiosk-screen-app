import EventMarker from "./event_marker"
import { HereMarker } from "./here_marker";
import KioskMarker from "./kiosk_marker";
import POIMarker from "./poi_marker"
export const LocationMarker = ({ events, kioks, locations, setItem, currentLocation }) => {
    return <>
        {
            events.map((i) => (
                <EventMarker item={i} setItem={setItem} />
            ))
        }
        {
            locations.map((i) => (
                <POIMarker item={i} setItem={setItem} />
            ))
        }
        {
            kioks.map((i) => (
                <KioskMarker item={i} currentLocation={currentLocation} />
            ))
        }
        <> <HereMarker currentLocation={currentLocation} /></>
    </>
}
export default LocationMarker;