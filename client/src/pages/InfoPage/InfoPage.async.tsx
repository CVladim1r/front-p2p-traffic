import { lazy } from "react";

export const InfoPageAsync = lazy(async () => await import("./InfoPage"))
