import { Box, Typography } from '@mui/material'

const message =
  "Вибач, мила, ця сторінка не працює на мобільних пристроях. Я підготував для тебе сюрприз так що скоріше відкрий на комп'ютері!"

export default function MobileGate() {
  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 3,
        zIndex: 9999,
      }}
    >
      <Typography
        variant="h5"
        component="p"
        align="center"
        sx={{
          maxWidth: 360,
          fontWeight: 500,
          color: 'secondary.dark',
        }}
      >
        {message}
      </Typography>
    </Box>
  )
}
