import { useSelector } from "react-redux";
import { Loading, NavBar } from "../shared/ui";
import AppRouter from "./providers/router/Router";
import { StateSchema } from "./providers/store";
// import { loadingAnimation } from "../shared/assets";
// import Lottie from "react-lottie";

export const Layout = () => {
  const { isLoading } = useSelector(
    (state: StateSchema) => state.app
  );

  if (isLoading)
    return <Loading />
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
