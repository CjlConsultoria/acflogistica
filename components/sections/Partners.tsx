'use client'
import styled, { keyframes, css } from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Truck, Phone, CheckCircle, Send, Loader, Car } from 'lucide-react'

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(238,150,26,0.4); }
  50%       { box-shadow: 0 0 0 12px rgba(238,150,26,0); }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
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
  @media (min-width: 521px) { width: auto; }
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
  &.error { border-color: #dc2626; box-shadow: 0 0 0 3px rgba(220,38,38,0.10); }
`

const Input = styled.input`${inputBase}`

const SelectTrigger = styled.button<{ $isOpen: boolean; $hasError?: boolean }>`
  ${inputBase}
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  text-align: left;
  border-color: ${({ $isOpen, $hasError }) => $hasError ? '#dc2626' : $isOpen ? '#1E549E' : 'rgba(30,84,158,0.3)'};
  box-shadow: ${({ $isOpen, $hasError }) => $hasError ? '0 0 0 3px rgba(220,38,38,0.10)' : $isOpen ? '0 0 0 3px rgba(30,84,158,0.12)' : 'none'};
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

const FieldError = styled.span`
  font-size: 0.7rem;
  color: #dc2626;
  padding-left: 0.5rem;
  animation: ${fadeUp} 0.2s ease both;
`

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const RadioLabel = styled.label<{ $checked: boolean; $hasError?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  border: 1.5px solid ${({ $checked, $hasError }) => $hasError && !$checked ? '#dc2626' : $checked ? '#1E549E' : 'rgba(30,84,158,0.3)'};
  background: ${({ $checked }) => $checked ? 'rgba(30,84,158,0.08)' : 'rgba(30,84,158,0.04)'};
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.86rem;
  color: ${({ $checked }) => $checked ? '#1E549E' : '#111827'};
  font-weight: ${({ $checked }) => $checked ? '600' : '400'};
  &:hover { border-color: #1E549E; background: rgba(30,84,158,0.08); }
`

const RadioDot = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${({ $checked }) => $checked ? '#1E549E' : 'rgba(30,84,158,0.4)'};
  background: ${({ $checked }) => $checked ? '#1E549E' : 'transparent'};
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s;
  &::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 6px; height: 6px;
    border-radius: 50%;
    background: white;
    opacity: ${({ $checked }) => $checked ? 1 : 0};
    transition: opacity 0.2s;
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
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: #16a34a;
  font-size: 0.86rem;
  text-align: center;
  animation: ${fadeUp} 0.4s ease both;
  svg { flex-shrink: 0; color: #16a34a; }
  strong { font-size: 1rem; font-family: var(--font-cabourg-bold), sans-serif; }
`

const NoteBox = styled.div`
  background: rgba(30,84,158,0.04);
  border: 1px solid rgba(30,84,158,0.15);
  border-radius: 12px;
  padding: 1rem 1.2rem;
  font-size: 0.78rem;
  color: #4B5563;
  line-height: 1.6;
  strong { color: #1E549E; }
`

const SpinnerIcon = styled(Loader)`
  animation: ${spin} 1s linear infinite;
`

const perks = [
  'Sem fila de espera',
  'Rota inteligente via App',
  'Atuação em Guarulhos, Zona Norte e Leste',
  'Carregamento rápido (média 15 min)',
  '4 ciclos de horários de carregamento',
  'Pagamento semanal garantido',
]

// Google Forms entry IDs
const FORM_ACTION = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfx8G7AFDq3AXSWpr6lnXrpYMSD80QivajPtUzYQGTSK0WfbA/formResponse'
const ENTRIES = {
  nome: 'entry.594626444',
  cpf: 'entry.226565569',
  telefone: 'entry.1496314386',
  endereco: 'entry.1644043184',
  cep: 'entry.969990543',
  cidade: 'entry.1500274764',
  estado: 'entry.983193459',
  email: 'entry.368565039',
  empresa: 'entry.409709660',
  cnpj: 'entry.2060701609',
  banco: 'entry.754164944',
  agencia: 'entry.2035131932',
  conta: 'entry.2059298555',
  pix: 'entry.1851449410',
  tipoConta: 'entry.1306990964',
  veiculoTipo: 'entry.2016475994',
}

const estadoOptions = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
  'SP','SE','TO'
]

function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0)  return ''
  if (digits.length <= 2)   return `(${digits}`
  if (digits.length <= 7)   return `(${digits.slice(0,2)}) ${digits.slice(2)}`
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
}

function maskCPF(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0,3)}.${digits.slice(3)}`
  if (digits.length <= 9) return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6)}`
  return `${digits.slice(0,3)}.${digits.slice(3,6)}.${digits.slice(6,9)}-${digits.slice(9)}`
}

function maskCNPJ(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 14)
  if (digits.length <= 2) return digits
  if (digits.length <= 5) return `${digits.slice(0,2)}.${digits.slice(2)}`
  if (digits.length <= 8) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5)}`
  if (digits.length <= 12) return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8)}`
  return `${digits.slice(0,2)}.${digits.slice(2,5)}.${digits.slice(5,8)}/${digits.slice(8,12)}-${digits.slice(12)}`
}

function maskCEP(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 5) return digits
  return `${digits.slice(0,5)}-${digits.slice(5)}`
}

function CustomSelect({ value, onChange, options, placeholder, hasError }: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
  hasError?: boolean
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
      <SelectTrigger type="button" $isOpen={isOpen} $hasError={hasError && !value} onClick={() => setIsOpen(!isOpen)}>
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

type FieldErrors = Record<string, string>

export default function Partners() {
  const [open, setOpen] = useState(false)

  const [nome, setNome]           = useState('')
  const [cpf, setCpf]             = useState('')
  const [telefone, setTelefone]   = useState('')
  const [endereco, setEndereco]   = useState('')
  const [cep, setCep]             = useState('')
  const [cidade, setCidade]       = useState('')
  const [estado, setEstado]       = useState('')
  const [email, setEmail]         = useState('')
  const [empresa, setEmpresa]     = useState('')
  const [cnpj, setCnpj]           = useState('')
  const [banco, setBanco]         = useState('')
  const [agencia, setAgencia]     = useState('')
  const [conta, setConta]         = useState('')
  const [pix, setPix]             = useState('')
  const [tipoConta, setTipoConta] = useState<'PJ' | 'PF' | ''>('')
  const [veiculoTipo, setVeiculoTipo] = useState('')

  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  function validate(): boolean {
    const e: FieldErrors = {}
    if (!nome.trim())                          e.nome = 'Informe seu nome completo.'
    if (cpf.replace(/\D/g,'').length < 11)    e.cpf = 'CPF inválido (11 dígitos).'
    if (telefone.replace(/\D/g,'').length < 10) e.telefone = 'Telefone inválido.'
    if (!endereco.trim())                      e.endereco = 'Informe seu endereço.'
    if (cep.replace(/\D/g,'').length < 8)     e.cep = 'CEP inválido (8 dígitos).'
    if (!cidade.trim())                        e.cidade = 'Informe a cidade.'
    if (!estado)                               e.estado = 'Selecione o estado.'
    if (!email.trim() || !email.includes('@')) e.email = 'E-mail inválido.'
    if (!empresa.trim())                       e.empresa = 'Informe o nome da empresa.'
    if (cnpj.replace(/\D/g,'').length < 14)   e.cnpj = 'CNPJ inválido (14 dígitos).'
    if (!banco.trim())                         e.banco = 'Informe o banco.'
    if (!agencia.trim())                       e.agencia = 'Informe o número da agência.'
    if (!conta.trim())                         e.conta = 'Informe o número da conta.'
    if (!pix.trim())                           e.pix = 'Informe a chave Pix.'
    if (!tipoConta)                            e.tipoConta = 'Selecione o tipo de conta.'
    if (!veiculoTipo.trim())                   e.veiculoTipo = 'Informe o tipo de veículo.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setStatus('loading')

    const formData = new FormData()
    formData.append(ENTRIES.nome, nome)
    formData.append(ENTRIES.cpf, cpf)
    formData.append(ENTRIES.telefone, telefone)
    formData.append(ENTRIES.endereco, endereco)
    formData.append(ENTRIES.cep, cep)
    formData.append(ENTRIES.cidade, cidade)
    formData.append(ENTRIES.estado, estado)
    formData.append(ENTRIES.email, email)
    formData.append(ENTRIES.empresa, empresa)
    formData.append(ENTRIES.cnpj, cnpj)
    formData.append(ENTRIES.banco, banco)
    formData.append(ENTRIES.agencia, agencia)
    formData.append(ENTRIES.conta, conta)
    formData.append(ENTRIES.pix, pix)
    formData.append(ENTRIES.tipoConta, tipoConta)
    formData.append(ENTRIES.veiculoTipo, veiculoTipo)

    try {
      // Google Forms doesn't allow CORS — use no-cors mode; response will be opaque but data is saved
      await fetch(FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData,
      })
    } catch {
      // no-cors throws no real error; any network failure is silent
    }

    // Assume success after POST (Google Forms no-cors always "succeeds" silently)
    setStatus('success')
  }

  const err = (field: string) => errors[field]

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
            {status === 'success' ? (
              <SuccessBox>
                <CheckCircle size={40} strokeWidth={1.5} />
                <strong>Cadastro enviado com sucesso!</strong>
                <p>Suas informações chegaram direto para a ACF Transportes.<br />Entraremos em contato em breve pelo WhatsApp ou e-mail informado.</p>
                <NoteBox>
                  <strong>Não esqueça:</strong> envie cópia dos documentos (CNH, Comprovante de endereço, Cartão CNPJ, CRLV do Veículo) para o WhatsApp <strong>(11) 97816-6315</strong>.
                </NoteBox>
              </SuccessBox>
            ) : (
              <>
                <FormTitle>Preencha seus dados</FormTitle>
                <FormSub>Todos os campos são obrigatórios. Entraremos em contato em até 24h úteis.</FormSub>
                <Grid>

                  {/* Nome */}
                  <Field>
                    <FieldLabel>Nome completo *</FieldLabel>
                    <Input
                      className={err('nome') ? 'error' : ''}
                      placeholder="Seu nome completo"
                      value={nome}
                      onChange={e => { setNome(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, '').slice(0,80)); setErrors(p => ({ ...p, nome: '' })) }}
                      autoComplete="name"
                    />
                    {err('nome') && <FieldError>{err('nome')}</FieldError>}
                  </Field>

                  {/* CPF */}
                  <Field>
                    <FieldLabel>CPF *</FieldLabel>
                    <Input
                      className={err('cpf') ? 'error' : ''}
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={e => { setCpf(maskCPF(e.target.value)); setErrors(p => ({ ...p, cpf: '' })) }}
                      inputMode="numeric"
                    />
                    {err('cpf') && <FieldError>{err('cpf')}</FieldError>}
                  </Field>

                  {/* Telefone */}
                  <Field>
                    <FieldLabel>Telefone / WhatsApp *</FieldLabel>
                    <Input
                      className={err('telefone') ? 'error' : ''}
                      placeholder="(11) 99999-9999"
                      value={telefone}
                      onChange={e => { setTelefone(maskPhone(e.target.value)); setErrors(p => ({ ...p, telefone: '' })) }}
                      inputMode="tel"
                      autoComplete="tel"
                    />
                    {err('telefone') && <FieldError>{err('telefone')}</FieldError>}
                  </Field>

                  {/* Endereço */}
                  <Field>
                    <FieldLabel>Endereço *</FieldLabel>
                    <Input
                      className={err('endereco') ? 'error' : ''}
                      placeholder="Rua, número, bairro"
                      value={endereco}
                      onChange={e => { setEndereco(e.target.value.slice(0,150)); setErrors(p => ({ ...p, endereco: '' })) }}
                      autoComplete="street-address"
                    />
                    {err('endereco') && <FieldError>{err('endereco')}</FieldError>}
                  </Field>

                  {/* CEP */}
                  <Field>
                    <FieldLabel>CEP *</FieldLabel>
                    <Input
                      className={err('cep') ? 'error' : ''}
                      placeholder="00000-000"
                      value={cep}
                      onChange={e => { setCep(maskCEP(e.target.value)); setErrors(p => ({ ...p, cep: '' })) }}
                      inputMode="numeric"
                      autoComplete="postal-code"
                    />
                    {err('cep') && <FieldError>{err('cep')}</FieldError>}
                  </Field>

                  {/* Cidade */}
                  <Field>
                    <FieldLabel>Cidade *</FieldLabel>
                    <Input
                      className={err('cidade') ? 'error' : ''}
                      placeholder="Ex: Guarulhos"
                      value={cidade}
                      onChange={e => { setCidade(e.target.value.replace(/[^a-zA-ZÀ-ÿ\s'\-]/g, '').slice(0,60)); setErrors(p => ({ ...p, cidade: '' })) }}
                      autoComplete="address-level2"
                    />
                    {err('cidade') && <FieldError>{err('cidade')}</FieldError>}
                  </Field>

                  {/* Estado */}
                  <Field>
                    <FieldLabel>Estado *</FieldLabel>
                    <CustomSelect
                      value={estado}
                      onChange={v => { setEstado(v); setErrors(p => ({ ...p, estado: '' })) }}
                      options={estadoOptions}
                      placeholder="Selecione o estado..."
                      hasError={!!err('estado')}
                    />
                    {err('estado') && <FieldError>{err('estado')}</FieldError>}
                  </Field>

                  {/* E-mail */}
                  <Field>
                    <FieldLabel>E-mail *</FieldLabel>
                    <Input
                      className={err('email') ? 'error' : ''}
                      placeholder="seu@email.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value.slice(0,100)); setErrors(p => ({ ...p, email: '' })) }}
                      type="email"
                      autoComplete="email"
                    />
                    {err('email') && <FieldError>{err('email')}</FieldError>}
                  </Field>

                  {/* Nome da Empresa */}
                  <Field>
                    <FieldLabel>Nome da sua Empresa *</FieldLabel>
                    <Input
                      className={err('empresa') ? 'error' : ''}
                      placeholder="Nome da empresa / MEI"
                      value={empresa}
                      onChange={e => { setEmpresa(e.target.value.slice(0,100)); setErrors(p => ({ ...p, empresa: '' })) }}
                    />
                    {err('empresa') && <FieldError>{err('empresa')}</FieldError>}
                  </Field>

                  {/* CNPJ */}
                  <Field>
                    <FieldLabel>CNPJ *</FieldLabel>
                    <Input
                      className={err('cnpj') ? 'error' : ''}
                      placeholder="00.000.000/0000-00"
                      value={cnpj}
                      onChange={e => { setCnpj(maskCNPJ(e.target.value)); setErrors(p => ({ ...p, cnpj: '' })) }}
                      inputMode="numeric"
                    />
                    {err('cnpj') && <FieldError>{err('cnpj')}</FieldError>}
                  </Field>

                  {/* Banco */}
                  <Field>
                    <FieldLabel>Banco *</FieldLabel>
                    <Input
                      className={err('banco') ? 'error' : ''}
                      placeholder="Ex: Nubank, Bradesco, Itaú..."
                      value={banco}
                      onChange={e => { setBanco(e.target.value.slice(0,60)); setErrors(p => ({ ...p, banco: '' })) }}
                    />
                    {err('banco') && <FieldError>{err('banco')}</FieldError>}
                  </Field>

                  {/* Agência */}
                  <Field>
                    <FieldLabel>Número da Agência *</FieldLabel>
                    <Input
                      className={err('agencia') ? 'error' : ''}
                      placeholder="Ex: 0001"
                      value={agencia}
                      onChange={e => { setAgencia(e.target.value.replace(/\D/g,'').slice(0,10)); setErrors(p => ({ ...p, agencia: '' })) }}
                      inputMode="numeric"
                    />
                    {err('agencia') && <FieldError>{err('agencia')}</FieldError>}
                  </Field>

                  {/* Conta Corrente */}
                  <Field>
                    <FieldLabel>Número Conta Corrente *</FieldLabel>
                    <Input
                      className={err('conta') ? 'error' : ''}
                      placeholder="Ex: 12345-6"
                      value={conta}
                      onChange={e => { setConta(e.target.value.slice(0,20)); setErrors(p => ({ ...p, conta: '' })) }}
                      inputMode="numeric"
                    />
                    {err('conta') && <FieldError>{err('conta')}</FieldError>}
                  </Field>

                  {/* Pix */}
                  <Field>
                    <FieldLabel>Chave Pix *</FieldLabel>
                    <Input
                      className={err('pix') ? 'error' : ''}
                      placeholder="CPF, e-mail, telefone ou chave aleatória"
                      value={pix}
                      onChange={e => { setPix(e.target.value.slice(0,100)); setErrors(p => ({ ...p, pix: '' })) }}
                    />
                    {err('pix') && <FieldError>{err('pix')}</FieldError>}
                  </Field>

                  {/* Tipo de Conta */}
                  <Field>
                    <FieldLabel>Tipo de Conta *</FieldLabel>
                    <RadioGroup>
                      {(['PJ', 'PF'] as const).map(opt => (
                        <RadioLabel
                          key={opt}
                          $checked={tipoConta === opt}
                          $hasError={!!err('tipoConta')}
                          onClick={() => { setTipoConta(opt); setErrors(p => ({ ...p, tipoConta: '' })) }}
                        >
                          <RadioDot $checked={tipoConta === opt} />
                          {opt === 'PJ' ? 'PJ — Pessoa Jurídica' : 'PF — Pessoa Física'}
                        </RadioLabel>
                      ))}
                    </RadioGroup>
                    {err('tipoConta') && <FieldError>{err('tipoConta')}</FieldError>}
                  </Field>

                  {/* Veículo Tipo */}
                  <Field>
                    <FieldLabel>Veículo Tipo *</FieldLabel>
                    <Input
                      className={err('veiculoTipo') ? 'error' : ''}
                      placeholder="Ex: Van, Fiorino, Kangoo, Doblo..."
                      value={veiculoTipo}
                      onChange={e => { setVeiculoTipo(e.target.value.slice(0,60)); setErrors(p => ({ ...p, veiculoTipo: '' })) }}
                    />
                    {err('veiculoTipo') && <FieldError>{err('veiculoTipo')}</FieldError>}
                  </Field>

                  {/* Nota sobre documentos */}
                  <NoteBox>
                    <strong>Documentos necessários:</strong> Após enviar o cadastro, encaminhe cópia da <strong>CNH, Comprovante de endereço, Cartão CNPJ e CRLV do Veículo</strong> para o WhatsApp <strong>(11) 97816-6315</strong>.
                  </NoteBox>

                  <SubmitBtn $loading={status === 'loading'} onClick={handleSubmit} disabled={status === 'loading'}>
                    {status === 'loading'
                      ? <><SpinnerIcon size={18} strokeWidth={2} /> Enviando...</>
                      : <><Send size={16} strokeWidth={2} /> Enviar Cadastro</>}
                  </SubmitBtn>

                </Grid>
              </>
            )}
          </FormInner>
        </FormWrapper>
      </Inner>
    </Section>
  )
}