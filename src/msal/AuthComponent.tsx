import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";

export default function AuthComponent() {
    const { instance } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = () => {
        instance.loginPopup(loginRequest).catch((e: any) => {
            console.error(e);
        });
    };

    const handleLogout = () => {
        instance.logoutPopup().catch((e: any) => {
            console.error(e);
        });
    };

    return (
        <div>
            {isAuthenticated ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};
