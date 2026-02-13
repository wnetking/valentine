import { useEffect, useRef } from 'react'

// Local file from public/audio (served at BASE_URL + path)
const ROMANTIC_MUSIC_URL = `${import.meta.env.BASE_URL}audio/romantic-music.mp3`

export default function RomanticMusic({ play }) {
  const audioRef = useRef(null)

  useEffect(() => {
    if (!play) return
    const audio = audioRef.current
    if (!audio) return

    audio.volume = 0.6

    const tryPlay = () => {
      const p = audio.play()
      if (p && typeof p.catch === 'function') {
        p.catch(() => {})
      }
    }

    if (audio.readyState >= 2) {
      tryPlay()
    } else {
      const onCanPlay = () => {
        audio.removeEventListener('canplaythrough', onCanPlay)
        tryPlay()
      }
      audio.addEventListener('canplaythrough', onCanPlay)
      return () => audio.removeEventListener('canplaythrough', onCanPlay)
    }
  }, [play])

  return (
    <audio
      ref={audioRef}
      src={ROMANTIC_MUSIC_URL}
      loop
      preload="auto"
      aria-label="Romantic background music"
    />
  )
}
