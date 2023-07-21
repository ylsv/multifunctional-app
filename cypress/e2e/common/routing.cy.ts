import selectByTestId from '../../helpers/selectByTestId'

describe('Routing', () => {
  describe('User is NOT Authorized',  () => {
    it('Open main page', () => {
      cy.visit('/')
      cy.get(selectByTestId('MainPage')).should('exist')
    })
    it('Profile page redirects to main', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId('MainPage')).should('exist')
    })
    it('Unknown url redirects to not-found-page', () => {
      cy.visit('/unknownUrl')
      cy.get(selectByTestId('NotFoundPage')).should('exist')
    })
  })
  describe('User IS Authorized',  () => {
    beforeEach(() => {
      cy.login()
    })
    it('Open Profile page', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId('ProfilePage')).should('exist')
    })
    it('Open Articles page', () => {
      cy.visit('/articles')
      cy.get(selectByTestId('ArticlesPage')).should('exist')
    })
  })
})
