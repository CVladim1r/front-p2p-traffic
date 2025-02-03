import { NavBar } from "../shared/ui";
import AppRouter from "./providers/router/Router";
import { LoadingAnimation } from "../shared/ui/LottieAnimations";
import { useAppSelector } from "./providers/store";
// import { loadingAnimation } from "../shared/assets";
// import Lottie from "react-lottie";

export const Layout = () => {
  const { isLoading, error } = useAppSelector(
    state => state.app
  );

  if (error)
    return <p>error: {error}</p>
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
