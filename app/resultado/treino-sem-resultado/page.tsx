"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizHeader } from "@/components/quiz-header"
import { InstagramComments } from "@/components/instagram-comments"
import { Button } from "@/components/ui/button"

export default function TreinoSemResultadoPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [points, setPoints] = useState(70)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 5) {
      setShowButton(false)
      const timer = setTimeout(() => setShowButton(true), 7 * 1000)
      return () => clearTimeout(timer)
    }
  }, [currentStep])

  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }))
    setPoints((prev) => prev + 10)
    setCurrentStep(currentStep + 1)
  }

  return renderContent()

  function renderContent() {
    // Pergunta 1 - Esforço no treino não reflete no abdômen
    if (currentStep === 1) {
      return (
        <>
          <QuizHeader points={points} currentStep={8} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Você sente que seu esforço no treino não se reflete no abdômen?"
              explanation="Seja honesta - isso é mais comum do que você imagina."
              options={[
                { label: "Sim, claramente - treino pesado mas abdômen não muda" }, 
                { label: "Em parte - vejo ganhos em outros lugares, mas abdômen não" }, 
                { label: "Não, meu abdômen responde proporcionalmente" }
              ]}
              onSelect={(answer) => handleAnswer("esforco_treino", answer)}
            />
          </main>
          <InstagramComments
            likes={892}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "isso acontece muito com quem treina errado" },
              { username: "mariacardoso", text: "eu sentia isso até descobrir o método" },
              { username: "analuiza", text: "o abdômen precisa de treino específico" },
            ]}
          />
        </>
      )
    }

    // Pergunta 2 - Quanto mais treina, abdômen tende a ficar
    if (currentStep === 2) {
      return (
        <>
          <QuizHeader points={points} currentStep={9} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Quanto mais você treina, seu abdômen tende a ficar:"
              explanation="Observe como seu corpo responde ao treino atual."
              options={[
                { label: "Mais forte/firme, mas nunca definido visualmente" }, 
                { label: "Forte, mas ainda projetado/estufado (não estético)" }, 
                { label: "Igual, com aquela barriguinha que não sai por nada" },
                { label: "Melhorando aos poucos (mas devagar demais)" }
              ]}
              onSelect={(answer) => handleAnswer("resultado_treino", answer)}
            />
          </main>
          <InstagramComments
            likes={967}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "forte mas estufado é clássico de treino errado" },
              { username: "mariacardoso", text: "eu tinha isso, agora mudou completamente" },
              { username: "analuiza", text: "a técnica correta faz toda diferença" },
            ]}
          />
        </>
      )
    }

    // Pergunta 3 - Falta de especialista
    if (currentStep === 3) {
      return (
        <>
          <QuizHeader points={points} currentStep={10} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Você sente falta de um especialista no abdômen feminino que possa te ajudar a chegar no resultado?"
              explanation="A orientação correta faz toda a diferença."
              options={[
                { label: "Sim, cada profissional diz uma coisa diferente (confuso)" }, 
                { label: "Faltam especialistas que entendam MESMO de abdômen feminino" }, 
                { label: "Me sinto insegura até com meu personal atual" },
                { label: "Estou satisfeita com as orientações que recebo" }
              ]}
              onSelect={(answer) => handleAnswer("falta_especialista", answer)}
            />
          </main>
          <InstagramComments
            likes={1034}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "especialista em abdômen feminino é raro" },
              { username: "mariacardoso", text: "finalmente alguém que entende nosso corpo" },
              { username: "analuiza", text: "cada corpo feminino é único" },
            ]}
          />
        </>
      )
    }

    // Pergunta 4 - Passou da fase de treino genérico
    if (currentStep === 4) {
      return (
        <>
          <QuizHeader points={points} currentStep={11} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="VOCÊ JÁ PASSOU DA FASE DE TREINO GENÉRICO?"
              explanation="Treino genérico raramente resolve problemas específicos."
              options={[
                { label: "Sim, estou buscando algo específico" }, 
                { label: "Em parte, estou na transição" }, 
                { label: "Não tenho certeza" }
              ]}
              onSelect={(answer) => handleAnswer("fase_treino", answer)}
            />
          </main>
          <InstagramComments
            likes={1156}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "treino genérico não resolve abdômen" },
              { username: "mariacardoso", text: "especificidade é a chave do resultado" },
              { username: "analuiza", text: "quando descobri isso, tudo mudou" },
            ]}
          />
        </>
      )
    }

    // Step 5 - Vídeo explicativo
    if (currentStep === 5) {
      return (
        <>
          <QuizHeader points={points} currentStep={12} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <div className="flex flex-col items-center px-4 py-6 pt-28">
              <div className="max-w-md w-full space-y-6">
                
                {/* Video Vturb */}
                <Script 
                  src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js" 
                  strategy="lazyOnload"
                />
                <div id="ifr_69cd631cb516aefd26afe01a_wrapper" className="w-full max-w-[400px] mx-auto">
                  <div style={{ position: "relative", paddingTop: "177.77777777777777%" }} id="ifr_69cd631cb516aefd26afe01a_aspect">
                    <iframe
                      frameBorder={0}
                      allowFullScreen
                      src="https://scripts.converteai.net/fb1ee993-6fc1-499d-92b5-6bfeab3e9ad5/players/69cd631cb516aefd26afe01a/v4/embed.html"
                      id="ifr_69cd631cb516aefd26afe01a"
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
            likes={1289}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "esse vídeo explica tudo sobre treino específico" },
              { username: "mariacardoso", text: "assiste até o final, vale muito" },
              { username: "analuiza", text: "agora sei porque meu treino não funcionava" },
            ]}
          />
        </>
      )
    }

    return null
  }
}
