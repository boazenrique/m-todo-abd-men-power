"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizHeader } from "@/components/quiz-header"
import { InstagramComments } from "@/components/instagram-comments"
import { Button } from "@/components/ui/button"

export default function PitchPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [points, setPoints] = useState(70)
  const [processingStep, setProcessingStep] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [showBonusPopup, setShowBonusPopup] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  const handleAnswer = (question: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [question]: answer }))
    setPoints((prev) => prev + 10)
    setCurrentStep(currentStep + 1)
  }

  // Processing animation effect
  useEffect(() => {
    if (currentStep === 3) {
      const steps = [1, 2, 3, 4]
      let index = 0
      
      const interval = setInterval(() => {
        if (index < steps.length) {
          setProcessingStep(steps[index])
          index++
        } else {
          clearInterval(interval)
          // Ir para tela de captura de telefone após processamento
          setTimeout(() => {
            setCurrentStep(4)
          }, 800)
        }
      }, 700)

      return () => clearInterval(interval)
    }
  }, [currentStep])

  // Formatar número de telefone
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const handlePhoneSubmit = () => {
    if (phoneNumber.replace(/\D/g, "").length >= 10) {
      setAnswers((prev) => ({ ...prev, telefone: phoneNumber }))
      setShowBonusPopup(true)
    }
  }

  const handleFinalRedirect = () => {
    router.push("/resultado/final")
  }

  function renderContent() {
    // Pergunta 1 - Tempo disponível
    if (currentStep === 1) {
      return (
        <>
          <QuizHeader points={points} currentStep={13} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Se existisse um método que REALMENTE funciona, quanto tempo por dia você conseguiria dedicar?"
              explanation="Seja realista - vamos montar seu plano com base nisso"
              options={[
                { label: "5-10 minutos (tenho rotina muito corrida)" }, 
                { label: "15-20 minutos (consigo encaixar)" }, 
                { label: "30 minutos ou mais (tenho disponibilidade)" }, 
                { label: "Depende - se eu ver resultado rápido, faço o que for preciso" }
              ]}
              onSelect={(answer) => handleAnswer("tempo_disponivel", answer)}
            />
          </main>
          <InstagramComments
            likes={1567}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "poucos minutos por dia já fazem diferença" },
              { username: "mariacardoso", text: "o importante é a consistência" },
              { username: "analuiza", text: "com 15 min por dia já vi resultado" },
            ]}
          />
        </>
      )
    }

    // Pergunta 2 - Impacto esperado
    if (currentStep === 2) {
      return (
        <>
          <QuizHeader points={points} currentStep={14} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="SE RESOLVER ISSO DE VEZ, QUAL SERIA O IMPACTO?"
              explanation="Escolha o que mais representa sua motivação"
              options={[
                { label: "Mais confiança e autoestima", subtitle: "Me sentir bem no espelho de novo" }, 
                { label: "Usar as roupas que quero", subtitle: "Parar de esconder a barriga" }, 
                { label: "Melhorar saúde e postura", subtitle: "Sem dor, sem desconforto" }, 
                { label: "Tudo isso junto" }
              ]}
              onSelect={(answer) => handleAnswer("impacto_esperado", answer)}
            />
          </main>
          <InstagramComments
            likes={1823}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "a autoestima muda completamente" },
              { username: "mariacardoso", text: "poder usar qualquer roupa é libertador" },
              { username: "analuiza", text: "a postura melhorou muito também" },
            ]}
          />
        </>
      )
    }

    // Tela de Processamento
    if (currentStep === 3) {
      const processingMessages = [
        { icon: "⚡", text: "Analisando suas respostas..." },
        { icon: "🔍", text: "Identificando padrão do seu abdômen..." },
        { icon: "📋", text: "Gerando seu diagnóstico personalizado..." },
        { icon: "✅", text: "Pronto! Seu resultado está disponível." }
      ]

      return (
        <>
          <QuizHeader points={points} currentStep={15} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <div className="flex flex-col items-center px-4 py-8 pt-28 min-h-screen">
              <div className="max-w-md w-full space-y-8">
                
                {/* Animação de loading */}
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-[#869b26]/30 border-t-[#869b26] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl">🧠</span>
                    </div>
                  </div>
                </div>

                {/* Mensagens de processamento */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    {processingMessages.map((message, index) => (
                      <div 
                        key={index}
                        className={`flex items-center gap-3 transition-all duration-500 ${
                          processingStep > index 
                            ? 'opacity-100 translate-x-0' 
                            : processingStep === index + 1
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-30 translate-x-2'
                        }`}
                      >
                        <span className={`text-xl transition-all duration-300 ${
                          processingStep > index ? 'scale-110' : ''
                        }`}>
                          {processingStep > index ? '✅' : message.icon}
                        </span>
                        <span className={`text-white text-base ${
                          processingStep === index + 1 ? 'font-medium' : ''
                        }`}>
                          {message.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="w-full">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out bg-[#869b26]"
                      style={{ width: `${(processingStep / 4) * 100}%` }}
                    />
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-2">
                    {Math.round((processingStep / 4) * 100)}% concluído
                  </p>
                </div>

              </div>
            </div>
          </main>
        </>
      )
    }

    // Tela de Captura de Telefone
    if (currentStep === 4) {
      return (
        <>
          <QuizHeader points={points} currentStep={15} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <div className="flex flex-col items-center px-4 py-8 pt-28 min-h-screen">
              <div className="max-w-md w-full space-y-6">
                
                {/* Headline */}
                <div className="text-center space-y-3">
                  <h1 className="text-3xl font-bold text-white">
                    Seu diagnóstico está pronto!
                  </h1>
                  <p className="text-gray-300 text-base">
                    Digite seu número que enviaremos seu plano MAP personalizado no seu whatsapp!
                  </p>
                </div>

                {/* Card com formulário */}
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-2xl space-y-5">
                  
                  {/* Campo de telefone */}
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">
                      Seu WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="(00) 00000-0000"
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white text-lg placeholder:text-gray-500 focus:outline-none focus:border-[#869b26] focus:ring-1 focus:ring-[#869b26] transition-all"
                      maxLength={16}
                    />
                  </div>

                  {/* Textos de segurança */}
                  <div className="space-y-2 text-center">
                    <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
                      <span>🔒</span> Não fazemos spam. Seu número está 100% seguro.
                    </p>
                    <p className="text-yellow-500/80 text-sm flex items-center justify-center gap-2">
                      <span>⏰</span> Seu diagnóstico expira em 24 horas
                    </p>
                  </div>

                  {/* Botão Continuar */}
                  <Button
                    onClick={handlePhoneSubmit}
                    disabled={phoneNumber.replace(/\D/g, "").length < 10}
                    className={`w-full py-6 rounded-xl text-white font-bold text-lg transition-all ${
                      phoneNumber.replace(/\D/g, "").length >= 10
                        ? "bg-[#869b26] hover:bg-[#6b7d1e]"
                        : "bg-gray-600 cursor-not-allowed opacity-50"
                    }`}
                  >
                    CONTINUAR
                  </Button>
                </div>

              </div>
            </div>
          </main>

          {/* Popup de Bônus */}
          <AnimatePresence>
            {showBonusPopup && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                  onClick={handleFinalRedirect}
                />
                
                {/* Content */}
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative bg-[#1a1c1a] border border-[#869b26]/30 rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-2xl overflow-hidden"
                >
                  {/* Decorative background light */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#869b26]/20 blur-[60px] rounded-full pointer-events-none" />

                  <div className="relative space-y-6">
                    {/* Imagem do Presente */}
                    <div className="flex justify-center">
                      <motion.div 
                        animate={{ 
                          y: [0, -10, 0],
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <img 
                          src="/presentepopup.png" 
                          alt="Presente Bônus" 
                          className="w-40 h-auto object-contain drop-shadow-[0_10px_20px_rgba(134,155,38,0.3)]"
                        />
                      </motion.div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-white text-2xl font-black uppercase tracking-tight">
                        Você ganha hoje um presente!
                      </h3>
                      <p className="text-white font-medium text-lg flex items-center justify-center gap-2">
                        <span>🎁</span> Presente: 1º ciclo de ativação (liberado agora)
                      </p>
                    </div>

                    <Button
                      onClick={handleFinalRedirect}
                      className="w-full bg-[#869b26] hover:bg-[#6b7d1e] text-white font-bold py-7 rounded-2xl text-xl shadow-lg shadow-[#869b26]/20 transition-all uppercase"
                    >
                      Quero acessar agora!
                    </Button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )
    }

    return null
  }

  return (
    <>
      {renderContent()}
    </>
  )
}
