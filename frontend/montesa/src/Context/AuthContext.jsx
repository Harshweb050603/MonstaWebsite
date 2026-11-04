import {
    createContext,
    useContext,
    useState,
    useEffect
} from "react";
import api from "../services/api";
import {
    updateAccessToken,
    subscribeToAccessToken
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Axios se token update hone par Context bhi update hoga
    useEffect(() => {
        const unsubscribe = subscribeToAccessToken((token) => {
            setAccessToken(token);

            if (token === null) {
                setUser(null);
            }
        });
        const restoreSession = async () => {
            try {
                  // Step 1: Naya access token lo
                const response = await api.post("/api/auth/refresh_token");

               
                const newToken = response.data.accessToken;

                  // Step 2: Access token update karo
                updateAccessToken(newToken);

                  // Step 3: Current user ki details lao
                const userResponse = await api.get("/api/auth/get-me");
            console.log("Get Me Response:", userResponse.data);


                setUser(userResponse.data.user);
                console.log("New Access Token:", newToken);

            } catch (error) {
                console.log("Session restore failed:", error);
                updateAccessToken(null);
            } finally{
                setIsLoading(false)
            }
        };
        restoreSession();
        return unsubscribe;


    }, []);

    // Login
    const login = (token, userData) => {
        setUser(userData);
        updateAccessToken(token);
    };
    // Update User Profile
const updateUser = (userData) => {
    setUser(userData);
};
    // Logout
    const logout = () => {
        updateAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                user,
                isLoading,
                isAuthenticated: Boolean(accessToken),
                login,
                logout,
                updateUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}