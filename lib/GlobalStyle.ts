import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --font-cabourg: var(--font-cabourg-regular);
    --font-cabourg-bold: var(--font-cabourg-bold);
    --font-inter: var(--font-inter);
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: var(--font-inter), sans-serif;
    background: #060D1E;
    color: #F4F6FA;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #060D1E; }
  ::-webkit-scrollbar-thumb { background: rgba(30,84,158,0.4); border-radius: 3px; }

  a { color: inherit; text-decoration: none; }
  button { cursor: pointer; border: none; background: none; font-family: inherit; }
  input, textarea, select { font-family: inherit; }
  img { max-width: 100%; display: block; }
`
