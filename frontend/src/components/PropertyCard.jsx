import { Link } from 'react-router-dom'
import Photo from './Photo'
import { Ico } from './Icons'
import { brl, plural } from '../services/format'

export default function PropertyCard({ imovel: i }) {
  const aluguel = i.finalidade === 'aluguel'
  return (
    <article className="card">
      <Photo src={i.foto_principal} alt={i.titulo}>
        <span className={`badge${aluguel ? '' : ' venda'}`}>{aluguel ? 'Para alugar' : 'À venda'}</span>
      </Photo>
      <div className="card-b">
        <h3>{i.titulo}</h3>
        <p className="loc">{i.bairro}, {i.cidade}</p>
        <p className="feat">
          <span><Ico name="bed" size={16} />{plural(i.quartos, 'quarto', 'quartos')}</span>
          <span><Ico name="bath" size={16} />{plural(i.banheiros, 'banheiro', 'banheiros')}</span>
          <span><Ico name="car" size={16} />{plural(i.vagas, 'vaga', 'vagas')}</span>
        </p>
        <div className="card-f">
          <p className="price">{brl(i.preco)}{aluguel && <small> /mês</small>}</p>
          <Link className="btn sm" to={`/imoveis/${i.id}`}>Ver detalhes</Link>
        </div>
      </div>
    </article>
  )
}
