import {StoreProvider} from 'app/providers/StoreProvider'
import {BrowserRouter} from 'react-router-dom'
import App from './app/App'
import {ThemeProvider} from 'app/providers/ThemeProvider'
import 'app/styles/index.scss'
import './shared/config/i18n/i18n'
import {ErrorBoundary} from 'app/providers/ErrorBoundary'
import {createRoot} from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <BrowserRouter>
    <StoreProvider>
      <ErrorBoundary>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </ErrorBoundary>
    </StoreProvider>
  </BrowserRouter>
)
