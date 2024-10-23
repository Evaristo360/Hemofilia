import React, { useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';
import { Box } from '@material-ui/core';
import { messages } from './UserFormMessages';
import { useStyles } from './UserFormStyles';
import * as Yup from 'yup';
import { Form, messages as formMessages } from '@octopy/react-form';
import { useRootProvider } from 'components/RootProvider';
import { useApi } from 'hooks';
import * as formConfig from 'components/Form/config';
import { get, isEmpty } from 'lodash';
import { useDrawer } from 'components/Drawer';
import ImageIcon from '@material-ui/icons/AccountCircleRounded';
import { uploadFile } from '@octopy/react-aws-utils';
import { useLoader } from '@octopy/react-loader';
import { Alert, useModal } from '@octopy/react-modal';
import moment from 'moment';

const UserForm = (props) => {
  const { handleShowLoader } = useLoader();
  const { handleOpenModal } = useModal();
  const { item = {} } = props;
  const id = get(item, '_id', null);
  const isEdition = !!id;
  const classes = useStyles();
  const { handleCloseDrawer } = useDrawer();
  const { formatMessage: f } = useIntl();
  const { handleChangeUsers, rootState } = useRootProvider();
  const { users } = rootState;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#,.:;/])[A-Za-z\d@$!%*?&#,.:;/]{8,}$/;
  const formikRef = useRef();

  const [getUser] = useApi({
    endpoint: `admin/dashboard/get/${id}`,
    method: 'get'
  });

  const getInitialValues = () => {
    let values = {};

    if (isEdition) {
      values = {
        avatar: null,
        name: '',
        password: ''
      };
    } else {
      values = {
        avatar: null,
        name: '',
        email: '',
        password: ''
      };
    }

    return values;
  };

  const getUserData = async () => {
    const response = await getUser();
    const user = get(response, 'payload', {});
    const urlAvatar = user.avatar ? user.avatar : '';

    formikRef.current.setValues({
      avatar: { url: urlAvatar },
      name: user.name ? user.name : '',
      password: ''
    });
  };

  useEffect(() => {
    if (isEdition) {
      getUserData();
    }
  }, [item]);

  const getFields = () => {
    const fields = [
      {
        type: 'image',
        name: 'avatar',
        breakpoints: { xs: 12 },
        icon: ImageIcon,
        label: f(messages.imagesLabel),
        multiple: false,
        color: 'primary.main'
      },
      {
        type: 'text',
        name: 'name',
        label: f(formMessages.nameLabel),
        placeholder: f(formMessages.namePlaceholder),
        breakpoints: { xs: 12 }
      }
    ];

    if (isEdition) {
      fields.push({
        type: 'password',
        name: 'password',
        label: f(formMessages.passwordLabel),
        placeholder: f(formMessages.passwordPlaceholder),
        breakpoints: { xs: 12 }
      });
    } else {
      fields.push(
        {
          type: 'text',
          name: 'email',
          label: f(formMessages.emailLabel),
          placeholder: f(formMessages.emailPlaceholder),
          breakpoints: { xs: 12 }
        },
        {
          type: 'password',
          name: 'password',
          label: f(formMessages.passwordLabel),
          placeholder: f(formMessages.passwordPlaceholder),
          breakpoints: { xs: 12 }
        }
      );
    }

    return fields;
  };

  const requiredFieldError = f(formMessages.requiredFieldError);

  const getValidationRules = () => {
    if (isEdition) {
      const rules = {
        avatar: Yup.object()
          .shape({ url: Yup.string() })
          .nullable()
          .required(requiredFieldError),
        name: Yup.string().required(requiredFieldError),
        password: Yup.string().matches(passwordRegex, {
          message: f(messages.passwordNotMatchRegex),
          excludeEmptyString: true
        })
      };

      return Yup.object(rules);
    } else {
      const rules = {
        avatar: Yup.object()
          .shape({ url: Yup.string() })
          .nullable()
          .required(requiredFieldError),
        name: Yup.string().required(requiredFieldError),
        email: Yup.string()
          .email(f(formMessages.invalidEmailError))
          .required(requiredFieldError),
        password: Yup.string()
          .required(requiredFieldError)
          .matches(passwordRegex, {
            message: f(messages.passwordNotMatchRegex),
            excludeEmptyString: true
          })
      };

      return Yup.object(rules);
    }
  };

  const [updateUser] = useApi({
    endpoint: 'admin/dashboard/update',
    method: 'put'
  });

  const handleEdit = async (data) => {
    handleShowLoader(true);
    if (data.password == '') {
      // eslint-disable-next-line no-param-reassign
      delete data['password'];
    }

    if (data.avatar && data.avatar.file) {
      uploadFile({
        file: data.avatar.file,
        onError: () => {
          handleOpenModal({
            configProps: {
              maxWidth: 'sm'
            },
            body: <Alert message={f(messages.uploadFileError)} />
          });
          handleShowLoader(false);
        },
        onSuccess: (fileUrl) => {
          // eslint-disable-next-line no-param-reassign
          data.avatar = fileUrl;
          handleEditUser(data);
        }
      });
    } else {
      const editBody = {
        ...data,
        avatar: data.avatar.url
      };

      handleEditUser(editBody);
    }
  };

  const handleEditUser = async (data) => {
    try {
      const response = await updateUser({
        urlParams: id,
        body: { ...data }
      });
      const updatedUser = get(response, 'payload', {});
      const headerResponse = get(response, 'headerResponse', {});

      console.log(updatedUser);
      if (headerResponse.status == 200) {
        const newUsers = users.map((user) =>
          user._id === updatedUser._id
            ? // eslint-disable-next-line no-param-reassign
              (user = { ...user, name: data.name })
            : user
        );

        console.log(newUsers);
        handleChangeUsers(newUsers);
      }

      handleCloseDrawer();
      handleShowLoader(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const [createUser] = useApi({
    endpoint: 'admin/dashboard/create',
    method: 'post'
  });

  const handleCreate = async (data) => {
    handleShowLoader(true);
    if (data.avatar && data.avatar.file) {
      uploadFile({
        file: data.avatar.file,
        onError: () => {
          handleOpenModal({
            configProps: {
              maxWidth: 'sm'
            },
            body: <Alert message={f(messages.uploadFileError)} />
          });
          handleShowLoader(false);
        },
        onSuccess: (fileUrl) => {
          // eslint-disable-next-line no-param-reassign
          data.avatar = fileUrl;
          handleCreateUser(data);
        }
      });
    } else {
      handleCreateUser(data);
    }
  };

  const handleCreateUser = async (data) => {
    try {
      const response = await createUser({
        body: data
      });
      const createdUser = get(response, 'payload', {});
      const headerResponse = get(response, 'headerResponse', {});

      if (headerResponse.status == 200) {
        const userNew = {
          ...createdUser,
          created_at: moment(new Date()).format('DD/MM/YYYY')
        };
        const newTasks = [...users, userNew];

        handleChangeUsers(newTasks);
      }

      handleCloseDrawer();
      handleShowLoader(false);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleSubmit = (formData) => {
    const data = {
      ...formData
    };

    if (isEdition) {
      handleEdit(data);
    } else {
      handleCreate(data);
    }
  };

  if (isEdition && isEmpty(item)) return null;

  return (
    <Box className={classes.containerForm}>
      <Form
        initialValues={getInitialValues()}
        validationRules={getValidationRules()}
        fields={getFields()}
        buttonSubmitLabel={f(messages.submitLabel)}
        handleSubmit={handleSubmit}
        withInputsBorder
        inputProps={formConfig.inputProps}
        buttonSubmitProps={formConfig.buttonSubmitProps}
        formikRef={formikRef}
      />
    </Box>
  );
};

UserForm.propTypes = {};

export { UserForm };
