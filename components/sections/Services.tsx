/* eslint-disable */
'use client'
import { useRef, useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Card, CardTitle, CardText } from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { Truck, Package, Navigation, Layers, LayoutDashboard, Handshake } from 'lucide-react'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`
const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-32px); }
  to   { opacity: 1; transform: translateX(0); }
`

const Section = styled.section`
  padding: 7rem 5rem;
  background: #ffffff;
  position: relative;
  &::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(30,84,158,0.3), transparent);
  }
  @media (max-width: 1024px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.5rem; }
`

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const TitleWrap = styled.div<{ $visible: boolean }>`
  opacity: 0;
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeLeft} 0.7s 0s cubic-bezier(0.22, 1, 0.36, 1) both;
    `}
`

const Grid = styled.div<{ $visible: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 600px)  { grid-template-columns: 1fr; gap: 1rem; }
`

const AnimCard = styled.div<{ $visible: boolean; $delay: number }>`
  opacity: 0;
  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${fadeUp} 0.65s ${$delay}s cubic-bezier(0.22, 1, 0.36, 1) both;
    `}
`

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
  color: #ee961a;
`

const services = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: 'Transporte Rodoviário',
    text: 'Frota própria e rastreada para cargas de todos os tamanhos, cobrindo todo o território nacional com pontualidade.',
  },
  {
    icon: <Package size={28} strokeWidth={1.5} />,
    title: 'Coleta e Distribuição',
    text: 'Planejamento logístico completo da coleta até a entrega final, com visibilidade em tempo real da sua carga.',
  },
  {
    icon: <Navigation size={28} strokeWidth={1.5} />,
    title: 'Last Mile',
    text: 'Entrega no último trecho com agilidade e cuidado, ideal para e-commerce e marketplaces como Mercado Livre e Shopee.',
  },
  {
    icon: <Layers size={28} strokeWidth={1.5} />,
    title: 'Carga Fracionada',
    text: 'Compartilhe o espaço do caminhão e reduza custos sem abrir mão do prazo e da segurança.',
  },
  {
    icon: <LayoutDashboard size={28} strokeWidth={1.5} />,
    title: 'Gestão Logística',
    text: 'Dashboard completo com rastreamento, relatórios e histórico de entregas para gestão eficiente da sua operação.',
  },
  {
    icon: <Handshake size={28} strokeWidth={1.5} />,
    title: 'Seja Parceiro',
    text: 'Possui van, utilitário ou caminhão? Faça parte da nossa frota e aumente sua renda com rotas garantidas.',
  },
]

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, visible }
}

export default function Services() {
  const titleReveal = useReveal(0.2)
  const gridReveal  = useReveal(0.1)

  return (
    <Section id="servicos">
      <Inner>
        <TitleWrap ref={titleReveal.ref} $visible={titleReveal.visible}>
          <SectionTitle
            label={<span style={{ fontWeight: 700 }}>O que oferecemos</span>}
            title={
              <>
                <span style={{ color: '#1E549E' }}>NOSSOS</span>{' '}
                <span>SERVIÇOS</span>
              </>
            }
            subtitle="Soluções completas de logística para sua empresa crescer com eficiência e segurança."
          />
        </TitleWrap>
        <Grid ref={gridReveal.ref} $visible={gridReveal.visible}>
          {services.map((s, i) => (
            <AnimCard key={s.title} $visible={gridReveal.visible} $delay={i * 0.1}>
              <Card $hoverable>
                <IconWrap>{s.icon}</IconWrap>
                <CardTitle>{s.title}</CardTitle>
                <CardText>{s.text}</CardText>
              </Card>
            </AnimCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}