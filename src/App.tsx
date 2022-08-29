// Modules
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// AWS
import { AmplifyProvider, View } from '@aws-amplify/ui-react'; //! AmplifyProvider is the Theming Wrapper
import '@aws-amplify/ui-react/styles.css';

// CSS
import '@aws-amplify/ui-react/styles.css';
import '@fontsource/inter/variable.css';
import './styles/app.scss';

// Components
import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';
import NotFound from './components/404/NotFound';

// Data
import { users } from './data/users_data';

// Types
import {
    initialUser,
    initialUserDb,
    User,
    UserDb,
    initialContext,
} from './types/userType';

export const UserContext = createContext(initialContext);

const viewAttributes = {
    as: 'div',
    className: 'app',
};

const App = () => {
    const [currentUser, setCurrentUser] = useState<User>(initialUser);
    const [userDb, setUserDb] = useState<UserDb[]>([initialUserDb]);
    let value = { currentUser, setCurrentUser, userDb, setUserDb };

    console.log('userDb in App: ', userDb);

    useEffect(() => {
        setUserDb(users);
        console.log('From App: currentUser...', currentUser);
    }, [currentUser, userDb]);

    return (
        <AmplifyProvider>
            <View {...viewAttributes}>
                <UserContext.Provider value={value}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route
                                path="/dashboard"
                                element={
                                    currentUser !== initialUser ? (
                                        <Dashboard />
                                    ) : (
                                        <Navigate replace to="/" />
                                    )
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </View>
        </AmplifyProvider>
    );
};

export default App;
