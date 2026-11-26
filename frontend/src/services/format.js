const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
export const brl = (n) => moeda.format(Number(n))
export const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`
