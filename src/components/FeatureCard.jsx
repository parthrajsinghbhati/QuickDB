export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div
      className={
        `rounded-2xl bg-slate-900/40 p-8 ring-1 ring-slate-800 transition-shadow hover:shadow-[0_0_60px_-15px_rgba(139,92,246,0.45)]`
      }
    >
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/20 to-violet-400/10 ring-1 ring-violet-700/30">
        <Icon className="h-7 w-7 text-violet-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-100">{title}</h3>
      <p className="mt-3 text-base leading-7 text-slate-400">{description}</p>
    </div>
  )
}


