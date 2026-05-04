import { css, keyframes } from 'styled-components'

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(36px); }
  to   { opacity: 1; transform: translateY(0); }
`
export const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`
export const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`
export const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`
export const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.88); }
  to   { opacity: 1; transform: scale(1); }
`
export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-10px); }
`
export const countUp = keyframes`
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`

/** CSS helper — aplica animação só quando $visible=true */
export const reveal = (animation: ReturnType<typeof keyframes>, delay = 0, duration = 0.7) => css<{ $visible?: boolean }>`
  opacity: 0;
  ${({ $visible }) => $visible && css`
    animation: ${animation} ${duration}s ${delay}s cubic-bezier(0.22, 1, 0.36, 1) both;
  `}
`
