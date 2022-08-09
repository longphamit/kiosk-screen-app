import { Button, Col, Row, Skeleton } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CustomCard } from "../../../@app/components/card/custom_card";
import { EmptyCard } from "../../../@app/components/card/empty_card";
import { getPOINearbyService } from "../../services/poi_service";

const long = '106.7644724';
const lat = '10.8578179'
export const AllPOIsPage = ({ }) => {
    const [POIs, setPOIs] = useState();
    const getPOIsFunction = async () => {
        try {
            let res = await getPOINearbyService(long, lat);
            setPOIs(res.data.data);
        } catch (e) {
            setPOIs([])
            console.error(e)
        }
    }
    useEffect(() => {
        getPOIsFunction();
    }, []);
    return <>
        <div style={{ height: "100vh" }}>
            <Row>
                {POIs ?
                    POIs.length !== 0 ?
                        <>
                            {POIs.map((e) => {
                                return <CustomCard colSpan={7} imgSrc={e.thumbnail.link} title={e.name} link={`/poi/${e.id}`} />
                            })}
                        </> : <>
                            <EmptyCard marginTop={250} />
                        </> :
                    <Skeleton />
                }

            </Row>
        </div>

    </>
}

