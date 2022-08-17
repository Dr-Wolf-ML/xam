// Modules
import React, { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// AWS
import Amplify from 'aws-amplify';
import { AmplifyProvider, View } from '@aws-amplify/ui-react'; //! AmplifyProvider is the Theming Wrapper
import '@aws-amplify/ui-react/styles.css';

// CSS
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import './styles/app.scss';

// Components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

export const UserContext = createContext(null);

const viewAttributes = {
    as: 'div',
    className: 'app',
};

const App = () => {
    return (
        <AmplifyProvider>
            <View {...viewAttributes}>
                {/* <UserContext.Provider value={{ state, handleSignout }}> */}
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                {/* </UserContext.Provider> */}
            </View>
        </AmplifyProvider>
    );
};

export default App;
