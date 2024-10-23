export const getProps = (theme) => ({
  MuiBreadcrumbs: {
    expandText: 'Mostrar ruta'
  },
  MuiTablePagination: {
    backIconButtonText: 'Página anterior',
    labelRowsPerPage: 'Filas por página:',
    nextIconButtonText: 'Siguiente página',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} de ${count !== -1 ? count : `más que ${to}`}`
  },
  MuiRating: {
    emptyLabelText: 'Vacío'
  },
  MuiAutocomplete: {
    clearText: 'Limpiar',
    closeText: 'Cerrar',
    loadingText: 'Cargando…',
    noOptionsText: 'Sin opciones',
    openText: 'Abierto'
  },
  MuiAlert: {
    closeText: 'Cerrar'
  },
  MuiPagination: {
    'aria-label': 'Paginador'
  },
  MuiPopover: {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' }
  },
  MuiMenu: {
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'right' }
  },
  MuiButton: {
    variant: 'contained'
  },
  MuiTextField: {
    variant: 'filled',
    size: 'small'
  },
  MuiAppBar: {
    color: 'default'
  },
  MuiSwitch: {
    color: 'primary'
  },
  MuiContainer: {
    maxWidth: theme.stretch ? false : 'lg'
  }
});
