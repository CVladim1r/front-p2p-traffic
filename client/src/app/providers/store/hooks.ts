import { useSelector } from "react-redux";
import { StateSchema } from "./store";

export const useAppSelector = useSelector.withTypes<StateSchema>()