import {
  Box,
  Paper,
  IconButton,
  Typography,
  Button,
  Link,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export default function RecordingResult({
  open,
  videoUrl,
  onClose,
}) {
  if (!open) return null

  return (
    <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          width: 320,
          maxWidth: 'calc(100vw - 32px)',
          borderRadius: 3,
          overflow: 'hidden',
          zIndex: 30,
        }}
      >
        <Box sx={{ p: 2, pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Відео готове
            </Typography>
            <IconButton size="small" onClick={onClose} aria-label="Close">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              style={{
                width: '100%',
                maxHeight: 200,
                borderRadius: 8,
                background: '#000',
                display: 'block',
              }}
            />
          )}
          <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {videoUrl && (
              <Link
                href={videoUrl}
                download="valentine-recording.webm"
                underline="none"
              >
                <Button variant="outlined" size="small" fullWidth>
                  Завантажити відео
                </Button>
              </Link>
            )}
            <Button variant="contained" size="small" fullWidth onClick={onClose}>
              Закрити
            </Button>
          </Box>
        </Box>
      </Paper>
  )
}
