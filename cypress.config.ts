import { defineConfig } from 'cypress';

export default defineConfig({
    // projectId: '5stuax',
    // @ts-ignore
    baseURL: 'http://localhost:3000',
    env: {
        BABEL_ENV: 'e2e',
    },
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: 'cypress/e2e/xam/**/*.{js,jsx,ts,tsx}',
    },
});
