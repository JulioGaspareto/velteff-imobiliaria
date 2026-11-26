export default function Skyline({ className }) {
  return (
    <svg className={className} viewBox="0 0 600 260" aria-hidden="true" fill="none" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
      <g stroke="#80BDF2">
        <path d="M10 250V130h60v120M90 250V70h70v180M180 250V150h55v100M365 250V110h65v140M450 250V160h50v90M520 250V90h70v160" />
        <path d="M255 250V40h90v210M110 100h30M110 130h30M110 160h30M275 80h50M275 110h50M275 140h50M275 170h50M540 120h30M540 150h30" />
      </g>
      <path d="M250 42l50-34 50 34" stroke="#D4AF37" strokeWidth="3" />
      <path d="M0 252h600" stroke="#D4AF37" />
    </svg>
  )
}
