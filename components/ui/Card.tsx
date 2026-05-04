'use client'
import styled, { css } from 'styled-components'

interface CardProps {
  $variant?: 'default' | 'highlight' | 'glass'
  $hoverable?: boolean
}

export const Card = styled.div<CardProps>`
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.28s ease;

  ${({ $variant = 'default' }) =>
    $variant === 'highlight'
      ? css`background: #EE961A; border: 1px solid #EE961A; color: #fff;`
      : $variant === 'glass'
      ? css`background: rgba(30,84,158,0.15); border: 1px solid rgba(30,84,158,0.3); backdrop-filter: blur(16px);`
      : css`background: #0D1B3E; border: 1px solid rgba(30,84,158,0.2);`}

  ${({ $hoverable }) => $hoverable && css`
    cursor: pointer;
    &:hover {
      transform: translateY(-6px);
      border-color: #1E549E;
      box-shadow: 0 12px 40px rgba(30,84,158,0.25);
    }
  `}
`

export const CardIcon = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background: rgba(238,150,26,0.12);
  border: 1px solid rgba(238,150,26,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
`

export const CardTitle = styled.h3`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.35rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #F4F6FA;
  margin-bottom: 0.6rem;
`

export const CardText = styled.p`
  font-size: 0.88rem;
  color: #6B7A99;
  line-height: 1.75;
`
