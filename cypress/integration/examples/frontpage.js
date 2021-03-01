/* To run only one test write: it.only */
/* To pause between each step of a test write cy.pause() only one test write: it.only */


/* Testing different viewports -- See presets: https://docs.cypress.io/api/commands/viewport.html#Syntax  */
const sizes = ['iphone-6', 'iphone-x' , 'samsung-note9']

describe('FirstPage ', function() {
	beforeEach(function() {
		cy.visit('http://localhost:3000')
	})
	it('front page can be opened', function() {
		cy.contains('Business')
	})
})

describe('FirstPageMobile ', function() {
	sizes.forEach((size) => {
		beforeEach(function() {
			cy.viewport(size)
			cy.visit('http://localhost:3000')
		})
		it('front page can be opened', function() {
			cy.contains('Business')
		})
		it('Menu can be opened', function() {
			cy.get('.bm-burger-button > button').click()
			cy.contains('Analysis')
		})
		it('Menu can be opened and closed', function() {
			cy.get('.bm-burger-button > button').click()
			cy.contains('Analysis')
			cy.get('.bm-cross-button > button').click()
			cy.contains('Rows')
		})
	})
})