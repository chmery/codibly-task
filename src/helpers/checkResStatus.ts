import { clientSideError, error404, serverSideError } from "../constants/errorMessages";

export const checkResStatus = (res: Response) => {
    const { status } = res;

    if (status === 404) {
        throw new Error(error404);
    }

    if (status >= 400 && status <= 499) {
        throw new Error(clientSideError);
    }

    if (status >= 500 && status <= 599) {
        throw new Error(serverSideError);
    }
};
