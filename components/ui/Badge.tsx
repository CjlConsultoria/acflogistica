'use client'
import styled, { css } from 'styled-components'

interface BadgeProps {
  $variant?: 'orange' | 'blue' | 'outline'
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 0.3rem 0.9rem;
  border-radius: 100px;

  ${({ $variant = 'outline' }) =>
    $variant === 'orange'
      ? css`background: #EE961A; color: #fff;`
      : $variant === 'blue'
      ? css`background: #1E549E; color: #fff;`
      : css`background: transparent; color: #EE961A; border: 1px solid rgba(238,150,26,0.5);`}
`
