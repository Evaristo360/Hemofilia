import { useIntl } from 'react-intl';
import UploadIcon from '@material-ui/icons/PublishRounded';
import DateIcon from '@material-ui/icons/TodayRounded';
import { messages } from '../WebinarFormMessages';
import { useStyles } from '../WebinarFormStyles';

export const useFields = ({ withComment }) => {
  const intl = useIntl();
  const classes = useStyles();

  const inputProps = {
    size: 'small',
    fullWidth: true,
    breakpoints: { sm: 6, xs: 12 }
  };

  const imageFields = [
    {
      type: 'image',
      name: 'image',
      icon: UploadIcon,
      label: intl.formatMessage(messages.imageLabel),
      multiple: false,
      color: 'primary.main'
    }
  ];

  const dataFields = [
    {
      type: 'text',
      name: 'theme',
      label: intl.formatMessage(messages.themeLabel),
      placeholder: intl.formatMessage(messages.themePlaceholder),
      ...inputProps
    },
    {
      type: 'datePicker',
      name: 'date',
      label: intl.formatMessage(messages.dateLabel),
      placeholder: intl.formatMessage(messages.datePlaceholder),
      variant: 'inline',
      format: 'dd/MM/yyyy',
      disableToolbar: true,
      inputVariant: 'filled',
      minDate: new Date().setDate(new Date().getDate() + 1),
      InputProps: {
        endAdornment: <DateIcon />
      },
      ...inputProps
    },
    {
      type: 'timePicker',
      name: 'startTime',
      label: intl.formatMessage(messages.startTimeLabel),
      placeholder: intl.formatMessage(messages.startTimePlaceholder),
      variant: 'inline',
      inputVariant: 'filled',
      ...inputProps
    },
    {
      type: 'timePicker',
      name: 'endTime',
      label: intl.formatMessage(messages.endTimeLabel),
      placeholder: intl.formatMessage(messages.endTimePlaceholder),
      variant: 'inline',
      inputVariant: 'filled',
      ...inputProps
    },
    {
      type: 'textarea',
      name: 'description',
      label: intl.formatMessage(messages.descriptionLabel),
      placeholder: intl.formatMessage(messages.descriptionPlaceholder),
      rows: 3,
      ...inputProps
    },
    ...(withComment
      ? [
          {
            type: 'textarea',
            name: 'comment',
            label: intl.formatMessage(messages.commentLabel),
            placeholder: intl.formatMessage(messages.commentPlaceholder),
            rows: 3,
            ...inputProps,
            breakpoints: { sm: 7, xs: 12 }
          }
        ]
      : [])
  ];

  return { imageFields, dataFields };
};
