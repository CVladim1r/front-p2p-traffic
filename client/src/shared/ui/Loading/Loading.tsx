import Lottie from "react-lottie";
import { loadingAnimation } from "../../assets";

export function Loading() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }}>
            <Lottie
                options={{
                    loop: true,
                    autoplay: true,
                    animationData: loadingAnimation,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                    }
                }}
                height={300}
                width={300}
                isClickToPauseDisabled={true}
            />
        </div>
    )
}