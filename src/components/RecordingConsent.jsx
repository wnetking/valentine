import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material'

export default function RecordingConsent({ open, onYes, onNo }) {
  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle>
        <Typography variant="h6">
          Хочеш записати свій досвід на цій сторінці?
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          Я запишу екран та твою камеру, щоб захопити твою реакцію. Запис припиниться, коли сюрприз буде відкритий. Не турбуйся, це безпечно, зуб даю!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onNo} color="inherit">
          Ні
        </Button>
        <Button variant="contained" onClick={onYes}>
          Так
        </Button>
      </DialogActions>
    </Dialog>
  )
}
