'use client'
import styled from 'styled-components'
import { Badge } from './Badge'

const Wrapper = styled.div<{ $center?: boolean }>`
  text-align: ${({ $center }) => ($center ? 'center' : 'left')};
  margin-bottom: 3.5rem;
`

const Title = styled.h2`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  letter-spacing: 1px;
  line-height: 1.05;
  color: #F4F6FA;
  margin-top: 0.8rem;
  span { color: #EE961A; }
`

const Sub = styled.p`
  font-size: 1rem;
  color: #6B7A99;
  margin-top: 1rem;
  max-width: 560px;
  line-height: 1.75;
`

interface Props {
  label: React.ReactNode  // ← era string
  title: React.ReactNode
  subtitle?: string
  center?: boolean
}

export default function SectionTitle({ label, title, subtitle, center }: Props) {
  return (
    <Wrapper $center={center}>
      <Badge $variant="outline">{label}</Badge>
      <Title>{title}</Title>
      {subtitle && (
        <Sub style={center ? { margin: '1rem auto 0' } : {}}>{subtitle}</Sub>
      )}
    </Wrapper>
  )
}
