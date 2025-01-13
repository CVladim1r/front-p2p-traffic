import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { createMainStore } from "../store";

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={createMainStore()}>{children}</Provider>
);
