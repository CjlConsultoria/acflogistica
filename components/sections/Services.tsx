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

/* ─────────────────────────────────────────
   STYLED COMPONENTS — SEÇÃO ORIGINAL
───────────────────────────────────────── */

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

const HoverCard = styled.div`
  background: #dfdfdf;
  border-radius: 0 1.5rem 0 1.5rem;
  padding: 2rem 1.75rem;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1),
              background 0.28s ease,
              box-shadow 0.28s ease;
  cursor: pointer;
  height: 100%;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);

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

/* ─────────────────────────────────────────
   STYLED COMPONENTS — MILE CARDS (NOVOS)
───────────────────────────────────────── */

const MileSection = styled.section`
  padding: 5rem 5rem 6rem;
  background: #ffffff;
  position: relative;
  @media (max-width: 1024px) { padding: 4rem 2rem 5rem; }
  @media (max-width: 768px)  { padding: 3rem 1.5rem 4rem; }
`

const MileInner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

/* Título e subtítulo alinhados à esquerda — mesmo estilo visual da seção "Por que nos escolher" */
const MileHeaderWrap = styled.div<{ $visible: boolean }>`
  opacity: 0;
  text-align: left;
  margin-bottom: 3rem;
  ${({ $visible }) =>
    $visible &&
    css`
      animation: ${fadeLeft} 0.7s 0s cubic-bezier(0.22, 1, 0.36, 1) both;
    `}
`

const MileHeading = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-family: var(--font-cabourg-bold), sans-serif;
  font-weight: 800;
  color: #111827;
  line-height: 1.15;
  margin: 0 0 1rem;
  letter-spacing: -0.02em;
  text-transform: uppercase;
`

const MileSubtitle = styled.p`
  font-size: 0.97rem;
  font-family: var(--font-inter), sans-serif;
  color: #4b5563;
  line-height: 1.75;
  max-width: 720px;
  margin: 0;
`

const MileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  @media (max-width: 900px) { grid-template-columns: 1fr; gap: 2rem; }
`

const MileAnimCard = styled.div<{ $visible: boolean; $delay: number }>`
  opacity: 0;
  ${({ $visible, $delay }) =>
    $visible &&
    css`
      animation: ${fadeUp} 0.65s ${$delay}s cubic-bezier(0.22, 1, 0.36, 1) both;
    `}
`

const MileCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 1.5rem 2.5rem;
  @media (max-width: 900px) { padding: 0; }
`

const MileBadge = styled.div`
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background: #dfdfdf;
  border: 3px solid #1E549E;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.75rem;
  position: relative;
  transition: background 0.3s ease;
  box-shadow: 0 4px 20px rgba(30, 84, 158, 0.12);

  svg {
    width: 38px;
    height: 38px;
    stroke: #1E549E;
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.3s ease;
  }

  @media (max-width: 900px) { margin-bottom: 1.25rem; }
`

const MileStep = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ee961a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
  color: #fff;
`

const MileCardInner = styled.div`
  background: #dfdfdf;
  border-radius: 0 1.5rem 0 1.5rem;
  padding: 1.75rem 1.5rem;
  width: 100%;
  box-shadow: 0 2px 16px rgba(30, 84, 158, 0.07);
  border-top: 3px solid #1E549E;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
`

const MileTag = styled.span`
  display: inline-block;
  background: #dfdfdf;
  color: #1E549E;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 0.6rem;
  transition: background 0.3s ease, color 0.3s ease;
`

const MileTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1E549E;
  margin: 0 0 0.75rem;
  line-height: 1.3;
  transition: color 0.3s ease;
`

const MileText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
  font-weight: 300;
`

const MileHoverWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &:hover ${MileBadge} {
    background: #1E549E;
    svg { stroke: #ffffff; }
  }
  &:hover ${MileCardInner} {
    border-top-color: #ee961a;
    box-shadow: 0 12px 36px rgba(238, 150, 26, 0.18);
  }
  &:hover ${MileTitle} { color: #ee961a; }
  &:hover ${MileTag} {
    background: #fff3e0;
    color: #c97a10;
  }
`

const miles = [
  {
    step: '01',
    tag: 'Coleta',
    title: 'First Mile',
    text: 'Realizamos a coleta das mercadorias diretamente na origem — em centros de distribuição, fábricas ou fornecedores — assegurando o início da jornada logística com agilidade e precisão.',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    step: '02',
    tag: 'Transbordo',
    title: 'Middle Mile',
    text: 'Conduzimos o transporte entre hubs e centros de distribuição, garantindo fluxo contínuo das cargas com rotas otimizadas e redução de custos para sua operação.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" />
        <rect x="9" y="11" width="14" height="10" rx="2" />
        <circle cx="12" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
      </svg>
    ),
  },
  {
    step: '03',
    tag: 'Entrega',
    title: 'Last Mile',
    text: 'Executamos a entrega final ao destino do cliente com foco em agilidade, cumprimento rigoroso de prazos e alto padrão de qualidade no atendimento.',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
]

/* ─────────────────────────────────────────
   HOOK COMPARTILHADO
───────────────────────────────────────── */

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

/* ─────────────────────────────────────────
   EXPORT DEFAULT
───────────────────────────────────────── */

export default function Services() {
  const titleReveal    = useReveal(0.2)
  const gridReveal     = useReveal(0.1)
  const mileReveal     = useReveal(0.1)
  const mileHeaderReveal = useReveal(0.15)

  return (
    <>
      {/* ══ SEÇÃO ORIGINAL — INTACTA ══ */}
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
              subtitle="Soluções completas de transporte e logística para sua empresa crescer com eficiência e segurança.."
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

      {/* ══ MILE CARDS — NOVOS, LOGO ABAIXO ══ */}
      <MileSection>
        <MileInner>

          {/* Título e subtítulo alinhados à esquerda */}
          <MileHeaderWrap ref={mileHeaderReveal.ref} $visible={mileHeaderReveal.visible}>
            <MileHeading>
              A JORNADA COMPLETA{' '}
              <span style={{ color: '#EE961A' }}>DA SUA CARGA</span>
            </MileHeading>
            <MileSubtitle>
              Na Nunes Logística, cobrimos cada etapa do transporte — da coleta na origem até
              a entrega no destino final. Trabalhamos com diferentes tipos de veículos para
              garantir agilidade, segurança e conformidade com as restrições de cada região,
              atendendo setores como saúde, e-commerce, indústrias e muito mais.
            </MileSubtitle>
          </MileHeaderWrap>

          {/* Cards */}
          <MileGrid ref={mileReveal.ref}>
            {miles.map((m, i) => (
              <MileAnimCard key={m.title} $visible={mileReveal.visible} $delay={i * 0.12}>
                <MileCardWrap>
                  <MileHoverWrap>
                    <MileBadge>
                      <MileStep>{m.step}</MileStep>
                      {m.icon}
                    </MileBadge>
                    <MileCardInner>
                      <MileTag>{m.tag}</MileTag>
                      <MileTitle>{m.title}</MileTitle>
                      <MileText>{m.text}</MileText>
                    </MileCardInner>
                  </MileHoverWrap>
                </MileCardWrap>
              </MileAnimCard>
            ))}
          </MileGrid>

        </MileInner>
      </MileSection>
    </>
  )
}