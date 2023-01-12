export const isNumber = (value: string | number) => {
    const reg = /^[0-9]+$/;
    return reg.test(value.toString());
};
