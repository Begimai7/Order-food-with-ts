import { UserRoles } from "../common/utils";
import { mainApi } from "../config/instances";

type Props = {
    email: string;
    password: string;
};

type SignInResponse = {
    data: {
        token: string;
        user: {
            role: UserRoles;
            email: string;
            name: string;
        };
    };
};

const signIn = (data: Props) => {
    return mainApi.post<SignInResponse>("auth/login", data);
};

const signUp = (data: Props) => {
    return mainApi.post<SignInResponse>("auth/register", data);
};

export default {
    signIn,
    signUp,
};
