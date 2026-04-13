"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface QuizTransitionScreenProps {
  onContinue: () => void
}

export function QuizTransitionScreen({ onContinue }: QuizTransitionScreenProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const lines = [
    "Você sabia?",
    "A maioria das mulheres que chegam aqui já tentou algo.",
    "Quando o abdômen não responde, o problema raramente é falta de esforço.",
    "Na maioria dos casos, é falta de ativação correta das camadas profundas."
  ]

  // Typewriter effect for each line
  useEffect(() => {
    if (currentLine >= lines.length) {
      setIsTyping(false)
      return
    }

    const text = lines[currentLine]
    let index = 0
    setDisplayedText("")
    setIsTyping(true)

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        // Wait a bit before moving to next line
        setTimeout(() => {
          setCurrentLine(prev => prev + 1)
        }, 500)
      }
    }, 15)

    return () => clearInterval(interval)
  }, [currentLine])

  return (
    <div className="flex flex-col items-center px-4 py-8 pt-24 min-h-screen">
      <div className="max-w-md w-full flex flex-col items-center">
        
        {/* Chat balloon with text - ABOVE the image */}
        <div className="w-full mb-4">
          <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-4 shadow-lg min-h-[140px] relative">
            {/* Triangle pointer pointing down */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
            
            <div className="space-y-3">
              {/* Show completed lines */}
              {lines.slice(0, currentLine).map((line, index) => (
                <p key={index} className={`text-gray-800 leading-relaxed ${index === 0 ? 'text-lg font-bold' : 'text-sm'}`}>
                  {index === 0 && <span className="mr-1">💡</span>}
                  {line}
                </p>
              ))}
              
              {/* Current typing line */}
              {currentLine < lines.length && (
                <p className={`text-gray-800 leading-relaxed ${currentLine === 0 ? 'text-lg font-bold' : 'text-sm'}`}>
                  {currentLine === 0 && <span className="mr-1">💡</span>}
                  {displayedText}
                  {isTyping && <span className="animate-pulse text-[#869b26]">|</span>}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Expert image - BELOW the balloon */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/expert-sitting.webp" 
            alt="Expert" 
            width={300} 
            height={300} 
            priority
            className="object-contain"
          />
        </div>

        {/* Continue button - only shows after all text is displayed */}
        <div className={`w-full transition-all duration-500 ${currentLine >= lines.length ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <Button
            onClick={onContinue}
            disabled={currentLine < lines.length}
            className="w-full py-6 rounded-xl text-white font-semibold text-lg bg-[#869b26] hover:bg-[#6b7d1e] transition-all"
          >
            Continuar
          </Button>
        </div>

      </div>
    </div>
  )
}
