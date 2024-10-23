const tableHead = [
  { key: 'title', label: 'Título' },
  { key: 'speciality', label: 'Especialidad' },
  { key: 'createdAt', label: 'Fecha' },
  { key: 'status', label: 'Estatus' },
  { key: 'views_count', label: 'Vistas' },
  { key: 'vote_average', label: 'Calificación' },
  { key: '', label: '' }
];

const filters = [
  { key: 'speciality', value: 'Especialidad' },
  { key: 'vote_average', value: 'Calificación' }
];

export { tableHead, filters };
