import Lottie, { LottieProps } from "react-lottie";

type LottiePlayerProps = {
    animation: any,
    height: number,
    width: number,
    loop: boolean,
}

export default function LottiePlayer({animation, loop, ...otherProps}: LottiePlayerProps) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        }}>
            <Lottie
                options={{
                    loop,
                    autoplay: true,
                    animationData: animation,
                    rendererSettings: {
                        preserveAspectRatio: "xMidYMid slice",
                    }
                }}
                isClickToPauseDisabled={true}
                {...otherProps}
            />
        </div>
    )
}