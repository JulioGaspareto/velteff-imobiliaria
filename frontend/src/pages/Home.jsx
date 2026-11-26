import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import Skyline from '../components/Skyline'
import Status from '../components/Status'
import useAsync from '../services/useAsync'
import { listarImoveis } from '../services/api'

export default function Home() {
  const { loading, data, error, retry } = useAsync(() => listarImoveis(), [])
  const destaques = (data || []).slice(0, 6)

  return (
    <>
      <section className="hero">
        <Skyline className="sky" />
        <div className="wrap">
          <h1>Seu próximo lar começa aqui</h1>
          <div className="rule" />
          <p>Encontre o imóvel certo para alugar ou comprar.</p>
        </div>
      </section>
      <div className="wrap"><SearchBar /></div>
      <section className="sec wrap">
        <div className="sec-h">
          <h2>Imóveis em destaque</h2>
          <Link className="more" to="/venda">Ver imóveis à venda</Link>
        </div>
        <Status loading={loading} error={error} retry={retry}>
          {destaques.length ? (
            <div className="grid">{destaques.map((i) => <PropertyCard key={i.id} imovel={i} />)}</div>
          ) : (
            <p className="state">Nenhum imóvel disponível no momento.</p>
          )}
        </Status>
      </section>
    </>
  )
}
