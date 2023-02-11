describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Arif Wibawa',
      username: 'arifwibawa',
      password: 'arifganteng'
    }
    cy.request('POST',  `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('arifwibawa')
    cy.get('#password').type('test')
    cy.get('#login-button').click()

    cy.get('.failed').should('contain', 'wrong username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'arifwibawa logged in')
  })

  it('front page can be opened', function() {

    cy.contains('log in to application')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('arifwibawa')
    cy.get('#password').type('arifganteng')
    cy.get('#login-button').click()

    cy.contains('arifwibawa logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'arifwibawa', password: 'arifganteng' })
      cy.createBlog({
        title: 'another blog cypress',
        url: 'cypress.com',
        author: 'Cypress'
      })
      cy.createBlog({
        title: 'another blog cypress 2',
        url: 'cypress.com 2',
        author: 'Cypress 2'
      })
      cy.createBlog({
        title: 'another blog cypress 3',
        url: 'cypress.com 3',
        author: 'Cypress 3'
      })
    })

    it('a new blog can be created', function() {
      cy.contains('another blog cypress')
      cy.contains('another blog cypress 2')
      cy.contains('another blog cypress 3')
    })

    it('user can like a blog', function() {
      cy.contains('another blog cypress').find('button').click()
      cy.get('#like-btn').click()

    })

    it('user can delete a blog', function () {
      cy.contains('another blog cypress').find('button').click()
      cy.get('#delete-btn').click()
      cy.get('html').should('not.contain', 'another blog cypress')
    })

    it('ordered by the number of likes in descending order', async function () {
      cy.contains('another blog cypress 3').find('button').click()
      cy.get('#like-btn').click().wait(300).click().wait(300)
      cy.contains('another blog cypress 3').find('button').click()

      cy.contains('another blog cypress 2').find('button').click()
      cy.get('#like-btn').click().wait(300).click().wait(300).click().wait(300)

      cy.get('.blog-list').eq(0).should('contain', 'another blog cypress 2')
      cy.get('.blog-list').eq(1).should('contain', 'another blog cypress 3')
      cy.get('.blog-list').eq(2).should('contain', 'another blog cypress')
    })
  })
})

