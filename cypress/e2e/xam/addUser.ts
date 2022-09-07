import 'cypress-localstorage-commands';

const logIn = (loginCredentials: any) => {
    cy.get('.branchIdTextField').click().type(loginCredentials.branchId);

    cy.get('.userNameTextField').click().type(loginCredentials.userName);

    cy.get('.passwordTextField').click().type(loginCredentials.password);

    cy.get('button').click();

    cy.saveLocalStorage();
};

describe('The AddUser component: ', () => {
    let loginCredentials: any;

    before(function () {
        cy.fixture('user').then((data) => {
            loginCredentials = data;
        });
        cy.visit('http://localhost:3000');
        cy.viewport(1300, 1800);
    });

    before(() => {
        logIn(loginCredentials);
    });

    beforeEach(() => {
        cy.viewport(1800, 2500);
    });

    it('...is visible', () => {
        cy.get('.addUser').should('be.visible');
    });

    it('...at URL "/dashboard"', () => {
        cy.get('.addUser')
            .location()
            .should((loc) => {
                console.log('loc is: ', loc);
                expect(loc.pathname).to.eq('/dashboard');
            });
    });

    it('...and shows the title "Add a new user..."', () => {
        cy.get('.addUser h4')
            .should('contain.text', 'Add a new user...')
            .should('be.visible');
    });
});
