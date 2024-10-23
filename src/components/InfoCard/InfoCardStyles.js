import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '5px',
    boxShadow: '0px 3px 6px #00000029',
    [theme.breakpoints.down('xs')]: {
      width: '240px'
    }
  },
  icon: {
    width: theme.spacing(4.5),
    height: theme.spacing(4.5)
  },
  title: {
    fontSize: '16px',
    letterSpacing: '3.2px',
    color: theme.palette.info.light,
    textTransform: 'uppercase',
    [theme.breakpoints.down('xs')]: {
      fontSize: '14px'
    }
  },
  infoNumber: {
    fontSize: '25px',
    fontWeight: 'bold',
    color: theme.palette.info.dark,
    display: 'grid',
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px'
    }
  },

  rootmoreInfoCard: ({ modalCards }) => ({
    width: '280px',
    borderRadius: '5px',
    display: 'flex',
    boxShadow: '0px 3px 6px #00000029',
    padding: theme.spacing(1),
    [theme.breakpoints.down('xs')]: {
      width: modalCards && '220px'
    }
  }),
  iconSpecialty: ({ modalCards }) => ({
    height: 50,
    width: 50,
    [theme.breakpoints.down('xs')]: {
      height: modalCards && 40,
      width: modalCards && 40
    }
  }),
  contentSpecialty: {
    width: '100%',
    paddingLeft: theme.spacing(1)
  },
  numberQualifiedModal: {
    fontSize: '23px',
    color: theme.palette.info.dark,
    fontWeight: 800
  },
  titleSpecialty: ({ modalCards }) => ({
    fontSize: '15px',
    letterSpacing: '2.2px',
    color: theme.palette.info.light,
    [theme.breakpoints.down('xs')]: {
      fontSize: modalCards && '12.5px'
    }
  }),
  numberSpecialty: ({ modalCards }) => ({
    fontSize: '23px',
    color: theme.palette.info.dark,
    fontWeight: 800,
    [theme.breakpoints.down('xs')]: {
      fontSize: modalCards && '18px'
    }
  }),
  numberWhite: {
    color: theme.palette.common.white,
    fontSize: '30px',
    fontWeight: 800,
    display: 'grid'
  },
  contentQualified: {
    justifyContent: 'space-between',
    display: 'flex',
    alignItems: 'center'
  },
  iconQualified: {
    color: theme.palette.info.dark,
    width: theme.spacing(2.2),
    height: theme.spacing(2.2),
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  numberQualified: {
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 800,
    color: theme.palette.info.dark
  },
  qualified: {
    display: 'flex',
    alignItems: 'flex-end'
  }
}));

export { useStyles };
