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
    currentUser?: User;
    setCurrentUser?: Function;
}

export const initialContext: AppContext = {};
