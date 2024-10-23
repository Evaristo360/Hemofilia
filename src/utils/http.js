function toQueryString(json) {
  if (!json) return;

  return Object.keys(json)
    .map((key) => {
      let objectType;

      if (typeof json[key] === 'object') {
        objectType = JSON.stringify(json[key]);
      } else {
        objectType = encodeURIComponent(json[key]);
      }

      const r = `${encodeURIComponent(key)}=${objectType}`;

      return r;
    })
    .join('&');
}

export { toQueryString };
