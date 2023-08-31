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
})
