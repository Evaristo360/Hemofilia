import * as Yup from 'yup';
import { useIntl } from 'react-intl';
import { messages as formMessages } from '@octopy/react-form';
import { messages } from './ProfileUpdateMessages';

export const useProfile = () => {
  const { formatMessage: f } = useIntl();

  const requiredFieldError = f(formMessages.requiredFieldError);
  const invalidEmailError = f(formMessages.invalidEmailError);
  const onlyNumberRegex = /^\d/gm;

  const getValidationRules = () =>
    Yup.object().shape({
      avatar: Yup.object()
        .shape({ url: Yup.string() })
        .nullable()
        .required(requiredFieldError),
      name: Yup.string()
        .max(60)
        .required(requiredFieldError),
      email: Yup.string()
        .email(invalidEmailError)
        .required(requiredFieldError),
      license: Yup.string()
        .matches(onlyNumberRegex, {
          message: f(messages.invalidCedule),
          excludeEmptyString: true
        })
        .required(requiredFieldError),
      phone: Yup.string()
        .matches(onlyNumberRegex, {
          message: f(messages.invalidTelephone),
          excludeEmptyString: true
        })
        .min(10, f(messages.telephoneLength))
        .max(12, f(messages.telephoneLength)),
      speciality: Yup.string().required(requiredFieldError),
      state: Yup.string().required(requiredFieldError),
      clinic: Yup.string()
    });

  const initialValues = {
    name: '',
    email: '',
    license: '',
    phone: '',
    speciality: '',
    state: '',
    clinic: '',
    avatar: null
  };

  const inputProps = {
    variant: 'filled',
    fullWidth: true
  };

  const fieldsForm = [
    Object.assign(
      {
        type: 'text',
        name: 'name',
        label: f(formMessages.nameLabel),
        breakpoints: { xs: 12 }
      },
      inputProps
    ),
    Object.assign(
      {
        type: 'text',
        name: 'email',
        label: f(formMessages.emailLabel),
        breakpoints: { xs: 12 },
        disabled: true
      },
      inputProps
    ),
    Object.assign(
      {
        type: 'text',
        name: 'license',
        label: f(messages.ceduleLabel),
        breakpoints: { xs: 12 },
        disabled: true
      },
      inputProps
    ),
    Object.assign(
      {
        type: 'text',
        name: 'phone',
        label: f(messages.telephoneLabel),
        breakpoints: { xs: 12 }
      },
      inputProps
    ),
    Object.assign(
      {
        type: 'text',
        name: 'speciality',
        label: f(formMessages.specialtyLabel),
        breakpoints: { xs: 12 },
        disabled: true
      },
      inputProps
    ),
    Object.assign(
      {
        type: 'text',
        name: 'state',
        label: f(messages.stateLabel),
        breakpoints: { xs: 12 },
        disabled: true
      },
      inputProps
    ),
    Object.assign(
      {
        type: 'text',
        name: 'clinic',
        label: f(messages.clinicLabel),
        breakpoints: { xs: 12 }
      },
      inputProps
    )
  ];

  return { getValidationRules, initialValues, fieldsForm };
};
