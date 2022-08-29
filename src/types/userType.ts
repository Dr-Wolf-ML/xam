export interface User {
    branchId: string;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
}

export const initialUser: User = {
    branchId: '',
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
};

export interface UserDb {
    branchId: number;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    position: string;
}

export const initialUserDb: UserDb = {
    branchId: 1,
    userName: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    position: '',
};

export interface AppContext {
    currentUser: User;
    setCurrentUser: Function;
    userDb: UserDb[];
    setUserDb: Function;
}

export const initialContext: AppContext = {
    currentUser: initialUser,
    setCurrentUser: () => {},
    userDb: [initialUserDb],
    setUserDb: () => {},
};

export interface addUserFormErrors {
    branchIdHasError: boolean;
    userNameHasError: boolean;
    firstNameHasError: boolean;
    middleNameHasError: boolean;
    lastNameHasError: boolean;
    positionHasError: boolean;
    passwordHasError: boolean;
    formHasErrors: boolean;
}

export const initialAddUserFormErrors: addUserFormErrors = {
    branchIdHasError: false,
    userNameHasError: false,
    firstNameHasError: false,
    middleNameHasError: false,
    lastNameHasError: false,
    positionHasError: false,
    passwordHasError: false,
    formHasErrors: true,
};
