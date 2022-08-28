import { Modal, Statistic } from "antd";
import { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { BsCheckCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import useDispatch from "../../hooks/use_dispatch";
import { setSelectedIcon } from "../../redux/slices/bar_slice";
import { ProgressBar } from 'primereact/progressbar';
const TIME_OUT_DETECT_IDLE_TIME = 1 * 1000 * 5 * 60;
const TIME_LIMIT_DETECT = 1 * 1000 * 30;
const { Countdown } = Statistic;
const IdleDetect = () => {
    const [isShowModalConfirm, setShowModalConfirm] = useState(false)
    const [valProgress, setValProgress] = useState(0)
    const navigate = useNavigate()
    const [keyModal, setKeyModal] = useState()
    const [confirmTimeout, setConfirmTimeout] = useState()
    const dispatch = useDispatch()
    const onPrompt = () => {
        // Fire a Modal Prompt
    };
    const onIdle = () => {
        if (!window.location.href.includes("home-page") && !isShowModalConfirm) {
            setKeyModal(uuidv4())
            setShowModalConfirm(true)
            setConfirmTimeout(setTimeout(() => {
                setShowModalConfirm(false)
                navigate("/home-page")
                dispatch(setSelectedIcon("HOME"))
                window.location.reload()
            }, TIME_LIMIT_DETECT))
        }
    };

    const onActive = (event) => { };

    const onAction = (event) => {
        console.log("on action")
    };
    useEffect(() => {

    }, []);

    const {
        start,
        reset,
        activate,
        pause,
        resume,
        isIdle,
        isPrompted,
        isLeader,
        getTabId,
        getRemainingTime,
        getElapsedTime,
        getLastIdleTime,
        getLastActiveTime,
        getTotalIdleTime,
        getTotalActiveTime,
    } = useIdleTimer({
        onPrompt,
        onIdle,
        onActive,
        onAction,
        timeout: TIME_OUT_DETECT_IDLE_TIME,
        promptTimeout: 0,
        events: [
            "mousemove",
            "keydown",
            "wheel",
            "DOMMouseScroll",
            "mousewheel",
            "mousedown",
            "touchstart",
            "touchmove",
            "MSPointerDown",
            "MSPointerMove",
            "visibilitychange",
        ],
        immediateEvents: [],
        debounce: 0,
        throttle: 0,
        eventsThrottle: 200,
        element: document,
        startOnMount: true,
        startManually: false,
        stopOnIdle: false,
        crossTab: false,
        name: "idle-timer",
        syncTimers: 0,
        leaderElection: false,
    });
    const notChange = () => {
        setShowModalConfirm(false);
        clearTimeout(confirmTimeout)
        setValProgress(0)
    }
    return (<>
        {keyModal ?
            <Modal key={keyModal} id="idle-detec-modal" style={{ borderRadius: 30 }} footer={[]} visible={isShowModalConfirm} onCancel={() => { notChange() }}>
                <div onClick={() => { notChange() }} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 50, fontWeight: "bold", color: "#3eafcf" }}>Are you still here ?</div>
                    <div style={{ fontSize: 200, padding: 10, margin: 30, color: "#3eafcf", borderRadius: 400, }}>
                        <BsCheckCircleFill />
                    </div>
                    <div>
                        <div style={{ fontWeight: "bold", fontSize: 20, color: "#3eafcf" }}>The screen will navigate to Home after...</div>
                        <Countdown key={keyModal} on style={{ fontSize: 30 }} title="" value={Date.now() + TIME_LIMIT_DETECT} onChange={val => {
                        }} />
                    </div>
                    <div style={{ marginTop: 30 }}>
                        <ProgressBar mode="indeterminate" color="#3eafcf" style={{ height: '6px' }}></ProgressBar>
                    </div>
                </div>
            </Modal> : null}
    </>)
}
export default IdleDetect;