import { Dispatch, SetStateAction, useState } from "react";

const isInitialStateFunction = <S>(x: unknown): x is () => S =>
  typeof x === "function";

const isSetStateFunction = <S>(x: unknown): x is (s: S) => S =>
  typeof x === "function";

export const useMutableState = <S>(
  initialState: S | (() => S)
): [S, Dispatch<SetStateAction<S>>] => {
  const [{ state }, setState] = useState({
    state: isInitialStateFunction<S>(initialState)
      ? initialState()
      : initialState,
  });

  return [
    state,
    (s: SetStateAction<S>) =>
      setState({ state: isSetStateFunction<S>(s) ? s(state) : s }),
  ];
};
