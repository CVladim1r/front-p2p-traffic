import { useSelector } from "react-redux";
import classNames from "classnames";
import { NavBar } from "../shared/ui";
import AppRouter from "./providers/router/Router";
import { StateSchema } from "./providers/store";
// import { loadingAnimation } from "../shared/assets";
// import Lottie from "react-lottie";

export const Layout = () => {
  const { error, isLoggingIn } = useSelector(
    (state: StateSchema) => state.user
  );

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
