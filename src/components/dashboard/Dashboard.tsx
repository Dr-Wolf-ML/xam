import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Flex,
    Grid,
    Heading,
    Text,
    TextField,
    View,
} from '@aws-amplify/ui-react';
// import isEmail from 'validator/lib/isEmail';

import { initialUser, initialUserDb } from '../../types/userType';

import { users } from '../../data/users_data';
import { UserContext } from '../../App';
import AddUser from './AddUser';
import ListUsers from './ListUsers';

type Props = {
    setCurrentUser: Function;
};

const Dashboard = (props: Props) => {
    let navigate = useNavigate();

    const [usersDb, setUsersDb] = useState([initialUserDb]);

    useEffect(() => {
        setUsersDb(users);
        console.log('usersDb after loading: ', usersDb);
    });

    const value = React.useContext(UserContext);
    const userName: any = value['currentUser'];
    console.log('userName in Dashboard: ', userName);

    const logOut = () => {
        const setCurrentUser = props.setCurrentUser;
        setCurrentUser(initialUser);

        navigate('/', { replace: true });
    };

    return (
        <View className="dashboardView">
            <Card className="userName" columnStart="1" columnEnd="1">
                <h1>{userName}</h1>
            </Card>
            <Card className="logOut" columnStart="2" columnEnd="-1">
                <Button onClick={logOut}>Log Out</Button>
            </Card>
            <Card columnStart="1" columnEnd="2">
                <AddUser usersDb={usersDb} setUsersDb={setUsersDb} />
            </Card>
            <Card columnStart="2" columnEnd="-1">
                <ListUsers
                    usersDb={usersDb}
                    setUsersDb={setUsersDb}
                ></ListUsers>
            </Card>
        </View>
    );
};

export default Dashboard;
