import React, { useState, useEffect, ChangeEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
    View,
} from '@aws-amplify/ui-react';

import { initialUser, User, UserDb } from '../../types/userType';

import { users } from '../../data/users_data';

type Props = {
    usersDb: UserDb[];
    setUsersDb: Function;
};

const AddUser = (props: Props) => {
    const userDb = props.usersDb;
    const setUserDb = props.setUsersDb;

    console.log('userDb: ', userDb);

    const [newUser, setNewUser] = useState(initialUser);
    console.log('newUser: ', newUser);

    const [branchIdHasError, setBranchIdError] = useState(false);
    const [userNameHasError, setUserNameError] = useState(false);
    const [firstNameHasError, setFirstNameError] = useState(false);
    const [middleNameHasError, setMiddleNameError] = useState(false);
    const [lastNameHasError, setLastNameError] = useState(false);
    const [positionHasError, setPositionError] = useState(false);
    const [passwordHasError, setPasswordsError] = useState(false);
    const [formHasErrors, setFormHasErrors] = useState(true);
    const [userNameExistsError, setUserNameExistsError] = useState(false);

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [submitWasClickedOnce, setSubmitWasClickedOnce] = useState(false);

    const handleBranchIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const branchId: string = e.target.value;

        const test = /^[0-9]*$/.test(branchId);

        if (test) {
            setBranchIdError(false);

            setNewUser(
                Object.assign({
                    ...newUser,
                    branchId,
                })
            );
        }
    };

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewUser(Object.assign({ ...newUser, userName: e.target.value }));
    };

    const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewUser(Object.assign({ ...newUser, firstName: e.target.value }));
    };

    const handleMiddleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewUser(Object.assign({ ...newUser, middleName: e.target.value }));
    };

    const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewUser(Object.assign({ ...newUser, lastName: e.target.value }));
    };

    const handlePositionChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewUser(Object.assign({ ...newUser, position: e.target.value }));
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNewUser(Object.assign({ ...newUser, password: e.target.value }));
    };

    const handleOnReset = () => {
        setSubmitWasClickedOnce(false);
        setBranchIdError(false);
        setUserNameError(false);
        setFirstNameError(false);
        setMiddleNameError(false);
        setLastNameError(false);
        setPositionError(false);
        setPasswordsError(false);
        setNewUser(initialUser);
        setFormHasErrors(true);
    };

    const handleOnAdd = () => {
        setSubmitWasClickedOnce(true);

        checkFormForErrors();

        if (!formHasErrors && !userNameExisits()) {
            const branchId: number = parseInt(newUser.branchId!);

            const newUserWithBranchIdAsNumber: UserDb = Object.assign({
                ...newUser,
                branchId,
            });

            let newUserDb = userDb;

            newUserDb.push(newUserWithBranchIdAsNumber);

            setUserDb(newUserDb);

            setSubmitWasClickedOnce(false);

            console.log('newUserDb: ', newUserDb);
            console.log('userDb: ', userDb);
        }
    };

    const checkFormHasErrors = () => {
        if (
            !branchIdHasError &&
            !userNameHasError &&
            !firstNameHasError &&
            !middleNameHasError &&
            !lastNameHasError &&
            !positionHasError &&
            !passwordHasError
        ) {
            setDisableSubmit(false);
            setFormHasErrors(false);
        } else {
            setDisableSubmit(true);
            setFormHasErrors(false);
        }

        return formHasErrors;
    };

    const userNameExisits = () => {
        const userExists = userDb.find((user) => {
            return user.userName === newUser.userName;
        });
        return userExists?.userName;
    };

    const renderUserExists = () => {
        const userName = userNameExisits();

        if (userName) {
            return (
                <Text
                    variation="primary"
                    as="p"
                    color="red"
                    lineHeight="1.5em"
                    fontWeight={400}
                    fontSize="1em"
                    fontStyle="normal"
                    textDecoration="none"
                    width="30vw"
                >
                    {`User ${userName} already exists!`}
                </Text>
            );
        }
    };

    // Textfield props
    const branchIdTextFieldProps = {
        autoFocus: true,
        label: 'Branch ID',
        labelHidden: false,
        type: 'input',
        placeholder: '10001',
        onChange: handleBranchIdChange,
        value: newUser.branchId?.toString() ?? '',
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
        value: newUser.userName,
        hasError: userNameHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const firstNameTextFieldProps = {
        autoFocus: true,
        label: 'First Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Kingsley',
        onChange: handleFirstNameChange,
        value: newUser.firstName,
        hasError: firstNameHasError,
        errorMessage: 'Must 2-20 characters, no spaces',
    };

    const middleNameTextFieldProps = {
        autoFocus: true,
        label: 'Middle Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Jordan',
        onChange: handleMiddleNameChange,
        value: newUser.middleName,
        hasError: middleNameHasError,
        errorMessage: 'Must 2-20 characters, no spaces',
    };

    const lastNameTextFieldProps = {
        autoFocus: true,
        label: 'Last Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Parker',
        onChange: handleLastNameChange,
        value: newUser.lastName,
        hasError: lastNameHasError,
        errorMessage: 'Must 2-20 characters, no spaces',
    };

    const positionTextFieldProps = {
        autoFocus: true,
        label: 'Position',
        labelHidden: false,
        type: 'input',
        placeholder: 'Administrator',
        onChange: handlePositionChange,
        value: newUser.position,
        hasError: positionHasError,
        errorMessage: 'Must 4-20 characters, no spaces',
    };

    const passwordTextFieldProps = {
        autoFocus: true,
        label: 'Password',
        maxLength: 16,
        type: 'password',
        placeholder: '**********',
        onChange: handlePasswordChange,
        value: newUser.password,
        hasError: passwordHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const checkFormForErrors = () => {
        // @ts-ignore
        if (newUser.branchId === '') {
            setBranchIdError(true);
        }

        console.log('newUser at checking is: ', newUser);
        console.log('checkforErrors returned', checkFormHasErrors());

        if (newUser.branchId.toString().length === 5) {
            setBranchIdError(false);
        } else {
            setBranchIdError(true);
        }

        if (
            newUser.userName.length >= 8 &&
            newUser.userName.length <= 16 &&
            !/\s/.test(newUser.userName!)
        ) {
            setUserNameError(false);
        } else {
            setUserNameError(true);
        }

        if (
            newUser.firstName.length >= 2 &&
            newUser.firstName.length <= 20 &&
            !/\s/.test(newUser.firstName!)
        ) {
            setFirstNameError(false);
        } else {
            setFirstNameError(true);
        }

        if (newUser.middleName) {
            if (
                newUser.middleName.length >= 2 &&
                newUser.middleName.length <= 20 &&
                !/\s/.test(newUser.middleName!)
            ) {
                setMiddleNameError(false);
            } else {
                setMiddleNameError(true);
            }
        }

        if (
            newUser.lastName.length >= 2 &&
            newUser.lastName.length <= 20 &&
            !/\s/.test(newUser.lastName!)
        ) {
            setLastNameError(false);
        } else {
            setLastNameError(true);
        }

        if (
            newUser.position.length >= 4 &&
            newUser.position.length <= 20 &&
            !/\s/.test(newUser.position!)
        ) {
            setPositionError(false);
        } else {
            setPositionError(true);
        }

        if (
            newUser.password.length >= 8 &&
            newUser.password.length <= 16 &&
            !/\s/.test(newUser.userName!)
        ) {
            setPasswordsError(false);
        } else {
            setPasswordsError(true);
        }
    };

    useEffect(() => {
        if (submitWasClickedOnce) {
            checkFormForErrors();
        } else {
            setDisableSubmit(false);
        }
    }, [
        newUser.branchId,
        newUser.userName,
        newUser.firstName,
        newUser.middleName,
        newUser.lastName,
        newUser.position,
        newUser.password,
        branchIdHasError,
        userNameHasError,
        firstNameHasError,
        middleNameHasError,
        lastNameHasError,
        positionHasError,
        passwordHasError,
        formHasErrors,
        disableSubmit,
        submitWasClickedOnce,
    ]);

    const logBranchId = () => {
        console.log('branchId just before rendering: ', newUser.branchId);
    };

    return (
        <View>
            <Card className="addUser" variation="outlined">
                <Flex direction="column" justifyContent="center">
                    <Heading level={4}>Add a new user...</Heading>
                    <>{logBranchId()}</>
                    <TextField {...branchIdTextFieldProps} />
                    <TextField {...userNameTextFieldProps} />
                    <TextField {...firstNameTextFieldProps} />
                    <TextField {...middleNameTextFieldProps} />
                    <TextField {...lastNameTextFieldProps} />
                    <TextField {...positionTextFieldProps} />
                    <TextField {...passwordTextFieldProps} />
                    <Flex direction="row" justifyContent="end">
                        <Button
                            className="flexGrowButton"
                            onClick={handleOnReset}
                        >
                            Reset
                        </Button>
                        <Button
                            className="flexGrowButton"
                            onClick={handleOnAdd}
                            isDisabled={disableSubmit}
                        >
                            Add
                        </Button>
                    </Flex>
                    <>{renderUserExists()}</>
                </Flex>
            </Card>
        </View>
    );
};

export default AddUser;
