'use client'
import styled, { keyframes } from 'styled-components'
import Image from 'next/image'

const pulse = keyframes`
  0%   { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
  70%  { box-shadow: 0 0 0 12px rgba(37,211,102,0); }
  100% { box-shadow: 0 0 0 0 rgba(37,211,102,0); }
`

const Btn = styled.a`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 1.5rem;
    left: 1.5rem;
    z-index: 9999;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #25D366;
    box-shadow: 0 4px 16px rgba(37,211,102,0.4);
    animation: ${pulse} 2.2s ease-in-out infinite;
    transition: transform 0.2s ease;
    &:hover { transform: scale(1.08); }
  }
`

export default function WhatsAppFloat() {
  return (
    <Btn
      href="https://wa.me/5511978166315"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width={26}
        height={26}
        unoptimized
      />
    </Btn>
  )
}
