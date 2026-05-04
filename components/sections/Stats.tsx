'use client'
import styled, { keyframes, css } from 'styled-components'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const countUp = keyframes`
  from { opacity: 0; transform: translateY(24px) scale(0.85); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

/* ─── Seção: position relative para empilhar camadas ─── */
const Section = styled.section`
  padding: 5rem;
  position: relative;
  overflow: hidden;
  @media (max-width: 1024px) { padding: 4rem 2rem; }
  @media (max-width: 768px)  { padding: 3rem 1.5rem; }
`

/* Camada 1 — logo de fundo (z-index 0) */
const BgLogo = styled.div<{ $visible?: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0rem;
  z-index: 0;
  opacity: 0;
  pointer-events: none;
  user-select: none;
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeIn} 1.2s 0.6s ease both;
    `}
  @media (max-width: 768px) { display: none; }
`

/* Camada 2 — overlay preto semitransparente (z-index 1) */
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1;
  pointer-events: none;
`

/* Camada 3 — grid de números (z-index 2) */
const Grid = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  @media (max-width: 400px) { grid-template-columns: 1fr 1fr; gap: 1rem; }
`

const Item = styled.div<{ $visible?: boolean; $delay?: number }>`
  opacity: 0;
  ${({ $visible, $delay = 0 }) =>
    $visible &&
    css`
      animation: ${countUp} 0.7s ${$delay}s cubic-bezier(0.22, 1, 0.36, 1) both;
    `}
`

const Number = styled.div`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: clamp(2.8rem, 7vw, 5.5rem);
  font-weight: 900;
  color: #ee961a;
  line-height: 1;
  letter-spacing: -1px;
`

const Label = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 0.5rem;
  @media (max-width: 480px) { font-size: 0.65rem; letter-spacing: 1.5px; }
`

const stats = [
  { number: '500+', label: 'Clientes Ativos' },
  { number: '98%',  label: 'Pontualidade' },
  { number: '15+',  label: 'Anos de Mercado' },
  { number: '24/7', label: 'Suporte' },
]

export default function Stats() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 })

  return (
    <Section id="numeros">
      {/* Camada 0 — logo de fundo */}
      <BgLogo $visible={visible}>
        <Image
          src="/logo1.png"
          alt=""
          width={520}
          height={220}
          style={{ objectFit: 'contain' }}
          aria-hidden="true"
        />
      </BgLogo>

      {/* Camada 1 — overlay preto semitransparente sobre a logo */}
      <Overlay />

      {/* Camada 2 — números */}
      <Grid ref={ref}>
        {stats.map((s, i) => (
          <Item key={s.label} $visible={visible} $delay={i * 0.12}>
            <Number>{s.number}</Number>
            <Label>{s.label}</Label>
          </Item>
        ))}
      </Grid>
    </Section>
  )
}