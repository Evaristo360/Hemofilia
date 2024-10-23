import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  boxSave: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  titleModal: {
    fontWeight: 600,
    fontSize: '25px'
  },
  boxEdit: {
    width: '100%'
  },
  titleField: {
    fontSize: '16px',
    color: theme.palette.primary[800]
  },
  descriptionField: {
    fontSize: '13px',
    color: theme.palette.grey[600]
  }
}));

export { useStyles };
