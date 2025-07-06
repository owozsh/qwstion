"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function StoreProvider(props: Props) {
  return <Provider store={store}>{props.children}</Provider>;
}
