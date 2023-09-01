describe('User opens article-list page', () => {
  beforeEach(() => {
    cy.login().then((data) => {
      cy.visit('articles')
    })
  })
  it('and articles load successfully', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })
  it('and stub articles load successfully', () => {
    cy.intercept('GET', '**/articles?*', {fixture: 'articles.json'})
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })
})
