import { createTransport } from 'nodemailer';
import config from '../utils/config.js';
import { templateHtml } from './template.js';

const etherealTransporter = createTransport({
    host: config.ethereal.HOST,
    port: config.ethereal.PORT,
    auth: {
        user: config.ethereal.EMAIL,
        pass: config.ethereal.PASSWORD,
    }
});

const gmailTransporter = createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    auth: {
        user: config.gmail.EMAIL,
        pass: config.gmail.PASSWORD
    }
});

const defaultMailOptions = {
    from: config.ethereal.EMAIL,
    subject: 'Bienvenido/a',
};

export const mailOptionsEthereal = {
    ...defaultMailOptions,
    to: config.ethereal.EMAIL,
    html: templateHtml,
};

export const mailOptionsGmail = (dest, name) => ({
    ...defaultMailOptions,
    from: config.gmail.EMAIL,
    to: dest,
    subject: 'Bienvenido/a',
    html: `<h1>Hola ${name}, ¡Te damos la bienvenida!</h1>`
});

export const mailOptionsGmailLoginOk = (dest, name) => ({
    ...defaultMailOptions,
    from: config.gmail.EMAIL,
    to: dest,
    subject: 'Inicio de sesión exitoso',
    html: `<h1>Tu inicio de sesión fue exitoso</h1>`
});

export const transporterEthereal = etherealTransporter;
export const transporterGmail = gmailTransporter;
