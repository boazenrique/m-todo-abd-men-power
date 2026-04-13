"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Script from "next/script"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizMultiSelect } from "@/components/quiz-multi-select"
import { QuizChatWithImage } from "@/components/quiz-chat-with-image"
import { QuizHeader } from "@/components/quiz-header"
import { InstagramComments } from "@/components/instagram-comments"
import { Button } from "@/components/ui/button"

export default function PosGravidezFunnel() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [points, setPoints] = useState(70) // Continua do quiz principal
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  useEffect(() => {
    if (currentStep === 5) {
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
    // Pergunta 1 - Sinais do abdômen enfraquecido (Múltipla escolha)
    if (currentStep === 1) {
      return (
        <>
          <QuizHeader points={points} currentStep={8} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizMultiSelect
              question="Você tem algum desses sinais do abdômen enfraquecido?"
              explanation="Pode marcar mais de um se tiver."
              options={[
                { label: "Afastamento visível no meio do abdômen" }, 
                { label: "Quando contrai a barriga, \"sobe\" um cone no centro" }, 
                { label: "Dedos afundam no centro do abdômen ao tocar" }, 
                { label: "Escape de urina ao rir, tossir ou fazer esforço" },
                { label: "Dor lombar frequente" },
                { label: "Barriga sempre projetada pra frente (parece grávida de 3-4 meses)" },
                { label: "Não tenho certeza se tenho esses sinais" }
              ]}
              onSelect={(selectedAnswers) => {
                setAnswers((prev) => ({ ...prev, sinais_abdomen: selectedAnswers.join(", ") }))
                setPoints((prev) => prev + 10)
                setCurrentStep(2)
              }}
            />
          </main>
          <InstagramComments
            likes={834}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "eu tinha vários desses sinais e não sabia" },
              { username: "mariacardoso", text: "importante identificar pra tratar certo" },
              { username: "analuiza", text: "descobri que tinha diástase assim" },
            ]}
          />
        </>
      )
    }

    // Pergunta 2 - Exercícios errados podem piorar
    if (currentStep === 2) {
      return (
        <>
          <QuizHeader points={points} currentStep={9} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Você sabia que fazer exercícios da forma errada e sem ativação pode piorar o seu abdômen?"
              explanation="Isso é mais comum do que você imagina."
              options={[
                { label: "Sim, e tenho medo de me machucar" }, 
                { label: "Não sabia disso" }, 
                { label: "Nunca me falaram isso" }, 
                { label: "Suspeitava, mas sem certeza" }
              ]}
              onSelect={(answer) => handleAnswer("conhecimento_exercicios", answer)}
            />
          </main>
          <InstagramComments
            likes={956}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "eu fiz abdominal errado por anos" },
              { username: "mariacardoso", text: "isso explica muita coisa" },
              { username: "analuiza", text: "por isso minha barriga não melhorava" },
            ]}
          />
        </>
      )
    }

    // Pergunta 3 - Frases que já passou pela cabeça
    if (currentStep === 3) {
      return (
        <>
          <QuizHeader points={points} currentStep={10} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Alguma destas frases já passou pela sua cabeça?"
              explanation="Seja honesta - muitas mulheres se identificam com isso."
              options={[
                { label: "\"Meu corpo nunca mais vai ser o mesmo depois da gestação\"" }, 
                { label: "\"Tenho medo de fazer exercício errado e piorar\"" }, 
                { label: "\"Não tenho tempo pra cuidar disso agora (filho pequeno, rotina puxada...)\"" }, 
                { label: "\"Já aceitei que não vou ter o abdômen que eu queria\"" },
                { label: "Nenhuma dessas" }
              ]}
              onSelect={(answer) => handleAnswer("pensamento_comum", answer)}
            />
          </main>
          <InstagramComments
            likes={1087}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "eu pensava assim até conhecer o método" },
              { username: "mariacardoso", text: "não aceite isso, tem solução" },
              { username: "analuiza", text: "mudei minha mentalidade e meu corpo" },
            ]}
          />
        </>
      )
    }

    // Pergunta 4 - Teste do cone (Chat com imagem)
    if (currentStep === 4) {
      return (
        <>
          <QuizHeader points={points} currentStep={11} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizChatWithImage
              title="Vamos fazer um teste rápido?"
              messages={[
                "Se puder, deite-se no chão agora e tente fazer um pequeno abdominal.",
                "Quando seu abdômen está contraído, repare se \"sobe\" um cone/pirâmide no centro da barriga, como na imagem abaixo:"
              ]}
              image="/cone-abdomen.webp"
              imageAlt="Imagem mostrando cone abdominal durante contração"
              questionTitle="O cone aparece na sua barriga?"
              options={[
                { label: "Sim, aparece claramente" },
                { label: "Aparece um pouco" },
                { label: "Não consigo perceber" },
                { label: "Não pude fazer o teste agora" }
              ]}
              onSelect={(answer) => handleAnswer("teste_cone", answer)}
            />
          </main>
          <InstagramComments
            likes={1234}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "esse teste mudou minha vida" },
              { username: "mariacardoso", text: "eu não sabia que isso era sinal de diástase" },
              { username: "analuiza", text: "fiz o teste e descobri que tinha" },
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
                <div id="ifr_69cd62d82f1433a532139a17_wrapper" className="w-full max-w-[400px] mx-auto">
                  <div style={{ position: "relative", paddingTop: "177.77777777777777%" }} id="ifr_69cd62d82f1433a532139a17_aspect">
                    <iframe
                      frameBorder={0}
                      allowFullScreen
                      src="https://scripts.converteai.net/fb1ee993-6fc1-499d-92b5-6bfeab3e9ad5/players/69cd62d82f1433a532139a17/v4/embed.html"
                      id="ifr_69cd62d82f1433a532139a17"
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
