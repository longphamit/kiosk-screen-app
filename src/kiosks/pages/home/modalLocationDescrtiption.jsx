import { Modal } from "antd";

const ModalLocationDescription=({description,visible, onCancelModalLocation})=>{
    return <>
        <Modal footer={[]} width = {1030}  visible={visible} onCancel={onCancelModalLocation}>
            <div style={{width:1000,padding:20}}>
                {
                   <div  dangerouslySetInnerHTML={{ __html: description }} />
                }
            </div>
        </Modal>
    </>
}
export default ModalLocationDescription;