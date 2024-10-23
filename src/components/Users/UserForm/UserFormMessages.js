import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  submitLabel: {
    id: 'components.User.UserForm.Label',
    defaultMessage: 'Enviar'
  },
  imagesLabel: {
    id: 'components.User.UserForm.imagesLabel',
    defaultMessage: 'Subir imagen'
  },
  passwordNotMatchRegex: {
    id: 'components.User.UserForm.passwordNotMatchRegex',
    defaultMessage:
      'La contraseña no cumple con la política de seguridad (Min. 8 caracteres, 1 mayúscula, 1 número y 1 símbolo).'
  }
});
