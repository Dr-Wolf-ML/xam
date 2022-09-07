import 'cypress-localstorage-commands';

const logIn = (loginCredentials: any) => {
    cy.get('.branchIdTextField').click().type(loginCredentials.branchId);

    cy.get('.userNameTextField').click().type(loginCredentials.userName);

    cy.get('.passwordTextField').click().type(loginCredentials.password);

    cy.get('button').click();

    cy.saveLocalStorage();
};

describe('The ListUsers component: ', () => {
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
        cy.get('.listUsers').should('be.visible');
    });

    it('...at URL "/dashboard"', () => {
        cy.get('.addUser')
            .location()
            .should((loc) => {
                console.log('loc is: ', loc);
                expect(loc.pathname).to.eq('/dashboard');
            });
    });

    it('...and shows the title "List of all Users..."', () => {
        cy.get('.listUsers h4')
            .should('contain.text', 'List of all Users...')
            .should('be.visible');
    });
});
