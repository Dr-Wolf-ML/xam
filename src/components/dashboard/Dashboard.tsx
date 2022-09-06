import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, View } from '@aws-amplify/ui-react';

// Types
import { initialUser } from '../../types/userType';

import { UserContext } from '../../App';
import AddUser from './AddUser';
import ListUsers from './ListUsers';

const Dashboard = () => {
    const { currentUser, setCurrentUser, userDb } = React.useContext(
        UserContext
    );

    let navigate = useNavigate();

    const logOut = () => {
        setCurrentUser(initialUser);

        navigate('/', { replace: true });
    };

    useEffect(() => {
        console.log('userDb in App: ', userDb);
    }, [currentUser, userDb]);

    return (
        <View className="dashboardView">
            <Card className="userName" columnStart="1" columnEnd="1">
                <h1>{currentUser.userName}</h1>
            </Card>
            <Card className="logOut" columnStart="2" columnEnd="-1">
                <Button onClick={logOut}>Log Out</Button>
            </Card>
            <Card columnStart="1" columnEnd="2">
                <AddUser />
            </Card>
            <Card columnStart="2" columnEnd="-1">
                <ListUsers />
            </Card>
        </View>
    );
};

export default Dashboard;
