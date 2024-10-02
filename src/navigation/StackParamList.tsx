

// export type RootStackParamList = {
//     Login: undefined; // No params expected
//     Register: undefined; // No params expected
//     Home: undefined; // No params expected
//     UserForm: { user?: User; isEdit: boolean; refresh: () => void };
//     ResetPassword: undefined; // Add ResetPassword to the RootStackParamList

// };

export type RootStackParamList = {
    Home: undefined;
    ServiceForm: { service?: Service; isEdit: boolean; refresh: () => void };
    ServiceDetail: { id: string };
    UserForm: { user?: User; isEdit: boolean; refresh: () => void };

    // Các màn hình khác...
};

interface Service {
    id: string;
    serviceName: string;
    description: string;
    price: number;
}
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
