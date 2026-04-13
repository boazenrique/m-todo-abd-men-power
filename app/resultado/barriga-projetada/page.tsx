"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizMultiSelect } from "@/components/quiz-multi-select"
import { QuizHeader } from "@/components/quiz-header"
import { InstagramComments } from "@/components/instagram-comments"
import { Button } from "@/components/ui/button"

export default function BarrigaProjetadaFunnel() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [points, setPoints] = useState(70) // Continua do quiz principal
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 4) {
      setShowButton(false)
      const timer = setTimeout(() => setShowButton(true), 4 * 60 * 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }))
    setPoints((prev) => prev + 10)
    setCurrentStep(currentStep + 1)
  }

  return (
    <>
      {renderContent()}
    </>
  )

  function renderContent() {
    // Pergunta 1 - Barriga em repouso
    if (currentStep === 1) {
      return (
        <>
          <QuizHeader points={points} currentStep={8} totalSteps={15} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Mesmo em repouso (relaxada), sua barriga costuma ficar:"
              explanation="Seja honesta com sua percepção."
              options={[
                { label: "Projetada para frente (mesmo sendo magra)" }, 
                { label: "Dura e estufada (parece inchada)" }, 
                { label: "Mole, sem sustentação interna" }, 
                { label: "Normal na maior parte do tempo" }
              ]}
              onSelect={(answer) => handleAnswer("barriga_repouso", answer)}
            />
          </main>
          <InstagramComments
            likes={834}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "a minha sempre ficava projetada" },
              { username: "mariacardoso", text: "pensei que era só comigo" },
              { username: "analuiza", text: "isso me incomodava muito" },
            ]}
          />
        </>
      )
    }

    // Pergunta 2 - O que já tentou (Múltipla escolha)
    if (currentStep === 2) {
      return (
        <>
          <QuizHeader points={points} currentStep={9} totalSteps={15} />
          <main className="min-h-screen pb-12">
            <QuizMultiSelect
              question="O que você já tentou achando que o problema da sua barriga era gordura?"
              explanation="Pode marcar tudo que já tentou"
              options={[
                { label: "Comer menos / cortar calorias" }, 
                { label: "Fazer muito cardio (corrida, bike, elíptico...)" }, 
                { label: "Abdominais tradicionais" }, 
                { label: "Várias dietas da internet (low carb, jejum, detox...)" },
                { label: "Suplementos termogênicos / \"queima barriga\"" },
                { label: "Nada disso" }
              ]}
              onSelect={(selectedAnswers) => {
                setAnswers((prev) => ({ ...prev, tentativas_gordura: selectedAnswers.join(", ") }))
                setPoints((prev) => prev + 10)
                setCurrentStep(3)
              }}
            />
          </main>
          <InstagramComments
            likes={956}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "já tentei de tudo isso e nada funcionou" },
              { username: "mariacardoso", text: "gastei dinheiro com termogênico à toa" },
              { username: "analuiza", text: "fiz dieta atrás de dieta" },
            ]}
          />
        </>
      )
    }

    // Pergunta 3 - Frases que ja disseram
    if (currentStep === 3) {
      return (
        <>
          <QuizHeader points={points} currentStep={10} totalSteps={15} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="ALGUÉM JÁ DISSE ALGO ASSIM PRA VOCÊ?"
              explanation="Frases que minimizam o que você sente."
              options={[
                { label: "\"Mas você é magra, tá reclamando do que?\"" }, 
                { label: "\"É só postura\"" }, 
                { label: "\"Isso é coisa da sua cabeça\"" }, 
                { label: "\"É genética, não tem o que fazer\"" },
                { label: "Nunca ouvi/pensei isso" }
              ]}
              onSelect={(answer) => handleAnswer("frases_ouvidas", answer)}
            />
          </main>
          <InstagramComments
            likes={1087}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "já ouvi muito isso e dói" },
              { username: "mariacardoso", text: "as pessoas não entendem" },
              { username: "analuiza", text: "não é frescura, é real" },
            ]}
          />
        </>
      )
    }

    // Step 4 - Vídeo explicativo
    if (currentStep === 4) {
      return (
        <>
          <QuizHeader points={points} currentStep={11} totalSteps={15} />
          <main className="min-h-screen pb-12">
            <div className="flex flex-col items-center px-4 py-6 pt-28">
              <div className="max-w-md w-full space-y-6">
                
                {/* Video Vturb */}
                <Script 
                  src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js" 
                  strategy="lazyOnload"
                />
                <div id="ifr_69cd62f5b516aefd26afdf87_wrapper" className="w-full max-w-[400px] mx-auto">
                  <div style={{ position: "relative", paddingTop: "177.77777777777777%" }} id="ifr_69cd62f5b516aefd26afdf87_aspect">
                    <iframe
                      frameBorder={0}
                      allowFullScreen
                      src="https://scripts.converteai.net/fb1ee993-6fc1-499d-92b5-6bfeab3e9ad5/players/69cd62f5b516aefd26afdf87/v4/embed.html"
                      id="ifr_69cd62f5b516aefd26afdf87"
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      referrerPolicy="origin"
                    />
                  </div>
                </div>

                {/* Botão Ver Resultado */}
                <div
                  style={{
                    opacity: showButton ? 1 : 0,
                    pointerEvents: showButton ? "auto" : "none",
                    transition: "opacity 0.8s ease",
                  }}
                >
                  <Button
                    onClick={() => router.push("/resultado/pitch")}
                    className="w-full py-6 rounded-xl text-white font-semibold text-lg bg-[#869b26] hover:bg-[#6b7d1e] transition-all"
                  >
                    VER MEU RESULTADO
                  </Button>
                </div>
              </div>
            </div>
          </main>
          <InstagramComments
            likes={1456}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "esse vídeo explica tudo" },
              { username: "mariacardoso", text: "assiste até o final, vale muito" },
              { username: "analuiza", text: "agora entendi o que acontece" },
            ]}
          />
        </>
      )
    }

    return null
  }
}
