import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import Skyline from '../components/Skyline'
import { Ico } from '../components/Icons'

const DIFERENCIAIS = [
  ['users', 'Atendimento personalizado'],
  ['shield', 'Segurança em todas as negociações'],
  ['star', 'Variedade de imóveis'],
  ['clock', 'Agilidade no processo'],
]

export default function About() {
  return (
    <>
      <PageHero titulo="Sobre nós" sub="Realizando sonhos, construindo histórias" />
      <section className="sec wrap two">
        <div className="quem">
          <h2>Quem somos?</h2>
          <p>A Velteff Imobiliária é uma empresa comprometida em conectar pessoas aos melhores imóveis de Florianópolis e região. Com anos de experiência no mercado, oferecemos um atendimento próximo, transparente e eficiente.</p>
          <p>Nosso objetivo é tornar o processo de compra, venda ou aluguel mais simples e seguro para você.</p>
          <Link className="btn" to="/contato">Fale conosco</Link>
        </div>
        <div className="panel">
          <h2>Nossos diferenciais</h2>
          <ul className="clist">
            {DIFERENCIAIS.map(([ico, t]) => <li key={t}><Ico name={ico} size={26} />{t}</li>)}
          </ul>
        </div>
      </section>
      <div className="wrap about-art" aria-hidden="true"><Skyline /></div>
    </>
  )
}
