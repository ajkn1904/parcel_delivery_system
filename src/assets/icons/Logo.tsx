export default function Logo() {
  return (
    <svg width="80" height="60" viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">

  <defs>
    <linearGradient id="gradBlue" x1="0%" y1="0%" x2="70%" y2="0%">
      <stop offset="0%" stopColor="#3B82F6"/>
      <stop offset="100%" stopColor="#1E40AF"/>
    </linearGradient>
    <linearGradient id="gradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#F59E0B"/>
      <stop offset="100%" stopColor="#D97706"/>
    </linearGradient>
  </defs>



  {/* <!-- Parcel cube --> */}
  <g transform="scale(0.20) translate(-100,0)">
    <polygon points="180,80 260,80 320,120 240,120" fill="url(#gradBlue)"/>
    <polygon points="240,120 320,120 320,180 240,180" fill="#1E3A8A"/>
    <polygon points="180,80 240,120 240,180 180,140" fill="#2563EB"/>
    <polygon points="240,120 280,100 280,140 240,160" fill="white"/>
  </g>

  {/* <!-- Motion streaks --> */}
  <g fill="url(#gradOrange)" >
    <rect x="1" y="20" width="14" height="2" rx="1"/>
    <rect x="1" y="25" width="20" height="2" rx="1"/>
    <rect x="1" y="30" width="17" height="2" rx="1"/>
  </g>

  {/* <!-- Wordmark --> */}
  <text x="2" y="45" fontFamily="Poppins, Inter, sans-serif" fontSize="9" fontWeight="800" fill="url(#gradBlue)" letterSpacing="0.5">
    PARCELGO``
  </text>
  <text x="5" y="50" fontFamily="Inter, sans-serif" fontSize="4" fill="url(#gradOrange)" letterSpacing="1">
    FAST • RELIABLE • GLOBAL
  </text>
</svg>


  );
}