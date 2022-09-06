import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    Divider,
    Flex,
    Grid,
    Heading,
    Text,
    View,
} from '@aws-amplify/ui-react';

import { UserContext } from '../../App';
import * as cssProps from './listUsersProps';

const ListUsers = () => {
    const { userDb, setUserDb, userPoolSize } = React.useContext(UserContext);

    const renderUserList = () => {
        return userDb.map((user, index) => {
            return (
                <Grid {...cssProps.listGridProps} key={index}>
                    <Text {...cssProps.recordProps}>{index + 1}</Text>
                    <Text {...cssProps.branchIdProps}>{user.branchId}</Text>
                    <Text {...cssProps.userNameProps}>{user.userName}</Text>
                    <Text
                        {...cssProps.nameProps}
                    >{`${user.firstName} ${user.middleName} ${user.lastName}`}</Text>
                    <Text {...cssProps.positionProps}>{user.position}</Text>
                    {/* @ts-ignore */}
                    <Button
                        {...cssProps.buttonProps}
                        onClick={() => handleRemove(index)}
                    >
                        Remove
                    </Button>
                </Grid>
            );
        });
    };

    const handleRemove = (index: number) => {
        console.log(`removing entry at index ${index}`);

        console.log('userDb in handleRemove - before splice: ', userDb);
        setUserDb(Object.assign(userDb.splice(index, 1)));
        console.log('userDb in handleRemove - after splice: ', userDb);
    };

    useEffect(() => {}, [userPoolSize]);

    return (
        <View>
            <Card className="listUsers" variation="outlined">
                <Flex direction="column" justifyContent="center">
                    <Heading level={4}>List of all Users...</Heading>
                    <Grid {...cssProps.headerGridProps}>
                        <Text {...cssProps.recordProps}>#</Text>
                        <Text {...cssProps.branchIdProps}>Branch ID</Text>
                        <Text {...cssProps.userNameProps}>User Name</Text>
                        <Text {...cssProps.nameProps}>Name</Text>
                        <Text {...cssProps.positionProps}>Position</Text>
                        <Text {...cssProps.actionProps}>Action</Text>
                    </Grid>
                    <Divider />
                    <ul>
                        <li>{renderUserList()}</li>
                    </ul>
                </Flex>
            </Card>
        </View>
    );
};

export default ListUsers;
