describe('Registration a user successfully', () => {
  before(() => {
    cy.visit('/');

    cy.login();

    cy.intercept('GET', '/cities', { fixture: 'cities.json' });
  });

  it('types name', () => {
    cy.get('#name').type('test name');
  });

  it('types surname', () => {
    cy.get('#surname').type('test surname');
  });

  it('types personal ID', () => {
    cy.get('#personalId').type('12345678');
  });

  it('selects city', () => {
    cy.intercept('GET', '/districts?cityId=2', { fixture: 'districts.json' }).as('districts');

    cy.get('#city > button').click().as('cityButton');

    cy.get('#city .dropdown-item:last').click();

    cy.wait('@districts');

    cy.get('@cityButton').should('contain.text', 'izmir');
  });

  it('selects district', () => {
    cy.get('#district > button').click().as('districtButton');

    cy.get('#district .dropdown-item:last').click();

    cy.get('@districtButton').should('contain.text', 'beşiktaş');
  });

  it('checks agreement', () => {
    cy.get('#agreement').click();
  });

  it('submits form', () => {
    cy.intercept('POST', '/validate', { fixture: 'validate.json' }).as('validate');

    cy.get('form').submit();

    cy.wait('@validate')
      .its('request.body')
      .should(
        'eq',
        JSON.stringify({
          name: 'test name',
          surname: 'test surname',
          personalId: '12345678',
          city: '2',
          district: '2',
          agreement: true,
        })
      );

    cy.get('#register-form').should('not.exist');
    cy.get('#confirm-step').should('exist');
  });

  it('confirms', () => {
    const data: Cypress.Option[] = [
      {
        id: 'name',
        label: 'test name',
      },
      {
        id: 'surname',
        label: 'test surname',
      },
      {
        id: 'ID',
        label: '12345678',
      },
      {
        id: 'city',
        label: 'izmir',
      },
      {
        id: 'district',
        label: 'beşiktaş',
      },
    ];

    data.forEach((element: Cypress.Option, index: number) => {
      cy.get('dl dt').eq(index).should('contain.text', element.id);
      cy.get('dl dd').eq(index).should('contain.text', element.label);
    });

    cy.get('button').eq(1).click();

    cy.get('#confirm-step').should('not.exist');
    cy.get('.alert-success').should('exist');
  });
});
