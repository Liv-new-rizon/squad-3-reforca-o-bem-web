describe('Signup Page', () => {
  beforeEach(() => {
    cy.fixture('users').as('usersFixture');
    cy.fixture('existing-users').as('existingUsersFixture');
    cy.fixture('api-responses').as('apiResponses');
    cy.visit('/signup');
  });

  describe('Form Validation Tests', () => {
    beforeEach(function () {
      cy.fixture('invalid-inputs').as('invalidInputs');
    });

    it('should validate name pattern', function () {
      const { invalidName, validName } = this['invalidInputs'];

      cy.get('input[formControlName="name"]').type(invalidName).blur();
      cy.contains('O nome informado é inválido.').should('be.visible');

      cy.get('input[formControlName="name"]').clear().type(validName);
      cy.contains('O nome informado é inválido.').should('not.exist');
    });

    it('should validate email pattern', function () {
      const { invalidEmail, validEmail } = this['invalidInputs'];

      cy.get('input[formControlName="email"]').type(invalidEmail).blur();
      cy.contains('O e-mail informado é inválido.').should('be.visible');

      cy.get('input[formControlName="email"]').clear().type(validEmail);
      cy.contains('O e-mail informado é inválido.').should('not.exist');
    });

    it('should validate password minimum length', function () {
      const { shortPassword, validPassword } = this['invalidInputs'];

      cy.get('input[formControlName="password"]').type(shortPassword).blur();
      cy.contains('A senha deve ter pelo menos 8 caracteres.').should(
        'be.visible'
      );

      cy.get('input[formControlName="password"]').clear().type(validPassword);
      cy.contains('A senha deve ter pelo menos 8 caracteres.').should(
        'not.exist'
      );
    });

    it('should validate passwords match', function () {
      const { validPassword, mismatchPassword } = this['invalidInputs'];

      cy.get('input[formControlName="password"]').type(validPassword);
      cy.get('input[formControlName="confirmPassword"]')
        .type(mismatchPassword)
        .blur();
      cy.contains('As senhas não correspondem.').should('be.visible');

      cy.get('input[formControlName="confirmPassword"]')
        .clear()
        .type(validPassword);
      cy.contains('As senhas não correspondem.').should('not.exist');
    });

    it('should validate no whitespace in name field', function () {
      const { whitespaceOnly } = this['invalidInputs'];

      cy.get('input[formControlName="name"]').type(whitespaceOnly).blur();
      cy.contains('O campo não deve estar em branco.').should('be.visible');
    });
  });

  describe('Form Submission Tests', () => {
    beforeEach(function () {
      cy.intercept('POST', '**/users', (req) => {
        const newUser = req.body;
        const userExists = this['existingUsersFixture'].some(
          (user: any) => user.email === newUser.email
        );

        if (userExists) {
          req.reply({
            statusCode: 400,
            body: this['apiResponses'].emailExists,
          });
        } else {
          req.reply({
            statusCode: 201,
            body: this['apiResponses'].signupSuccess,
          });
        }
      }).as('signupRequest');
    });
    it('should submit the form with valid data and navigate to login page', function () {
      const validUser = this['usersFixture'][0];

      cy.get('input[formControlName="name"]').type(validUser.name);
      cy.get('input[formControlName="email"]').type(validUser.email);
      cy.get('input[formControlName="password"]').type(validUser.password);
      cy.get('input[formControlName="confirmPassword"]').type(
        validUser.password
      );

      cy.get('button.signup__button--send').should('be.enabled').click();

      cy.wait('@signupRequest').its('response.statusCode').should('eq', 201);
      cy.contains(this['apiResponses'].signupSuccess.message).should(
        'be.visible'
      );
      cy.contains('Fechar').click();
      cy.url().should('include', '/login');
    });

    it('should show error for existing email', function () {
      const existingUser = this['existingUsersFixture'][0];

      cy.get('input[formControlName="name"]').type(existingUser.name);
      cy.get('input[formControlName="email"]').type(existingUser.email);
      cy.get('input[formControlName="password"]').type(existingUser.password);
      cy.get('input[formControlName="confirmPassword"]').type(
        existingUser.password
      );

      cy.get('button.signup__button--send').click();

      cy.wait('@signupRequest').its('response.statusCode').should('eq', 400);
      cy.contains(this['apiResponses'].emailExists.message).should(
        'be.visible'
      );
    });

    it('should handle server error', function () {
      const validUser = this['usersFixture'][0];

      cy.intercept('POST', '**/users', {
        statusCode: 500,
        body: this['apiResponses'].serverError,
      }).as('serverError');

      cy.get('input[formControlName="name"]').type(validUser.name);
      cy.get('input[formControlName="email"]').type(validUser.email);
      cy.get('input[formControlName="password"]').type(validUser.password);
      cy.get('input[formControlName="confirmPassword"]').type(
        validUser.password
      );

      cy.get('button.signup__button--send').click();
      cy.wait('@serverError');
      cy.contains(this['apiResponses'].serverError.message).should(
        'be.visible'
      );
    });

    it('should show loading indicator during submission', function () {
      const validUser = this['usersFixture'][0];

      cy.intercept('POST', '**/users', {
        delay: 1000,
        statusCode: 201,
        body: this['apiResponses'].signupSuccess,
      }).as('delayedSignup');

      cy.get('input[formControlName="name"]').type(validUser.name);
      cy.get('input[formControlName="email"]').type(validUser.email);
      cy.get('input[formControlName="password"]').type(validUser.password);
      cy.get('input[formControlName="confirmPassword"]').type(
        validUser.password
      );

      cy.get('button.signup__button--send').click();

      cy.get('.loading-overlay').should('be.visible');
      cy.wait('@delayedSignup');
      cy.get('.loading-overlay').should('not.exist');
    });
  });
});
