import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Script from "next/script"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Diagnóstico Abdômen dos Sonhos",
  description: "Descubra o que está impedindo você de conquistar o abdômen dos sonhos em 90 dias",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${poppins.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />

        {/* UTMify — Pixel de rastreamento */}
        <Script
          id="utmify-pixel-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.pixelId = "6978e499ccfa92d57eb7eec8";`,
          }}
        />
        <Script
          id="utmify-pixel"
          src="https://cdn.utmify.com.br/scripts/pixel/pixel.js"
          strategy="afterInteractive"
        />

        {/* UTMify — UTMs / SubIDs */}
        <Script
          id="utmify-utms"
          src="https://cdn.utmify.com.br/scripts/utms/latest.js"
          data-utmify-prevent-subids=""
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
