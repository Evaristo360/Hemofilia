import { map } from 'lodash';
import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
/* import { useApi } from 'hooks'; */
import { Introduction } from 'components/Guideline';
import { Table } from '@octopy/react-table';
import USERLIST from '@octopy/react-table/lib/mocks/users';
import { FormExample } from 'components/Form/Example';
import {
  /*   AreaChart,
  LineChart, */
  BarChart,
  /*  PieChart,
  DonutChart,
  HalfDonutChart, */
  GridChart,
  PieChart
} from '@octopy/react-charts';

import './Home.scss';
import { useUserForm } from './useUserForm';

const TABLE_HEAD = [
  { id: 'profile', key: 'profile', label: 'Perfil' },
  { id: 'name', key: 'name', label: 'Nombre' },
  { id: 'username', key: 'user_name', label: 'Usuario' },
  { id: 'email', key: 'email', label: 'E-mail' },
  { id: 'phone', key: 'phone', label: 'Teléfono' },
  { id: 'options', key: '', label: '' }
];

const filters = [
  { key: 'name', value: 'Nombre' },
  { key: 'username', value: 'Usuario' },
  { key: 'email', value: 'E-mail' }
];

const configProps = {
  filters,
  actions: {
    edit: {
      onClick: (item) => alert(item),
      disabled: false,
      hidden: false
    },
    customs: {
      text: 'Custom',
      onClick: (item) => alert(item),
      icon: <NotInterestedIcon />
    }
  }
};

const onSelectItems = (items) => {
  alert('items: ', items);
};

function Home() {
  useUserForm();

  const [users, setUsers] = useState([]);
  /*   const [getUsers] = useApi({
    endpoint: 'users',
    method: 'get'
  }); */

  const theme = useTheme();
  const xs = useMediaQuery(theme.breakpoints.only('xs'));

  const getUserList = async (users) => {
    // const response = await getUsers();

    // const items = get(response, 'payload.items', []);

    const enhancedUsers = map(USERLIST, (user) => ({
      ...user,
      email: user.email.toLowerCase(),
      profile: (
        <Box display="flex" direction="row" alignItems="center">
          <Avatar
            alt={user.username}
            src={'/logo192.png'}
            className="user-avatar"
          />
          <Typography variant="subtitle2" noWrap>
            {user.user_name}
          </Typography>
        </Box>
      )
    }));

    setUsers(enhancedUsers);
  };

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <Grid className="home">
      <Container>
        <Grid container spacing={2} className="home">
          <Grid item xs={12}>
            <Card
              style={{
                height: '350px',
                width: '100%'
              }}
            >
              <GridChart />
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card
              style={{
                height: '270px',
                width: '100%',
                padding: '10px'
              }}
            >
              <PieChart
                options={{ legend: { position: 'bottom' } }}
                values={[
                  {
                    label: 'Fabio',
                    value: 8
                  },
                  {
                    label: 'Fabio',
                    value: 8
                  },
                  {
                    label: 'Fabio',
                    value: 8
                  },
                  {
                    label: 'Fabio2',
                    value: 3
                  },
                  {
                    label: 'Fabio3',
                    value: 5
                  },
                  {
                    label: 'Fabio4',
                    value: 12
                  },
                  {
                    label: 'Fabio5',
                    value: 1
                  },
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio8',
                    value: 7
                  }
                ]}
              />
            </Card>
          </Grid>

          <Grid item xs={8}>
            <Card
              style={{
                height: '270px',
                width: '100%',
                padding: '10px'
              }}
            >
              <BarChart
                showTotal
                yTitle="Nombres"
                maxValuesInSight={5}
                barWidth={70}
                values={[
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio4',
                    value: 12
                  },
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio4',
                    value: 12
                  },
                  {
                    label: 'Fabio5',
                    value: 1
                  },
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio8',
                    value: 7
                  },
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio4',
                    value: 12
                  },
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio4',
                    value: 12
                  },
                  {
                    label: 'Fabio5',
                    value: 1
                  },
                  {
                    label: 'Fabio6',
                    value: 5
                  },
                  {
                    label: 'Fabio7',
                    value: 6
                  },
                  {
                    label: 'Fabio8',
                    value: 7
                  }
                ]}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Introduction />
      <Table
        mainKey="id"
        data={users}
        columns={TABLE_HEAD}
        configProps={configProps}
        onSelectItems={onSelectItems}
      />
      <FormExample />
    </Grid>
  );
}

export { Home };
