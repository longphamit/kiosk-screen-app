import { Divider } from "antd"
import Meta from "antd/lib/card/Meta"

export const AppCategoryCard = ({ cate, onAppCateClick }) => {

    const CateBoxStyle = {
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingTop: 10,
        marginTop: 30,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        textAlign: 'center'
    }

    const CateImage = {
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block',
        width: 100
    }
    return < div
        style={CateBoxStyle}
        onClick={() => {
            onAppCateClick(cate.id)
        }}
    >
        <img
            style={CateImage}
            alt="example"
            src={cate.logo}
        />
        <Meta
            style={{ marginTop: 10, marginBottom: 10 }}
            title={<label style={{ fontSize: 22 }}>{cate.name}</label>}
        />
        <Divider />
    </div >
}