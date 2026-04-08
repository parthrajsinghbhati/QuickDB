import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { isTokenValid, handleLogout } from "../utils/auth";

// --- Subcomponents for clean DOM ---

const BackgroundEffects = () => (
    <>
        <div 
            className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" 
            style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAu_P5uBBlccAbkmdychcabJTSBHRbTddDJegFgnp-FDYotNhJoMPYkS4U-iadkuf6Gx3129RovYXAj2IOkhw5xTCIu6YdT5VVXRC62h_Lj_3a2WQu3nqytyrowGMAXQ5PyihKRL41mS8ENCwI3LQWHPGfKoDh71cHcOZeKqkkHECX2-TJCcTuun3hz6qdAOMu9weum4Gqur3bS1eoUAEHx1KTF7otDQs67zM6GA423sSJwziIfMHCCyDIKVFCcqzMDHo4GbB7MMTI')"}}
        />
        <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-[10%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[150px] pointer-events-none -z-10" />
    </>
);

const AuthInput = ({ label, type, name, value, onChange, placeholder, disabled, rightElement }) => (
    <div className="space-y-2">
        <div className="flex justify-between items-end px-1">
            <label className="text-xs font-mono uppercase tracking-widest text-on-surface-variant ml-1">{label}</label>
            {rightElement}
        </div>
        <div className="group relative">
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required 
                className="w-full bg-surface-container-highest/40 border-transparent rounded-xl py-4 px-5 text-on-surface font-mono placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-secondary-dim/50 focus:bg-surface-container-highest/60 transition-all outline-none focus:border-transparent" 
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    </div>
);

// --- Main Auth Component ---

const Auth = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useState("login");
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
    });

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            if (isTokenValid(token)) {
                navigate('/dashboard', { replace: true });
            } else {
                handleLogout();
            }
        }
    }, [navigate]);

    const onChangeHandler = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const getErrorMessage = (error, currentState) => {
        const status = error.response?.status;
        const result = error.response?.data;
        
        if (status === 404 && currentState === 'login') return 'User not found. Please sign up first.';
        if (status === 401 && currentState === 'login') return 'Invalid credentials. Please check your password.';
        if (status === 400 && currentState === 'register') {
            return result?.message === 'User already exists' 
              ? 'User already exists. Please log in.' 
              : (result.errors?.[0]?.msg || 'Please check the form and try again.');
        }
        return result?.message || result?.error || result?.errors?.[0]?.msg || 'An error occurred';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const endpoint = state === 'login' ? '/auth/login' : '/auth/register';
            const response = await api.post(endpoint, data);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            navigate("/dashboard");
        } catch (error) {
            console.error('Authentication error:', error);
            setError(getErrorMessage(error, state));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body selection:bg-primary/30 min-h-screen flex items-center justify-center overflow-hidden p-6 relative z-0">
            <BackgroundEffects />

            <main className="w-full max-w-[480px] relative z-10">
                {/* Branding Header */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-bloom mb-4 p-[2px]">
                        <div className="w-full h-full bg-surface-container-lowest rounded-[14px] flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-4xl">terminal</span>
                        </div>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-on-surface">QUICKDB</h1>
                    <p className="text-on-surface-variant font-mono text-sm mt-1 tracking-tight">SYSTEM_ACCESS_PROTOCOL_V4.0</p>
                </div>

                {/* Card */}
                <div className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden neon-bloom">
                    {/* Decorative refraction */}
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full"></div>

                    <div className="mb-8 text-center relative z-10">
                        <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-2 leading-tight">
                            {state === "login" ? "Initiate Session" : "Join the QuickDB"}
                        </h2>
                        <p className="text-on-surface-variant text-sm font-medium">
                            {state === "login" ? "Welcome back to your command center." : "Provision high-performance clusters in seconds."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                        {state === "register" && (
                            <AuthInput 
                                label="Full Name"
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={onChangeHandler}
                                placeholder="John Doe"
                                disabled={loading}
                            />
                        )}

                        <AuthInput 
                            label="Terminal.Identity"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={onChangeHandler}
                            placeholder="root@quickdb.io"
                            disabled={loading}
                        />

                        <AuthInput 
                            label="Secure_Key"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={onChangeHandler}
                            placeholder="••••••••"
                            disabled={loading}
                            rightElement={
                                state === "login" && (
                                    <a href="#" className="text-xs text-primary/70 hover:text-primary transition-colors">Forgot_Entry?</a>
                                )
                            }
                        />

                        {error && (
                            <div className="bg-error-container/20 border border-error/20 rounded-xl p-3 mt-2">
                                <p className="text-sm text-error/90 font-mono text-center">{error}</p>
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full mt-4 py-4 px-6 bg-gradient-to-r from-primary to-secondary text-on-primary-fixed font-bold rounded-xl active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(186,158,255,0.25)] hover:shadow-[0_0_30px_rgba(186,158,255,0.4)] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="animate-pulse">PROCESSING...</span>
                            ) : (
                                state === "login" ? "INITIATE_SESSION" : "CREATE_ACCOUNT"
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-8 pt-6 border-t border-outline-variant/10 text-center relative z-10">
                        <p className="text-on-surface-variant text-sm">
                            {state === "login" ? "New to QuickDB?" : "Already have an account?"} 
                            <button 
                                type="button" 
                                onClick={() => {
                                    setState(state === "login" ? "register" : "login");
                                    setError("");
                                }} 
                                className="text-primary font-semibold hover:underline underline-offset-4 ml-2 transition-colors"
                            >
                                {state === "login" ? "Create Account" : "Log In"}
                            </button>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Auth;