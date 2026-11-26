export default function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 390 110" role="img" aria-label="Velteff Imobiliária">
      <polyline points="20,52 55,22 90,52" fill="none" stroke="#D4AF37" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="33,62 55,92 77,62" fill="none" stroke="#80BDF2" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <text x="140" y="55" fontFamily="Montserrat, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="40" fontWeight="500" letterSpacing="6" fill="#E8E8E8">VELTEFF</text>
      <line x1="140" y1="67" x2="340" y2="67" stroke="#D4AF37" strokeWidth="2" />
      <text x="140" y="91" fontFamily="Montserrat, 'Segoe UI', Helvetica, Arial, sans-serif" fontSize="14" fontWeight="500" letterSpacing="5" fill="#80BDF2">IMOBILIÁRIA</text>
    </svg>
  )
}
