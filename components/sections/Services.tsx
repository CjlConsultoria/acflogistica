/* eslint-disable */
'use client'
import { useRef, useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Card, CardTitle, CardText } from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { Truck, CalendarCheck, Lock, Target, LayoutDashboard, MapPin } from 'lucide-react'

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

/* Card com hover laranja, texto branco/cinza claro,
   border-radius: top-left e bottom-right = 0 (quadrado),
   top-right e bottom-left = arredondados.
   Hover: sobe (translateY) + fundo laranja */
const HoverCard = styled.div`
  background: #dfdfdf;
  border-radius: 0 1.5rem 0 1.5rem; /* top-left=0, top-right=1.5rem, bottom-right=0, bottom-left=1.5rem */
  padding: 2rem 1.75rem;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
              background 0.28s ease,
              box-shadow 0.28s ease;
  cursor: pointer;
  height: 100%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);

  /* ícone, título e texto ficam com cores padrão */
  .card-icon   { color: #ee961a; transition: color 0.28s ease; }
  .card-title  { color: #1E549E; transition: color 0.28s ease; }
  .card-text   { color: #4b5563; transition: color 0.28s ease; }

  &:hover {
    transform: translateY(-10px);
    background: #ee961a;
    box-shadow: 0 16px 40px rgba(238,150,26,0.35);

    .card-icon  { color: #ffffff; }
    .card-title { color: #ffffff; }
    .card-text  { color: #f5f0e8; }
  }
`

const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.2rem;
`

const StyledCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  line-height: 1.3;
`

const StyledCardText = styled.p`
  font-size: 0.92rem;
  line-height: 1.6;
  margin: 0;
`

const services = [
  {
    icon: <Truck size={28} strokeWidth={1.5} />,
    title: 'Carga Expressa',
    text: 'Entregas urgentes com prioridade total no manuseio e transporte.',
  },
  {
    icon: <CalendarCheck size={28} strokeWidth={1.5} />,
    title: 'Coletas e entregas programadas',
    text: 'Flexibilidade e previsibilidade para sua operação.',
  },
  {
    icon: <Lock size={28} strokeWidth={1.5} />,
    title: 'Transporte dedicado',
    text: 'Veículos exclusivos para operações que exigem sigilo, controle e pontualidade.',
  },
  {
    icon: <Target size={28} strokeWidth={1.5} />,
    title: 'Logística personalizada',
    text: 'Flexibilidade e previsibilidade para sua operação.',
  },
  {
    icon: <LayoutDashboard size={28} strokeWidth={1.5} />,
    title: 'Gestão Logística',
    text: 'Dashboard completo com rastreamento, relatórios e histórico de entregas para gestão eficiente da sua operação.',
  },
  {
    icon: <MapPin size={28} strokeWidth={1.5} />,
    title: 'Distribuição urbana',
    text: 'Roteirização inteligente para maior produtividade dentro das cidades, respeitando restrições de circulação.',
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
              <HoverCard>
                <IconWrap className="card-icon">{s.icon}</IconWrap>
                <StyledCardTitle className="card-title">{s.title}</StyledCardTitle>
                <StyledCardText className="card-text">{s.text}</StyledCardText>
              </HoverCard>
            </AnimCard>
          ))}
        </Grid>
      </Inner>
    </Section>
  )
}