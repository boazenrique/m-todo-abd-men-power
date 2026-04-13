"use client"

import Image from "next/image"

interface QuizHeaderProps {
  points: number
  currentStep?: number
  totalSteps?: number
}

export function QuizHeader({ points, currentStep = 0, totalSteps = 10 }: QuizHeaderProps) {
  const progressPercentage = Math.min(Math.round((currentStep / totalSteps) * 100), 100)

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Header verde */}
      <header className="shadow-md" style={{ backgroundColor: '#869b26' }}>
        <div className="max-w-md mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            {/* Logo MAP */}
            <div className="text-white font-bold text-xl italic tracking-wide">MAP</div>

            {/* Progresso */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <div className="relative w-7 h-7 flex-shrink-0">
                  <Image src="/lightning-icon.png" alt="Progresso" width={28} height={28} className="object-contain" />
                </div>
                <span className="text-white font-bold text-xl leading-none">{progressPercentage}%</span>
              </div>
              <span className="text-white/80 text-[9px] leading-tight text-center">
                falta pouco para<br />desbloquear o seu presente
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Barra de progresso */}
      <div className="bg-black/30 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${progressPercentage}%`,
                backgroundColor: '#869b26'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
