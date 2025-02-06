import { NavBar } from "../shared/ui";
import AppRouter from "./providers/router/Router";
import { LoadingAnimation } from "../shared/ui/LottieAnimations";
import { useAppSelector } from "./providers/store";
import { NoTgDataPage } from "../pages";
import { Suspense } from "react";

export const Layout = () => {
  const { isLoading, errorMessage, noTgData } = useAppSelector(
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
  else if (noTgData)
    return (
      <Suspense fallback={<LoadingAnimation/>}>
        <NoTgDataPage />
      </Suspense>
    )
  else if (isLoading)
    return <LoadingAnimation />
  else
    return (
      <main>
        <div className="body">
          <AppRouter />
        </div>

        <NavBar />
      </main>
    )  
};

export default Layout;
