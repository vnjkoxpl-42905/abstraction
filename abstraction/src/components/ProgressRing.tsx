interface Props { value: number; size?: number; stroke?: number; }
export default function ProgressRing({ value, size = 56, stroke = 5 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E4E4E1" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke="#0F0F0E" strokeWidth={stroke} fill="none" strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dy="0.35em"
            fontSize={size * 0.26} fontWeight={600} fill="#0F0F0E" fontFamily="Inter">
        {Math.round(pct)}
      </text>
    </svg>
  );
}
