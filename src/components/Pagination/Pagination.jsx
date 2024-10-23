import React from 'react';
import { useIntl } from 'react-intl';
import { Container, MenuItem, Select } from '@material-ui/core';
import { messages } from './PaginationMessages';
import { useStyles } from './PaginationStyles';
import { Pagination as MuiPagination } from '@material-ui/lab';

const Pagination = ({
  length,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  className
}) => {
  const intl = useIntl();
  const classes = useStyles();

  return (
    <Container className={`${classes.container} ${className}`}>
      <MuiPagination
        classes={{ ul: classes.ul }}
        count={Math.ceil(length / rowsPerPage)}
        page={page}
        onChange={onPageChange}
        defaultPage={0}
        size="small"
        variant="outlined"
        shape="rounded"
      />
      <Select
        onChange={onRowsPerPageChange}
        value={rowsPerPage}
        className={classes.rowsPerPageSelect}
        variant="outlined"
      >
        {[3, 9, 15, 21, 27].map((n) => (
          <MenuItem
            key={`${n}PaginationOption`}
            value={n}
            className={classes.rowsPerPageSelectMenuItem}
          >
            {n} / {intl.formatMessage(messages.page)}
          </MenuItem>
        ))}
      </Select>
    </Container>
  );
};

export { Pagination };
