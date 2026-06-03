"use client"

import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface QuizIntroProps {
  onStart: () => void
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  const handleStart = () => {
    onStart()
  }

  return (
    <div className="min-h-screen flex flex-col justify-center px-6 py-12 md:py-16">
      <div className="max-w-lg w-full mx-auto space-y-8 md:space-y-10">
        {/* Titulo Principal */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight text-center">
          Por que sua barriga continua pra frente <span className="text-[#869b26]">mesmo treinando e fazendo dieta?</span>
        </h1>

        <div className="mt-6 flex justify-center">
          <img
            src="/et01.png"
            alt="Etiqueta et01"
            className="max-w-full h-auto rounded-3xl border border-white/15 shadow-xl shadow-black/20"
          />
        </div>

        {/* Subtexto */}
        <p className="text-white text-base md:text-lg leading-relaxed text-center">
          Faça o diagnóstico de 3 minutos e descubra o que está impedindo seu abdômen de voltar ao normal e o que fazer para corrigir isso.
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <div className="flex flex-col">
            <span className="text-[#869b26] text-xl md:text-2xl font-bold">3.8K+</span>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Mulheres Atendidas</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#869b26] text-xl md:text-2xl font-bold">2min</span>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Para Completar</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[#869b26] text-xl md:text-2xl font-bold">100%</span>
            <span className="text-gray-500 text-xs uppercase tracking-wide">Gratuito</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 flex justify-center">
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full md:w-auto bg-[#869b26] hover:bg-[#6b7d1e] text-white font-bold text-base md:text-lg py-7 px-12 rounded-xl transition-all duration-300 hover:scale-[1.02] uppercase tracking-wider shadow-lg shadow-[#869b26]/30"
          >
            INICIAR DIAGNÓSTICO
          </Button>
        </div>

        {/* Quem já fez */}
        <div className="flex flex-col items-center justify-center gap-2 pt-4">
          <span className="text-gray-500 text-sm uppercase tracking-wide">Quem já fez</span>
          <ChevronDown className="w-5 h-5 text-gray-500 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
