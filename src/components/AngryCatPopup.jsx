import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

const ANGRY_CAT_GIF =
  `${import.meta.env.BASE_URL}/angry-cat.jpeg`
  

export default function AngryCatPopup({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, p: 8 },
      }}
    >
      <DialogTitle textAlign="center">
        <Typography variant="h4" component="span" color="error" textAlign="center">
          Не виводь мене!
        </Typography>
      </DialogTitle>
      <DialogContent>
        <img
          src={ANGRY_CAT_GIF}
          alt="Angry cat"
          style={{
            width: '100%',
            maxHeight: 280,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="contained" color="primary" onClick={onClose} fullWidth>
          Добре, не буду більше
        </Button>
      </DialogActions>
    </Dialog>
  )
}
