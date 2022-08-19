export interface User {
    branchId?: number;
    userName?: string;
    password?: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    position?: string;
}

export const initialUser: User = {};

export interface AppContext {
    currentUser?: User;
    setCurrentUser?: Function;
}

export const initialContext: AppContext = {};
