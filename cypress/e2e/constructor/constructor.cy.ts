const bun = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const constructor = '[data-cy="constructor"]';
const modal = '[data-cy="modal"]';
const modalCloseButton = '[data-cy="modal-close-button"]';
const modalOverlay = '[data-cy="modal-overlay"]';

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

describe('Проверяем открытие и закрытие модального окна с описанием ингредиента', function() {
    it('Открытие модального окна с описанием ингредиента ', function() {
      cy.get(modal).should('not.exist');  
      cy.get(bun).find('a').click();
      cy.get(modal)
        .should('exist')
        .should('contain', "Краторная булка N-200igogo");
      cy.get(modal)
        .find('img')
        .should('be.visible')
    });

    it('Закрытие модального окна по клику на крестик ', function() {
      cy.get(bun).find('a').click();
      cy.get(modal).should('exist');
      cy.get(modalCloseButton).click();
      cy.get(modal).should('not.exist');
    });

    it('Закрытие модального окна по клику за областью модального окна ', function() {
      cy.get(bun).find('a').click();
      cy.get(modal).should('exist');
      cy.get(modalOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
    });
});
