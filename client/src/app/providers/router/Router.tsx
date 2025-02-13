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
import { LoadingAnimation, NavBar } from "../../../shared/ui";
import AdPage from "../../../pages/AdPage/AdPage";
import NoTgDataPage from "../../../pages/NoTgDataPage/NoTgDataPage";

enum AppRoutes {
  root = "root",
  ads = "ads",
  ad = "ad",
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

  noTgData = "noTgData",
  notFound = "notFound",
}

export const RoutePaths: Record<AppRoutes, string> = {
  [AppRoutes.root]: "/",
  [AppRoutes.ads]: "/ads",
  [AppRoutes.ad]: "/ads/:id",
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

  [AppRoutes.noTgData]: "/noTgData",
  [AppRoutes.notFound]: "/*",
};

type MyRouteProps = RouteProps & {
  noNavBar?: boolean
}

const routeConfig: Record<AppRoutes, MyRouteProps> = {
  [AppRoutes.root]: {
    path: RoutePaths.root,
    element: <Navigate to={RoutePaths.profile} replace={true} />,
  },
  [AppRoutes.ads]: {
    path: RoutePaths.ads,
    element: <AdsPage />,
  },
  [AppRoutes.ad]: {
    path: RoutePaths.ad,
    element: <AdPage />,
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
  [AppRoutes.noTgData]: {
    path: RoutePaths.noTgData,
    element: <NoTgDataPage />,
    noNavBar: true,
  },
  [AppRoutes.notFound]: {
    path: RoutePaths.notFound,
    element: <p>test</p>, //FIXME - 404 page
    noNavBar: true,
  },
};

function AppRouter() {
  const renderRoutes = useCallback((route: MyRouteProps) => {
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          <>
            <div className="body">
              <Suspense fallback={<LoadingAnimation />}>
                {route.element}
              </Suspense>
            </div>
            {!route.noNavBar &&
              <NavBar />
            }
          </>
        }
      />
    );
  }, []);

  return (
      <Routes>{Object.values(routeConfig).map(renderRoutes)}</Routes>
  )
}

export default memo(AppRouter);
