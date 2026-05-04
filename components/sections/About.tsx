'use client'
import styled, { keyframes, css } from 'styled-components'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { Target, Eye, TrendingUp, Heart } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

// ─── Animações ───────────────────────────────────────────────
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`
const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`
const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`
const lineGrow = keyframes`
  from { width: 0; }
  to   { width: 3rem; }
`
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`
const pulseOrange = keyframes`
  0%, 100% { box-shadow: 0 4px 20px rgba(238,150,26,0.15); }
  50%       { box-shadow: 0 12px 48px rgba(238,150,26,0.35); }
`
const pulseBlue = keyframes`
  0%, 100% { box-shadow: 0 4px 20px rgba(30,84,158,0.15); }
  50%       { box-shadow: 0 12px 48px rgba(30,84,158,0.35); }
`
const iconFloat = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50%       { transform: translateY(-5px) scale(1.06); }
`
const borderGlow = keyframes`
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
`

// ─── Constantes do carrossel ─────────────────────────────────
// Altura fixa de cada card. Como é constante, a viewport tem
// exatamente CARD_HEIGHT*2 + GAP_PX de altura — nunca corta nada.
const CARD_HEIGHT        = 220   // desktop
const CARD_HEIGHT_MOBILE = 280   // mobile — maior para nunca cortar texto
const GAP_PX             = 12
const STEP               = CARD_HEIGHT + GAP_PX          // desktop
const STEP_MOBILE        = CARD_HEIGHT_MOBILE + GAP_PX   // mobile

// ─── Layout ──────────────────────────────────────────────────
const Section = styled.section`
  padding: 7rem 5rem;
  background: #0E1829;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -200px; right: -200px;
    width: 700px; height: 700px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(30,84,158,0.13) 0%, transparent 70%);
    pointer-events: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -100px; left: -100px;
    width: 500px; height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(238,150,26,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  @media (max-width: 1024px) { padding: 5rem 2rem; }
  @media (max-width: 768px)  { padding: 4rem 1.5rem; }
`

const Inner = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`

const SectionHeader = styled.div<{ $visible?: boolean }>`
  margin-bottom: 5rem;
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${fadeUp} 0.7s 0s cubic-bezier(0.22,1,0.36,1) both;
  `}
`

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #EE961A;
  border: 1px solid rgba(238,150,26,0.4);
  padding: 0.3rem 0.9rem;
  border-radius: 100px;
  margin-bottom: 1.2rem;
`

const Heading = styled.h2`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 1.05;
  color: #EDF1FA;
  margin-top: 0.8rem;

  span {
    background: linear-gradient(90deg, #EE961A, #f5a832, #EE961A);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ${shimmer} 3s linear infinite;
  }
`

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 1024px) { gap: 3rem; }
  @media (max-width: 768px)  { grid-template-columns: 1fr; gap: 3rem; }
`

const TextCol = styled.div<{ $visible?: boolean }>`
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${fadeLeft} 0.8s 0.1s cubic-bezier(0.22,1,0.36,1) both;
  `}
`

const BodyText = styled.p`
  font-size: 1rem;
  color: #8A97B4;
  line-height: 1.9;
  margin-bottom: 1.4rem;
  strong { color: #D8E0F0; font-weight: 600; }
  &:last-of-type { margin-bottom: 0; }
`

const AccentLine = styled.div<{ $visible?: boolean }>`
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #EE961A, transparent);
  border-radius: 2px;
  margin: 2rem 0;
  ${({ $visible }) => $visible && css`
    animation: ${lineGrow} 0.8s 0.4s cubic-bezier(0.22,1,0.36,1) both;
  `}
`

// ─── Carrossel ───────────────────────────────────────────────
const CarouselCol = styled.div<{ $visible?: boolean }>`
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${fadeRight} 0.8s 0.2s cubic-bezier(0.22,1,0.36,1) both;
  `}
`

// Viewport tem altura EXATA de 2 cards + 1 gap.
// overflow: hidden esconde tudo fora desse retângulo.
// Nunca vai mostrar pedaço de card porque todos têm a mesma altura fixa.
const CarouselViewport = styled.div`
  overflow: hidden;
  border-radius: 20px;
  height: ${CARD_HEIGHT * 2 + GAP_PX}px;

  @media (max-width: 768px) {
    height: ${CARD_HEIGHT_MOBILE * 2 + GAP_PX}px;
  }
`

const CarouselTrack = styled.div<{ $trackIndex: number; $transition: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${GAP_PX}px;
  transform: translateY(calc(${({ $trackIndex }) => -$trackIndex} * ${STEP}px));
  transition: ${({ $transition }) => $transition
    ? 'transform 0.6s cubic-bezier(0.22,1,0.36,1)'
    : 'none'
  };
  will-change: transform;

  @media (max-width: 768px) {
    transform: translateY(calc(${({ $trackIndex }) => -$trackIndex} * ${STEP_MOBILE}px));
  }
`

// ─── Card ─────────────────────────────────────────────────────
const MvvCard = styled.div<{ $accent: 'orange' | 'blue' | 'green' | 'purple' }>`
  height: ${CARD_HEIGHT}px;
  flex-shrink: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: ${CARD_HEIGHT_MOBILE}px;
  }
  background: #ffffff;
  border: 2px solid ${({ $accent }) =>
    $accent === 'orange' ? 'rgba(238,150,26,0.30)'
    : $accent === 'blue'   ? 'rgba(30,84,158,0.22)'
    : $accent === 'green'  ? 'rgba(34,197,94,0.25)'
    :                        'rgba(139,92,246,0.25)'
  };
  border-radius: 18px;
  padding: 1.4rem 1.8rem;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  animation: ${({ $accent }) =>
    $accent === 'orange' || $accent === 'green' ? pulseOrange : pulseBlue
  } 2.8s ease-in-out infinite;

  &:hover { transform: translateY(-4px); }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 5px; height: 100%;
    background: ${({ $accent }) =>
      $accent === 'orange' ? 'linear-gradient(180deg, #EE961A, rgba(238,150,26,0.15))'
      : $accent === 'blue'   ? 'linear-gradient(180deg, #1E549E, rgba(30,84,158,0.15))'
      : $accent === 'green'  ? 'linear-gradient(180deg, #22c55e, rgba(34,197,94,0.15))'
      :                        'linear-gradient(180deg, #8b5cf6, rgba(139,92,246,0.15))'
    };
    border-radius: 0 2px 2px 0;
    animation: ${borderGlow} 2.8s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    top: -80px; right: -80px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: ${({ $accent }) =>
      $accent === 'orange' ? 'radial-gradient(circle, rgba(238,150,26,0.08) 0%, transparent 70%)'
      : $accent === 'blue'   ? 'radial-gradient(circle, rgba(30,84,158,0.08) 0%, transparent 70%)'
      : $accent === 'green'  ? 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)'
      :                        'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)'
    };
    pointer-events: none;
  }
`

const MvvIcon = styled.div<{ $accent: 'orange' | 'blue' | 'green' | 'purple' }>`
  width: 44px;
  height: 44px;
  border-radius: 13px;
  background: ${({ $accent }) =>
    $accent === 'orange' ? 'rgba(238,150,26,0.12)'
    : $accent === 'blue'   ? 'rgba(30,84,158,0.10)'
    : $accent === 'green'  ? 'rgba(34,197,94,0.10)'
    :                        'rgba(139,92,246,0.10)'};
  border: 1.5px solid ${({ $accent }) =>
    $accent === 'orange' ? 'rgba(238,150,26,0.35)'
    : $accent === 'blue'   ? 'rgba(30,84,158,0.28)'
    : $accent === 'green'  ? 'rgba(34,197,94,0.30)'
    :                        'rgba(139,92,246,0.30)'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: ${({ $accent }) =>
    $accent === 'orange' ? '#EE961A'
    : $accent === 'blue'   ? '#1E549E'
    : $accent === 'green'  ? '#22c55e'
    :                        '#8b5cf6'};
  animation: ${iconFloat} 3s ease-in-out infinite;
`

const MvvTitle = styled.h3`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #0E1829;
  margin-bottom: 0.4rem;
`

const MvvText = styled.p`
  font-size: 0.82rem;
  color: #4A5568;
  line-height: 1.7;
`

const DotsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1.2rem;
  justify-content: center;
`

const Dot = styled.button<{ $active: boolean }>`
  width: ${({ $active }) => $active ? '20px' : '7px'};
  height: 7px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  padding: 0;
  background: ${({ $active }) => $active ? '#EE961A' : 'rgba(255,255,255,0.2)'};
  transition: all 0.35s ease;
`

// ─── Dados ────────────────────────────────────────────────────
const cards = [
  {
    accent: 'orange' as const,
    icon: <Target size={20} strokeWidth={1.5} />,
    title: 'Nossa Missão',
    text: 'Oferecer soluções logísticas eficientes e seguras, conectando empresas e clientes com agilidade e qualidade.',
  },
  {
    accent: 'blue' as const,
    icon: <Eye size={20} strokeWidth={1.5} />,
    title: 'Nossa Visão',
    text: 'Ser referência em logística para e-commerce no Brasil, reconhecida pela excelência operacional e pela confiança que construímos a cada entrega.',
  },
  {
    accent: 'green' as const,
    icon: <Heart size={20} strokeWidth={1.5} />,
    title: 'Nossos Valores',
    text: 'Compromisso, transparência e respeito guiam cada decisão. Valorizamos nossos parceiros e clientes com ética em cada operação.',
  },
  {
    accent: 'purple' as const,
    icon: <TrendingUp size={20} strokeWidth={1.5} />,
    title: 'Nossa Cultura',
    text: 'Crescimento contínuo, inovação e colaboração formam a base de uma equipe que entrega resultados todos os dias.',
  },
]

const TOTAL = cards.length // 4

// Track renderizado: 4 cards + clone dos 2 primeiros no final.
// Sequência de pares visíveis por trackIndex:
//   0 → card0 + card1
//   1 → card1 + card2
//   2 → card2 + card3
//   3 → card3 + clone_card0   ← loop perfeito sem corte
// Depois do índice 3, reseta instantaneamente para 0.
const renderCards = [...cards, cards[0], cards[1]]

// ─── Componente ───────────────────────────────────────────────
export default function About() {
  const { ref: headerRef, visible: headerVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })
  const { ref: mainRef,   visible: mainVisible   } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  const [trackIndex, setTrackIndex] = useState(0)   // posição no track (0..3)
  const [current,    setCurrent]    = useState(0)   // índice lógico dos dots (0..3)
  const [transition, setTransition] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // translateY é puramente matemático: trackIndex * STEP.
  // Sem medição de DOM, sem useEffect de altura, sem chance de erro.
  // No mobile o CSS usa STEP_MOBILE automaticamente via @media.

  const advance = useCallback(() => {
    setTrackIndex(prev => {
      const next = prev + 1

      if (next === TOTAL) {
        // Avança para trackIndex=3 (mostra card3 + clone_card0) com animação
        setTransition(true)
        setCurrent(0) // dot já muda para 0
        // Após a transição (600ms), reseta para 0 sem animação
        setTimeout(() => {
          setTransition(false)
          setTrackIndex(0)
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setTransition(true))
          })
        }, 620)
        return next // vai para 3
      }

      setTransition(true)
      setCurrent(next)
      return next
    })
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(advance, 3400)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [advance])

  function goTo(i: number) {
    if (timerRef.current) clearInterval(timerRef.current)
    setTransition(true)
    setTrackIndex(i)
    setCurrent(i)
    timerRef.current = setInterval(advance, 3400)
  }

  return (
    <Section id="about">
      <Inner>

        <SectionHeader ref={headerRef} $visible={headerVisible}>
          <Tag>A Empresa</Tag>
          <Heading>
            Quem move o <span>e-commerce</span><br />
            brasileiro com você
          </Heading>
        </SectionHeader>

        <MainGrid ref={mainRef}>

          <TextCol $visible={mainVisible}>
            <BodyText>
              A ACF Logística e Transporte é uma empresa especializada em soluções logísticas
              para o e-commerce brasileiro, atuando como <strong>parceira estratégica de grandes
              marcas e marketplaces</strong>. Entregamos muito mais do que mercadorias — entregamos
              confiança, agilidade e resultados concretos em cada operação.
            </BodyText>
            <AccentLine $visible={mainVisible} />
            <BodyText>
              Com uma estrutura moderna e altamente organizada, utilizamos <strong>roteirização
              inteligente, gestão eficiente de frota</strong> e monitoramento contínuo das entregas.
              Isso nos permite oferecer um serviço ágil, confiável e escalável, capaz de atender
              diferentes volumes de demanda com consistência e excelência.
            </BodyText>
            <BodyText>
              Nossa operação é orientada por performance. Otimizamos processos continuamente,
              reduzimos custos logísticos e mantemos <strong>altos índices de entregas concluídas
              dentro do prazo</strong> — contribuindo diretamente para a satisfação dos clientes
              finais e o crescimento dos nossos parceiros.
            </BodyText>
            <BodyText>
              Acreditamos em relações sólidas e duradouras. Por isso, operamos com um modelo
              colaborativo que <strong>valoriza motoristas autônomos</strong>, oferecendo suporte
              completo e oportunidades reais de crescimento conjunto.
            </BodyText>
          </TextCol>

          {/* ── Carrossel vertical ── */}
          <CarouselCol $visible={mainVisible}>
            <CarouselViewport>
              <CarouselTrack $trackIndex={trackIndex} $transition={transition}>
                {renderCards.map((card, i) => (
                  <MvvCard key={i} $accent={card.accent}>
                    <MvvIcon $accent={card.accent}>{card.icon}</MvvIcon>
                    <MvvTitle>{card.title}</MvvTitle>
                    <MvvText>{card.text}</MvvText>
                  </MvvCard>
                ))}
              </CarouselTrack>
            </CarouselViewport>

            <DotsRow>
              {cards.map((_, i) => (
                <Dot key={i} $active={i === current} onClick={() => goTo(i)} />
              ))}
            </DotsRow>
          </CarouselCol>

        </MainGrid>
      </Inner>
    </Section>
  )
}