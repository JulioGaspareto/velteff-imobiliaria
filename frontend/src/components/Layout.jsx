import { useEffect, useState } from 'react'
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { Ico } from './Icons'
import { useTelefones } from '../services/useAsync'

const LINKS = [['/', 'Início'], ['/aluguel', 'Aluguel'], ['/venda', 'Compra e venda'], ['/sobre', 'Sobre nós'], ['/contato', 'Contato']]

export default function Layout() {
  const [aberto, setAberto] = useState(false)
  const { pathname } = useLocation()
  const tels = useTelefones()

  useEffect(() => {
    setAberto(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <header className="hdr">
        <div className="wrap">
          <Link to="/" aria-label="Velteff Imobiliária, página inicial"><Logo className="logo" /></Link>
          <nav id="menu" className={`nav${aberto ? ' open' : ''}`} aria-label="Principal">
            {LINKS.map(([to, t]) => <NavLink key={to} to={to} end={to === '/'}>{t}</NavLink>)}
          </nav>
          <a className="hdr-tel" href={`tel:${tels[0].replace(/\D/g, '')}`}>{tels[0]}</a>
          <button className="burger" aria-expanded={aberto} aria-controls="menu" aria-label="Menu" onClick={() => setAberto(!aberto)}>
            <Ico name={aberto ? 'close' : 'menu'} size={26} />
          </button>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="ftr">
        <div className="wrap">
          <Logo className="logo" />
          <p>Corretores: {tels.join(' · ')}</p>
          <p>Endereço fictício, 123 · Centro</p>
          <Link className="ftr-link" to="/admin/imoveis/novo">Área do corretor</Link>
        </div>
      </footer>
    </>
  )
}
