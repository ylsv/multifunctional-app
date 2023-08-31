
let profileId = ''

describe('User enters profile page', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then((data) => {
      profileId = data.id
      cy.visit(`profile/${data.id}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('and profile page loads successfully', () => {
    cy.getByTestId('ProfileCard.FirstName').should('have.value', 'test')
  })
  it('and edits it', () => {
    cy.updateProfile('new-name', 'new-lastname')
    cy.getByTestId('ProfileCard.FirstName').should('have.value', 'new-name')
    cy.getByTestId('ProfileCard.LastName').should('have.value', 'new-lastname')
  })
})
