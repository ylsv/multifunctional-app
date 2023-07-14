import {componentRender} from '@/shared/lib/tests/componentRender/componentRender'
import AppRouter from './AppRouter'
import {getRouteAbout, getRouteAdmin, getRouteProfile} from '@/shared/const/router'
import {screen} from '@testing-library/react'
import {UserRole} from '@/entities/User'

describe('app/router/AppRouter', function() {
  test('page should be rendered', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout()
    })
    const page = await screen.findByTestId('AboutPage')
    expect(page).toBeInTheDocument()
  })

  test('page was not found', async () => {
    componentRender(<AppRouter />, {
      route: '/random-not-working-route'
    })
    const page = await screen.findByTestId('NotFoundPage')
    expect(page).toBeInTheDocument()
  })

  test('non-authorized user was redirected to main page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1')
    })
    const page = await screen.findByTestId('MainPage')
    expect(page).toBeInTheDocument()
  })

  test('authorized user has access to target page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: {_initialized: true, authData: {}}
      }
    })
    const page = await screen.findByTestId('ProfilePage')
    expect(page).toBeInTheDocument()
  })

  test('authorized user has no access role to specific page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {_initialized: true, authData: {}}
      }
    })
    const page = await screen.findByTestId('ForbiddenPage')
    expect(page).toBeInTheDocument()
  })

  test('authorized admin has access role to specific page', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {_initialized: true, authData: {roles: [UserRole.ADMIN]}}
      }
    })
    const page = await screen.findByTestId('AdminPanelPage')
    expect(page).toBeInTheDocument()
  })
})
