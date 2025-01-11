import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { AnimationPlayer, Button } from "../shared/ui";
import { loadingAnimation } from "../shared/assets";
import AppRouter, { RoutePaths } from "./providers/router/Router";
import { StateSchema } from "./providers/store";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { error, isLoggingIn } = useSelector(
    (state: StateSchema) => state.user
  );

  const isMainRoute = location.pathname === RoutePaths.ads;
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
      {!isMainRoute && (
        <div className="flex gap-12">
          <Button onClick={() => navigate(RoutePaths.ads)}>
            Go to Main
          </Button>
          <div className="relative">
            <h1 className="absolute top-1/2 left-1/2 text-[23px] -translate-x-1/2 -translate-y-1/2">
              {routeName.charAt(0).toUpperCase() + routeName.slice(1)}
            </h1>
          </div>
        </div>
      )}
      {isLoggingIn ? (
        <AnimationPlayer
          animationData={loadingAnimation}
          className="mt-[430px]"
          width={170}
          height={170}
        />
      ) : error ? (
        <p className="text-white">{error}</p>
      ) : (
        <AppRouter />
      )}
    </main>
  );
};

export default Layout;
