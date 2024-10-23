import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  imageDescription: {
    id: 'components.WebinarsWeb.WebinarForm.imageDescription',
    defaultMessage: 'Selecciona una imagen'
  },
  imageLabel: {
    id: 'components.WebinarsWeb.WebinarForm.imageLabel',
    defaultMessage: 'Subir foto'
  },
  themeLabel: {
    id: 'components.WebinarsWeb.WebinarForm.themeLabel',
    defaultMessage: 'Tema a tratar'
  },
  themePlaceholder: {
    id: 'components.WebinarsWeb.WebinarForm.themePlaceholder',
    defaultMessage: 'Ingresa el tema a tratar'
  },
  dateLabel: {
    id: 'components.WebinarsWeb.WebinarForm.dateLabel',
    defaultMessage: 'Fecha'
  },
  datePlaceholder: {
    id: 'components.WebinarsWeb.WebinarForm.datePlaceholder',
    defaultMessage: 'dd/mm/aaaa'
  },
  startTimeLabel: {
    id: 'components.WebinarsWeb.WebinarForm.startTimeLabel',
    defaultMessage: 'Hora de inicio'
  },
  startTimePlaceholder: {
    id: 'components.WebinarsWeb.WebinarForm.startTimePlaceholder',
    defaultMessage: 'hh:mm'
  },
  endTimeLabel: {
    id: 'components.WebinarsWeb.WebinarForm.endTimeLabel',
    defaultMessage: 'Hora de término'
  },
  endTimePlaceholder: {
    id: 'components.WebinarsWeb.WebinarForm.endTimePlaceholder',
    defaultMessage: 'hh:mm'
  },
  descriptionLabel: {
    id: 'components.WebinarsWeb.WebinarForm.descriptionLabel',
    defaultMessage: 'Descripción'
  },
  descriptionPlaceholder: {
    id: 'components.WebinarsWeb.WebinarForm.descriptionPlaceholder',
    defaultMessage:
      'Ingresa una descripción breve del webinar o título de la misma'
  },
  commentLabel: {
    id: 'components.WebinarsWeb.WebinarForm.commentLabel',
    defaultMessage: 'Comentario'
  },
  commentPlaceholder: {
    id: 'components.WebinarsWeb.WebinarForm.commentPlaceholder',
    defaultMessage:
      'Ingresa un comentario que justifique los cambios realizados'
  },
  requiredError: {
    id: 'components.WebinarsWeb.WebinarForm.requiredError',
    defaultMessage: 'Este campo es requerido'
  },
  laterThanStartDateError: {
    id: 'components.WebinarsWeb.WebinarForm.higherThanStartDate',
    defaultMessage: 'Debe ser luego de la hora de inicio'
  },
  laterThanTomorrowError: {
    id: 'components.WebinarsWeb.WebinarForm.higherThanTomorrow',
    defaultMessage: 'Debe tener 24 horas de anticipación'
  },
  uploadFileError: {
    id: 'components.WebinarsWeb.WebinarForm.uploadFileError',
    defaultMessage:
      'Ha ocurrido un error al intentar subir la imagen. Vuelve a intentarlo'
  }
});
