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

import { UserContext } from '../../App';

// Types
import { UserDb } from '../../types/userType';

const Login = () => {
    const { setCurrentUser, userDb } = React.useContext(UserContext);

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

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleOnSubmit = async () => {
        setSubmitWasClickedOnce(true);

        const credentialsCheck: any = () => {
            return userDb!.find((user) => {
                return (
                    user.branchId === parseInt(branchId) &&
                    user.userName === userName &&
                    user.password === password
                );
            });
        };

        const userMatch = credentialsCheck();

        if (userMatch) {
            setCurrentUser!(userMatch);
            setCredentialError(false);
            navigate('/dashboard', { replace: true });
        } else {
            setCredentialError(true);
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
        onChange: handleUserNameChange,
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
        onChange: handlePasswordChange,
        value: password,
        hasError: passwordHasError,
        errorMessage: 'Must 8-16 characters',
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
        } else {
            if (branchId.length === 5 && parseInt(branchId) / 1) {
                setBranchIdError(false);
            } else {
                setBranchIdError(true);
            }

            if (
                userName.length >= 8 &&
                userName.length <= 16 &&
                !/\s/.test(userName)
            ) {
                setUserNameError(false);
            } else {
                setUserNameError(true);
            }

            if (password.length >= 8 && password.length <= 16) {
                setPasswordsError(false);
            } else {
                setPasswordsError(true);
            }
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
            <Card className="loginCard" variation="outlined">
                <Flex direction="column" justifyContent="center">
                    <Heading level={4}>
                        Please enter your login details...
                    </Heading>
                    <TextField {...branchIdTextFieldProps} />
                    <TextField {...userNameTextFieldProps} />
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

export default Login;
