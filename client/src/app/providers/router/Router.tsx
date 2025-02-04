import { Suspense, memo, useCallback } from "react";
import { Route, Routes, type RouteProps, Navigate } from "react-router-dom";
import {
  AddAdPage,
  AdsPage,
  ProfileSettingsPage,
  ProfilePage,
  ChatsPage,
  InfoPage, 
  MoneyChangePage,
  ChatPage,
  AddAdDonePage,
  MoneyAddDonePage,
  MoneyRemoveDonePage,
  PreviewAddAdPage
} from "../../../pages";
import { LoadingAnimation } from "../../../shared/ui";

enum AppRoutes {
  root = "root",
  ads = "ads",
  chats = "chats",
  chat = "chat",
  addAd = "addAd",
  profile = "profile",
  profileSettings = "profileSettings",
  info = "info",
  moneyAdd = "moneyAdd",
  moneyRemove = "moneyRemove",
  previewAd = "previewAd",
  addAdDone = "addAdDone",
  moneyAddDone = "moneyAddDone",
  moneyRemoveDone = "moneyRemoveDone",
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.root]: "/",
  [AppRoutes.ads]: "/ads",
  [AppRoutes.chats]: "/chats",
  [AppRoutes.chat]: "/chats/:id",
  [AppRoutes.addAd]: "/add-ad",
  [AppRoutes.profile]: "/profile",
  [AppRoutes.profileSettings]: "/profile/settings",
  [AppRoutes.info]: "/info",
  [AppRoutes.moneyAdd]: "/profile/add",
  [AppRoutes.moneyRemove]: "/profile/remove",
  [AppRoutes.previewAd]: "/add-ad/preview",
  [AppRoutes.addAdDone]: "/add-ad/done",
  [AppRoutes.moneyAddDone]: "/profile/add/done",
  [AppRoutes.moneyRemoveDone]: "/profile/remove/done",
};

const routeConfig: Record<AppRoutes, RouteProps> = {
  [AppRoutes.root]: {
    path: RoutePaths.root,
    element: <Navigate to={RoutePaths.profile} replace={true} />,
  },
  [AppRoutes.ads]: {
    path: RoutePaths.ads,
    element: <AdsPage />,
  },
  [AppRoutes.chats]: {
    path: RoutePaths.chats,
    element: <ChatsPage />,
  },
  [AppRoutes.chat]: {
    path: RoutePaths.chat,
    element: <ChatPage />,
  },
  [AppRoutes.addAd]: {
    path: RoutePaths.addAd,
    element: <AddAdPage />,
  },
  [AppRoutes.profile]: {
    path: RoutePaths.profile,
    element: <ProfilePage />,
  },
  [AppRoutes.profileSettings]: {
    path: RoutePaths.profileSettings,
    element: <ProfileSettingsPage />,
  },
  [AppRoutes.info]: {
    path: RoutePaths.info,
    element: <InfoPage />,
  },
  [AppRoutes.moneyAdd]: {
    path: RoutePaths.moneyAdd,
    element: <MoneyChangePage type="add" />,
  },
  [AppRoutes.moneyRemove]: {
    path: RoutePaths.moneyRemove,
    element: <MoneyChangePage type="remove" />,
  },
  [AppRoutes.previewAd]: {
    path: RoutePaths.previewAd,
    element: <PreviewAddAdPage />
  },
  [AppRoutes.addAdDone]: {
    path: RoutePaths.addAdDone,
    element: <AddAdDonePage />
  },
  [AppRoutes.moneyAddDone]: {
    path: RoutePaths.moneyAddDone,
    element: <MoneyAddDonePage />
  },
  [AppRoutes.moneyRemoveDone]: {
    path: RoutePaths.moneyRemoveDone,
    element: <MoneyRemoveDonePage />
  },
};

function AppRouter() {
  const renderRoutes = useCallback((route: RouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <Suspense fallback={<LoadingAnimation />}>
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
