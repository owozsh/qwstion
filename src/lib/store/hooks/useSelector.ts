import { useSelector as useReduxSelector } from "react-redux";
import { store } from "../store";

type State = ReturnType<typeof store.getState>

export default function useSelector<T>(selector: (state: State) => T): T {
  return useReduxSelector(selector)
}