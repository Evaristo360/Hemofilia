import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  uploadFileError: {
    id: 'components.Auth.Register.uploadFileError',
    defaultMessage:
      'Ha ocurrido un error al intentar subir la imagen. Vuelve a intentarlo.'
  },
  invalidId: {
    id: 'components.Auth.Register.invalidId',
    defaultMessage: 'Introduce unacédula válida.'
  },
  successRegisterMessage: {
    id: 'components.Auth.Register.successRegisterMessage',
    defaultMessage:
      'Tu cuenta ha sido creada con éxito, para ingresar sigue las instrucciones que hemos enviado a tu correo.'
  }
});
