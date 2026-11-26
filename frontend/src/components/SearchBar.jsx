import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Ico } from './Icons'

const TIPOS = ['apartamento', 'casa', 'cobertura', 'terreno', 'comercial']
const cap = (s) => s[0].toUpperCase() + s.slice(1)

export default function SearchBar({ finalidade = 'aluguel', valores = {} }) {
  const navigate = useNavigate()
  const [fin, setFin] = useState(finalidade)

  function enviar(e) {
    e.preventDefault()
    const dados = new FormData(e.currentTarget)
    const q = new URLSearchParams()
    for (const [k, v] of dados) if (v) q.set(k, v)
    navigate(`/${fin === 'aluguel' ? 'aluguel' : 'venda'}${q.size ? `?${q}` : ''}`)
  }

  return (
    <form className="search" onSubmit={enviar} aria-label="Buscar imóveis">
      <div className="tabs">
        <button type="button" className="tab" aria-pressed={fin === 'aluguel'} onClick={() => setFin('aluguel')}>Aluguel</button>
        <button type="button" className="tab" aria-pressed={fin === 'venda'} onClick={() => setFin('venda')}>Venda</button>
      </div>
      <div className="fields">
        <label className="field">Tipo
          <select name="tipo" defaultValue={valores.tipo || ''}>
            <option value="">Todos</option>
            {TIPOS.map((t) => <option key={t} value={t}>{cap(t)}</option>)}
          </select>
        </label>
        <label className="field">Quartos
          <select name="quartos" defaultValue={valores.quartos || ''}>
            <option value="">Qualquer</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} ou mais</option>)}
          </select>
        </label>
        <label className="field">Vagas
          <select name="vagas" defaultValue={valores.vagas || ''}>
            <option value="">Qualquer</option>
            {[1, 2, 3].map((n) => <option key={n} value={n}>{n} ou mais</option>)}
          </select>
        </label>
        <label className="field">Preço máximo (R$)
          <input name="precoMax" type="number" min="0" step="100" inputMode="numeric" placeholder="Sem limite" defaultValue={valores.precoMax || ''} />
        </label>
        <button className="btn" type="submit"><Ico name="search" size={18} />Buscar</button>
      </div>
    </form>
  )
}
