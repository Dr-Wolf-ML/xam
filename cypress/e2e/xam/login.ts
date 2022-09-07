import 'cypress-localstorage-commands';

const logIn = (loginCredentials: any) => {
    cy.get('.branchIdTextField').click().type(loginCredentials.branchId);

    cy.get('.userNameTextField').click().type(loginCredentials.userName);

    cy.get('.passwordTextField').click().type(loginCredentials.password);

    cy.get('button').click();

    cy.saveLocalStorage();
};

describe('The root route: ', () => {
    let loginCredentials: any;

    before(function () {
        cy.fixture('user').then((data) => {
            loginCredentials = data;
        });
        cy.visit('http://localhost:3000');
        // cy.viewport(1300, 1800);
    });

    it('...loads the App', () => {
        cy.get('.app');
    });

    it('...at the root route URL "/"', () => {
        cy.get('.loginCard')
            .location()
            .should((loc) => {
                expect(loc.pathname).to.eq('/');
            });
    });

    it('...and has a login component', () => {
        cy.get('.loginCard').should('be.visible');
    });

    describe('The Login component:', () => {
        it('...has a title: "Please enter your login details..."', () => {
            cy.get('h4')
                .should('contain.text', 'Please enter your login details...')
                .should('be.visible');
        });

        it('...has a Submit button', () => {
            cy.get('button')
                .should('contain.text', 'Submit')
                .should('be.visible');
        });

        describe('...three input fields:', () => {
            it('...with label "Branch ID"', () => {
                cy.get('.amplify-textfield')
                    .eq(0)
                    .get('label')
                    .should('contain.text', 'Branch ID')
                    .should('be.visible');
            });

            it('...with label "User Name"', () => {
                cy.get('.amplify-textfield')
                    .eq(1)
                    .get('label')
                    .should('contain.text', 'User Name')
                    .should('be.visible');
            });

            it('...with label "Password"', () => {
                cy.get('.amplify-textfield')
                    .eq(2)
                    .get('label')
                    .should('contain.text', 'Password')
                    .should('be.visible');
            });
        });
    });

    describe('The Login component also has error checking:', () => {
        it('By default, no errors are shown', () => {
            cy.get('.amplify-field_error-message').should('not.exist');
        });

        describe('However, if fields are empty and you click Submit, all error messages show up.  These are:', () => {
            before(() => {
                cy.get('button').click();
            });

            it('..."Must be exactly 5 numbers" for Branch ID', () => {
                cy.get('p')
                    .eq(0)
                    .should('contain.text', 'Must be exactly 5 numbers')
                    .should('be.visible');
            });

            it('..."Must 8-16 characters, no spaces" for User Name', () => {
                cy.get('p')
                    .eq(1)
                    .should('contain.text', 'Must 8-16 characters, no spaces')
                    .should('be.visible');
            });

            it('..."Must 8-16 characters" for Password', () => {
                cy.get('p')
                    .eq(2)
                    .should('contain.text', 'Must 8-16 characters')
                    .should('be.visible');
            });

            it('..."Error: Login detail incorrect..." below the Submit Button', () => {
                cy.get('p')
                    .eq(3)
                    .should('contain.text', 'Error: Login detail incorrect...')
                    .should('be.visible');
            });

            it('At this point, the Submit button should bel disabled as well', () => {
                cy.get('button').should('be.disabled');
            });
        });
    });

    describe('Entering the correct login details:', () => {
        beforeEach(() => {
            cy.viewport(1300, 1800);
        });

        it('...you can sign in', () => {
            logIn(loginCredentials);
        });

        it('...be taken to URL "/dashboard"', () => {
            cy.get('.dashboardView')
                .location()
                .should((loc) => {
                    expect(loc.pathname).to.eq('/dashboard');
                });
        });

        it('...and see the Dashboard', () => {
            cy.get('.dashboardView').should('be.visible');
        });

        describe('The Dashboard ', () => {
            it('...shows the User Name "testuser02" in the top left corner', () => {
                cy.get('.userName h1')
                    .should('contain.text', 'testuser02')
                    .should('be.visible');
            });

            it('...shows a "Log Out" button in the top right croner', () => {
                cy.get('.logOut button')
                    .should('contain.text', 'Log Out')
                    .should('be.visible');
            });

            it('...shows an "Add User" component', () => {
                cy.get('.addUser').should('be.visible');
            });

            it('...shows a list of all users', () => {
                cy.get('.listUsers').should('be.visible');
            });
        });
    });
});
