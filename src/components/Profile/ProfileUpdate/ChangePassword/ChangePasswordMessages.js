import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  title: {
    id: 'components.Profile.changePassword.title',
    defaultMessage: 'Cambiar contraseña'
  },
  changeButton: {
    id: 'components.Profile.changePassword.changeButton',
    defaultMessage: 'Cambiar'
  },
  passwordNotMatchRegex: {
    id: 'components.Profile.changePassword.passwordNotMatchRegex',
    defaultMessage:
      'La contraseña no cumple con la política de seguridad (Min. 8 caracteres, 1 mayúscula, 1 número y 1 símbolo).'
  }
});
