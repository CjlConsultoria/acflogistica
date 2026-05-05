'use client'
import { useRef, useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import SectionTitle from '../ui/SectionTitle'
import { MessageSquare, ClipboardList, Truck, Lightbulb, Leaf } from 'lucide-react'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
`
const lineGrow = keyframes`
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
`

const Section = styled.section`
  padding: 7rem 5rem;
  background: #060D1E;
  @media (max-width: 1024px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.5rem; }
`

const Inner = styled.div`max-width: 1280px; margin: 0 auto;`

const TitleWrap = styled.div<{ $visible?: boolean }>`
  opacity: 0;
  text-align: center;
  margin-bottom: 4rem;
  ${({ $visible }) => $visible && css`animation: ${fadeUp} 0.7s 0s cubic-bezier(0.22,1,0.36,1) both;`}
`

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  position: relative;
  @media (max-width: 1024px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; }
`

const Step = styled.div<{ $visible?: boolean; $delay?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  padding: 0 2rem 0 2rem;
  position: relative;
  z-index: 1;
  opacity: 0;

  &:not(:first-child)::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.15);
    transform-origin: top;
    transform: scaleY(0);
  }

  ${({ $visible, $delay = 0 }) =>
    $visible &&
    css`
      animation: ${fadeUp} 0.65s ${$delay}s cubic-bezier(0.22,1,0.36,1) both;
      &:not(:first-child)::before {
        animation: ${lineGrow} 0.8s ${$delay + 0.1}s cubic-bezier(0.22,1,0.36,1) forwards;
      }
    `}

  @media (max-width: 1024px) {
    padding: 2rem 1.5rem;
    &:nth-child(3n + 1)::before { display: none; }
  }
  @media (max-width: 600px) {
    padding: 2rem 0;
    &::before { display: none; }
  }
`

const IconWrap = styled.div<{ $visible?: boolean; $delay?: number }>`
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  color: #ffffff;
  opacity: 0;
  ${({ $visible, $delay = 0 }) =>
    $visible &&
    css`
      animation: ${scaleIn} 0.5s ${$delay}s cubic-bezier(0.34,1.56,0.64,1) both;
    `}
`

const StepTitle = styled.h3`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #F4F6FA;
  margin-bottom: 0.75rem;
  letter-spacing: 0.3px;
  line-height: 1.3;
`

const StepText = styled.p`
  font-size: 0.85rem;
  color: #8A96B0;
  line-height: 1.75;
  margin: 0;
`

const steps = [
  {
    icon: <Truck size={30} strokeWidth={1.4} />,
    title: 'Operação eficiente',
    text: 'First, Middle e Last Mile aplicados na prática para maximizar a produtividade nas entregas.',
  },
  {
    icon: <MessageSquare size={30} strokeWidth={1.4} />,
    title: 'Excelência no atendimento',
    text: 'Comunicação clara, postura profissional e foco total na experiência do cliente.',
  },
  {
    icon: <ClipboardList size={30} strokeWidth={1.4} />,
    title: 'Segurança e técnica',
    text: 'Direção defensiva, manutenção preventiva e domínio sobre motos, vans, VUCs e caminhões.',
  },
  {
    icon: <Lightbulb size={30} strokeWidth={1.4} />,
    title: 'Crescimento pessoal',
    text: 'Educação financeira, planejamento de carreira e abertura de oportunidades no mercado.',
  },
  {
    icon: <Leaf size={30} strokeWidth={1.4} />,
    title: 'Responsabilidade ambiental',
    text: 'Adoção de veículos elétricos e práticas que diminuem o impacto ambiental e social.',
  },
]

export default function HowItWorks() {
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const [titleVisible, setTitleVisible] = useState(false)
  const [stepsVisible, setStepsVisible] = useState(false)

  useEffect(() => {
    const observe = (
      el: HTMLDivElement | null,
      setter: (v: boolean) => void,
      threshold: number
    ) => {
      if (!el) return
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setter(true)
            io.disconnect()
          }
        },
        { threshold, rootMargin: '0px 0px -60px 0px' }
      )
      io.observe(el)
      return () => io.disconnect()
    }

    const c1 = observe(titleRef.current, setTitleVisible, 0.2)
    const c2 = observe(stepsRef.current, setStepsVisible, 0.15)
    return () => {
      c1?.()
      c2?.()
    }
  }, [])

  return (
    <Section id="como-funciona">
      <Inner>
        <TitleWrap ref={titleRef} $visible={titleVisible}>
          <SectionTitle
            label="Processo"
            title={<>COMO <span>FUNCIONA</span></>}
            subtitle="Do contato inicial à entrega final — cada etapa pensada para garantir agilidade, segurança e total transparência na sua operação."
            center
          />
        </TitleWrap>
        <Steps ref={stepsRef}>
          {steps.map((s, i) => (
            <Step key={s.title} $visible={stepsVisible} $delay={i * 0.15 + 0.2}>
              <IconWrap $visible={stepsVisible} $delay={i * 0.15 + 0.1}>
                {s.icon}
              </IconWrap>
              <StepTitle>{s.title}</StepTitle>
              <StepText>{s.text}</StepText>
            </Step>
          ))}
        </Steps>
      </Inner>
    </Section>
  )
}