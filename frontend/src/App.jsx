import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Status from './components/Status'
import Home from './pages/Home'
import Listing from './pages/Listing'
import Detail from './pages/Detail'
import About from './pages/About'
import Contact from './pages/Contact'
import CadastrarImovel from './pages/CadastrarImovel'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="aluguel" element={<Listing finalidade="aluguel" />} />
        <Route path="venda" element={<Listing finalidade="venda" />} />
        <Route path="imoveis/:id" element={<Detail />} />
        <Route path="sobre" element={<About />} />
        <Route path="contato" element={<Contact />} />
        <Route path="admin/imoveis/novo" element={<CadastrarImovel />} />
        <Route path="*" element={<Status error={{ message: 'Página não encontrada.', status: 404 }} />} />
      </Route>
    </Routes>
  )
}
