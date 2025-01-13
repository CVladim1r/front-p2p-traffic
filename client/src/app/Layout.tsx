import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { Button, NavBar } from "../shared/ui";
import { loadingAnimation } from "../shared/assets";
import AppRouter, { RoutePaths } from "./providers/router/Router";
import { StateSchema } from "./providers/store";
import Lottie from "react-lottie";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, isLoggingIn } = useSelector(
    (state: StateSchema) => state.user
  );

  const isMainRoute = location.pathname === RoutePaths.profile;
  const routeName = location.pathname.replace("/", "");


  return (
    <main
      className={classNames("px-4 py-6 bg-no-repeat", {
        "bg-[#918d88]": isLoggingIn,
      })}
      style={{
        backgroundSize: "cover",
        backgroundPositionX: "center",
        backgroundPositionY: isLoggingIn || error ? 50 : 0,
      }}
    >
      {/* {!isLoggingIn ? ( <></>
        // <Lottie
        //   options= {{animationData: {loadingAnimation}}}
        //   width={170}
        //   height={170}
        // />
      ) : error ? (
        <p className="text-white">{error}</p>
      ) : (
        <AppRouter />
      )} */
     <>
      <div className="body">
        <AppRouter />
      </div>

      <NavBar />
     </>
      }

    </main>
  );
};

export default Layout;
