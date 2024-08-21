import { Provider } from "react-redux";
import { store } from "../store/store";
import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};
export default function RTKProvider({ children }: Props) {
    return <Provider store={store}>{children}</Provider>;
}
