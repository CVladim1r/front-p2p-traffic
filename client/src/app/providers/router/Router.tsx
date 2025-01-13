import { Suspense, memo, useCallback } from "react";
import { Route, Routes, type RouteProps } from "react-router-dom";
import {
  AddAdPage,
  AdsPage,
  ProfileSettingsPage,
  ProfilePage,
  ChatsPage,
  InfoPage 
} from "../../../pages";

enum AppRoutes {
  ads = "ads",
  chats = "chats",
  addad = "addad",
  profile = "profile",
  profilesettings = "profilesettings",
  info = "info"
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.ads]: "/ads",
  [AppRoutes.chats]: "/chats",
  [AppRoutes.addad]: "/add-ad",
  [AppRoutes.profile]: "/",
  [AppRoutes.profilesettings]: "/settings",
  [AppRoutes.info]: "/info",
};

const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.ads]: {
    path: RoutePaths.ads,
    element: <AdsPage />,
  },
  [AppRoutes.chats]: {
    path: RoutePaths.chats,
    element: <ChatsPage />,
  },
  [AppRoutes.addad]: {
    path: RoutePaths.addad,
    element: <AddAdPage />,
  },
  [AppRoutes.profile]: {
    path: RoutePaths.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.profilesettings]: {
    path: RoutePaths.profilesettings,
    element: <ProfileSettingsPage />,
  },
  [AppRoutes.info]: {
    path: RoutePaths.info,
    element: <InfoPage />,
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

  return (
      <Routes>{Object.values(routeConfig).map(renderRoutes)}</Routes>
  )
}

export default memo(AppRouter);
