'use client'
import styled, { keyframes } from 'styled-components'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { MapPin } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 8rem 5rem 5rem;
  &::before {
    content: '';
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 60% 50%, rgba(30,84,158,0.12) 0%, transparent 65%),
      radial-gradient(ellipse 40% 40% at 85% 20%, rgba(238,150,26,0.07) 0%, transparent 55%);
    pointer-events: none;
  }
  @media (max-width: 1024px) { padding: 7rem 2rem 4rem; }
  @media (max-width: 768px)  { padding: 6rem 1.5rem 3rem; min-height: auto; }
`

const BgGrid = styled.div`
  position: absolute; inset: 0;
  background-image:
    linear-gradient(rgba(30,84,158,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(30,84,158,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
`

const BgGlow = styled.div`
  position: absolute;
  top: -10%; right: -5%;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(238,150,26,0.06) 0%, transparent 65%);
  pointer-events: none;
  animation: ${float} 9s ease-in-out infinite;
  @media (max-width: 768px) { width: 300px; height: 300px; }
`

const Content = styled.div`
  position: relative; z-index: 2;
  max-width: 1280px; margin: 0 auto; width: 100%;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 5rem; align-items: center;
  @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 3rem; }
`

const Left = styled.div`
  animation: ${fadeUp} 0.9s ease both;
  @media (max-width: 768px) { text-align: center; }
`

const Title = styled.h1`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: clamp(2.6rem, 7vw, 5.8rem);
  font-weight: 800; line-height: 0.97; letter-spacing: 1px; color: #F4F6FA;
  margin: 1rem 0 1.5rem;
  span { color: #EE961A; }
  em {
    font-style: normal;
    -webkit-text-stroke: 2px #1E549E;
    color: transparent;
  }
`

const Subtitle = styled.p`
  font-size: 1.05rem; color: #6B7A99; max-width: 500px; line-height: 1.8; margin-bottom: 2.5rem;
  @media (max-width: 768px) { font-size: 0.95rem; margin: 0 auto 2rem; }
`

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  gap: 1rem;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;

    a, button {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      justify-content: center;
      white-space: normal;
      text-align: center;
    }
  }
`

const TrustRow = styled.div`
  display: flex; align-items: center; gap: 2rem;
  margin-top: 3rem; padding-top: 2rem;
  border-top: 1px solid rgba(30,84,158,0.2); flex-wrap: wrap;
  @media (max-width: 768px) { justify-content: center; gap: 1.5rem; }
`

const TrustItem = styled.div<{ $delay?: number }>`
  display: flex; align-items: center; gap: 0.6rem;
  animation: ${fadeUp} 0.7s ${({ $delay = 0 }) => $delay}s ease both;
  strong { font-family: var(--font-cabourg-bold), sans-serif; font-size: 1.5rem; font-weight: 800; color: #EE961A; }
  span { font-size: 0.75rem; color: #6B7A99; line-height: 1.3; max-width: 70px; }
`

const Right = styled.div`
  animation: ${fadeUp} 0.9s 0.15s ease both;
  display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
  @media (max-width: 1024px) { display: none; }
`

const StatCard = styled.div<{ $accent?: boolean; $delay?: number }>`
  background: ${({ $accent }) => $accent ? 'linear-gradient(135deg, #EE961A, #f5a832)' : 'rgba(13,27,62,0.9)'};
  border: 1px solid ${({ $accent }) => $accent ? '#EE961A' : 'rgba(30,84,158,0.25)'};
  border-radius: 12px; padding: 1.8rem;
  backdrop-filter: blur(8px);
  transition: transform 0.3s, box-shadow 0.3s;
  animation: ${fadeUp} 0.7s ${({ $delay = 0 }) => $delay}s ease both;
  &:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,0.3); }
  h3 { font-family: var(--font-cabourg-bold), sans-serif; font-size: 2.8rem; font-weight: 900; color: ${({ $accent }) => $accent ? '#fff' : '#EE961A'}; line-height: 1; }
  p  { font-size: 0.75rem; color: ${({ $accent }) => $accent ? 'rgba(255,255,255,0.8)' : '#6B7A99'}; letter-spacing: 1.5px; text-transform: uppercase; margin-top: 0.4rem; font-weight: 600; }
`

const CardWrap = styled.div`position: relative; grid-column: span 2;`

const FloatingBadge = styled.div`
  position: absolute; bottom: 1rem; right: 1rem;
  background: #060D1E; border: 1px solid rgba(30,84,158,0.35); border-radius: 8px;
  padding: 0.55rem 0.9rem; display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.78rem; color: #B0BAD0; backdrop-filter: blur(8px);
  animation: ${float} 6s 1s ease-in-out infinite;
  white-space: nowrap; z-index: 10;
  span { color: #EE961A; font-weight: 700; }
`

const CheckIcon = styled.span`display: inline-flex; align-items: center; color: #EE961A;`

export default function Hero() {
  return (
    <Section>
      <BgGrid />
      <BgGlow />
      <Content>
        <Left>
          <Badge $variant="outline">
            <MapPin size={11} strokeWidth={2} />
            Guarulhos · São Paulo · Brasil
          </Badge>
          <Title>
            LOGÍSTICA<br />
            QUE <span>MOVE</span><br />
            <em>NEGÓCIOS</em>
          </Title>
          <Subtitle>
            Soluções ágeis e seguras para empresas e marketplaces.
            Coleta, transporte e distribuição com eficiência e rastreamento em tempo real.
          </Subtitle>
          <Actions>
            <Button href="https://wa.me/5511978166315" target="_blank" $variant="primary" $size="lg">Falar no WhatsApp</Button>
            <Button href="#parceiros" $variant="outline" $size="lg">Seja nosso parceiro</Button>
          </Actions>
          <TrustRow>
            <TrustItem $delay={0.9}><strong>500+</strong><span>Clientes ativos</span></TrustItem>
            <TrustItem $delay={1.05}><strong>98%</strong><span>No prazo</span></TrustItem>
            <TrustItem $delay={1.2}><strong>24h</strong><span>Suporte</span></TrustItem>
          </TrustRow>
        </Left>
        <Right>
          <StatCard $accent $delay={0.3}><h3>15+</h3><p>Anos de mercado</p></StatCard>
          <StatCard $delay={0.45}><h3>98%</h3><p>Pontualidade</p></StatCard>
          <CardWrap>
            <StatCard $delay={0.6}><h3>500+</h3><p>Clientes satisfeitos</p></StatCard>
            <FloatingBadge>
              <CheckIcon>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </CheckIcon>
              Rastreamento <span>em tempo real</span>
            </FloatingBadge>
          </CardWrap>
          <StatCard $delay={0.75}><h3>24/7</h3><p>Suporte ativo</p></StatCard>
        </Right>
      </Content>
    </Section>
  )
}