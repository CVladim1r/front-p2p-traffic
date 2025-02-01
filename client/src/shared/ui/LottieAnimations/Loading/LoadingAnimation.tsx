import { loadingAnimation } from "../../../assets";
import LottiePlayer from "../LottiePlayer";

export function LoadingAnimation() {
    return <LottiePlayer animation={loadingAnimation} height={300} width={300} loop={true} />
}