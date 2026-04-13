"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface QuizOption {
  label: string
}

interface QuizChatWithImageProps {
  title: string
  messages: string[]
  image: string
  imageAlt: string
  questionTitle: string
  options: QuizOption[]
  onSelect: (answer: string) => void
}

export function QuizChatWithImage({
  title,
  messages,
  image,
  imageAlt,
  questionTitle,
  options,
  onSelect,
}: QuizChatWithImageProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showImage, setShowImage] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  // Typewriter effect for messages
  useEffect(() => {
    if (currentMessageIndex >= messages.length) {
      // All messages done, show image
      setTimeout(() => {
        setShowImage(true)
        // After image appears, show quiz
        setTimeout(() => {
          setShowQuiz(true)
        }, 800)
      }, 500)
      return
    }

    const text = messages[currentMessageIndex]
    let index = 0
    setDisplayedText("")
    setIsTyping(true)

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsTyping(false)
        // Wait before next message
        setTimeout(() => {
          setCurrentMessageIndex(prev => prev + 1)
        }, 600)
      }
    }, 20)

    return () => clearInterval(interval)
  }, [currentMessageIndex, messages])

  const handleSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      onSelect(selectedOption)
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-6 pt-28">
      <div className="max-w-md w-full space-y-4">
        
        {/* Chat balloon */}
        <div className="w-full">
          <div className="bg-white rounded-2xl px-5 py-4 shadow-lg relative">
            
            {/* Title */}
            <p className="text-gray-800 font-bold text-lg mb-3">{title}</p>
            
            {/* Messages */}
            <div className="space-y-2">
              {/* Completed messages */}
              {messages.slice(0, currentMessageIndex).map((msg, index) => (
                <p key={index} className="text-gray-700 text-sm leading-relaxed">
                  {msg}
                </p>
              ))}
              
              {/* Current typing message */}
              {currentMessageIndex < messages.length && (
                <p className="text-gray-700 text-sm leading-relaxed">
                  {displayedText}
                  {isTyping && <span className="animate-pulse text-[#869b26]">|</span>}
                </p>
              )}
            </div>

            {/* Image inside balloon */}
            {showImage && (
              <div className="mt-4 animate-in fade-in duration-500">
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <Image 
                    src={image} 
                    alt={imageAlt} 
                    width={400} 
                    height={300} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quiz section - appears after conversation */}
        {showQuiz && (
          <div className="animate-in slide-in-from-bottom duration-500">
            {/* Question title */}
            <p className="text-white font-semibold text-base mb-3 text-center">{questionTitle}</p>
            
            {/* Options card */}
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-2xl">
              <div className="space-y-3">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option.label)}
                    className={`w-full bg-white/5 border rounded-xl p-4 transition-all duration-200 flex items-center gap-3 ${
                      selectedOption === option.label 
                        ? "border-[#869b26] bg-[#869b26]/10" 
                        : "border-white/20 hover:border-white/40 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-white text-sm font-medium text-left flex-1">
                      {option.label}
                    </span>

                    <div className={`w-5 h-5 border-2 rounded flex-shrink-0 flex items-center justify-center transition-all ${
                      selectedOption === option.label 
                        ? "border-[#869b26] bg-[#869b26]" 
                        : "border-white/40"
                    }`}>
                      {selectedOption === option.label && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Next button */}
              <div className="mt-5">
                <Button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className={`w-full py-6 rounded-xl text-white font-semibold text-lg transition-all ${
                    selectedOption 
                      ? "bg-[#869b26] hover:bg-[#6b7d1e]" 
                      : "bg-gray-600 cursor-not-allowed opacity-50"
                  }`}
                >
                  Proximo
                </Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
