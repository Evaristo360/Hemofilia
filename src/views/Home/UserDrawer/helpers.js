import { useIntl } from 'react-intl';
import { messages } from './UserDrawerMessages';
import * as Yup from 'yup';
import UploadIcon from '@material-ui/icons/PublishRounded';

export const useInitialValues = () => ({
  images: [],
  title: '',
  name: '',
  store: '',
  location: '',
  withUrl: true,
  url: '',
  description: '',
  type: false,
  visibility: 'forever',
  expirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
});

export const useFields = () => {
  const intl = useIntl();

  return [
    {
      section: 'images',
      type: 'image',
      name: 'images',
      breakpoints: { xs: 12 },
      icon: UploadIcon,
      label: intl.formatMessage(messages.imagesLabel),
      multiple: true,
      max: 5
    },
    {
      section: 'data',
      type: 'text',
      name: 'title',
      label: intl.formatMessage(messages.titleLabel),
      placeholder: intl.formatMessage(messages.titlePlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      section: 'data',
      type: 'text',
      name: 'name',
      label: intl.formatMessage(messages.nameLabel),
      placeholder: intl.formatMessage(messages.namePlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      section: 'data',
      type: 'select',
      name: 'store',
      label: intl.formatMessage(messages.storeLabel),
      placeholder: intl.formatMessage(messages.storePlaceholder),
      options: [
        { name: 'mx', label: 'Nestle México' },
        { name: 'mx2', label: 'Nestle México 2' }
      ],
      getOptionLabel: (option) => `${option.label || ''}`,
      breakpoints: { xs: 12 }
    },
    {
      section: 'data',
      type: 'text',
      name: 'location',
      label: intl.formatMessage(messages.locationLabel),
      placeholder: intl.formatMessage(messages.locationPlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      section: 'data',
      type: 'checkbox',
      name: 'withUrl',
      breakpoints: { xs: 2 }
    },
    ({ values: { withUrl } }) => ({
      section: 'data',
      type: 'text',
      name: 'url',
      label: intl.formatMessage(messages.urlLabel),
      placeholder: intl.formatMessage(messages.urlPlaceholder),
      breakpoints: { xs: 10 },
      disabled: !withUrl
    }),
    {
      section: 'data',
      type: 'textarea',
      name: 'description',
      label: intl.formatMessage(messages.descriptionLabel),
      placeholder: intl.formatMessage(messages.descriptionPlaceholder),
      breakpoints: { xs: 12 }
    },
    {
      section: 'type',
      type: 'switch',
      name: 'type',
      row: true,
      label: 'Tipo de beacon',
      breakpoints: { xs: 12 },
      color: 'secondary'
    },
    {
      section: 'visibility',
      type: 'radioGroup',
      name: 'visibility',
      row: true,
      options: [
        {
          name: 'forever',
          label: intl.formatMessage(messages.visibilityForeverLabel)
        },
        {
          name: 'inactive',
          label: intl.formatMessage(messages.visibilityInactiveLabel)
        },
        {
          name: 'until',
          label: intl.formatMessage(messages.visibilityUntilLabel)
        }
      ],
      breakpoints: { xs: 9 }
    },
    (formik) => ({
      section: 'visibility',
      type: 'datePicker',
      name: 'expirationDate',
      label: intl.formatMessage(messages.expirationDateLabel),
      placeholder: intl.formatMessage(messages.expirationDatePlaceholder),
      breakpoints: { xs: 6 },
      disabled: formik.values.visibility !== 'until',
      variant: 'inline',
      format: 'dd/MM/yyyy',
      disableToolbar: true,
      inputVariant: 'filled',
      minDate: new Date()
    })
  ];
};

export const useValidationRules = () => {
  const intl = useIntl();

  const requiredErrorMessage = intl.formatMessage(messages.requiredError);
  const imageRequiredErrorMessage = intl.formatMessage(
    messages.imageRequiredError
  );

  return Yup.object({
    images: Yup.array()
      .of(
        Yup.object().shape({ url: Yup.string().required(requiredErrorMessage) })
      )
      .min(1, imageRequiredErrorMessage),
    title: Yup.string().required(requiredErrorMessage),
    name: Yup.string().required(requiredErrorMessage),
    store: Yup.string().required(requiredErrorMessage),
    location: Yup.string().required(requiredErrorMessage),
    withUrl: Yup.boolean(),
    url: Yup.string().when('withUrl', {
      is: true,
      then: Yup.string().required(requiredErrorMessage),
      otherwise: Yup.string()
    }),
    description: Yup.string().required(requiredErrorMessage)
  });
};

export const useInputProps = () => ({
  variant: 'filled',
  size: 'small',
  fullWidth: true
});

export const useSections = () => {
  const intl = useIntl();

  return [
    {
      name: 'images',
      title: {
        text: intl.formatMessage(messages.imagesTitle)
      },
      description: {
        text: intl.formatMessage(messages.imagesDescription)
      }
    },
    {
      name: 'data',
      title: {
        text: intl.formatMessage(messages.dataTitle)
      }
    },
    {
      name: 'type',
      title: {
        text: intl.formatMessage(messages.typeTitle)
      }
    },
    {
      name: 'visibility',
      title: {
        text: intl.formatMessage(messages.visibilityTitle)
      }
    }
  ];
};
