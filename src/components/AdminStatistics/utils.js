import { Images } from '../../assets';
import {
  VideoLibrary,
  ChromeReaderMode,
  PeopleAlt,
  Star
} from '@material-ui/icons';

const pieColors = [
  '#0099D7',
  '#E0007A',
  '#066F6F',
  '#9B35A3',
  '#ECAC1B',
  '#00EDBF',
  '#EF6C26'
];

const cardIcons = {
  documentos: ChromeReaderMode,
  videos: VideoLibrary,
  doctores: PeopleAlt,
  promedio: Star
};

const specialtyImage = {
  hematología: `${Images.hematologia}`,
  'medicina física y de rehabilitación': `${Images.fisReh}`,
  psicología: `${Images.psicologia}`,
  'ortopedia y traumatología': `${Images.ortopedia}`,
  'trabajo social': `${Images.trabajoSocial}`,
  'estomatología / odontología': `${Images.estomaOdonto}`,
  enfermería: `${Images.enfermeria}`
};

export { pieColors, cardIcons, specialtyImage };
