import FeatureCard from './FeatureCard'
import { features } from '../data/features'

export default function FeaturesSection() {
  return (
    <section className="mt-20 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6 pt-32 pb-28 bg-slate-100/5">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-slate-100">
          Everything you need to build faster
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-400">
          Powerful features that make database management simple and API generation automatic
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <FeatureCard {...f} key={f.title}/>
        ))}
      </div>
    </section>
  )
}


