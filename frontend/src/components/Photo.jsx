import { useState } from 'react'
import { Ico } from './Icons'

// Usar key={src} ao trocar a foto para reiniciar o estado de erro.
export default function Photo({ src, alt, className = 'ph', children }) {
  const [falhou, setFalhou] = useState(!src)
  return (
    <div className={className}>
      {children}
      {falhou ? (
        <Ico name="home" size={44} />
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setFalhou(true)} />
      )}
    </div>
  )
}
