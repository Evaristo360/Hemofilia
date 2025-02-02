import { filter } from 'lodash';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getTypeOf(item, filterBy, query) {
  const property = item[filterBy];

  if (typeof property === 'string') {
    return property.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  } else {
    return property.toString().indexOf(query) !== -1;
  }
}

export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applySortFilter(array, comparator, query, filterBy = 'name') {
  const stabilizedThis = array.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (item) => getTypeOf(item, filterBy, query));
  }

  return stabilizedThis.map((el) => el[0]);
}
