import "dotenv/config";

const config = {
    server: {
        PORT: process.env.PORT,
        DB: process.env.DB,
        PERSISTENCE: process.env.PERSISTENCE,
    },
    mongo: {
        MONGO_ATLAS_URL: process.env.MONGO_ATLAS_URL,
    },
    auth: {
        SECRET_KEY_JWT: process.env.SECRET_KEY_JWT,
    },
    ethereal: {
        PORT: process.env.PORT_ETHEREAL,
        EMAIL: process.env.EMAIL_ETHEREAL,
        PASSWORD: process.env.PASSWORD_ETHEREAL,
        NAME: process.env.NAME_ETHEREAL,
        HOST: process.env.HOST_ETHEREAL,
    },
    gmail: {
        EMAIL: process.env.EMAIL_GMAIL,
        PASSWORD: process.env.PASSWORD_GMAIL,
    },
    twilio: {
        PHONE: process.env.TWILIO_PHONE,
        SID: process.env.TWILIO_SID,
        TOKEN: process.env.TWILIO_TOKEN,
    },
};

export default config;
