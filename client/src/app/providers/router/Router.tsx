import { Suspense, memo, useCallback } from "react";
import { Route, Routes, type RouteProps } from "react-router-dom";
import {
  AddAdPage,
  AdsPage,

 
} from "../../../pages";

enum AppRoutes {
  ads = "ads",
  addad = "addad",

}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.addad]: "/add-ad",
  [AppRoutes.ads]: "/",

};

const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.ads]: {
    path: RoutePaths.ads,
    element: <AdsPage />,
  },
  [AppRoutes.addad]: {
    path: RoutePaths.addad,
    element: <AddAdPage />,
  },
};

function AppRouter() {
  const renderRoutes = useCallback((route: RouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Suspense fallback={<p className='text-white'>Loading...</p>}>
            {route.element}
          </Suspense>
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderRoutes)}</Routes>;
}

export default memo(AppRouter);
