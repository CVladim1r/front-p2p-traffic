import { loadingAnimation } from "../../../assets";
import LottiePlayer from "../LottiePlayer";

type LoadingAnimationProps = {
    height?: number,
    width?: number
}

export function LoadingAnimation({height, width} : LoadingAnimationProps) {
    return <LottiePlayer animation={loadingAnimation} height={height ?? 300} width={width ?? 300} loop={true} />
}