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
        {/* Label superior */}
        <div className="flex items-center gap-2">
          <span className="text-[#869b26] text-sm font-medium tracking-wide">—</span>
          <span className="text-[#869b26] text-sm font-medium tracking-wide uppercase">Diagnóstico Gratuito</span>
        </div>

        {/* Titulo Principal */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          Descubra em 3 minutos por que sua barriga continua pra frente <span className="text-[#869b26]">(mesmo treinando ou fazendo dietas)</span>
        </h1>

        {/* Subtexto */}
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Responda algumas perguntas e receba seu diagnóstico personalizado + plano de ação específico para o SEU tipo de abdômen
        </p>

        {/* Bullets de curiosidade */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[#869b26] font-bold flex-shrink-0">&#10003;</span>
            <span className="text-gray-300 text-sm md:text-base">Por que fazer abdominal pode estar PIORANDO sua barriga</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#869b26] font-bold flex-shrink-0">&#10003;</span>
            <span className="text-gray-300 text-sm md:text-base">O erro n1 que mantém a diástase aberta (mesmo após anos após o parto)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#869b26] font-bold flex-shrink-0">&#10003;</span>
            <span className="text-gray-300 text-sm md:text-base">Como mulheres estão recuperando o abdômen em 8-12 semanas (sem dieta rigorosa ou horas de treino)</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-start gap-6 md:gap-10">
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
        <div className="pt-4">
          <Button
            onClick={handleStart}
            size="lg"
            className="w-full bg-[#869b26] hover:bg-[#6b7d1e] text-white font-bold text-base md:text-lg py-7 rounded-xl transition-all duration-300 hover:scale-[1.02] uppercase tracking-wider shadow-lg shadow-[#869b26]/30"
          >
            INICIAR DIAGNÓSTICO
          </Button>
        </div>

        {/* Quem já fez */}
        <div className="flex flex-col items-center gap-2 pt-4">
          <span className="text-gray-500 text-sm uppercase tracking-wide">Quem já fez</span>
          <ChevronDown className="w-5 h-5 text-gray-500 animate-bounce" />
        </div>
      </div>
    </div>
  )
}
