import { Link } from 'react-router-dom'

export default function Status({ loading, error, retry, children }) {
  if (loading) return <p className="state" role="status">Carregando…</p>
  if (error) {
    return (
      <div className="state" role="alert">
        <p>{error.message}</p>
        {error.status !== 404 && retry && <button className="btn sm" onClick={retry}>Tentar novamente</button>}
        {error.status === 404 && <Link className="btn sm" to="/">Voltar ao início</Link>}
      </div>
    )
  }
  return children
}
