"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap } from "lucide-react"

interface ProgressNotificationProps {
  show: boolean
  message: string
}

export function ProgressNotification({ show, message }: ProgressNotificationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (show && audioRef.current) {
      // Reset audio to start and play
      audioRef.current.currentTime = 0
      audioRef.current.volume = 0.3 // Subtle volume
      audioRef.current.play().catch((error) => {
        console.log("[v0] Audio play failed:", error)
      })
    }
  }, [show])

  return (
    <>
      {/* Audio element for achievement sound */}
      <audio ref={audioRef} src="/som notificação.MP3" preload="auto" />

      {/* Notification pop-up */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            className="fixed top-20 right-4 sm:right-8 z-[9999] pointer-events-none"
          >
            <div className="bg-[#2ecc71] text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <Zap className="w-5 h-5 text-yellow-300" fill="currentColor" />
              <span className="font-semibold text-base sm:text-lg">{message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
