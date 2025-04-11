export function PixelHeart({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pixel-heart"
    >
      <path
        d="M1 1h3v1h1v1h1v1h1v1h2V4h1V3h1V2h1V1h3v1h1v3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-2v-1h-1V9h-1V8h-1V7h-1V6h-1V5H0V2h1V1z"
        fill={filled ? "#FF0000" : "#3F3F3F"}
      />
    </svg>
  )
}
