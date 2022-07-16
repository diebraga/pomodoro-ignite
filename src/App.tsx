import { ThemeProvider } from 'styled-components'
import { Button } from "./components/Button"
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/theme/default'

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button />
      <Button variant="success"/>
      <Button variant="danger"/>

      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
