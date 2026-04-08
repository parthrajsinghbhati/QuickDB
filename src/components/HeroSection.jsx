import React from "react";
import { useNavigate } from 'react-router';

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
            {/* Ambient Glow Background */}
            <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 text-center max-w-5xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/20 mb-8">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant">Production Ready v2.4</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 leading-[0.9] text-on-surface">
                    The database for <br />
                    <span className="gradient-text">Frontend Developers.</span>
                </h1>
                <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
                    Create your database and construct powerful backend APIs without writing backend code. Store and retrieve your data directly via HTTP APIs.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button onClick={() => navigate("/auth")} className="cta-gradient px-8 py-4 rounded-xl font-bold text-lg text-white neon-bloom hover:scale-[1.02] transition-transform flex items-center gap-2">
                        Start Building Now
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>

                </div>
            </div>
            <div className="mt-24 w-full max-w-6xl relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-surface-container-low rounded-[2rem] border border-outline-variant/20 overflow-hidden shadow-2xl">
                    <div className="flex items-center gap-2 px-6 py-4 bg-surface-container-high border-b border-outline-variant/10">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
                        </div>
                        <div className="mx-auto text-xs font-mono text-on-surface-variant">query_editor.sql — cluster-us-east-1</div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
                        <div className="md:col-span-3 border-r border-outline-variant/10 p-6 bg-surface-container-low">
                            <div className="space-y-4">
                                <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Schemas</div>
                                <div className="flex items-center gap-2 text-sm text-primary"><span className="material-symbols-outlined text-sm">database</span> analytics_prod</div>
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant pl-4"><span className="material-symbols-outlined text-sm">table_chart</span> user_events</div>
                                <div className="flex items-center gap-2 text-sm text-on-surface-variant pl-4"><span className="material-symbols-outlined text-sm">table_chart</span> edge_logs</div>
                            </div>
                        </div>
                        <div className="md:col-span-9 p-8 bg-surface-container-lowest font-mono text-sm leading-relaxed">
                            <div className="flex gap-4">
                                <span className="text-outline/40">01</span>
                                <span className="text-tertiary">SELECT</span>
                                <span>*</span>
                                <span className="text-tertiary">FROM</span>
                                <span className="text-secondary">user_events</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-outline/40">02</span>
                                <span className="text-tertiary">WHERE</span>
                                <span>latency</span>
                                <span className="text-primary-container">&lt;</span>
                                <span className="text-primary">10</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-outline/40">03</span>
                                <span className="text-tertiary">ORDER BY</span>
                                <span>created_at</span>
                                <span className="text-tertiary">DESC</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="text-outline/40">04</span>
                                <span className="text-tertiary">LIMIT</span>
                                <span className="text-primary">50</span>;
                            </div>
                            <div className="mt-8 p-4 rounded-lg bg-surface-container-high border border-primary/20">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-bold uppercase text-on-surface-variant tracking-tighter">Query Results</span>
                                    <span className="text-xs text-primary font-bold">Latency: 2ms</span>
                                </div>
                                <div className="space-y-2 opacity-60">
                                    <div className="h-2 w-full bg-outline-variant/20 rounded"></div>
                                    <div className="h-2 w-3/4 bg-outline-variant/20 rounded"></div>
                                    <div className="h-2 w-5/6 bg-outline-variant/20 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;