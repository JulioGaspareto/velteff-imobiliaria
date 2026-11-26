const BASE = `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api`

async function req(path, opts) {
  let res
  try {
    res = await fetch(BASE + path, { headers: { 'Content-Type': 'application/json' }, ...opts })
  } catch {
    throw new Error('Não foi possível conectar ao servidor. Verifique se a API está rodando.')
  }
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const e = new Error(data?.erro || 'Erro inesperado. Tente novamente.')
    e.detalhes = data?.detalhes || []
    e.status = res.status
    throw e
  }
  return data
}

export function listarImoveis(filtros = {}) {
  const q = new URLSearchParams()
  Object.entries(filtros).forEach(([k, v]) => v !== undefined && v !== '' && q.set(k, v))
  const s = q.toString()
  return req(`/imoveis${s ? `?${s}` : ''}`)
}
export const buscarImovel = (id) => req(`/imoveis/${encodeURIComponent(id)}`)
export const enviarContato = (dados) => req('/contatos', { method: 'POST', body: JSON.stringify(dados) })

let cacheCorretores
export function listarCorretores() {
  cacheCorretores ??= req('/corretores').catch((e) => {
    cacheCorretores = undefined
    throw e
  })
  return cacheCorretores
}

// Cadastro de imóvel: multipart/form-data (campos de texto + arquivos em "fotos").
// Exige que o backend implemente POST /api/imoveis e responda 201 { id }.
export const cadastrarImovel = (formData) => req('/imoveis', { method: 'POST', body: formData, headers: {} })
