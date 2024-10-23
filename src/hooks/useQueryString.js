import { useLocation } from 'react-router-dom';

const useQueryString = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryString = {};

  searchParams.forEach((value, key) => {
    queryString[key] = value;
  });

  return queryString;
};

export { useQueryString };
