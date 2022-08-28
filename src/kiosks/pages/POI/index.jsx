import { Row} from "antd"
import { useEffect, useState } from "react"
import { CustomCard } from "../../../@app/components/card/custom_card";
import { EmptyCard } from "../../../@app/components/card/empty_card";
import { LoadingPageCard } from "../../../@app/components/card/loading_page_card";
import { CURRENT_LOCATION_LATITUDE, CURRENT_LOCATION_LONGITUDE } from "../../../@app/constants/key";
import { getPOINearbyService } from "../../services/poi_service";

export const AllPOIsPage = ({ }) => {
    const [POIs, setPOIs] = useState();
    const getPOIsFunction = async () => {
        try {
            let res = await getPOINearbyService(localStorage.getItem(CURRENT_LOCATION_LONGITUDE),
                localStorage.getItem(CURRENT_LOCATION_LATITUDE));
            setPOIs(res.data.data);
        } catch (e) {
            setPOIs([])
            console.error(e)
        }
    }
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getPOIsFunction();
    }, []);
    return <>
        <div style={{ height: "94vh" }}>
            <Row>
                {POIs ?
                    POIs.length !== 0 ?
                        <>
                            {POIs.map((e) => {
                                return <CustomCard colSpan={6} imgSrc={e.thumbnail.link} title={e.name} link={`/poi/${e.id}`} />
                            })}
                        </> : <>
                            <div style={{ width: '100%' }}>
                                <EmptyCard marginTop={250} />
                            </div>
                        </> :
                    <LoadingPageCard />
                }
            </Row>
        </div>

    </>
}

