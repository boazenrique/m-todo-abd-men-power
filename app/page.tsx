"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { QuizIntro } from "@/components/quiz-intro"
import { QuizQuestion } from "@/components/quiz-question"
import { QuizMultiSelect } from "@/components/quiz-multi-select"
import { QuizTransitionScreen } from "@/components/quiz-transition-screen"
import { QuizHeader } from "@/components/quiz-header"
import { InstagramComments } from "@/components/instagram-comments"

export default function Home() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [points, setPoints] = useState(0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  const handleStart = () => {
    setCurrentStep(1)
  }

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
    // Tela de Início (Step 0)
    if (currentStep === 0) {
      return (
        <>
          <main className="min-h-screen">
            <QuizIntro onStart={handleStart} />
          </main>
          <InstagramComments
            likes={1523}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "esse diagnóstico mudou minha vida, recomendo demais!" },
              { username: "mariacardoso", text: "finalmente algo que funciona de verdade" },
              { username: "analuiza", text: "comecei hoje, já estou animada com os resultados" },
            ]}
          />
        </>
      )
    }

    // Quiz 1 (Step 1)
    if (currentStep === 1) {
      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Qual destas imagens mais se parece com seu abdômen hoje?"
              explanation="Seja sincera. Não existe resposta certa ou errada… isso vai nos ajudar a personalizar seu plano."
              layout="grid"
              isInstant={true}
              options={[
                { label: "Plana com Diástase", image: "/PD.png" }, 
                { label: "Parecendo grávida", image: "/PG.png" }, 
                { label: "Avental", image: "/avental.png" }, 
                { label: "Normal", image: "/normal.png" }, 
                { label: "Pochete", image: "/pochete.png" }, 
                { label: "Flácida", image: "/flácida.png" }
              ]}
              onSelect={(answer) => handleAnswer("tipo_abdomen", answer)}
            />
          </main>
          <InstagramComments
            likes={246}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "responda com calma, cada detalhe importa" },
              { username: "mariacardoso", text: "vamos juntas nessa jornada" },
              { username: "analuiza", text: "adorei a experiência do quiz" },
            ]}
          />
        </>
      )
    }

    // Quiz 2 (Step 2)
    if (currentStep === 2) {
      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Qual sua idade?"
              explanation="Precisamos saber sua faixa etária para calcular o tempo de resposta do seu abdômen"
              options={[
                { label: "18-25 anos" }, 
                { label: "26-35 anos" }, 
                { label: "36-45 anos" }, 
                { label: "46-55 anos" },
                { label: "56+ anos" }
              ]}
              onSelect={(answer) => handleAnswer("idade", answer)}
            />
          </main>
          <InstagramComments
            likes={312}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "a idade influencia muito no resultado" },
              { username: "mariacardoso", text: "cada fase tem seu ritmo" },
              { username: "analuiza", text: "importante saber isso pra personalizar" },
            ]}
          />
        </>
      )
    }

    // Quiz 3 (Step 3)
    if (currentStep === 3) {
      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="O QUE VOCÊ QUER MUDAR AGORA?"
              explanation="Escolha o que mais te incomoda no seu abdômen hoje."
              options={[
                { label: "Afinar a cintura (parece mais larga do que deveria)" }, 
                { label: "Diminuir a barriga pra frente" }, 
                { label: "Ter firmeza e sustentação (barriga parece \"mole\")" }, 
                { label: "Melhorar postura e sustentação" },
                { label: "Fechar a diástase/afastamento abdominal" },
                { label: "Todas as acima" }
              ]}
              onSelect={(answer) => handleAnswer("objetivo", answer)}
            />
          </main>
          <InstagramComments
            likes={428}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "escolha o que mais te incomoda" },
              { username: "mariacardoso", text: "foco no objetivo principal" },
              { username: "analuiza", text: "cada mudança conta" },
            ]}
          />
        </>
      )
    }

    // Quiz 4 (Step 4)
    if (currentStep === 4) {
      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="Qual destas frases descreve melhor sua rotina de treino?"
              explanation="Seja honesta - não estamos julgando, estamos diagnosticando"
              options={[
                { label: "Treino 3-5x por semana consistentemente" }, 
                { label: "Treino 1-2x por semana (quando dá)" }, 
                { label: "Já treinei bastante, mas parei há um tempo" }, 
                { label: "Não treino no momento (ou muito raramente)" }
              ]}
              onSelect={(answer) => handleAnswer("rotina_treino", answer)}
            />
          </main>
          <InstagramComments
            likes={534}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "seja honesta, isso ajuda no diagnóstico" },
              { username: "mariacardoso", text: "não tem resposta errada aqui" },
              { username: "analuiza", text: "cada rotina tem seu plano ideal" },
            ]}
          />
        </>
      )
    }

    // Quiz 5 (Step 5) - Múltipla Escolha
    if (currentStep === 5) {
      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizMultiSelect
              question="Quais desses você já tentou para melhorar o abdômen?"
              explanation="Pode marcar quantas quiser - isso é importante para entendermos o que NÃO funcionou"
              options={[
                { label: "Abdominais tradicionais" }, 
                { label: "Exercícios funcionais" }, 
                { label: "Pilates ou yoga" }, 
                { label: "Corrida/cardio intenso" },
                { label: "Dieta rigorosa" },
                { label: "Nunca fiz nada específico para o abdômen" }
              ]}
              onSelect={(answers) => {
                setAnswers((prev) => ({ ...prev, tentativas_anteriores: answers.join(", ") }))
                setPoints((prev) => prev + 10)
                setCurrentStep(currentStep + 1)
              }}
            />
          </main>
          <InstagramComments
            likes={621}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "marque tudo que já tentou" },
              { username: "mariacardoso", text: "importante saber o histórico" },
              { username: "analuiza", text: "isso ajuda a entender o que não funcionou" },
            ]}
          />
        </>
      )
    }

    // Quiz 6 (Step 6)
    if (currentStep === 6) {
      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizQuestion
              question="EM QUAL DESSAS SITUAÇÕES VOCÊ SE RECONHECE?"
              explanation="Seja honesta - isso define o seu diagnóstico."
              options={[
                { label: "Depois da gravidez, meu abdômen não voltou", subtitle: "Ainda tenho aquela barriguinha mesmo tendo emagrecido" }, 
                { label: "Sou magra, mas minha barriga é projetada", subtitle: "Nunca fica realmente plana - e não é gordura" }, 
                { label: "Treino com frequência, mas o abdômen não define", subtitle: "Esforço de sobra, resultado zero" }
              ]}
              onSelect={(answer) => handleAnswer("situacao", answer)}
            />
          </main>
          <InstagramComments
            likes={712}
            topLikers={["danielefisio", "mariacardoso"]}
            comments={[
              { username: "danielefisio", text: "me identifiquei muito com uma dessas" },
              { username: "mariacardoso", text: "é importante saber a causa raiz" },
              { username: "analuiza", text: "isso ajuda a personalizar o plano" },
            ]}
          />
        </>
      )
    }

    // Tela de Transição (Step 7)
    if (currentStep === 7) {
      const handleContinueToFunnel = () => {
        // Redirecionar baseado na resposta da situacao
        const situacao = answers.situacao || ""
        
        // Opção 1: Pós-gravidez
        if (situacao === "Depois da gravidez, meu abdômen não voltou") {
          router.push("/resultado/pos-gravidez")
        } 
        // Opção 2: Barriga projetada
        else if (situacao === "Sou magra, mas minha barriga é projetada") {
          router.push("/resultado/barriga-projetada")
        } 
        // Opção 3: Treino sem resultado
        else if (situacao === "Treino com frequência, mas o abdômen não define") {
          router.push("/resultado/treino-sem-resultado")
        } 
        // Fallback - default para pos-gravidez
        else {
          router.push("/resultado/pos-gravidez")
        }
      }

      return (
        <>
          <QuizHeader points={points} currentStep={currentStep} totalSteps={16} />
          <main className="min-h-screen pb-12">
            <QuizTransitionScreen 
              onContinue={handleContinueToFunnel}
            />
          </main>
        </>
      )
    }

    // Fallback
    return null
  }
}
