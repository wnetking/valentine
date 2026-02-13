import { Box, Paper, Typography } from '@mui/material'
import './HeartAndMessage.css'

export default function HeartAndMessage({ showHeart, showMessage }) {
  return (
    <>
      {!showHeart && !showMessage ? null : (
    <Box
      className="heart-and-message"
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      <Paper
        elevation={8}
        className="heart-card"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 10,
          borderRadius: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          maxWidth: '90vw',
        }}
      >
        {showHeart && (
          <>
          <span className="heart-emoji" aria-hidden>
            ❤️
          </span>
        
          <Typography
            variant="h4"
            component="p"
            mb={2}
            className="heart-message-text"
            sx={{
              mt: 2,
              color: 'primary.dark',
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            З днем святого Валентина! <br/> Кохаю тебе!
          </Typography>
          </>
        )}
      </Paper>
    </Box>
      )}
    </>
  )
}
