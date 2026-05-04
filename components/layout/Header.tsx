'use client'
import styled, { css, keyframes } from 'styled-components'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Phone, X, Menu } from 'lucide-react'

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
`

const Nav = styled.nav<{ $scrolled: boolean }>`
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 5rem;
  transition: all 0.35s ease;

  ${({ $scrolled }) => $scrolled ? css`
    background: rgba(255,255,255,0.97);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
  ` : css`
    background: linear-gradient(180deg, rgba(6,13,30,0.85) 0%, transparent 100%);
  `}

  @media (max-width: 1024px) { padding: 0.6rem 2rem; }
  @media (max-width: 768px)  { padding: 0.7rem 1.5rem; }
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  transition: opacity 0.2s;
  position: relative;
  z-index: 1002;
  &:hover { opacity: 0.85; }
`

const DesktopLinks = styled.ul`
  display: flex;
  gap: 0.3rem;
  list-style: none;
  align-items: center;

  @media (max-width: 768px) { display: none; }
`

const MobileOverlay = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(6, 13, 30, 0.55);
    backdrop-filter: blur(4px);
    z-index: 1001;
    opacity: ${({ $open }) => $open ? 1 : 0};
    pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
    transition: opacity 0.3s ease;
  }
`

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1002;
    background: #ffffff;
    border-radius: 0 0 24px 24px;
    box-shadow: 0 8px 40px rgba(0, 0, 0, 0.18);
    padding: 0 1.5rem 2rem;
    pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
    transform: ${({ $open }) => $open ? 'translateY(0)' : 'translateY(-100%)'};
    transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
  }
`

const MobileMenuTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  margin-bottom: 1rem;
`

const MobileNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`

const MobileNavItem = styled.li<{ $delay: number }>`
  animation: ${slideDown} 0.35s ${({ $delay }) => $delay}s cubic-bezier(0.22, 1, 0.36, 1) both;
`

const MobileNavLink = styled.a`
  display: block;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #1a202c;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  transition: all 0.2s;
  &:hover {
    color: #EE961A;
    background: rgba(238, 150, 26, 0.07);
    padding-left: 1.4rem;
  }
`

const MobileWhatsApp = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.2rem;
  background: #EE961A;
  color: #fff;
  padding: 0.9rem 1.5rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 100px;
  transition: all 0.2s;
  &:hover { background: #f5a832; }
`

const NavLink = styled.a`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #4A5568;
  padding: 0.4rem 0.8rem;
  border-radius: 5px;
  transition: all 0.2s;
  &:hover { color: #EE961A; background: rgba(238,150,26,0.07); }
`

const WhatsAppBtn = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #EE961A;
  color: #fff;
  padding: 0.5rem 1.2rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 100px;
  border: 2px solid #EE961A;
  transition: all 0.2s;
  &:hover { background: #f5a832; border-color: #f5a832; transform: translateY(-1px); }
  @media (max-width: 768px) { display: none; }
`

const HamburgerBtn = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(238, 150, 26, 0.1);
  border: 1.5px solid rgba(238, 150, 26, 0.3);
  cursor: pointer;
  z-index: 1003;
  position: relative;
  transition: all 0.2s;
  color: #EE961A;
  &:hover { background: rgba(238, 150, 26, 0.18); }

  @media (max-width: 768px) { display: flex; }
`

const CloseBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  cursor: pointer;
  color: #4A5568;
  transition: all 0.2s;
  &:hover { background: rgba(238, 150, 26, 0.1); color: #EE961A; }
`

const navItems = [
  { href: '#about',      label: 'Sobre Nós' },
  { href: '#servicos',      label: 'Serviços' },
  { href: '#como-funciona', label: 'Como Funciona' },
  { href: '#numeros',       label: 'Números' },
  { href: '#parceiros',     label: 'Seja Parceiro' },
  { href: '#contato',       label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <Nav $scrolled={scrolled}>
        <LogoLink href="/">
          <Image
            src="/logo.png"
            alt="ACF Logística e Transportes"
            width={100} height={42}
            style={{ objectFit: 'contain', height: 'auto' }}
            priority
          />
        </LogoLink>

        <DesktopLinks>
          {navItems.map(item => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </DesktopLinks>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <WhatsAppBtn href="https://wa.me/5511978166315" target="_blank">
            <Phone size={14} strokeWidth={2} /> WhatsApp
          </WhatsAppBtn>
          <HamburgerBtn onClick={() => setOpen(true)} aria-label="Abrir menu">
            <Menu size={20} strokeWidth={2} />
          </HamburgerBtn>
        </div>
      </Nav>

      <MobileOverlay $open={open} onClick={close} />

      <MobileMenu $open={open}>
        <MobileMenuTop>
          <Image
            src="/logo.png"
            alt="ACF Logística e Transportes"
            width={90} height={38}
            style={{ objectFit: 'contain', height: 'auto' }}
          />
          <CloseBtn onClick={close} aria-label="Fechar menu">
            <X size={18} strokeWidth={2} />
          </CloseBtn>
        </MobileMenuTop>

        <MobileNavList>
          {navItems.map((item, i) => (
            <MobileNavItem key={item.href} $delay={i * 0.055}>
              <MobileNavLink href={item.href} onClick={close}>
                {item.label}
              </MobileNavLink>
            </MobileNavItem>
          ))}
        </MobileNavList>

        <MobileWhatsApp href="https://wa.me/5511978166315" target="_blank" onClick={close}>
          <Phone size={16} strokeWidth={2} /> Falar no WhatsApp
        </MobileWhatsApp>
      </MobileMenu>
    </>
  )
}
