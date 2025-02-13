import AppRouter, { RoutePaths } from "./providers/router/Router";
import { LoadingAnimation } from "../shared/ui/LottieAnimations";
import { useAppSelector } from "./providers/store";
import { Navigate, useLocation } from "react-router-dom";

export const Layout = () => {
  const location = useLocation()
  const { isLoading, errorMessage, authSuccess } = useAppSelector(
    state => state.app
  );

  if (errorMessage)
    return <p
        style={{
          textAlign: "center",
          fontSize: 24,
          position: "relative",
          top: "50%",
          transform: "translateY(-50%)"
        }}
      >
        {errorMessage}
      </p>
  else if (isLoading)
    return <LoadingAnimation />
  else if (!authSuccess && location.pathname != RoutePaths.noTgData)
    <Navigate to={{pathname: RoutePaths.noTgData}} />
  else
    return (
      <main>
        <AppRouter />
      </main>
    )  
};

export default Layout;
