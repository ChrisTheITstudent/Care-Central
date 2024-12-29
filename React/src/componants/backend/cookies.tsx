import Cookies from "js-cookie";
import { User } from "../../classes";

export const setUserCookies = ( user: User | null) => {
    Cookies.set("Username", user?.getUsername() || "");
};
export const getUserCookies = (): string | null => {
    const username = Cookies.get("Username");
    if (!username) {
        return null;
    }
    return username;
};
export const removeUserCookies = () => {
    Cookies.remove("Username");
};