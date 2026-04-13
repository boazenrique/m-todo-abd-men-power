"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Script from "next/script"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Check, Star, Gift, Shield } from "lucide-react"

// Helper para disparar eventos do pixel UTMify com segurança
function trackEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && typeof (window as any).PixelSDK?.track === "function") {
      ; (window as any).PixelSDK.track(eventName, params ?? {})
    }
  } catch (e) {
    // silencia erros caso o pixel ainda não tenha carregado
  }
}

const transformationImages = [
  { src: "/D005.png", alt: "Transformação 1" },
  { src: "/D001.webp", alt: "Transformação 2" },
  { src: "/D002.webp", alt: "Transformação 3" },
  { src: "/D003.webp", alt: "Transformação 4" },
  { src: "/D004.webp", alt: "Transformação 5" },
]

const testimonialImages = [
  { src: "/ps001.png", alt: "Depoimento 1" },
  { src: "/ps002.png", alt: "Depoimento 2" },
  { src: "/ps003.png", alt: "Depoimento 3" },
  { src: "/ps004.png", alt: "Depoimento 4" },
]

const journeySteps = [
  { label: "Hoje", percentage: 10, color: "bg-red-500", text: "Inchaço constante e sensação de abdômen estufado." },
  { label: "1ª semana", percentage: 25, color: "bg-[#869b26]", text: "Início do desinchaço e melhora no funcionamento intestinal." },
  { label: "2ª semana", percentage: 45, color: "bg-[#869b26]", text: "Redução da circunferência e melhora da postura." },
  { label: "3ª semana", percentage: 65, color: "bg-[#869b26]", text: "Musculatura mais firme e estômago alto diminuindo." },
  { label: "4ª semana", percentage: 80, color: "bg-[#869b26]", text: "Recuperação da força abdominal e melhora na diástase." },
  { label: "5ª semana", percentage: 100, color: "bg-[#869b26]", text: "Abdômen firme, definido e sem estufamento constante." },
]

export default function FinalPage() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 36 })
  const [activeSlide, setActiveSlide] = useState(0)
  const [activePsSlide, setActivePsSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const psCarouselRef = useRef<HTMLDivElement>(null)

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Confetti effect on mount
  useEffect(() => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#869b26", "#ffffff", "#00aa11"]
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#869b26", "#ffffff", "#00aa11"]
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // VTurb Video initialization
  useEffect(() => {
    const iframe = document.getElementById("ifr_686545ba4f04a41940d14584") as HTMLIFrameElement;
    if (iframe) {
      const src = `https://scripts.converteai.net/fb1ee993-6fc1-499d-92b5-6bfeab3e9ad5/players/686545ba4f04a41940d14584/v4/embed.html${window.location.search || '?'}&vl=${encodeURIComponent(window.location.href)}`;
      iframe.src = src;
    }
  }, [])

  const formatTime = (minutes: number, seconds: number) => {
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0f00] to-black">
      <div className="max-w-[420px] mx-auto px-4 py-6 space-y-5">

        {/* 1. Card Diagnóstico - Sem background e centralizado */}
        <div className="text-center py-4 px-2">
          {/* Badge */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Check className="w-4 h-4 text-[#869b26]" />
            <span className="text-[#869b26] text-xs font-semibold tracking-wide uppercase">SEU DIAGNÓSTICO</span>
          </div>

          {/* Headline */}
          <h1 className="text-2xl font-bold text-white leading-tight mb-4">
            SEU ABDÔMEN PASSOU PELA MAIOR TRANSFORMAÇÃO POSSÍVEL.{" "}
            <span className="text-[#869b26]">PRECISA DE RECONSTRUÇÃO REAL.</span>
          </h1>

          {/* Texto explicativo */}
          <p className="text-white-400 text-sm leading-relaxed mx-auto max-w-[320px]">
            O que você sente não é fraqueza. É desconexão muscular profunda.
          </p>
          <p className="text-white-400 text-sm leading-relaxed mt-2 mx-auto max-w-[320px]">
            A boa notícia: tem solução específica, e não depende de mais esforço. Depende do método certo.
          </p>
        </div>

        {/* 1.2 Vídeo: Por dentro do Método */}
        <div className="py-2 space-y-4">
          <h2 className="text-white text-xl font-bold leading-tight text-center px-2">
            Veja por dentro como é fácil transformar seu corpo com o método certo.
          </h2>
          
          <p className="text-gray-400 text-sm leading-relaxed text-center px-4">
            Assista a Dani te mostrar, passo a passo, tudo o que você vai encontrar na plataforma: aulas, cronogramas, suporte e os detalhes que fazem toda diferença para ter resultado de verdade.
          </p>

          <div className="flex justify-center w-full">
            <div className="w-full max-w-[400px]">
              <Script 
                src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js" 
                strategy="afterInteractive"
              />
              <div id="ifr_686545ba4f04a41940d14584_wrapper" style={{ margin: "0 auto", width: "100%" }}>
                <div style={{ position: "relative", padding: "187.5% 0 0 0" }} id="ifr_686545ba4f04a41940d14584_aspect">
                  <iframe 
                    frameBorder="0" 
                    allowFullScreen 
                    src="about:blank"
                    id="ifr_686545ba4f04a41940d14584" 
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} 
                    referrerPolicy="origin"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 1.5 Carrossel de Transformações */}
        <div>
          <h2 className="text-white font-bold text-base mb-3 text-center">
            Veja já quem transformou seu corpo:
          </h2>
          <div
            ref={carouselRef}
            onScroll={() => {
              if (!carouselRef.current) return
              const index = Math.round(
                carouselRef.current.scrollLeft / carouselRef.current.offsetWidth
              )
              setActiveSlide(index)
            }}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 rounded-xl"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {transformationImages.map((img, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-full rounded-xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={420}
                  height={560}
                  className="w-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {transformationImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  carouselRef.current?.scrollTo({
                    left: i * (carouselRef.current?.offsetWidth ?? 0),
                    behavior: "smooth",
                  })
                  setActiveSlide(i)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === i
                  ? "bg-[#869b26] w-5"
                  : "bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>


        {/* 3. Separador */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-gray-500 text-xs font-medium tracking-wider">SEU PLANO ESTÁ PRONTO</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* 4. Card Principal da Oferta */}
        <div className="bg-gradient-to-br from-[#1a1f0a]/90 to-black/70 border border-[#869b26]/50 rounded-2xl p-5 shadow-xl shadow-[#869b26]/20">
          {/* Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Check className="w-4 h-4 text-[#869b26]" />
            <span className="text-[#869b26] text-xs font-semibold tracking-wide">PLANO PERSONALIZADO DESBLOQUEADO</span>
          </div>

          {/* Imagem do Produto */}
          <div className="mb-4">
            <Image
              src="/entregavel01.webp"
              alt="Conteúdo do MAP"
              width={400}
              height={300}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Nome do Produto */}
          <h2 className="text-3xl font-black text-white mb-1">MAP</h2>
          <p className="text-[#869b26] font-medium text-base mb-3">Reconstrução Pós-Gestação</p>

          {/* Descrição */}
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Feito para quem passou pela gravidez e precisa reconectar o abdômen de dentro pra fora.
          </p>

          {/* 5. Lista de Benefícios */}
          <div className="space-y-2 mb-5">
            <p className="text-white text-xs font-semibold tracking-wide mb-2">O QUE ESTÁ INCLUÍDO:</p>
            {[
              "12 semanas de treino progressivo e estruturado",
              "Técnicas de LPF, Bracing e Hipopressivos integradas",
              "Método para fechar diástase, definir e secar",
              "Sessões de 10 a 20 min (sem equipamento)",
              "Acesso imediato pelo celular"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-sm flex-shrink-0">✅</span>
                <span className="text-gray-300 text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* 7. Lista de Bônus Exclusivos - Sem background */}
          <div className="space-y-2 mb-6">
            {[
              "Presente: 1º ciclo de ativação (liberado agora)",
              "Método para Liberação da cicatriz da cesária",
              "Como respirar e ativar o abdômen em bracing na musculação",
              "40 táticas infalíveis para definir o abdômen sem passar fome"
            ].map((bonus, idx) => (
              <p key={idx} className="text-white text-sm font-medium flex items-start gap-2">
                <span className="flex-shrink-0">🎁</span>
                <span className="text-gray-300">{bonus}</span>
              </p>
            ))}
          </div>

          {/* 6. Área de Preço - Layout Centralizado conforme imagem */}
          <div className="flex flex-col items-center py-4 mb-2">
            <p className="text-white text-sm mb-1">
              De: <span className="line-through">R$ 497,00</span>
            </p>
            <p className="text-white font-bold text-base mb-2">Por apenas 12x de</p>

            <div className="flex items-start justify-center gap-1 mb-1">
              <span className="text-white text-xs font-bold mt-3">R$</span>
              <span className="text-white text-6xl font-extrabold tracking-tighter">20,41</span>
            </div>

            <p className="text-white text-sm font-semibold">ou R$ 217,00 à vista</p>
          </div>

          {/* 9. Botão CTA - Movido para dentro do card */}
          <div className="mt-4">
            <Button
              onClick={() => {
                trackEvent("InitiateCheckout", { value: 217, currency: "BRL" })
                window.open("https://pay.hotmart.com/B94983697Q?off=15r055s7&checkoutMode=10&offDiscount=BEMVINDAMAP", "_blank")
              }}
              className="w-full py-7 rounded-full text-white font-bold text-xl bg-[#00aa11] hover:bg-[#00880e] transition-all shadow-lg shadow-[#00aa11]/20 uppercase tracking-tight"
            >
              QUERO ACESSAR O MAP
            </Button>

            {/* Imagem de Opções de Pagamento - Group-5.webp */}
            <div className="flex justify-center items-center py-4">
              <Image
                src="/Group-5.webp"
                alt="Formas de Pagamento"
                width={280}
                height={40}
                className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* 8. Escassez / Timer */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-3 flex items-center justify-center gap-2">
          <span className="text-gray-400 text-sm">Oferta reservada por:</span>
          <span className="text-[#869b26] font-bold text-lg font-mono">
            {formatTime(timeLeft.minutes, timeLeft.seconds)}
          </span>
        </div>

        {/* 8.5 Carrossel de Resultados (Alunas) */}
        <div className="pt-2">
          <h2 className="text-white font-bold text-base mb-3 text-center">
            Resultados reais de quem já iniciou:
          </h2>
          <div
            ref={psCarouselRef}
            onScroll={() => {
              if (!psCarouselRef.current) return
              const index = Math.round(
                psCarouselRef.current.scrollLeft / psCarouselRef.current.offsetWidth
              )
              setActivePsSlide(index)
            }}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3 rounded-xl"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonialImages.map((img, i) => (
              <div
                key={i}
                className="snap-center flex-shrink-0 w-full rounded-xl overflow-hidden"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={420}
                  height={560}
                  className="w-full object-cover rounded-xl"
                />
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3 mb-4">
            {testimonialImages.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  psCarouselRef.current?.scrollTo({
                    left: i * (psCarouselRef.current?.offsetWidth ?? 0),
                    behavior: "smooth",
                  })
                  setActivePsSlide(i)
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activePsSlide === i
                  ? "bg-[#869b26] w-5"
                  : "bg-white/30"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* 11. Seção Especialista - Quem vai te guiar */}
        <div className="mt-12 space-y-6">
          <h3 className="text-white text-3xl font-bold leading-tight text-center">
            Quem vai te guiar:<br />
            <span className="text-[#869b26]">Daniele Castro</span>
          </h3>

          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <Image
              src="/daniexpert.webp"
              alt="Daniele Castro"
              width={420}
              height={420}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <p className="text-white/80 text-sm leading-relaxed text-left px-1">
            Após a gestação e uma depressão profunda causada por diástase patológica, decidi mudar de vida. Usei minha formação em Engenharia de Alimentos para me aprofundar em nutrição esportiva, fisiologia do exercício e Educação Física, focando em treinamento abdominal e feminino. Testei tudo em mim até desenvolver uma nova consciência corporal, capaz de fortalecer e definir o abdômen. Comecei atendendo amigas em casa e percebi que muitas mulheres compartilhavam essa dor. Assim nasceu o Método Abdômen Power, que já transformou a vida de milhares de mulheres com base na minha trajetória real e conhecimento técnico.
          </p>
        </div>

        {/* 12. Jornada de Evolução - 5 Semanas */}
        <div className="mt-12">
          <h2 className="text-white text-2xl font-bold text-center mb-8">
            Sua Transformação nas próximas 5 semanas:
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            {journeySteps.map((step, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center text-center shadow-lg"
              >
                {/* Progress Bar Vertical */}
                <span className="text-gray-500 text-[10px] font-bold mb-1 uppercase tracking-tighter">
                  {step.percentage}%
                </span>
                <div className="w-6 h-12 bg-white/10 rounded-full mb-3 flex flex-col justify-end p-0.5 overflow-hidden">
                  <div 
                    className={`w-full rounded-full transition-all duration-1000 ${step.color}`}
                    style={{ height: `${step.percentage}%` }}
                  />
                </div>

                <p className="text-white text-xs font-bold mb-1">
                  {step.label === "Hoje" ? <span className="text-red-500">Hoje</span> : <span>{step.label}</span>}:
                </p>
                <p className="text-gray-400 text-[10px] leading-snug">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 13. Garantia Final */}
        <div className="mt-12 flex flex-col items-center text-center space-y-6 px-4 pb-16">
          <h2 className="text-white text-xl font-bold leading-tight">
            Teste sem medo, o resultado é garantido!
          </h2>

          <Image
            src="/garantia-7-dias-branco (2).webp"
            alt="7 Dias de Garantia"
            width={240}
            height={240}
            className="w-48 h-auto object-contain"
          />
          
          <p className="text-gray-400 text-sm leading-relaxed max-w-[320px]">
            Com mais de 10 anos de experiência e milhares de alunas transformadas, tenho certeza de que você alcançará o melhor corpo da sua vida.
          </p>
        </div>

        {/* 2. Prova Social - Depoimento Cliente (Movido para o final) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 italic mb-8">
          <div className="flex items-center gap-1 mb-2 text-yellow-500">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            "Eu não acreditava que seria possível. Depois de dois filhos, meu abdômen era minha maior insegurança. Em 5 semanas de MAP, minha barriga não só desinchou como sinto os músculos firmes de novo. Mudou minha vida!"
          </p>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-600 overflow-hidden">
              <Image src="/placeholder-user.jpg" alt="Camila F." width={24} height={24} />
            </div>
            <span className="text-white text-xs font-semibold">Camila F. - Aluna MAP</span>
          </div>
        </div>
      </div>
    </div>
  )
}
