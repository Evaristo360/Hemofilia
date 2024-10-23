import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  myAccount: {
    id: 'components.Profile.ProfileUpdate.myAccount',
    defaultMessage: 'Mi cuenta'
  },
  myAccountText: {
    id: 'components.Profile.ProfileUpdate.myAccount.text',
    defaultMessage:
      'Puedes decidir que datos quieres que sean visibles para otros colegas cuando consulten el directorio.'
  },
  ceduleLabel: {
    id: 'components.Profile.ProfileUpdate.form.ceduleLabel',
    defaultMessage: 'Cédula'
  },
  telephoneLabel: {
    id: 'components.Profile.ProfileUpdate.form.telephoneLabel',
    defaultMessage: 'Teléfono'
  },
  stateLabel: {
    id: 'components.Profile.ProfileUpdate.form.stateLabel',
    defaultMessage: 'Estado de la República Mexicana'
  },
  clinicLabel: {
    id: 'components.Profile.ProfileUpdate.form.clinicLabel',
    defaultMessage: 'Clínica'
  },
  deleteAccountTittle: {
    id: 'components.Profile.ProfileUpdate.deleteAccountTittle',
    defaultMessage: 'Darme de baja'
  },
  deleteAccountText: {
    id: 'components.Profile.ProfileUpdate.deleteAccountText',
    defaultMessage: 'Si quieres darte de baja solo tienes que dar click '
  },
  deleteAccountLink: {
    id: 'components.Profile.ProfileUpdate.deleteAccountLink',
    defaultMessage: 'Aquí'
  },
  saveButton: {
    id: 'components.Profile.ProfileUpdate.saveButton',
    defaultMessage: 'Guardar'
  },
  questionDeleteAccount: {
    id: 'components.Profile.ProfileUpdate.questionDeleteAccount',
    defaultMessage: '¿Está seguro que desea eliminar la cuenta?'
  },
  textDeleteAccount: {
    id: 'components.Profile.ProfileUpdate.textDeleteAccount',
    defaultMessage:
      'La información de la cuenta será eliminada y no podrá recuperarse'
  },
  cancelDeleteAccount: {
    id: 'components.Profile.ProfileUpdate.cancelDeleteAccount',
    defaultMessage: 'Cancelar'
  },
  acceptDeleteAccount: {
    id: 'components.Profile.ProfileUpdate.acceptDeleteAccount',
    defaultMessage: 'Aceptar'
  },
  //****************************VALIDATIONS********************************
  onlyLetters: {
    id: 'components.Profile.ProfileUpdate.onlyLetters',
    defaultMessage: 'Este campo solo puede contener letras'
  },
  invalidTelephone: {
    id: 'components.Profile.ProfileUpdate.invalidTelephone',
    defaultMessage: 'El número de teléfono es inválido'
  },
  telephoneLength: {
    id: 'components.Profile.ProfileUpdate.telephoneLength',
    defaultMessage: 'Teléfono debe contener 10 dígitos'
  },
  invalidCedule: {
    id: 'components.Profile.ProfileUpdate.invalidCedule',
    defaultMessage: 'El número de cédula es inválido'
  },
  ceduleLength: {
    id: 'components.Profile.ProfileUpdate.ceduleLength',
    defaultMessage: 'Cédula debe contener entre 7-8 dígitos'
  },
  uploadFileError: {
    id: 'components.Profile.ProfileUpdate.uploadFileError',
    defaultMessage:
      'Ha ocurrido un error al intentar subir la imagen. Vuelve a intentarlo'
  }
});
