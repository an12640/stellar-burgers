const bun = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const anotherBun = '[data-cy="643d69a5c3f7b9001cfa093d"]';
const mainIngredient = '[data-cy="643d69a5c3f7b9001cfa0947"]';
const sauce = '[data-cy="643d69a5c3f7b9001cfa0945"]';
const constructor = '[data-cy="constructor"]';
const modal = '[data-cy="modal"]';
const modalCloseButton = '[data-cy="modal-close-button"]';
const modalOverlay = '[data-cy="modal-overlay"]';
const submitOrderButton = '[data-cy="submit-order-button"]';
const orderNumber = '[data-cy="order-number"]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/auth/login', { fixture: 'login.json' });
  cy.intercept('POST', 'api/auth/token', { fixture: 'login.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('refreshToken')
  );
  cy.setCookie('accessToken', 'accessToken');

  cy.visit('/'); 
  cy.wait('@getIngredients');
});

afterEach(() => {
  window.localStorage.clear();
  cy.clearCookies();
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

describe('Процесс создания заказа', function() {
  it('Добавление ингредиентов в конструктор бургера', function() {
      cy.get(anotherBun).children('button').click();
      cy.get(mainIngredient).children('button').click();
      cy.get(sauce).children('button').click();
      cy.get(constructor).should('contain', "Флюоресцентная булка R2-D3");
      cy.get(constructor).should('contain', "Плоды Фалленианского дерева");
      cy.get(constructor).should('contain', "Соус с шипами Антарианского плоскоходца");
  });

  it('Проверка отображения модального окна с номером заказа при оформлении заказа', function() {
      cy.get(anotherBun).children('button').click();
      cy.get(submitOrderButton).click();
      cy.get(modal).should('exist');
      cy.get(orderNumber).should('contain', '99145');
  });

  it('Проверка очистки конструктора бургера от добавленных ингредиентов', function() {
      cy.get(anotherBun).children('button').click();
      cy.get(mainIngredient).children('button').click();
      cy.get(sauce).children('button').click();
      cy.get(submitOrderButton).click();
      cy.get(constructor).find(anotherBun).should('not.exist');
      cy.get(constructor).should('not.have.descendants', 'li');
  });
});
