import { useRef, useCallback, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import AngryCatPopup from './AngryCatPopup'
import './CenterContent.css'

const MOVE_DISTANCE = 100

function clampPosition(rect, dx, dy, vw, vh) {
  let x = dx
  let y = dy
  const padding = 16
  if (rect.left + x < padding) x = padding - rect.left
  if (rect.top + y < padding) y = padding - rect.top
  if (rect.right + x > vw - padding) x = vw - padding - rect.right
  if (rect.bottom + y > vh - padding) y = vh - padding - rect.bottom
  return { x, y }
}

export default function CenterContent({
  visible,
  exiting,
  onYesClick,
  // eslint-disable-next-line no-unused-vars
  noHoverCount,
  onNoHover,
  angryOpen,
  onAngryClose,
}) {
  const noButtonRef = useRef(null)
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 })

  const handleNoMouseEnter = useCallback(() => {
    const el = noButtonRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const angle = Math.random() * Math.PI * 2
    const dx = Math.cos(angle) * MOVE_DISTANCE
    const dy = Math.sin(angle) * MOVE_DISTANCE
    const { x, y } = clampPosition(rect, dx, dy, vw, vh)
    setNoOffset((prev) => ({ x: prev.x + x, y: prev.y + y }))
    onNoHover?.()
  }, [onNoHover])

  if (!visible) return null

  return (
    <>
      <Box
        className={`center-content ${exiting ? 'center-content-exiting' : ''}`}
        sx={{
          position: 'fixed',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          pointerEvents: exiting ? 'none' : 'none',
          opacity: exiting ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      >
        <Box
          className="center-content-inner"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            pointerEvents: 'auto',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: 'primary.dark',
              fontWeight: 600,
              textAlign: 'center',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
          >
            Будеш моїм Валентином?
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onYesClick}
              className="btn-yes"
              sx={{
                minWidth: 120,
              }}
            >
              Так
            </Button>
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                transition: 'transform 0.25s ease',
                transform: `translate(${noOffset.x}px, ${noOffset.y}px)`,
              }}
            >
              <Button
                ref={noButtonRef}
                variant="contained"
                color="grey"
                size="large"
                onMouseEnter={handleNoMouseEnter}
                className="btn-no"
                sx={{ minWidth: 120 }}
              >
                Ні
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <AngryCatPopup open={angryOpen} onClose={onAngryClose} />
    </>
  )
}
