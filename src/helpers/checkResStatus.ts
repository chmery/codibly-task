import { clientSideError, serverSideError } from "../constants/errorMessages";

export const checkResStatus = (res: Response) => {
    if (res.status >= 400 && res.status <= 499) {
        throw new Error(clientSideError);
    }

    if (res.status >= 500 && res.status <= 599) {
        throw new Error(serverSideError);
    }
};
