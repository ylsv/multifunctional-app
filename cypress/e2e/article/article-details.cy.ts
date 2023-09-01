
let currentArticleId = ''

describe('User opens article page', () => {
  beforeEach(() => {
    cy.login()
    cy.createArticle().then((article) => {
      currentArticleId = article.id
      cy.visit(`articles/${article.id}`)
    })
  })
  afterEach(() => {
    cy.removeArticle(currentArticleId)
  })
  it('and observes article', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist')
  })
  it('and pastes comment', () => {
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('AddCommentForm').scrollIntoView()
    cy.addComment('comment-test-text')
    cy.getByTestId('CommentCard.Content').should('have.length', 1)
  })
  it('and rates article', () => {
    cy.intercept('GET', '**/articles/*', {fixture: 'article-details.json'})
    cy.getByTestId('ArticleDetails.Info')
    cy.getByTestId('RatingCard').scrollIntoView()
    cy.setRate(4, 'feedback-test-text')
    cy.get('[data-selected=true]').should('have.length', 4)
  })
})
