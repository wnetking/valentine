import { useCallback, useRef, useState } from 'react'

const FPS = 30

export function useRecording(onStop) {
  const [videoUrl, setVideoUrl] = useState(null)
  const [error, setError] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const runningRef = useRef(false)
  const videoScreenRef = useRef(null)
  const videoCameraRef = useRef(null)

  const stopRecording = useCallback(() => {
    runningRef.current = false
    const mr = mediaRecorderRef.current
    if (!mr || mr.state === 'inactive') return
    mr.stop()
    setIsRecording(false)
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
    if (videoScreenRef.current?.srcObject) {
      videoScreenRef.current.srcObject.getTracks().forEach((t) => t.stop())
    }
    if (videoCameraRef.current?.srcObject) {
      videoCameraRef.current.srcObject.getTracks().forEach((t) => t.stop())
    }
  }, [])

  const startRecording = useCallback(async () => {
    setError(null)
    if (!navigator.mediaDevices) {
      setError('Recording not supported in this browser.')
      return false
    }
    let screenStream
    let cameraStream
    try {
      screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      })
    } catch (e) {
      setError('Screen sharing was denied or is not supported.')
      return false
    }
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
        audio: false,
      })
    } catch (e) {
      screenStream.getTracks().forEach((t) => t.stop())
      setError('Camera access was denied or is not available.')
      return false
    }

    const canvas = document.createElement('canvas')
    canvas.width = screenStream.getVideoTracks()[0].getSettings().width || 1920
    canvas.height =
      screenStream.getVideoTracks()[0].getSettings().height || 1080
    const ctx = canvas.getContext('2d')

    const videoScreen = document.createElement('video')
    videoScreen.srcObject = screenStream
    videoScreen.play()
    videoScreen.muted = true

    const videoCamera = document.createElement('video')
    videoCamera.srcObject = cameraStream
    videoCamera.play()
    videoCamera.muted = true

    videoScreenRef.current = videoScreen
    videoCameraRef.current = videoCamera
    canvasRef.current = canvas

    runningRef.current = true
    const draw = () => {
      if (!runningRef.current) return
      if (!ctx || !canvas.width || !canvas.height) return
      if (videoScreen.readyState >= 2) {
        ctx.drawImage(videoScreen, 0, 0, canvas.width, canvas.height)
      }
      if (videoCamera.readyState >= 2) {
        const w = 280
        const h = (w * 240) / 320
        const x = canvas.width - w - 24
        const y = 24
        ctx.drawImage(videoCamera, x, y, w, h)
      }
      if (runningRef.current) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }
    draw()

    const canvasStream = canvas.captureStream(FPS)
    const videoTracks = canvasStream.getVideoTracks()
    const audioTracks = screenStream.getAudioTracks()
    const stream = new MediaStream([...videoTracks, ...audioTracks])
    streamRef.current = stream
    chunksRef.current = []

    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm'
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 2500000,
      audioBitsPerSecond: audioTracks.length > 0 ? 128000 : undefined,
    })
    mediaRecorderRef.current = mediaRecorder
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)
      onStop?.(url)
    }
    mediaRecorder.start(1000)
    setIsRecording(true)
    return true
  }, [onStop])

  const clearError = useCallback(() => setError(null), [])

  return {
    startRecording,
    stopRecording,
    videoUrl,
    error,
    isRecording,
    clearError,
  }
}
