'use client'
import styled, { keyframes, css } from 'styled-components'
import SectionTitle from '../ui/SectionTitle'
import { MessageSquare, ClipboardList, Truck, CheckCircle } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`
const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
`
const lineGrow = keyframes`
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
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
  ${({ $visible }) => $visible && css`animation: ${fadeUp} 0.7s 0s cubic-bezier(0.22,1,0.36,1) both;`}
`

const Steps = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem; position: relative;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); gap: 2.5rem; }
  @media (max-width: 600px)  { grid-template-columns: 1fr; gap: 2rem; }
`

const ConnectorLine = styled.div<{ $visible?: boolean }>`
  position: absolute;
  top: 27px; left: 12%; right: 12%; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(238,150,26,0.3), rgba(238,150,26,0.3), transparent);
  transform-origin: left;
  transform: scaleX(0);
  ${({ $visible }) => $visible && css`animation: ${lineGrow} 1.2s 0.5s cubic-bezier(0.22,1,0.36,1) forwards;`}
  @media (max-width: 1024px) { display: none; }
`

const Step = styled.div<{ $visible?: boolean; $delay?: number }>`
  display: flex; flex-direction: column; align-items: center; text-align: center; position: relative; z-index: 1;
  opacity: 0;
  ${({ $visible, $delay = 0 }) => $visible && css`
    animation: ${fadeUp} 0.65s ${$delay}s cubic-bezier(0.22,1,0.36,1) both;
  `}
`

const StepNum = styled.div<{ $visible?: boolean; $delay?: number }>`
  width: 54px; height: 54px; border-radius: 50%;
  background: #EE961A; color: #fff;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 0 8px rgba(238,150,26,0.1); flex-shrink: 0;
  opacity: 0;
  transition: box-shadow 0.3s;
  ${({ $visible, $delay = 0 }) => $visible && css`
    animation: ${scaleIn} 0.5s ${$delay}s cubic-bezier(0.34,1.56,0.64,1) both;
  `}
  &:hover { box-shadow: 0 0 0 14px rgba(238,150,26,0.15); }
`

const StepTitle = styled.h3`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.2rem; font-weight: 700; color: #F4F6FA; margin-bottom: 0.6rem; letter-spacing: 0.5px;
`

const StepText = styled.p`font-size: 0.85rem; color: #6B7A99; line-height: 1.7;`

const steps = [
  { icon: <MessageSquare size={22} strokeWidth={1.5} />, title: 'Solicite uma Cotação', text: 'Entre em contato pelo WhatsApp ou e-mail com os detalhes da sua carga.' },
  { icon: <ClipboardList size={22} strokeWidth={1.5} />, title: 'Planejamento', text: 'Nossa equipe analisa a rota ideal e prepara tudo para a coleta.' },
  { icon: <Truck size={22} strokeWidth={1.5} />, title: 'Coleta e Transporte', text: 'Sua carga é coletada com segurança e transportada em frota rastreada.' },
  { icon: <CheckCircle size={22} strokeWidth={1.5} />, title: 'Entrega Confirmada', text: 'Entrega pontual com confirmação digital e suporte pós-entrega.' },
]

export default function HowItWorks() {
  const title   = useScrollReveal({ threshold: 0.2 })
  const section = useScrollReveal({ threshold: 0.15 })

  return (
    <Section id="como-funciona">
      <Inner>
        <TitleWrap ref={title.ref} $visible={title.visible}>
          <SectionTitle label="Processo" title={<>COMO <span>FUNCIONA</span></>} subtitle="Simples, rápido e transparente do início ao fim." center />
        </TitleWrap>
        <Steps ref={section.ref as React.RefObject<HTMLDivElement>}>
          <ConnectorLine $visible={section.visible} />
          {steps.map((s, i) => (
            <Step key={s.title} $visible={section.visible} $delay={i * 0.15 + 0.2}>
              <StepNum $visible={section.visible} $delay={i * 0.15 + 0.1}>{s.icon}</StepNum>
              <StepTitle>{s.title}</StepTitle>
              <StepText>{s.text}</StepText>
            </Step>
          ))}
        </Steps>
      </Inner>
    </Section>
  )
}
