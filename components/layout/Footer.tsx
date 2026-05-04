'use client'
import styled, { keyframes, css } from 'styled-components'
import Image from 'next/image'
import { MessageCircle, Mail, MapPin } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Foot = styled.footer`
  background: #030810;
  border-top: 1px solid rgba(30,84,158,0.2);
  padding: 5rem 5rem 2.5rem;
  @media (max-width: 1024px) { padding: 4rem 2rem 2rem; }
  @media (max-width: 768px)  { padding: 3rem 1.5rem 2rem; }
`

const Grid = styled.div`
  max-width: 1280px; margin: 0 auto;
  display: grid; grid-template-columns: 2.5fr 1fr 1fr 1.5fr;
  gap: 4rem; margin-bottom: 4rem;
  @media (max-width: 1024px) { grid-template-columns: 1fr 1fr; gap: 2.5rem; margin-bottom: 2.5rem; }
  @media (max-width: 600px)  { grid-template-columns: 1fr; gap: 2rem; margin-bottom: 2rem; }
`

const Col = styled.div<{ $visible?: boolean; $delay?: number }>`
  opacity: 0;
  ${({ $visible, $delay = 0 }) => $visible && css`
    animation: ${fadeUp} 0.65s ${$delay}s cubic-bezier(0.22,1,0.36,1) both;
  `}
`

const Desc = styled.p`font-size: 0.88rem; color: #6B7A99; line-height: 1.8; margin-top: 1.2rem; max-width: 280px;`

const Address = styled.div`
  display: flex; align-items: flex-start; gap: 0.5rem;
  font-size: 0.8rem; color: #2E3A55; margin-top: 1rem; line-height: 1.7;
  svg { margin-top: 2px; flex-shrink: 0; color: #2E3A55; }
`

const ColTitle = styled.h4`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.78rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;
  color: #F4F6FA; margin-bottom: 1.5rem; padding-bottom: 0.7rem;
  border-bottom: 1px solid rgba(30,84,158,0.2);
`

const ColList = styled.ul`list-style: none; display: flex; flex-direction: column; gap: 0.8rem;`

const ColLink = styled.a`
  font-size: 0.87rem; color: #6B7A99; transition: color 0.2s;
  display: flex; align-items: center; gap: 0.5rem;
  &:hover { color: #EE961A; }
`

const ContactItem = styled.div`
  margin-bottom: 1.2rem;
  span:first-child { display: block; font-size: 0.68rem; letter-spacing: 2px; text-transform: uppercase; color: #2E3A55; margin-bottom: 0.2rem; }
  a { font-size: 0.9rem; color: #B0BAD0; transition: color 0.2s; &:hover { color: #EE961A; } }
`

const Divider = styled.div`
  max-width: 1280px; margin: 0 auto;
  border-top: 1px solid rgba(255,255,255,0.04); padding-top: 2rem;
  display: flex; justify-content: space-between; align-items: center; gap: 1rem;
  @media (max-width: 600px) { flex-direction: column; text-align: center; }
`

const Copy = styled.p`font-size: 0.78rem; color: #2E3A55;`

const Social = styled.div`
  display: flex; gap: 0.8rem;
  a {
    width: 36px; height: 36px;
    border: 1px solid rgba(30,84,158,0.3); border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    color: #6B7A99; transition: all 0.2s;
    &:hover { border-color: #EE961A; color: #EE961A; background: rgba(238,150,26,0.06); }
  }
`

const IgIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)

export default function Footer() {
  const { ref, visible } = useScrollReveal({ threshold: 0.1 })

  return (
    <Foot id="contato">
      <Grid ref={ref as React.RefObject<HTMLDivElement>}>
        <Col $visible={visible} $delay={0}>
          <Image src="/logo.png" alt="ACF Logística e Transportes" width={160} height={68} style={{ objectFit: 'contain', height: 'auto' }} />
          <Desc>Soluções ágeis e seguras em logística para empresas e marketplaces. Coleta, transporte e distribuição com eficiência.</Desc>
          <Address>
            <MapPin size={13} strokeWidth={1.5} />
            <span>Av. Sete de Setembro, 1465<br />Vila Galvão · Guarulhos · SP · 07064-002</span>
          </Address>
        </Col>
        <Col $visible={visible} $delay={0.1}>
          <ColTitle>Serviços</ColTitle>
          <ColList>
            <li><ColLink href="#servicos">Transporte Rodoviário</ColLink></li>
            <li><ColLink href="#servicos">Coleta e Entrega</ColLink></li>
            <li><ColLink href="#servicos">Distribuição</ColLink></li>
            <li><ColLink href="#servicos">Last Mile</ColLink></li>
            <li><ColLink href="#servicos">Carga Fracionada</ColLink></li>
          </ColList>
        </Col>
        <Col $visible={visible} $delay={0.2}>
          <ColTitle>Empresa</ColTitle>
          <ColList>
            <li><ColLink href="#">Sobre Nós</ColLink></li>
            <li><ColLink href="#">Trabalhe Conosco</ColLink></li>
            <li><ColLink href="#">Seja um Parceiro</ColLink></li>
            <li><ColLink href="#">Blog</ColLink></li>
          </ColList>
        </Col>
        <Col $visible={visible} $delay={0.3}>
          <ColTitle>Contato</ColTitle>
          <ContactItem><span>WhatsApp</span><a href="https://wa.me/5511978166315" target="_blank">(11) 97816-6315</a></ContactItem>
          <ContactItem><span>E-mail</span><a href="mailto:acfgestao@gmail.com">acfgestao@gmail.com</a></ContactItem>
          <ContactItem><span>Horário</span><a href="#">Seg–Sex: 7h às 19h</a></ContactItem>
        </Col>
      </Grid>
      <Divider>
        <Copy>© {new Date().getFullYear()} ACF Logística e Transportes. Todos os direitos reservados.</Copy>
        <Social>
          <a href="https://instagram.com/acflogisticaetransporte" target="_blank" aria-label="Instagram"><IgIcon /></a>
          <a href="https://wa.me/5511978166315" target="_blank" aria-label="WhatsApp"><MessageCircle size={16} strokeWidth={1.5} /></a>
          <a href="mailto:acfgestao@gmail.com" aria-label="Email"><Mail size={16} strokeWidth={1.5} /></a>
        </Social>
      </Divider>
    </Foot>
  )
}
