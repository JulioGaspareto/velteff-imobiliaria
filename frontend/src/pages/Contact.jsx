import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { Ico } from '../components/Icons'
import useAsync from '../services/useAsync'
import { listarCorretores, enviarContato } from '../services/api'

// Troque pelos perfis reais da imobiliária.
const SOCIAL = [['instagram', 'Instagram', 'https://www.instagram.com'], ['facebook', 'Facebook', 'https://www.facebook.com'], ['youtube', 'YouTube', 'https://www.youtube.com']]

export default function Contact() {
  const [sp] = useSearchParams()
  const imovelId = sp.get('imovel') || ''
  const { data: corretores } = useAsync(listarCorretores, [])
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', mensagem: imovelId ? `Olá! Tenho interesse no imóvel de código ${imovelId}.` : '' })
  const [estado, setEstado] = useState({ enviando: false, ok: false, erro: null })
  const campo = (k) => ({ value: form[k], onChange: (e) => setForm({ ...form, [k]: e.target.value }) })

  async function enviar(e) {
    e.preventDefault()
    setEstado({ enviando: true, ok: false, erro: null })
    try {
      await enviarContato({ ...form, imovelId: imovelId || undefined })
      setForm({ nome: '', email: '', telefone: '', mensagem: '' })
      setEstado({ enviando: false, ok: true, erro: null })
    } catch (erro) {
      setEstado({ enviando: false, ok: false, erro })
    }
  }

  return (
    <>
      <PageHero titulo="Fale com a gente" sub="Estamos prontos para ajudar!" />
      <section className="sec wrap two">
        <form className="panel form" onSubmit={enviar}>
          <h2>Envie uma mensagem</h2>
          <label className="field">Nome completo *<input required minLength={2} maxLength={100} autoComplete="name" {...campo('nome')} /></label>
          <label className="field">Seu e-mail *<input required type="email" maxLength={150} autoComplete="email" {...campo('email')} /></label>
          <label className="field">Telefone (opcional)<input type="tel" maxLength={20} autoComplete="tel" placeholder="(48) 99999-0000" {...campo('telefone')} /></label>
          <label className="field">Mensagem *<textarea required minLength={5} maxLength={1000} {...campo('mensagem')} /></label>
          {estado.ok && <p className="alert ok" role="status">Mensagem enviada! Um corretor entrará em contato em breve.</p>}
          {estado.erro && (
            <div className="alert bad" role="alert">
              {estado.erro.message}
              {estado.erro.detalhes?.length > 0 && <ul>{estado.erro.detalhes.map((d) => <li key={d}>{d}</li>)}</ul>}
            </div>
          )}
          <button className="btn block" disabled={estado.enviando}><Ico name="send" />{estado.enviando ? 'Enviando…' : 'Enviar mensagem'}</button>
        </form>
        <div className="side">
          <div className="panel">
            <h2>Nossos contatos</h2>
            <ul className="clist">
              {(corretores?.length ? corretores : [{ id: 0, telefone: '(48) 99999-0001' }]).map((c) => (
                <li key={c.id}><Ico name="phone" size={22} /><span>{c.telefone}{c.nome && <small> · {c.nome}</small>}</span></li>
              ))}
              <li><Ico name="mail" size={22} />contato@velteff.com.br</li>
              <li><Ico name="pin" size={22} />Florianópolis - SC</li>
            </ul>
          </div>
          <div className="panel">
            <h2>Siga a gente</h2>
            <div className="social">
              {SOCIAL.map(([ico, nome, url]) => <a key={ico} href={url} target="_blank" rel="noopener noreferrer" aria-label={nome}><Ico name={ico} size={20} /></a>)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
