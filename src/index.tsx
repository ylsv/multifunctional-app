import {render} from 'react-dom'
import {StoreProvider} from 'app/providers/StoreProvider'
import {BrowserRouter} from 'react-router-dom'
import App from './app/App'
import {ThemeProvider} from 'app/providers/ThemeProvider'
import 'app/styles/index.scss'
import './shared/config/i18n/i18n'
import {ErrorBoundary} from 'app/providers/ErrorBoundary'

render(
  <StoreProvider>
    <BrowserRouter>
      <ErrorBoundary>
        <ThemeProvider>
          <App/>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root')
)
