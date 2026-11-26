import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { Ico } from '../components/Icons'
import useAsync from '../services/useAsync'
import { listarCorretores, cadastrarImovel } from '../services/api'

const TIPOS = ['apartamento', 'casa', 'cobertura', 'terreno', 'comercial']
const VAZIO = { titulo: '', finalidade: 'aluguel', tipo: 'apartamento', preco: '', bairro: '', cidade: 'Florianópolis', quartos: '0', banheiros: '0', vagas: '0', area: '', descricao: '', corretorId: '' }
const MAX_FOTOS = 10

export default function CadastrarImovel() {
  const { data: corretores } = useAsync(listarCorretores, [])
  const [f, setF] = useState(VAZIO)
  const [fotos, setFotos] = useState([])
  const [aviso, setAviso] = useState('')
  const [estado, setEstado] = useState({ enviando: false, criado: null, erro: null })
  const previews = useMemo(() => fotos.map((x) => URL.createObjectURL(x)), [fotos])
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews])
  const c = (k) => ({ value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) })

  function addFotos(e) {
    const novas = [...e.target.files].filter((x) => x.type.startsWith('image/') && x.size <= 5 * 1024 * 1024)
    const ignoradas = e.target.files.length - novas.length
    setAviso(ignoradas ? `${ignoradas} arquivo(s) ignorado(s): use imagens de até 5 MB.` : '')
    setFotos([...fotos, ...novas].slice(0, MAX_FOTOS))
    e.target.value = ''
  }

  async function enviar(e) {
    e.preventDefault()
    setEstado({ enviando: true, criado: null, erro: null })
    const dados = new FormData()
    Object.entries(f).forEach(([k, v]) => v !== '' && dados.append(k, v))
    fotos.forEach((x) => dados.append('fotos', x))
    try {
      const criado = await cadastrarImovel(dados)
      setEstado({ enviando: false, criado, erro: null })
      setF(VAZIO)
      setFotos([])
    } catch (erro) {
      setEstado({ enviando: false, criado: null, erro })
    }
  }

  return (
    <>
      <PageHero titulo="Cadastrar imóvel" sub="Preencha os dados e adicione as fotos do imóvel" />
      <section className="sec wrap pull">
        <form className="panel form narrow" onSubmit={enviar}>
          <label className="field">Título *<input required maxLength={150} placeholder="Apartamento 2 quartos no Centro" {...c('titulo')} /></label>
          <div className="grid2">
            <label className="field">Finalidade *
              <select {...c('finalidade')}><option value="aluguel">Aluguel</option><option value="venda">Venda</option></select>
            </label>
            <label className="field">Tipo *
              <select {...c('tipo')}>{TIPOS.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}</select>
            </label>
            <label className="field">Preço (R$) *<input required type="number" min="1" step="0.01" inputMode="decimal" {...c('preco')} /></label>
            <label className="field">Área (m²)<input type="number" min="1" step="0.01" inputMode="decimal" {...c('area')} /></label>
            <label className="field">Bairro *<input required maxLength={80} {...c('bairro')} /></label>
            <label className="field">Cidade *<input required maxLength={80} {...c('cidade')} /></label>
            <label className="field">Quartos<input type="number" min="0" {...c('quartos')} /></label>
            <label className="field">Banheiros<input type="number" min="0" {...c('banheiros')} /></label>
            <label className="field">Vagas<input type="number" min="0" {...c('vagas')} /></label>
            <label className="field">Corretor responsável
              <select {...c('corretorId')}>
                <option value="">Não definido</option>
                {(corretores || []).map((x) => <option key={x.id} value={x.id}>{x.nome}</option>)}
              </select>
            </label>
          </div>
          <label className="field">Descrição<textarea maxLength={2000} {...c('descricao')} /></label>
          <div className="field">
            <label htmlFor="fotos">Fotos (até {MAX_FOTOS}, a primeira é a principal)</label>
            <input id="fotos" type="file" accept="image/*" multiple onChange={addFotos} disabled={fotos.length >= MAX_FOTOS} />
            {aviso && <span className="err">{aviso}</span>}
            {previews.length > 0 && (
              <div className="prevs">
                {previews.map((u, n) => (
                  <div className="prev" key={u}>
                    <img src={u} alt={`Foto ${n + 1}`} />
                    {n === 0 && <span>Principal</span>}
                    <button type="button" aria-label={`Remover foto ${n + 1}`} onClick={() => setFotos(fotos.filter((_, i) => i !== n))}><Ico name="close" size={14} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {estado.criado && (
            <p className="alert ok" role="status">Imóvel cadastrado! <Link to={`/imoveis/${estado.criado.id}`}><u>Ver anúncio</u></Link></p>
          )}
          {estado.erro && (
            <div className="alert bad" role="alert">
              {estado.erro.status === 404 || estado.erro.status === 405 ? 'O servidor ainda não aceita o cadastro de imóveis (POST /api/imoveis).' : estado.erro.message}
              {estado.erro.detalhes?.length > 0 && <ul>{estado.erro.detalhes.map((d) => <li key={d}>{d}</li>)}</ul>}
            </div>
          )}
          <button className="btn block" disabled={estado.enviando}>{estado.enviando ? 'Salvando…' : 'Cadastrar imóvel'}</button>
        </form>
      </section>
    </>
  )
}
