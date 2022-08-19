import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
    View,
} from '@aws-amplify/ui-react';

import { initialUser, AppContext, User } from '../../types/userType';

import { users } from '../../data/users_data';
// import isEmail from 'validator/lib/isEmail';

type Props = {
    usersDb: User[];
    setUsersDb: Function;
};

const NewUser = (props: Props) => {
    const userDb = props.usersDb;
    const setUserDb = props.setUsersDb;

    const [branchId, setBranchId] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [branchIdHasError, setBranchIdError] = useState(false);
    const [userNameHasError, setUserNameError] = useState(false);
    const [passwordHasError, setPasswordsError] = useState(false);

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [submitWasClickedOnce, setSubmitWasClickedOnce] = useState(false);
    const [credentialError, setCredentialError] = useState(false);

    let navigate = useNavigate();

    const handleBranchIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBranchId(e.target.value);
    };

    const handlUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleOnSubmit = async () => {
        setSubmitWasClickedOnce(true);

        for (var i = 0; i < users.length; i++) {
            const branchMatch = parseInt(branchId) === users[i].branchId;
            const userNameMatch = userName === users[i].userName;
            const passwordMatch = password === users[i].password;

            const credentialMatch =
                branchMatch && userNameMatch && passwordMatch;

            console.log('Iteration index: ', i);
            console.log('Iteration of users: ', users[i]);
            console.log('Iteration of users.userName: ', users[i].userName);

            if (credentialMatch) {
                // setCurrentUser(Object.assign(users[i]).userName);

                setCredentialError(false);

                navigate('/dashboard', { replace: true });
                break;
            } else {
                setCredentialError(true);
            }
        }
    };

    const branchIdTextFieldProps = {
        autoFocus: true,
        label: 'Branch ID',
        labelHidden: false,
        type: 'input',
        placeholder: '10001',
        onChange: handleBranchIdChange,
        value: branchId,
        hasError: branchIdHasError,
        errorMessage: 'Must be exactly 5 numbers',
    };

    const userNameTextFieldProps = {
        autoFocus: true,
        label: 'User Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'username01',
        onChange: handlUserNameChange,
        value: userName,
        hasError: userNameHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const firstNameTextFieldProps = {
        autoFocus: true,
        label: 'First Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Kingsley',
        onChange: handlUserNameChange,
        value: userName,
        hasError: userNameHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const middleNameTextFieldProps = {
        autoFocus: true,
        label: 'Middle Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Jordan',
        onChange: handlUserNameChange,
        value: userName,
        hasError: userNameHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const lastNameTextFieldProps = {
        autoFocus: true,
        label: 'Last Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Parker',
        onChange: handlUserNameChange,
        value: userName,
        hasError: userNameHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const positionTextFieldProps = {
        autoFocus: true,
        label: 'Position',
        labelHidden: false,
        type: 'input',
        placeholder: 'Administrator',
        onChange: handlUserNameChange,
        value: userName,
        hasError: userNameHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const passwordTextFieldProps = {
        autoFocus: true,
        label: 'Password',
        maxLength: 16,
        type: 'password',
        placeholder: '**********',
        hasError: passwordHasError,
        errorMessage: 'Must 8-16 characters',
        onChange: handlePasswordChange,
        value: password,
    };

    const errorTextProps = {
        autoFocus: true,
        label: 'Password',
        maxLength: 16,
        type: 'password',
        placeholder: '**********',
        hasError: passwordHasError,
        errorMessage: 'Must 8-16 characters',
        onChange: handlePasswordChange,
        value: password,
    };

    const renderLoginErrorMessage = () => {
        if (credentialError) {
            return (
                <Text className="error" variation="warning">
                    Error: Login detail incorrect...
                </Text>
            );
        }
    };

    useEffect(() => {
        // error checking
        if (!submitWasClickedOnce) {
            setBranchIdError(false);
        } else if (branchId.length === 5 && parseInt(branchId) / 1) {
            setBranchIdError(false);
        } else {
            setBranchIdError(true);
        }

        if (!submitWasClickedOnce) {
            setBranchIdError(false);
        } else if (
            userName.length >= 8 &&
            userName.length <= 16 &&
            !/\s/.test(userName)
        ) {
            setUserNameError(false);
        } else {
            setUserNameError(true);
        }

        if (!submitWasClickedOnce) {
            setBranchIdError(false);
        } else if (password.length >= 8 && password.length <= 16) {
            setPasswordsError(false);
        } else {
            setPasswordsError(true);
        }

        !branchIdHasError && !userNameHasError && !passwordHasError
            ? setDisableSubmit(false)
            : setDisableSubmit(true);
    }, [
        branchId,
        userName,
        password,
        branchIdHasError,
        userNameHasError,
        passwordHasError,
        disableSubmit,
        submitWasClickedOnce,
    ]);

    return (
        <View>
            <Card className="newUser" variation="outlined">
                <Flex direction="column" justifyContent="center">
                    <Heading level={4}>Add a new user...</Heading>
                    <TextField {...branchIdTextFieldProps} />
                    <TextField {...userNameTextFieldProps} />

                    <TextField {...firstNameTextFieldProps} />
                    <TextField {...middleNameTextFieldProps} />
                    <TextField {...lastNameTextFieldProps} />
                    <TextField {...positionTextFieldProps} />

                    <TextField {...passwordTextFieldProps} />
                    <Button
                        className="flexGrowButton"
                        onClick={handleOnSubmit}
                        isDisabled={disableSubmit}
                    >
                        Submit
                    </Button>
                    {renderLoginErrorMessage()}
                </Flex>
            </Card>
        </View>
    );
};

export default NewUser;
