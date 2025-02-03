import { doneAnimation } from "../../../assets";
import LottiePlayer from "../LottiePlayer";

export function DoneAnimation() {
    return <LottiePlayer animation={doneAnimation} height={100} width={100} loop={false} />
}