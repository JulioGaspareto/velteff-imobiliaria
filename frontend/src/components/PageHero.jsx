import Skyline from './Skyline'

export default function PageHero({ titulo, sub }) {
  return (
    <section className="phero">
      <Skyline className="sky" />
      <div className="wrap">
        <h1>{titulo}</h1>
        <div className="rule" />
        <p>{sub}</p>
      </div>
    </section>
  )
}
