import bcrypt from 'bcrypt';

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

const decodePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash);
};

export {
    encryptPassword,
    decodePassword
};