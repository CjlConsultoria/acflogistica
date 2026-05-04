'use client'
import styled, { keyframes, css } from 'styled-components'
import { Button } from '../ui/Button'
import { MessageCircle, Mail } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`
const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.08); }
`

const Section = styled.section`
  padding: 7rem 5rem;
  background: #080F22;
  text-align: center; position: relative; overflow: hidden;
  &::before {
    content: '';
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; height: 700px; border-radius: 50%;
    background: radial-gradient(circle, rgba(30,84,158,0.1) 0%, transparent 65%);
    pointer-events: none;
    animation: ${pulse} 5s ease-in-out infinite;
  }
  @media (max-width: 1024px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.5rem; }
`

const Title = styled.h2<{ $visible?: boolean }>`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: clamp(2rem, 6vw, 4.5rem); font-weight: 800; color: #F4F6FA;
  letter-spacing: 1px; position: relative; z-index: 1;
  opacity: 0;
  span { color: #EE961A; }
  ${({ $visible }) => $visible && css`animation: ${fadeUp} 0.7s 0s cubic-bezier(0.22,1,0.36,1) both;`}
`

const Sub = styled.p<{ $visible?: boolean }>`
  font-size: 1rem; color: #6B7A99;
  margin: 1.2rem auto 2.5rem; max-width: 460px; line-height: 1.75;
  position: relative; z-index: 1; opacity: 0;
  ${({ $visible }) => $visible && css`animation: ${fadeUp} 0.7s 0.15s cubic-bezier(0.22,1,0.36,1) both;`}
  @media (max-width: 768px) { font-size: 0.95rem; }
`

const Actions = styled.div<{ $visible?: boolean }>`
  display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;
  position: relative; z-index: 1; opacity: 0;
  ${({ $visible }) => $visible && css`animation: ${fadeUp} 0.7s 0.3s cubic-bezier(0.22,1,0.36,1) both;`}
  @media (max-width: 480px) { flex-direction: column; align-items: center; width: 100%; max-width: 320px; margin: 0 auto; a { width: 100%; } }
`

const BtnInner = styled.span`display: inline-flex; align-items: center; gap: 0.5rem;`

export default function CTA() {
  const { ref, visible } = useScrollReveal({ threshold: 0.2 })

  return (
    <Section ref={ref as React.RefObject<HTMLElement>}>
      <Title $visible={visible}>PRONTO PARA <span>ACELERAR</span><br />SUA LOGÍSTICA?</Title>
      <Sub $visible={visible}>Fale com nossa equipe e receba uma cotação personalizada para sua empresa.</Sub>
      <Actions $visible={visible}>
        <Button href="https://wa.me/5511978166315" target="_blank" $variant="primary" $size="lg">
          <BtnInner><MessageCircle size={18} strokeWidth={1.5} /> Falar no WhatsApp</BtnInner>
        </Button>
        <Button href="mailto:contato@acftransportes.com.br" $variant="secondary" $size="lg">
          <BtnInner><Mail size={18} strokeWidth={1.5} /> Enviar E-mail</BtnInner>
        </Button>
      </Actions>
    </Section>
  )
}
