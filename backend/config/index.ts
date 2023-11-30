import * as dotenv from 'dotenv';
dotenv.config();

const config = {
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    port: process.env.PORT || 3000,
};

export default config;
