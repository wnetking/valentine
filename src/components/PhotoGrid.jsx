import { useMemo } from 'react'
import PhotoBlock from './PhotoBlock'
import './PhotoGrid.css'

// Placeholder images (Picsum) – swap for personal photos later
const PHOTO_COUNT = 24
const PHOTOS = Array.from({ length: PHOTO_COUNT }, (_, i) => ({
  id: i,
  url: `${import.meta.env.BASE_URL}tinified/${i+1}.jpg`,
}))

export default function PhotoGrid({
  blockStates,
  flipOrder,
  onFlipComplete,
}) {
  const orderedIds = useMemo(() => {
    if (!flipOrder || flipOrder.length === 0) return PHOTOS.map((p) => p.id)
    return flipOrder
  }, [flipOrder])

  return (
    <div className="photo-grid">
      {PHOTOS.map((photo) => (
        <PhotoBlock
          key={photo.id}
          id={photo.id}
          url={photo.url}
          state={blockStates[photo.id]}
          flipOrderIndex={orderedIds.indexOf(photo.id)}
          flipOrderLength={orderedIds.length}
          onFlipComplete={onFlipComplete}
        />
      ))}
    </div>
  )
}

export { PHOTOS, PHOTO_COUNT }
