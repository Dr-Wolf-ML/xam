import { CheckFormErrors } from '../../types/userType';

const checkFormForErrors = ({
    newUser,
    formErrors,
    setFormErrors,
    checkFormHasErrors,
}: CheckFormErrors) => {
    if (newUser.branchId === '') {
        formErrors.branchIdHasError = true;
    }

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
        if (newUser.middleName.length <= 20 && !/\s/.test(newUser.middleName)) {
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

    console.log('newUser at END of checking is: ', newUser);
    console.log(
        'checkforErrors at END of checking returned',
        checkFormHasErrors()
    );

    setFormErrors(formErrors);
};

export default checkFormForErrors;
