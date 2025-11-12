import React from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();

    // state for login or register
    const [state, setState] = React.useState("login");

    // loading and error states
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    // state for input value
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    // auto-redirect if already authenticated
    React.useEffect(() => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                navigate('/dashboard', { replace: true });
            }
        } catch {
            // ignore localStorage errors
        }
    }, [navigate]);

    // handle change input value
    const onChangeHandler = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const endpoint = state === 'login' ? 'login' : 'register';
            console.log(`https://quickdb-backend.onrender.com/api/auth/${endpoint}`)
            const response = await fetch(`https://quickdb-backend.onrender.com/api/auth/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                // Store token in localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('user', JSON.stringify(result.user));
                
                // Navigate to dashboard
                navigate("/dashboard");
            } else {
                // Handle errors with friendly messages
                let friendly = 'An error occurred';
                if (response.status === 404 && state === 'login') {
                    friendly = 'User not found. Please sign up first.';
                } else if (response.status === 401 && state === 'login') {
                    friendly = 'Invalid credentials. Please check your password.';
                } else if (response.status === 400 && state === 'register') {
                    friendly = result?.message === 'User already exists' 
                      ? 'User already exists. Please log in.' 
                      : (result.errors?.[0]?.msg || 'Please check the form and try again.');
                } else {
                    friendly = result?.message || result?.error || result.errors?.[0]?.msg || friendly;
                }
                setError(friendly);
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
        {loading && (
            <div className="fixed top-0 left-0 w-full h-1 z-50">
                <div className="h-full bg-indigo-500 animate-pulse" />
            </div>
        )}
        <form
            onSubmit={handleSubmit}
            className="w-full sm:w-[350px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 bg-white dark:bg-zinc-900"
        >
            <h1 className="text-zinc-900 dark:text-white text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Register"}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-2 pb-6">
                Please {state === "login" ? "sign in" : "sign up"} to continue
            </p>

            {state !== "login" && (
                <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                    {/* User Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                        <path d="M20 21a8 8 0 0 0-16 0" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <input type="text" placeholder="Name" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="name" value={data.name} onChange={onChangeHandler} required />
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                {/* Mail Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <input type="email" placeholder="Email id" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="email" value={data.email} onChange={onChangeHandler} required />
            </div>

            <div className="flex items-center mt-4 w-full bg-white dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-6 gap-2">
                {/* Lock Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 dark:text-zinc-400" viewBox="0 0 24 24" >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type="password" placeholder="Password" className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full" name="password" value={data.password} onChange={onChangeHandler} required />
            </div>

            <div className="mt-5 text-left">
                <a className="text-sm text-indigo-500 dark:text-indigo-400" href="#" >
                    Forgot password?
                </a>
            </div>

            <button type="submit" disabled={loading} className="mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity disabled:opacity-60" >
                {loading ? 'Please wait…' : (state === "login" ? "Login" : "Create Account")}
            </button>

            {error && (
                <p className="text-sm text-red-600 dark:text-red-500 mt-3">{error}</p>
            )}

            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-3 mb-11">
                {state === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                <button type="button" className="text-indigo-500 dark:text-indigo-400" onClick={() => setState((prev) => prev === "login" ? "register" : "login")} >
                    {state === "login" ? "Register" : "Login"}
                </button>
            </p>
        </form>
        </div>
    );
};

export default Auth;