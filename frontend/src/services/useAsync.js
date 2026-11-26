import { useEffect, useState } from 'react'
import { listarCorretores } from './api'

export default function useAsync(fn, deps) {
  const [estado, setEstado] = useState({ loading: true, data: null, error: null })
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    let ativo = true
    setEstado((p) => ({ ...p, loading: true, error: null }))
    fn()
      .then((data) => ativo && setEstado({ loading: false, data, error: null }))
      .catch((error) => ativo && setEstado({ loading: false, data: null, error }))
    return () => {
      ativo = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tentativa])

  return { ...estado, retry: () => setTentativa((n) => n + 1) }
}

const TELEFONES_PADRAO = ['(48) 99999-0001', '(48) 99999-0002', '(48) 99999-0003']

export function useTelefones() {
  const { data } = useAsync(listarCorretores, [])
  return data?.length ? data.map((c) => c.telefone) : TELEFONES_PADRAO
}
