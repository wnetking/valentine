import { useState, useEffect, useCallback } from 'react'
import { Snackbar, Alert } from '@mui/material'
import MobileGate from './components/MobileGate'
import PhotoGrid from './components/PhotoGrid'
import CenterContent from './components/CenterContent'
import HeartAndMessage from './components/HeartAndMessage'
import RecordingConsent from './components/RecordingConsent'
import RecordingResult from './components/RecordingResult'
import RomanticMusic from './components/RomanticMusic'
import { useRecording } from './hooks/useRecording'
import { PHOTO_COUNT } from './components/PhotoGrid'
import './App.css'

const MOBILE_BREAKPOINT = 768

function shuffle(array) {
  const a = [...array]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function App() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches
      : false
  )
  const [recordingConsentOpen, setRecordingConsentOpen] = useState(false)
  const [recordingConsentAnswered, setRecordingConsentAnswered] = useState(false)
  const [centerVisible, setCenterVisible] = useState(false)
  const [playMusic, setPlayMusic] = useState(false)
  const [centerExiting, setCenterExiting] = useState(false)
  const [noHoverCount, setNoHoverCount] = useState(0)
  const [angryOpen, setAngryOpen] = useState(false)
  const [blockStates, setBlockStates] = useState(() =>
    Object.fromEntries(
      Array.from({ length: PHOTO_COUNT }, (_, i) => [i, { phase: 'idle' }])
    )
  )
  const [flipOrder, setFlipOrder] = useState(null)
  const [showHeart, setShowHeart] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [recordingResultOpen, setRecordingResultOpen] = useState(false)

  const handleRecordingStopped = useCallback(() => {
    setRecordingResultOpen(true)
  }, [])

  const {
    startRecording,
    stopRecording,
    videoUrl,
    error: recordingError,
    isRecording,
    clearError: clearRecordingError,
  } = useRecording(handleRecordingStopped)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)
    const handler = () => setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (isMobile || recordingConsentAnswered) return
    if (typeof navigator !== 'undefined' && navigator.mediaDevices) {
      setTimeout(() => setRecordingConsentOpen(true), 10)
    } else {
      setTimeout(() => setRecordingConsentAnswered(true), 10)
    }
  }, [isMobile, recordingConsentAnswered])

  useEffect(() => {
    if (noHoverCount >= 5) {
      setTimeout(() => setAngryOpen(true), 10)
    }
  }, [noHoverCount])

  const handleRecordingYes = useCallback(async () => {
    setRecordingConsentOpen(false)
    setRecordingConsentAnswered(true)
    const started = await startRecording()
    if (!started) {
      setRecordingConsentAnswered(true)
    }

    setCenterVisible(true)
    setTimeout(() => setPlayMusic(true), 1000)
  }, [startRecording])

  const handleRecordingNo = useCallback(() => {
    setRecordingConsentOpen(false)
    setRecordingConsentAnswered(true)
    setCenterVisible(true)
    setTimeout(() => setPlayMusic(true), 1000)
  }, [])

  const handleYesClick = useCallback(() => {
    setCenterExiting(true)
    setTimeout(() => {
      setCenterVisible(false)
      setCenterExiting(false)
    }, 400)
    const order = shuffle(Array.from({ length: PHOTO_COUNT }, (_, i) => i))
    setFlipOrder(order)
    setBlockStates((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([id]) => [
          id,
          { phase: 'flipping', flipStartedAt: Date.now() },
        ])
      )
    )
  }, [])

  const handleFlipComplete = useCallback(() => {
    setBlockStates((prev) =>
      Object.fromEntries(
        Object.entries(prev).map(([id]) => [id, { phase: 'flipped' }])
      )
    )
    setShowHeart(true)
    setTimeout(() => setShowMessage(true), 800)
    // End recording only after HeartAndMessage is visible (so it appears in the video)
    if (isRecording) {
      setTimeout(() => stopRecording(), 800)
    }
  }, [isRecording, stopRecording])

  const handleAngryClose = useCallback(() => {
    setAngryOpen(false)
    setNoHoverCount(0)
  }, [])

  if (isMobile) {
    return <MobileGate />
  }

  return (
    <>
      <RomanticMusic play={playMusic} />
      <PhotoGrid
        blockStates={blockStates}
        flipOrder={flipOrder}
        onFlipComplete={handleFlipComplete}
      />
      <CenterContent
        visible={centerVisible}
        exiting={centerExiting}
        onYesClick={handleYesClick}
        noHoverCount={noHoverCount}
        onNoHover={() => setNoHoverCount((c) => c + 1)}
        angryOpen={angryOpen}
        onAngryClose={handleAngryClose}
      />
      <HeartAndMessage showHeart={showHeart} showMessage={showMessage} />
      <RecordingConsent
        open={recordingConsentOpen}
        onYes={handleRecordingYes}
        onNo={handleRecordingNo}
      />
      <RecordingResult
        open={recordingResultOpen}
        videoUrl={videoUrl}
        onClose={() => setRecordingResultOpen(false)}
        onDownload={() => {}}
      />
      {recordingError && (
        <Snackbar
          open={!!recordingError}
          autoHideDuration={6000}
          onClose={clearRecordingError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="info" onClose={clearRecordingError}>
            {recordingError}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}
