'use client'
import styled, { css } from 'styled-components'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  $variant?: Variant
  $size?: Size
  $full?: boolean
}

export const Button = styled.a<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.28s ease;
  white-space: nowrap;
  border-radius: 100px;
  text-decoration: none;

  ${({ $full }) => $full && css`width: 100%;`}

  ${({ $size = 'md' }) =>
    $size === 'sm'
      ? css`padding: 0.5rem 1.2rem; font-size: 0.75rem;`
      : $size === 'lg'
      ? css`padding: 1rem 2.5rem; font-size: 1rem;`
      : css`padding: 0.75rem 1.8rem; font-size: 0.85rem;`}

  ${({ $variant = 'primary' }) =>
    $variant === 'secondary'
      ? css`
          background: #1E549E; color: #fff; border-color: #1E549E;
          &:hover { background: #207AB9; border-color: #207AB9; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(30,84,158,0.4); }
        `
      : $variant === 'outline'
      ? css`
          background: transparent; color: #EE961A; border-color: #EE961A;
          &:hover { background: #EE961A; color: #fff; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(238,150,26,0.3); }
        `
      : $variant === 'ghost'
      ? css`
          background: transparent; color: #B0BAD0; border-color: transparent;
          &:hover { color: #EE961A; background: rgba(238,150,26,0.08); }
        `
      : css`
          background: #EE961A; color: #fff; border-color: #EE961A;
          &:hover { background: #f5a832; border-color: #f5a832; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(238,150,26,0.4); }
          &:active { transform: translateY(0); }
        `}
`
