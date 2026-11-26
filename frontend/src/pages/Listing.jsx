import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import Status from '../components/Status'
import useAsync from '../services/useAsync'
import { listarImoveis } from '../services/api'

const TEXTOS = {
  aluguel: ['Imóveis para alugar', 'Encontre o imóvel ideal para o seu momento'],
  venda: ['Imóveis à venda', 'Realize o sonho de conquistar um imóvel'],
}

export default function Listing({ finalidade }) {
  const [sp] = useSearchParams()
  const chave = sp.toString()
  const filtros = { finalidade, tipo: sp.get('tipo') || '', quartos: sp.get('quartos') || '', vagas: sp.get('vagas') || '', precoMax: sp.get('precoMax') || '' }
  const { loading, data, error, retry } = useAsync(() => listarImoveis(filtros), [finalidade, chave])
  const [titulo, sub] = TEXTOS[finalidade]

  return (
    <>
      <PageHero titulo={titulo} sub={sub} />
      <div className="wrap overlap"><SearchBar key={finalidade + chave} finalidade={finalidade} valores={Object.fromEntries(sp)} /></div>
      <section className="sec wrap">
        <div className="sec-h"><h2>Imóveis disponíveis</h2></div>
        <Status loading={loading} error={error} retry={retry}>
          {data?.length ? (
            <div className="grid">{data.map((i) => <PropertyCard key={i.id} imovel={i} />)}</div>
          ) : (
            <p className="state">Nenhum imóvel encontrado com esses filtros. Tente ampliar a busca.</p>
          )}
        </Status>
      </section>
    </>
  )
}
