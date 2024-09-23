

export type RootStackParamList = {
    Login: undefined; // No params expected
    Register: undefined; // No params expected
    Home: undefined; // No params expected
    UserForm: { user?: User; isEdit: boolean; refresh: () => void };
};

export interface User {
    id: string;
    name: string;
    email: string;
    age: number;
}


export type StackParamList = {
    Categories: undefined;
    ContactDetail: {
        contact: {
            name: { first: string; last: string };
            phone: string;
            email: string;
            location: { city: string; state: string; country: string };
            picture: string;  // picture URL, not the entire picture object
        };
    };
};
