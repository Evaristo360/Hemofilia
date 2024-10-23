import { useTheme } from '@material-ui/core';
import { useDrawer } from 'components/Drawer';
import { UserDrawer } from 'views/Home/UserDrawer/UserDrawer';
import { useEffect } from 'react';

export const useUserForm = () => {
  const theme = useTheme();
  const { handleOpenDrawer, handleCloseDrawer } = useDrawer();

  useEffect(() => {
    handleOpenDrawer({
      configProps: {
        anchor: 'right',
        transitionDuration: theme.transitions.duration.standard
      },
      closeButton: true,
      title: 'Nuevo usuario',
      body: <UserDrawer />
    });
  }, []);
};
