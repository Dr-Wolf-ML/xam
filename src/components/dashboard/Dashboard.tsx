import React from 'react';
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

import { initialUser, AppContext } from '../../types/userType';

import { users } from '../../data/users_data';
import { UserContext } from '../../App';
// import isEmail from 'validator/lib/isEmail';

type Props = {
    setCurrentUser: ({}) => void;
};

const Dashboard = (props: Props) => {
    let navigate = useNavigate();

    const value = React.useContext(UserContext);
    const userName: any = value['currentUser'];
    console.log('userName in Dashboard: ', userName);

    const logOut = () => {
        const setCurrentUser = props.setCurrentUser;
        setCurrentUser(initialUser);

        navigate('/', { replace: true });
    };

    return (
        <View>
            <Grid
                columnGap="0.5rem"
                rowGap="0.5rem"
                templateColumns="1fr 1fr 1fr"
                templateRows="1fr 3fr 1fr"
            >
                <Card columnStart="1" columnEnd="1">
                    <h1>{userName}</h1>
                </Card>
                <Card columnStart="3" columnEnd="-1">
                    <Button onClick={logOut}>Log Out</Button>
                </Card>
                <Card columnStart="1" columnEnd="2">
                    New User
                </Card>
                <Card columnStart="2" columnEnd="-1">
                    All Users
                </Card>
            </Grid>
        </View>
    );
};

export default Dashboard;
