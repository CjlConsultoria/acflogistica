'use client'
import styled, { keyframes, css } from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { ChevronDown, Truck, User, Phone, Car, CheckCircle, Send, Loader, FileText, Briefcase } from 'lucide-react'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(238,150,26,0.4); }
  50%       { box-shadow: 0 0 0 12px rgba(238,150,26,0); }
`

const Section = styled.section`
  padding: 4rem 5rem;
  background: #ffffff;
  position: relative;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 0%, rgba(30,84,158,0.06) 0%, transparent 65%);
    pointer-events: none;
  }
  @media (max-width: 1024px) { padding: 3rem 2rem; }
  @media (max-width: 768px)  { padding: 3rem 1rem; }
`

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`

const Banner = styled.div<{ $open: boolean }>`
  background: #ffffff;
  border: 1px solid rgba(30,84,158,0.3);
  border-radius: ${({ $open }) => $open ? '16px 16px 0 0' : '16px'};
  padding: 2rem 2.5rem;
  position: relative;
  overflow: hidden;
  transition: border-radius 0.3s ease;
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
  box-sizing: border-box;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    top: -40%; right: -10%;
    width: 300px; height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(238,150,26,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  @media (max-width: 768px) { padding: 1.5rem 1.25rem; }
`

const BannerTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.2rem;
  }
`

const BannerLeft = styled.div`
  flex: 1;
  min-width: 0;
`

const BannerTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #1E549E;
  border: 1px solid rgba(30,84,158,0.4);
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  margin-bottom: 0.8rem;
`

const BannerTitle = styled.h2`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: clamp(1.2rem, 3vw, 2.1rem);
  font-weight: 800;
  line-height: 1.1;
  color: #111827;
  margin-bottom: 0.4rem;
  span { color: #EE961A; }
`

const BannerSub = styled.p`
  font-size: 0.82rem;
  color: #6B7A99;
  line-height: 1.6;
  margin-top: 0.6rem;
`

const BannerRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 160px;
  flex-shrink: 0;
  @media (max-width: 600px) {
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 0;
    width: 100%;
  }
`

const ValueCard = styled.div<{ $highlight?: boolean }>`
  background: ${({ $highlight }) => $highlight ? 'rgba(238,150,26,0.09)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ $highlight }) => $highlight ? 'rgba(238,150,26,0.35)' : 'rgba(0,0,0,0.08)'};
  border-radius: 999px;
  padding: 0.7rem 1rem;
  p { font-size: 0.65rem; color: #9CA3AF; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 0.15rem; }
  strong { font-family: var(--font-cabourg-bold), sans-serif; font-size: 1.25rem; font-weight: 800; color: ${({ $highlight }) => $highlight ? '#EE961A' : '#111827'}; }
  span { font-size: 0.7rem; color: #9CA3AF; margin-left: 0.3rem; }
  @media (max-width: 600px) { flex: 1; min-width: 140px; }
`

const ExtraRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const ExtraChip = styled.div`
  background: rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  font-size: 0.7rem;
  color: #6B7A99;
  strong { color: #EE961A; font-weight: 700; }
`

const BannerDivider = styled.div`
  height: 1px;
  background: rgba(0,0,0,0.07);
  margin: 1.4rem 0;
`

const PerksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
`

const Perk = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.78rem;
  color: #4B5563;
  svg { color: #EE961A; flex-shrink: 0; }
`

const BannerFooter = styled.div`
  margin-top: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
  @media (max-width: 520px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const PhoneDisplay = styled.a`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #EE961A;
  letter-spacing: 1px;
  transition: color 0.2s;
  svg { color: #EE961A; }
  &:hover { color: #f5a832; }
  @media (max-width: 520px) { justify-content: center; }
`

const OpenBtn = styled.button<{ $open: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: #EE961A;
  color: #fff;
  border: none;
  padding: 0.75rem 1.6rem;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.25s ease;
  animation: ${pulse} 2.5s ease-in-out infinite;
  white-space: nowrap;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  &:hover { background: #f5a832; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(238,150,26,0.4); animation: none; }
  svg { transition: transform 0.35s ease; transform: ${({ $open }) => $open ? 'rotate(180deg)' : 'rotate(0deg)'}; flex-shrink: 0; }

  @media (min-width: 521px) {
    width: auto;
  }
`

const FormWrapper = styled.div<{ $open: boolean }>`
  opacity: ${({ $open }) => $open ? '1' : '0'};
  transform: ${({ $open }) => $open ? 'translateY(0)' : 'translateY(-12px)'};
  pointer-events: ${({ $open }) => $open ? 'all' : 'none'};
  max-height: ${({ $open }) => $open ? 'none' : '0'};
  overflow: ${({ $open }) => $open ? 'visible' : 'hidden'};
  transition: opacity 0.4s ease, transform 0.4s ease, max-height 0s ${({ $open }) => $open ? '0s' : '0.4s'};
  width: 100%;
  box-sizing: border-box;
`

const FormInner = styled.div`
  background: #ffffff;
  border: 1px solid rgba(30,84,158,0.25);
  border-top: none;
  border-radius: 0 0 16px 16px;
  padding: 2rem 2.5rem;
  overflow: visible;
  box-shadow: 0 8px 24px rgba(0,0,0,0.06);
  box-sizing: border-box;
  width: 100%;
  @media (max-width: 768px) { padding: 1.5rem 1.25rem; }
`

const FormTitle = styled.h3`
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1E549E;
  margin-bottom: 0.25rem;
`

const FormSub = styled.p`
  font-size: 0.82rem;
  color: #9CA3AF;
  margin-bottom: 1.5rem;
`

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  overflow: visible;
  width: 100%;
  box-sizing: border-box;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`

const FieldLabel = styled.label`
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1E549E;
`

const inputBase = css`
  background: rgba(30,84,158,0.04);
  border: 1.5px solid rgba(30,84,158,0.3);
  border-radius: 999px;
  padding: 0.7rem 1.1rem;
  font-family: var(--font-inter), sans-serif;
  font-size: 0.86rem;
  color: #111827;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  width: 100%;
  box-sizing: border-box;
  &::placeholder { color: rgba(0,0,0,0.25); }
  &:focus { border-color: #1E549E; box-shadow: 0 0 0 3px rgba(30,84,158,0.12); }
`

const Input = styled.input`${inputBase}`

const SelectTrigger = styled.button<{ $isOpen: boolean }>`
  ${inputBase}
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  border-color: ${({ $isOpen }) => $isOpen ? '#1E549E' : 'rgba(30,84,158,0.3)'};
  box-shadow: ${({ $isOpen }) => $isOpen ? '0 0 0 3px rgba(30,84,158,0.12)' : 'none'};
  svg {
    transition: transform 0.3s ease;
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    color: #1E549E;
    flex-shrink: 0;
  }
`

const SelectPlaceholder = styled.span<{ $hasValue: boolean }>`
  color: ${({ $hasValue }) => $hasValue ? '#111827' : 'rgba(0,0,0,0.25)'};
`

const DropdownList = styled.ul<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: #ffffff;
  border: 1.5px solid rgba(30,84,158,0.3);
  border-radius: 16px;
  z-index: 9999;
  list-style: none;
  padding: 0.4rem;
  max-height: calc(4 * (2.2rem + 0.15rem));
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(30,84,158,0.4) transparent;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-8px)'};
  pointer-events: ${({ $isOpen }) => $isOpen ? 'all' : 'none'};
  transition: opacity 0.2s ease, transform 0.2s ease;
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
`

const DropdownItem = styled.li<{ $active: boolean }>`
  padding: 0.65rem 1rem;
  border-radius: 999px;
  font-family: var(--font-inter), sans-serif;
  font-size: 0.86rem;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  background: ${({ $active }) => $active ? '#1E549E' : 'transparent'};
  color: ${({ $active }) => $active ? '#fff' : '#111827'};
  font-weight: ${({ $active }) => $active ? '700' : '400'};
  &:hover {
    background: ${({ $active }) => $active ? '#2a6cc4' : 'rgba(30,84,158,0.10)'};
    color: ${({ $active }) => $active ? '#fff' : '#1E549E'};
  }
`

const veiculoOptions = ['Van', 'Fiorino', 'Kangoo', 'Doblo', 'Carro de passeio (2011+)', 'Outro utilitário']
const cnhOptions = ['CNH B', 'CNH C', 'CNH D', 'CNH E', 'CNH AB', 'CNH AC', 'CNH AD', 'CNH AE']
const experienciaOptions = ['Menos de 6 meses', '6 meses a 1 ano', '1 a 2 anos', '2 a 5 anos', 'Mais de 5 anos']
const disponibilidadeOptions = ['Manhã (06h–12h)', 'Tarde (12h–18h)', 'Noite (18h–00h)', 'Integral (06h–18h)']

function CustomSelect({ value, onChange, options, placeholder }: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', boxSizing: 'border-box' }}>
      <SelectTrigger type="button" $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <SelectPlaceholder $hasValue={!!value}>{value || (placeholder ?? 'Selecione...')}</SelectPlaceholder>
        <ChevronDown size={14} strokeWidth={2.5} />
      </SelectTrigger>
      <DropdownList $isOpen={isOpen}>
        {options.map((opt) => (
          <DropdownItem
            key={opt}
            $active={value === opt}
            onClick={() => { onChange(opt); setIsOpen(false) }}
          >
            {opt}
          </DropdownItem>
        ))}
      </DropdownList>
    </div>
  )
}

const TypeToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  width: 100%;
  box-sizing: border-box;
`

const TypeBtn = styled.button<{ $active: boolean }>`
  padding: 0.7rem;
  border-radius: 999px;
  border: 1.5px solid ${({ $active }) => $active ? '#1E549E' : 'rgba(30,84,158,0.2)'};
  background: ${({ $active }) => $active ? 'rgba(30,84,158,0.12)' : 'rgba(30,84,158,0.03)'};
  color: ${({ $active }) => $active ? '#1E549E' : '#9CA3AF'};
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 0;
  &:hover { border-color: #1E549E; color: #1E549E; background: rgba(30,84,158,0.08); }
`

const EarToggle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
  width: 100%;
  box-sizing: border-box;
`

const EarBtn = styled.button<{ $active: boolean; $variant?: 'yes' | 'no' }>`
  padding: 0.7rem;
  border-radius: 999px;
  border: 1.5px solid ${({ $active, $variant }) =>
    $active
      ? $variant === 'no' ? 'rgba(239,68,68,0.6)' : '#1E549E'
      : 'rgba(30,84,158,0.2)'};
  background: ${({ $active, $variant }) =>
    $active
      ? $variant === 'no' ? 'rgba(239,68,68,0.08)' : 'rgba(30,84,158,0.12)'
      : 'rgba(30,84,158,0.03)'};
  color: ${({ $active, $variant }) =>
    $active
      ? $variant === 'no' ? '#dc2626' : '#1E549E'
      : '#9CA3AF'};
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 0;
  &:hover {
    border-color: ${({ $variant }) => $variant === 'no' ? 'rgba(239,68,68,0.6)' : '#1E549E'};
    color: ${({ $variant }) => $variant === 'no' ? '#dc2626' : '#1E549E'};
    background: ${({ $variant }) => $variant === 'no' ? 'rgba(239,68,68,0.08)' : 'rgba(30,84,158,0.08)'};
  }
`

const SubmitBtn = styled.button<{ $loading?: boolean }>`
  width: 100%;
  margin-top: 0.3rem;
  padding: 0.9rem;
  background: ${({ $loading }) => $loading ? '#d4820f' : '#EE961A'};
  color: #fff;
  border: none;
  border-radius: 999px;
  font-family: var(--font-cabourg-bold), sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: ${({ $loading }) => $loading ? 'not-allowed' : 'pointer'};
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  box-sizing: border-box;
  &:hover {
    background: ${({ $loading }) => $loading ? '#d4820f' : '#f5a832'};
    transform: ${({ $loading }) => $loading ? 'none' : 'translateY(-2px)'};
    box-shadow: ${({ $loading }) => $loading ? 'none' : '0 8px 24px rgba(238,150,26,0.35)'};
  }
`

const SuccessBox = styled.div`
  background: rgba(34,197,94,0.08);
  border: 1px solid rgba(34,197,94,0.3);
  border-radius: 999px;
  padding: 1rem 1.3rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: #16a34a;
  font-size: 0.86rem;
  animation: ${fadeUp} 0.4s ease both;
  svg { flex-shrink: 0; }
`

const ErrorBox = styled(SuccessBox)`
  background: rgba(239,68,68,0.08);
  border-color: rgba(239,68,68,0.3);
  color: #dc2626;
`

const perks = [
  'Sem fila de espera',
  'Rota inteligente via App',
  'Atuação em Guarulhos, Zona Norte e Leste',
  'Carregamento rápido (média 15 min)',
  '4 ciclos de horários de carregamento',
  'Pagamento semanal garantido',
]

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0)  return ''
  if (digits.length <= 2)   return `(${digits}`
  if (digits.length <= 7)   return `(${digits.slice(0,2)}) ${digits.slice(2)}`
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
}

function sanitizeName(raw: string): string {
  return raw.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, '').slice(0, 80)
}

function sanitizeCity(raw: string): string {
  return raw.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, '').slice(0, 60)
}

export default function Partners() {
  const [open, setOpen]     = useState(false)
  const [tipo, setTipo]     = useState<'motorista' | 'agregado'>('motorista')

  // Campos compartilhados
  const [nome, setNome]                 = useState('')
  const [telefone, setTelefone]         = useState('')
  const [cidade, setCidade]             = useState('Guarulhos')
  const [ear, setEar]                   = useState<'sim' | 'nao' | ''>('sim')
  const [disponibilidade, setDisponibilidade] = useState('Integral (06h–18h)')

  // Campos exclusivos — Motorista Próprio
  const [veiculo, setVeiculo]           = useState('')

  // Campos exclusivos — Agregado
  const [cnh, setCnh]                   = useState('')
  const [experiencia, setExperiencia]   = useState('1 a 2 anos')

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  // Limpa campos exclusivos ao trocar de tipo (mantém os campos compartilhados)
  const handleTipo = (novoTipo: 'motorista' | 'agregado') => {
    setTipo(novoTipo)
    setVeiculo('')
    setCnh('')
    setExperiencia('1 a 2 anos')
    setStatus('idle')
  }

  const handleNome = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNome(sanitizeName(e.target.value))

  const handleTelefone = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTelefone(maskPhone(e.target.value))

  const handleCidade = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCidade(sanitizeCity(e.target.value))

  const handleSubmit = async () => {
    const phoneDigits = telefone.replace(/\D/g, '')

    if (!nome.trim()) {
      setErrMsg('Informe seu nome completo.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
      return
    }
    if (phoneDigits.length < 10) {
      setErrMsg('Informe um WhatsApp válido com DDD.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
      return
    }

    if (tipo === 'motorista') {
      if (!veiculo) {
        setErrMsg('Selecione o tipo de veículo.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3500)
        return
      }
    } else {
      if (!cnh) {
        setErrMsg('Selecione a categoria da sua CNH.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3500)
        return
      }
      if (!experiencia) {
        setErrMsg('Selecione seu tempo de experiência.')
        setStatus('error')
        setTimeout(() => setStatus('idle'), 3500)
        return
      }
    }

    if (!ear) {
      setErrMsg('Informe se possui CNH com EAR.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
      return
    }
    if (!disponibilidade) {
      setErrMsg('Selecione sua disponibilidade de turno.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
      return
    }
    if (!cidade.trim()) {
      setErrMsg('Informe sua cidade.')
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3500)
      return
    }

    setStatus('loading')
    try {
      const templateParams =
        tipo === 'motorista'
          ? {
              tipo:           'Motorista Próprio',
              nome,
              telefone,
              veiculo,
              ear:            ear === 'sim' ? 'Sim' : 'Não',
              disponibilidade,
              cidade,
            }
          : {
              tipo:           'Agregado',
              nome,
              telefone,
              cnh,
              experiencia,
              ear:            ear === 'sim' ? 'Sim' : 'Não',
              disponibilidade,
              cidade,
            }

      await emailjs.send(
        'service_uw1vcyp',
        'template_utphqwp',
        templateParams,
        '62PKkNjKnpF_LEVcS'
      )
      setStatus('success')
      setNome('')
      setTelefone('')
      setCidade('')
      setVeiculo('')
      setEar('')
      setDisponibilidade('')
      setCnh('')
      setExperiencia('')
    } catch {
      setErrMsg('Erro ao enviar. Tente novamente ou ligue para (11) 97816-6315.')
      setStatus('error')
    }
  }

  return (
    <Section id="parceiros">
      <Inner>
        <Banner $open={open}>
          <BannerTop>
            <BannerLeft>
              <BannerTag><Truck size={11} strokeWidth={2} />Vagas Abertas — Guarulhos e Região</BannerTag>
              <BannerTitle>
                QUER FATURAR ATÉ<br />
                <span>R$ 8.500,00</span> POR MÊS<br />
                COM SEU UTILITÁRIO?
              </BannerTitle>
              <BannerSub>Van, Fiorino, Kangoo, Doblo ou similares · Carro de passeio a partir de 2011 · CNH com EAR · PJ-MEI</BannerSub>
            </BannerLeft>
            <BannerRight>
              <ValueCard $highlight>
                <p>Seg–Sáb</p>
                <strong>R$ 420<span>/dia</span></strong>
              </ValueCard>
              <ValueCard>
                <p>Dom e Feriados</p>
                <strong>R$ 630<span>/dia</span></strong>
              </ValueCard>
              <ExtraRow>
                <ExtraChip>+ <strong>R$ 0,60</strong>/km rod.</ExtraChip>
                <ExtraChip>+ <strong>R$ 0,10</strong>/pacote</ExtraChip>
              </ExtraRow>
            </BannerRight>
          </BannerTop>
          <BannerDivider />
          <PerksGrid>
            {perks.map((p) => (
              <Perk key={p}><CheckCircle size={14} strokeWidth={2} />{p}</Perk>
            ))}
          </PerksGrid>
          <BannerFooter>
            <PhoneDisplay href="tel:+5511978166315">
              <Phone size={18} strokeWidth={1.5} />
              (11) 97816-6315
            </PhoneDisplay>
            <OpenBtn $open={open} onClick={() => setOpen(!open)}>
              {open ? 'Fechar Formulário' : 'Quero Me Cadastrar'}
              <ChevronDown size={18} strokeWidth={2.5} />
            </OpenBtn>
          </BannerFooter>
        </Banner>

        <FormWrapper $open={open}>
          <FormInner>
            <FormTitle>Preencha seus dados</FormTitle>
            <FormSub>Entraremos em contato em até 24h úteis.</FormSub>
            <Grid>

              {/* Toggle de tipo */}
              <TypeToggle>
                <TypeBtn $active={tipo === 'motorista'} onClick={() => handleTipo('motorista')} type="button">
                  <User size={15} strokeWidth={1.5} />Motorista Próprio
                </TypeBtn>
                <TypeBtn $active={tipo === 'agregado'} onClick={() => handleTipo('agregado')} type="button">
                  <Car size={15} strokeWidth={1.5} />Agregado
                </TypeBtn>
              </TypeToggle>

              {/* Nome — compartilhado */}
              <Field>
                <FieldLabel>Nome completo</FieldLabel>
                <Input
                  name="nome"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={handleNome}
                  autoComplete="name"
                />
              </Field>

              {/* WhatsApp — compartilhado */}
              <Field>
                <FieldLabel>WhatsApp</FieldLabel>
                <Input
                  name="telefone"
                  placeholder="(11) 99999-9999"
                  value={telefone}
                  onChange={handleTelefone}
                  inputMode="tel"
                  autoComplete="tel"
                />
              </Field>

              {/* Campos exclusivos por tipo */}
              {tipo === 'motorista' ? (
                /* ── MOTORISTA PRÓPRIO ── */
                <Field>
                  <FieldLabel>Tipo de veículo</FieldLabel>
                  <CustomSelect
                    value={veiculo}
                    onChange={setVeiculo}
                    options={veiculoOptions}
                  />
                </Field>
              ) : (
                /* ── AGREGADO ── */
                <>
                  <Field>
                    <FieldLabel>Categoria da CNH</FieldLabel>
                    <CustomSelect
                      value={cnh}
                      onChange={setCnh}
                      options={cnhOptions}
                      placeholder="Selecione a categoria..."
                    />
                  </Field>
                  <Field>
                    <FieldLabel>Experiência com entregas</FieldLabel>
                    <CustomSelect
                      value={experiencia}
                      onChange={setExperiencia}
                      options={experienciaOptions}
                      placeholder="Selecione o período..."
                    />
                  </Field>
                </>
              )}

              {/* CNH com EAR — compartilhado */}
              <Field>
                <FieldLabel>Possui CNH com EAR?</FieldLabel>
                <EarToggle>
                  <EarBtn
                    type="button"
                    $active={ear === 'sim'}
                    $variant="yes"
                    onClick={() => setEar('sim')}
                  >
                    <CheckCircle size={14} strokeWidth={2} />
                    Sim, tenho
                  </EarBtn>
                  <EarBtn
                    type="button"
                    $active={ear === 'nao'}
                    $variant="no"
                    onClick={() => setEar('nao')}
                  >
                    Ainda não
                  </EarBtn>
                </EarToggle>
              </Field>

              {/* Disponibilidade de turno — compartilhado */}
              <Field>
                <FieldLabel>Disponibilidade de turno</FieldLabel>
                <CustomSelect
                  value={disponibilidade}
                  onChange={setDisponibilidade}
                  options={disponibilidadeOptions}
                  placeholder="Selecione o turno..."
                />
              </Field>

              {/* Cidade — compartilhado */}
              <Field>
                <FieldLabel>Cidade</FieldLabel>
                <Input
                  name="cidade"
                  placeholder="Ex: Guarulhos"
                  value={cidade}
                  onChange={handleCidade}
                  autoComplete="address-level2"
                />
              </Field>

              {status === 'success' && (
                <SuccessBox>
                  <CheckCircle size={20} strokeWidth={2} />
                  Cadastro enviado com sucesso! Entraremos em contato em breve.
                </SuccessBox>
              )}

              {status === 'error' && (
                <ErrorBox>
                  <CheckCircle size={20} strokeWidth={2} />
                  {errMsg}
                </ErrorBox>
              )}

              {status !== 'success' && (
                <SubmitBtn $loading={status === 'loading'} onClick={handleSubmit} disabled={status === 'loading'}>
                  {status === 'loading'
                    ? <><Loader size={18} strokeWidth={2} /> Enviando...</>
                    : <><Send size={16} strokeWidth={2} /> Enviar Cadastro</>}
                </SubmitBtn>
              )}
            </Grid>
          </FormInner>
        </FormWrapper>
      </Inner>
    </Section>
  )
}