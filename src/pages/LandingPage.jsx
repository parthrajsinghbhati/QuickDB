import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import api from '../services/api';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';

export default function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Send a dummy request to wake up the Render backend
    api.get('/').catch(() => { });
  }, []);

  return (
    <div className="font-body selection:bg-primary-container selection:text-on-primary-container bg-background text-on-background overflow-x-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Feature Showcase: Bento Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-on-surface">Precision Instrumentation.</h2>
            <p className="text-on-surface-variant text-lg">Beyond standard queries. We built QuickDB to handle the most demanding observability and transactional workloads at scale.</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-extrabold text-primary mb-1">99.99%</div>
            <div className="text-xs font-mono uppercase tracking-widest text-outline">Uptime Guaranteed SLA</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {/* Card 1: Large Feature */}
          <div className="md:col-span-2 md:row-span-2 glass-card rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] -mr-32 -mt-32"></div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container/20 flex items-center justify-center mb-6 border border-primary/20">
                <span className="material-symbols-outlined text-primary">public</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">No Backend Setup</h3>
              <p className="text-on-surface-variant text-lg max-w-md leading-relaxed">Skip the server configuration and database provisioning. We automatically provision scalable storage and REST APIs for you instantly.</p>
            </div>
            <div className="mt-8 flex gap-2">
              <div className="px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/10 text-xs font-mono">No Servers</div>
              <div className="px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/10 text-xs font-mono">No SQL</div>
              <div className="px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/10 text-xs font-mono">Instant API</div>
            </div>
            <img className="absolute bottom-0 right-0 w-3/4 h-3/4 object-cover opacity-20 mask-gradient-to-t" data-alt="Stylized glowing holographic world map with data points connected by thin light lines on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcokFZfYvkYQTFAxliG4MFsRQbmklmAngCYlKt13USZooCofrBm-ojzCZ78Y8KthJooap1osS60eAPxsy4RLMXM5XP5FHXkVqBoxOY2W2Ey-M_CR8OiSBh3kCEFiz7eh4hfyEXhbQcam1jlFfom9aRe-fQih91tlDeaWv7Pl5twTCzkQbYSpPurTWYSOcFiq13YQVBWX5l2sQMRY3XOOzYQ8G-4BWK9A258f4EdNXDLfQjoaszKy_XE411z7E1ssCxfd7STQpm_bw" style={{ maskImage: "linear-gradient(to top right, transparent, black)" }} />
          </div>
          {/* Card 2: Medium Feature */}
          <div className="md:row-span-2 glass-card rounded-[2rem] p-10 flex flex-col justify-between bg-surface-container-highest border-primary/5">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center mb-6 border border-secondary/20">
                <span className="material-symbols-outlined text-secondary">bolt</span>
              </div>
              <h3 className="text-3xl font-bold mb-4">Auto-Scaling</h3>
              <p className="text-on-surface-variant leading-relaxed">Never provision a server again. Our serverless architecture scales from 0 to 1 million requests in seconds.</p>
            </div>
            <div className="relative h-32 w-full mt-4 bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/5">
              <div className="absolute bottom-0 left-0 w-full h-full p-4 flex items-end gap-1">
                <div className="w-full bg-primary/20 h-1/4 rounded-t-sm"></div>
                <div className="w-full bg-primary/30 h-1/3 rounded-t-sm"></div>
                <div className="w-full bg-primary/40 h-2/3 rounded-t-sm"></div>
                <div className="w-full bg-primary/60 h-full rounded-t-sm animate-pulse"></div>
                <div className="w-full bg-primary/50 h-3/4 rounded-t-sm"></div>
              </div>
            </div>
          </div>
          {/* Card 3: Wide Feature */}
          <div className="md:col-span-2 glass-card rounded-[2rem] p-10 flex items-center justify-between gap-8 group">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">Secure API Access</h3>
              <p className="text-on-surface-variant text-sm">Generate secure API keys from our dashboard. Control exactly which tables your frontend applications can read from or write to.</p>
            </div>
            <div className="w-32 h-32 flex-shrink-0 relative">
              <div className="absolute inset-0 bg-secondary/10 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-4 bg-secondary/20 rounded-full border border-secondary/40 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-secondary">shield_lock</span>
              </div>
            </div>
          </div>
          {/* Card 4: Small Technical */}
          <div className="glass-card rounded-[2rem] p-8 flex flex-col justify-center border-outline-variant/5">
            <div className="text-xs font-mono text-primary mb-2 uppercase tracking-widest">Connect</div>
            <h4 className="text-xl font-bold">Simple HTTP APIs</h4>
            <p className="text-on-surface-variant text-xs mt-2">Use fetch() or axios directly from your frontend code. No complex ORMs or SQL required.</p>
          </div>
        </div>
      </section>
      {/* IDE Preview / Interactive Detail */}
      <section className="py-32 bg-surface-container-low relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Built for the frontend workflow.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/20 flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-weight="fill">table_chart</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-on-surface">Visual Table Editor</h4>
                  <p className="text-on-surface-variant text-sm">Create tables and columns in a drag-and-drop interface. No migrations or SQL knowledge needed.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/20 flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-weight="fill">api</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-on-surface">Instant API Generation</h4>
                  <p className="text-on-surface-variant text-sm">The moment you create a table, we generate standard RESTful endpoints for your frontend to consume.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant/20 flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary" data-weight="fill">code</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2 text-on-surface">Effortless Integration</h4>
                  <p className="text-on-surface-variant text-sm">Grab your API key and start building your client-side application immediately using standard fetch requests.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full"></div>
            <div className="relative glass-card rounded-3xl p-2 border border-white/5 shadow-2xl">
              <img className="rounded-2xl w-full" data-alt="High-fidelity UI screenshot of a dark-mode database management interface with neon charts and a code editor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrf3jCQcvC5GxGritNQfmwcttyxedli-6sYgiYK9-ve6SFmgyfXDjxHd4xnjjmRe245kFw4M8hJS5mN2UP_upD97lOfp0fraShR7pA91zEqZAz_ZVjdgPYIHaP5j6z_k_7INOqV12Cnva8SXOJmEYWPBd3ZAWsEfRMrP-UPDVUXeqsZ4a4Q9kf1-h4-pHgJJCjUCwOhfEttCS9KoO4FXQ_nxyoBUOdzJZmatc8cxXO2mpqjrqXVlxvmSS4zqfICGfsEaSvLH2MDU0" />
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto cta-gradient rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden neon-bloom">
          <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABDCgQCvvv9OFqpFSSDlfpQTsdq3yu4Jk0UloZIlo2HRrcEhym9ER0j337a2UklGZsUmLXAcstA_6iGqlla808z9U9Y1mOt1waoB_kd9eiJZkxOBHt6Erc4bxP5i5sCGEXYU73Oh6cd1sXcTxbF2MgDd7z9Pfip543ZDvxUNJmaVM5M-hBQ4GjbdTCmUwO4AtETYwGSmCuhLfNPXdC-1Ts8u10SGP4jWm_D_zEISRrUoeiuuZZuca3GLvhrP2sz91Nyrkt05lLMBQ')" }}></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 leading-tight">
              Focus on the frontend.<br />We handle the rest.
            </h2>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12">
              Join frontend developers who ship faster by using QuickDB as their instant database and API layer.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/auth")} className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">Start Building Free</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
