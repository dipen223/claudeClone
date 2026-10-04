import { useContext, useState } from "react";
import "./Login.css";
import { ClaudeContext } from "./ClaudeContext.jsx";

const Login = () => {
    const { setUser } = useContext(ClaudeContext);

    const [isRegister, setIsRegister] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const endpoint = isRegister ? "register" : "login";
        const body = isRegister ? { username, email, password } : { email, password };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Something went wrong.");
                return;
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            setUser(data.user);
        } catch (err) {
            console.log(err);
            setError("Can't reach the server.");
        } finally {
            setLoading(false);
        }
    };

    const switchMode = () => {
        setIsRegister(!isRegister);
        setError("");
    };

    return (
        <div className="loginPage">
            <form className="loginCard" onSubmit={handleSubmit}>
                <h1>{isRegister ? "Create an account" : "Welcome back"}</h1>
                <p className="loginSubtitle">
                    {isRegister ? "Sign up to start chatting" : "Log in to continue"}
                </p>

                {isRegister && (
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                {error && <p className="loginError">{error}</p>}

                <button type="submit" className="loginBtn" disabled={loading}>
                    {loading ? "Please wait..." : isRegister ? "Sign up" : "Log in"}
                </button>

                <p className="loginSwitch">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <span onClick={switchMode}>{isRegister ? "Log in" : "Sign up"}</span>
                </p>
            </form>
        </div>
    );
};

export default Login;
