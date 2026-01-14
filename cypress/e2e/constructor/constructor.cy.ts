const bun = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const constructor = '[data-cy="constructor"]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.visit('/'); 
  cy.wait('@getIngredients');
});

describe('Проверяем добавление ингредиентов в конструктор', function() {
    it('Добавление булки в конструктор ', function() {
        cy.get(bun).children('button').click();
        cy.get(constructor).should('contain', "Краторная булка N-200igogo");
    });
});
