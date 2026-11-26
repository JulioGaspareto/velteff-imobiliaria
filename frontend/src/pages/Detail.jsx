import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Photo from '../components/Photo'
import Status from '../components/Status'
import { Ico } from '../components/Icons'
import useAsync from '../services/useAsync'
import { buscarImovel } from '../services/api'
import { brl } from '../services/format'

export default function Detail() {
  const { id } = useParams()
  const { loading, data: i, error, retry } = useAsync(() => buscarImovel(id), [id])
  const [sel, setSel] = useState(0)

  return (
    <div className="wrap">
      <Status loading={loading} error={error} retry={retry}>
        {i && <Conteudo i={i} sel={sel} setSel={setSel} />}
      </Status>
    </div>
  )
}

function Conteudo({ i, sel, setSel }) {
  const aluguel = i.finalidade === 'aluguel'
  const fotos = i.fotos?.length ? i.fotos : [{ id: 0, url: '' }]
  const atual = fotos[Math.min(sel, fotos.length - 1)]
  const dados = [
    ['bed', i.quartos, i.quartos === 1 ? 'quarto' : 'quartos'],
    ['bath', i.banheiros, i.banheiros === 1 ? 'banheiro' : 'banheiros'],
    ['car', i.vagas, i.vagas === 1 ? 'vaga' : 'vagas'],
    ...(i.area ? [['area', `${i.area} m²`, 'área']] : []),
  ]

  return (
    <>
      <nav className="crumbs" aria-label="Você está em">
        <Link to="/">Início</Link> › <Link to={aluguel ? '/aluguel' : '/venda'}>{aluguel ? 'Aluguel' : 'Compra e venda'}</Link> › {i.titulo}
      </nav>
      <div className="detail">
        <div className="gal">
          <Photo key={atual.url} className="ph main" src={atual.url} alt={i.titulo} />
          {fotos.length > 1 && (
            <div className="thumbs">
              {fotos.map((f, n) => (
                <button key={f.id} className="thumb" aria-current={n === sel} aria-label={`Ver foto ${n + 1}`} onClick={() => setSel(n)}>
                  <Photo key={f.url} src={f.url} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <aside className="panel">
          <span className="tag">{aluguel ? 'Aluguel' : 'Venda'}</span>
          <h1>{i.titulo}</h1>
          <p className="loc">{i.bairro}, {i.cidade}</p>
          <p className="price big">{brl(i.preco)}{aluguel && <small> /mês</small>}</p>
          <div className="stats">
            {dados.map(([ico, valor, rotulo]) => (
              <div className="stat" key={rotulo}><Ico name={ico} size={22} /><b>{valor}</b><span>{rotulo}</span></div>
            ))}
          </div>
          {i.descricao && <p className="desc">{i.descricao}</p>}
          <Link className="btn block" to={`/contato?imovel=${i.id}`}>Falar com o corretor</Link>
          {i.corretor_telefone && (
            <p className="alt">{i.corretor_nome ? `${i.corretor_nome}: ` : 'ou ligue: '}<a href={`tel:${i.corretor_telefone.replace(/\D/g, '')}`}>{i.corretor_telefone}</a></p>
          )}
        </aside>
      </div>
    </>
  )
}
