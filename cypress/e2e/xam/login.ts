import 'cypress-localstorage-commands';

const logIn = (loginCredentials: any) => {
    cy.get('.branchIdTextField').click().type(loginCredentials.branchId);

    cy.get('.userNameTextField').click().type(loginCredentials.userId);

    cy.get('.passwordTextField').click().type(loginCredentials.password);

    cy.get('.submitButtom').submit();

    cy.saveLocalStorage();
};

describe('Landing Page at messagevax.com: ', () => {
    let loginCredentials: any;

    before(function () {
        cy.fixture('user').then((data) => {
            loginCredentials = data;
        });
        cy.visit('http://localhost:3000');
        cy.viewport(1300, 1800);
    });

    it('loads the Website', () => {
        cy.get('.app');
    });

    it('the App has a login component', () => {
        cy.get('.login');
    });
});
