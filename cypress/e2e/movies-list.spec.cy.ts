
describe('Movies list', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should check the movies list url', () => {
    cy.url().should('includes', 'movies')
  })
  it('get the movies list length', () => {
    cy.get('.movies-length').find('li').its('length').should('eq', 11)
  })
  it('should open detail when button detail clicked', () => {
    cy.get('[data-e2e-btn-detail]').eq(0).click()
    cy.get('.detail-wrapper').should('exist')
  })
})
