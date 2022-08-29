import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    Button,
    Card,
    Flex,
    Heading,
    Text,
    TextField,
    View,
} from '@aws-amplify/ui-react';

import {
    initialUser,
    UserDb,
    initialAddUserFormErrors,
} from '../../types/userType';

import { UserContext } from '../../App';

interface Update {
    update: number;
    setUpdate: Function;
}

const AddUser = ({ update, setUpdate }: Update) => {
    //! App Context
    const { userDb, setUserDb } = React.useContext(UserContext);

    console.log('userDb in AddUser: ', userDb);

    const [newUser, setNewUser] = useState(initialUser);
    console.log('newUser: ', newUser);

    const [formErrors, setFormErrors] = useState(initialAddUserFormErrors);

    const [disableSubmit, setDisableSubmit] = useState(true);
    const [submitWasClickedOnce, setSubmitWasClickedOnce] = useState(false);

    const handleBranchIdChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const branchId: string = e.target.value;

        const test = /^[0-9]*$/.test(branchId);

        if (test) {
            setFormErrors({ ...formErrors, branchIdHasError: false });
            setNewUser({ ...newUser, branchId: branchId });
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
        setNewUser(initialUser);
        setFormErrors(initialAddUserFormErrors);
    };

    const handleOnAdd = async () => {
        setSubmitWasClickedOnce(true);

        checkFormForErrors();

        console.warn(
            'handleOnAdd was clicked with this formHasErrors value: ',
            formErrors.formHasErrors,
            newUser.userName,
            formErrors.userNameHasError
        );

        if (
            !formErrors.formHasErrors &&
            !userNameExisits() &&
            !formErrors.userNameHasError
        ) {
            const branchId: number = parseInt(newUser.branchId);

            const newUserWithBranchIdAsNumber: UserDb = Object.assign({
                ...newUser,
                branchId,
            });

            console.log('userDb before setting in AddUser', userDb);

            const nextIndex = userDb.length;
            userDb[nextIndex] = newUserWithBranchIdAsNumber;
            setUserDb(userDb);

            const nextUpdate = update + 1;
            setUpdate(nextUpdate);

            console.log('userDb after setting in AddUser', userDb);

            setSubmitWasClickedOnce(false);
            newUser.userName = '';
            setNewUser(newUser);
        }
    };

    const checkFormHasErrors = () => {
        if (
            !formErrors.branchIdHasError &&
            !formErrors.userNameHasError &&
            !formErrors.firstNameHasError &&
            !formErrors.middleNameHasError &&
            !formErrors.lastNameHasError &&
            !formErrors.positionHasError &&
            !formErrors.passwordHasError
        ) {
            setDisableSubmit(false);
            formErrors.formHasErrors = false;
        } else {
            setDisableSubmit(true);
            formErrors.formHasErrors = true;
        }

        setFormErrors(formErrors);

        return formErrors.formHasErrors;
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
        hasError: formErrors.branchIdHasError,
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
        hasError: formErrors.userNameHasError,
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
        hasError: formErrors.firstNameHasError,
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
        hasError: formErrors.middleNameHasError,
        errorMessage: 'Can have up to 20 characters, no spaces',
    };

    const lastNameTextFieldProps = {
        autoFocus: true,
        label: 'Last Name',
        labelHidden: false,
        type: 'input',
        placeholder: 'Parker',
        onChange: handleLastNameChange,
        value: newUser.lastName,
        hasError: formErrors.lastNameHasError,
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
        hasError: formErrors.positionHasError,
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
        hasError: formErrors.passwordHasError,
        errorMessage: 'Must 8-16 characters, no spaces',
    };

    const checkFormForErrors = () => {
        if (newUser.branchId === '') {
            formErrors.branchIdHasError = true;
        }

        console.log('newUser at checking is: ', newUser);
        console.log('checkforErrors returned', checkFormHasErrors());

        if (newUser.branchId.toString().length === 5) {
            formErrors.branchIdHasError = false;
        } else {
            formErrors.branchIdHasError = true;
        }

        if (
            newUser.userName.length >= 8 &&
            newUser.userName.length <= 16 &&
            !/\s/.test(newUser.userName)
        ) {
            formErrors.userNameHasError = false;
        } else {
            formErrors.userNameHasError = true;
        }

        if (
            newUser.firstName.length >= 2 &&
            newUser.firstName.length <= 20 &&
            !/\s/.test(newUser.firstName)
        ) {
            formErrors.firstNameHasError = false;
        } else {
            formErrors.firstNameHasError = true;
        }

        if (newUser.middleName) {
            if (
                newUser.middleName.length <= 20 &&
                !/\s/.test(newUser.middleName)
            ) {
                formErrors.middleNameHasError = false;
            } else {
                formErrors.middleNameHasError = true;
            }
        }

        if (
            newUser.lastName.length >= 2 &&
            newUser.lastName.length <= 20 &&
            !/\s/.test(newUser.lastName)
        ) {
            formErrors.lastNameHasError = false;
        } else {
            formErrors.lastNameHasError = true;
        }

        if (
            newUser.position.length >= 4 &&
            newUser.position.length <= 20 &&
            !/\s/.test(newUser.position)
        ) {
            formErrors.positionHasError = false;
        } else {
            formErrors.positionHasError = true;
        }

        if (
            newUser.password.length >= 8 &&
            newUser.password.length <= 16 &&
            !/\s/.test(newUser.userName)
        ) {
            formErrors.passwordHasError = false;
        } else {
            formErrors.passwordHasError = true;
        }

        setFormErrors(formErrors);
    };

    useEffect(() => {
        if (submitWasClickedOnce) {
            checkFormForErrors();
        } else {
            setDisableSubmit(false);
        }
    }, [
        userDb,
        newUser,
        formErrors,
        disableSubmit,
        submitWasClickedOnce,
        update,
    ]);

    return (
        <View>
            <Card className="addUser" variation="outlined">
                <Flex direction="column" justifyContent="center">
                    <Heading level={4}>Add a new user...</Heading>
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
