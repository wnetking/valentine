import { useEffect, useRef } from 'react'

const FLIP_DURATION_MS = 500

export default function PhotoBlock({
  url,
  state = {},
  flipOrderIndex,
  flipOrderLength,
  onFlipComplete,
}) {
  const { phase = 'idle' } = state
  const hasNotifiedRef = useRef(false)

  useEffect(() => {
    if (phase !== 'flipping' || flipOrderLength === 0) return
    const delayUntilThisBlockEnds =
      flipOrderIndex * FLIP_DURATION_MS + FLIP_DURATION_MS
    const timer = setTimeout(() => {
      if (
        !hasNotifiedRef.current &&
        flipOrderIndex === flipOrderLength - 1
      ) {
        hasNotifiedRef.current = true
        setTimeout(() => {
          onFlipComplete?.()
        }, 1000)
      }
    }, delayUntilThisBlockEnds)
    return () => clearTimeout(timer)
  }, [phase, flipOrderIndex, flipOrderLength, onFlipComplete])

  const isFlipping = phase === 'flipping'
  const isFlipped = phase === 'flipped'
  const animationDelay = isFlipping ? flipOrderIndex * FLIP_DURATION_MS : 0

  return (
    <div
      className={`photo-block ${isFlipping ? 'flipping' : ''} ${isFlipped ? 'flipped' : ''}`}
      style={{
        opacity: isFlipping ? undefined : isFlipped ? 1 : 0,
        animationDelay: isFlipping ? `${animationDelay}ms` : undefined,
      }}
    >
      <div
        className="photo-block-inner"
        style={{ backgroundImage: `url(${url})` }}
      />
      <div className="photo-block-back" />
    </div>
  )
}
