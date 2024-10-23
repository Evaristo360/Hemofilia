import { useIntl } from 'react-intl';
import { messages } from './ChangeImageMessages';
import ImageIcon from '@material-ui/icons/AccountCircleRounded';

export const useChangeImage = () => {
  const { formatMessage: f } = useIntl();

  const fieldsForm = [
    Object.assign({
      type: 'image',
      name: 'avatar',
      breakpoints: { xs: 12 },
      icon: ImageIcon,
      label: f(messages.imagesLabel),
      multiple: false,
      color: 'primary.main'
    })
  ];

  return { fieldsForm };
};
