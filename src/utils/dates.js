import { defineMessages } from 'react-intl';

const daysMessages = defineMessages({
  0: {
    id: 'utils.dates.days.0',
    defaultMessage: 'Lunes'
  },
  1: {
    id: 'utils.dates.days.1',
    defaultMessage: 'Martes'
  },
  2: {
    id: 'utils.dates.days.2',
    defaultMessage: 'Miercoles'
  },
  3: {
    id: 'utils.dates.days.3',
    defaultMessage: 'Jueves'
  },
  4: {
    id: 'utils.dates.days.4',
    defaultMessage: 'Viernes'
  },
  5: {
    id: 'utils.dates.days.5',
    defaultMessage: 'Sábado'
  },
  6: {
    id: 'utils.dates.days.6',
    defaultMessage: 'Domingo'
  }
});

export const monthsMessages = defineMessages({
  0: {
    id: 'utils.dates.months.0',
    defaultMessage: 'Enero'
  },
  1: {
    id: 'utils.dates.months.1',
    defaultMessage: 'Febrero'
  },
  2: {
    id: 'utils.dates.months.2',
    defaultMessage: 'Marzo'
  },
  3: {
    id: 'utils.dates.months.3',
    defaultMessage: 'Abril'
  },
  4: {
    id: 'utils.dates.months.4',
    defaultMessage: 'Mayo'
  },
  5: {
    id: 'utils.dates.months.5',
    defaultMessage: 'Junio'
  },
  6: {
    id: 'utils.dates.months.6',
    defaultMessage: 'Julio'
  },
  7: {
    id: 'utils.dates.months.7',
    defaultMessage: 'Agosto'
  },
  8: {
    id: 'utils.dates.months.8',
    defaultMessage: 'Septiembre'
  },
  9: {
    id: 'utils.dates.months.9',
    defaultMessage: 'Octubre'
  },
  10: {
    id: 'utils.dates.months.10',
    defaultMessage: 'Noviembre'
  },
  11: {
    id: 'utils.dates.months.11',
    defaultMessage: 'Diciembre'
  }
});

const messages = defineMessages({
  seconds: {
    id: 'utils.dates.messages.seconds',
    defaultMessage: 'segundos'
  },
  minutes: {
    id: 'utils.dates.messages.minutes',
    defaultMessage: 'minutos'
  },
  hours: {
    id: 'utils.dates.messages.hours',
    defaultMessage: 'horas'
  },
  days: {
    id: 'utils.dates.messages.days',
    defaultMessage: 'días'
  },
  today: {
    id: 'utils.dates.messages.today',
    defaultMessage: 'Hoy'
  },
  tomorrow: {
    id: 'utils.dates.messages.tomorrow',
    defaultMessage: 'Mañana'
  },
  yesterday: {
    id: 'utils.dates.messages.yesterday',
    defaultMessage: 'Ayer'
  }
});

export const formatDate = (date, intl) => {
  const days = date.getDate();
  const month = intl.formatMessage(monthsMessages[date.getMonth()]);
  const diffDays = new Date().getDate() - days;
  const diffMonths = new Date().getMonth() - date.getMonth();
  const diffYears = new Date().getFullYear() - date.getFullYear();

  if (diffYears === 0 && diffDays === 0 && diffMonths === 0) {
    return intl.formatMessage(messages.today);
  } else if (diffYears === 0 && diffDays === 1) {
    return intl.formatMessage(messages.yesterday);
  } else if (diffYears === 0 && diffDays === -1) {
    return intl.formatMessage(messages.tomorrow);
    // } else if (
    //   diffYears === 0 &&
    //   diffMonths === 0 &&
    //   diffDays < -1 &&
    //   diffDays > -7
    // ) {
    //   return intl.formatMessage(daysMessages[date.getDay()]);
  } else if (diffYears >= 1) {
    return `${month} ${days}, ${new Date(date).getFullYear()}`;
  } else {
    return `${month} ${days}`;
  }
};

export const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours %= 12;
  hours = hours ? hours : 12;

  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`;
};

export const msToTime = (ms, intl) => {
  let seconds = Math.round(ms / 1000);
  let minutes = Math.round(ms / (1000 * 60));
  let hours = Math.round((ms / (1000 * 60 * 60)) * 10) / 10;
  let days = Math.round((ms / (1000 * 60 * 60 * 24)) * 10) / 10;

  if (seconds < 60) {
    return `${seconds} ${intl.formatMessage(messages.seconds)}`;
  } else if (minutes < 60) {
    return `${minutes} ${intl.formatMessage(messages.minutes)}`;
  } else if (hours < 24) {
    return `${hours} ${intl.formatMessage(messages.hours)}`;
  } else {
    return `${days} ${intl.formatMessage(messages.days)}`;
  }
};

export const getMonths = (formatMessage, from = 0, to = 12) => {
  const list = [];

  for (let i = from; i < to; i++) {
    list.push({ name: i + 1, label: formatMessage(monthsMessages[i]) });
  }

  return list;
};

export const getCurrentMonth = (formatMessage) => {
  const d = new Date();

  return formatMessage(monthsMessages[d.getMonth()]);
};
