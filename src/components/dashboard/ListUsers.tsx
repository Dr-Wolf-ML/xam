import React, { useState, useEffect, ChangeEvent } from 'react';
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

import { initialUser, UserDb } from '../../types/userType';

import { users } from '../../data/users_data';

type Props = {
    usersDb: UserDb[];
    setUsersDb: Function;
};

const ListUsers = (props: Props) => {
    const userDb = props.usersDb;
    const setUserDb = props.setUsersDb;

    const headerGridProps = {
        className: 'listGrid',
        width: '100%',
        templateColumns: '1fr 2fr 3fr 3fr 3fr 2fr',
        templateAreas: 'record branchId userName name position action',
        fontSize: '1.5rem',
        fontWeight: '700',
    };

    const listGridProps = {
        className: 'listGrid',
        width: '100%',
        templateColumns: '1fr 2fr 3fr 3fr 3fr 2fr',
        templateAreas: 'record branchId userName name position action',
        fontSize: '1.2rem',
        fontWeight: '400',
        border: '1px solid white',
    };

    const recordProps = {
        className: 'record',
        area: 'record',
        style: { placeSelf: 'center', alignSelf: 'center' },
    };

    const branchIdProps = {
        area: 'branchId',
        style: { placeSelf: 'start', alignSelf: 'center' },
    };

    const userNameProps = {
        area: 'userName',
        style: { placeSelf: 'start', alignSelf: 'center' },
    };

    const nameProps = {
        area: 'name',
        style: { placeSelf: 'start', alignSelf: 'center' },
    };

    const positionProps = {
        area: 'position',
        style: { placeSelf: 'start', alignSelf: 'center' },
    };

    const actionProps = {
        area: 'action',
        style: {
            margin: '8px',
            padding: '2px 12px 2px 12px',
            placeSelf: 'center',
            alignSelf: 'center',
        },
    };

    return (
        <View>
            <Card className="listUsers" variation="outlined">
                <Flex direction="column" justifyContent="center">
                    <Heading level={4}>List of all Users...</Heading>
                    <Grid {...headerGridProps}>
                        <Text {...recordProps}>#</Text>
                        <Text {...branchIdProps}>Branch ID</Text>
                        <Text {...userNameProps}>User Name</Text>
                        <Text {...nameProps}>Name</Text>
                        <Text {...positionProps}>Position</Text>
                        <Text {...actionProps}>Action</Text>
                    </Grid>
                    <ul>
                        <li>
                            <Grid {...listGridProps}>
                                <Text {...recordProps}>1</Text>
                                <Text {...branchIdProps}>12345</Text>
                                <Text {...userNameProps}>testuser01</Text>
                                <Text {...nameProps}>John S.Doe</Text>
                                <Text {...positionProps}>Developer</Text>
                                <Button
                                    {...actionProps}
                                    size="small"
                                    className="button"
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </li>
                        <li>
                            <Grid {...listGridProps}>
                                <Text {...recordProps}>1</Text>
                                <Text {...branchIdProps}>12345</Text>
                                <Text {...userNameProps}>testuser01</Text>
                                <Text {...nameProps}>John S.Doe</Text>
                                <Text {...positionProps}>Developer</Text>
                                <Button
                                    {...actionProps}
                                    size="small"
                                    className="button"
                                >
                                    Remove
                                </Button>
                            </Grid>
                        </li>
                    </ul>
                </Flex>
            </Card>
        </View>
    );
};

export default ListUsers;
