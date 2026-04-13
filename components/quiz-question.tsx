"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface QuizOption {
  label: string
  subtitle?: string
  image?: string
}

interface QuizQuestionProps {
  question: string
  options: QuizOption[]
  onSelect: (option: string) => void
  currentStep?: number
  totalSteps?: number
  questionImage?: string
  expertImage?: string
  explanation?: string
}

export function QuizQuestion({
  question,
  options,
  onSelect,
  currentStep,
  totalSteps,
  questionImage,
  expertImage = "/daniele-castro.png",
  explanation,
}: QuizQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  // Typewriter effect - faster for better performance
  useEffect(() => {
    setDisplayedText("")
    setIsTyping(true)
    let index = 0
    const interval = setInterval(() => {
      if (index < question.length) {
        setDisplayedText(question.slice(0, index + 1))
        index++
      } else {
        setIsTyping(false)
        clearInterval(interval)
      }
    }, 15)
    return () => clearInterval(interval)
  }, [question])

  const handleSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      onSelect(selectedOption)
      setSelectedOption(null)
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-6 pt-28">
      <div className="max-w-md w-full space-y-5">
        
        {/* Avatar + Balao de chat */}
        <div className="flex items-start gap-3">
          {/* Avatar da expert */}
          <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#869b26] shadow-lg">
              <Image 
                src={expertImage} 
                alt="Expert" 
                width={56} 
                height={56} 
                priority
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          
          {/* Balao de chat com a pergunta */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-md">
              <p className="text-gray-800 font-medium text-base">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>
        </div>

        {/* Texto explicativo */}
        {explanation && (
          <p className="text-sm text-left px-2 text-white">
            {explanation}
          </p>
        )}

        {/* Card container com glassmorphism */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-5 shadow-2xl">
          {/* Opcoes */}
          <div className="space-y-3">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option.label)}
                className={`w-full bg-white/5 border rounded-xl p-3 transition-all duration-200 flex items-center gap-3 ${
                  selectedOption === option.label 
                    ? "border-[#869b26] bg-[#869b26]/10" 
                    : "border-white/20 hover:border-white/40 hover:bg-white/10"
                }`}
              >
                {/* Imagem da opcao (esquerda) */}
                {option.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={option.image}
                      alt={option.label}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Texto da opcao (centro) */}
                <div className="flex-1 text-left">
                  <span className="text-white text-sm font-medium block">
                    {option.label}
                  </span>
                  {option.subtitle && (
                    <span className="text-gray-400 text-xs block mt-0.5">
                      {option.subtitle}
                    </span>
                  )}
                </div>

                {/* Checkbox (direita) */}
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

          {/* Botao Proximo */}
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
    </div>
  )
}
