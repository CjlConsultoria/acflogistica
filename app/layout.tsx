import type { Metadata } from 'next'
import localFont from 'next/font/local'
import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/lib/GlobalStyle'

const cabourgRegular = localFont({
  src: '../src/fonts/CabourgOT-Regular.otf',
  variable: '--font-cabourg-regular',
  display: 'swap',
})

const cabourgBold = localFont({
  src: '../src/fonts/CabourgOT-Bold.otf',
  variable: '--font-cabourg-bold',
  display: 'swap',
})

const interVariable = localFont({
  src: '../src/fonts/InterVariable.ttf',
  variable: '--font-inter',
  display: 'swap',
})

const interItalic = localFont({
  src: '../src/fonts/InterVariable-Italic.ttf',
  variable: '--font-inter-italic',
  display: 'swap',
  style: 'italic',
})

export const metadata: Metadata = {
  title: 'ACF Logística e Transportes | Guarulhos, SP',
  description: 'Soluções ágeis e seguras em logística para empresas e marketplaces. Coleta, transporte e distribuição com eficiência.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    cabourgRegular.variable,
    cabourgBold.variable,
    interVariable.variable,
    interItalic.variable,
  ].join(' ')

  return (
    <html lang="pt-BR">
      <body className={fontVars} style={{ margin: 0, padding: 0 }}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
