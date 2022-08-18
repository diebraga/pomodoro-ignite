import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { CountDownProvider } from './contexts/ContdownContex'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CountDownProvider>
        <BrowserRouter>
          <Router />
          <GlobalStyle />
        </BrowserRouter>
      </CountDownProvider>
    </ThemeProvider>
  )
}

export default App
