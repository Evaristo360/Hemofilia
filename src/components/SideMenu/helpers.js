import { get } from 'lodash';
import ProfileIcon from '@material-ui/icons/Person';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import UsersIcon from '@material-ui/icons/Group';
import Home from '@material-ui/icons/Home';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import DashboardIcon from '@material-ui/icons/PieChart';
import StorageIcon from '@material-ui/icons/Storage';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ContactPhone from '@material-ui/icons/ContactPhone';
import { useAuth } from '@octopy/react-auth';
import { messages } from './SideMenuMessages';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

export const useLists = () => {
  const auth = useAuth();
  const role = get(auth, 'auth.user.role');
  const isAdmin = role === 'admin';
  const isSuperAdmin = role === 'super-admin';
  const isDoctor = !isSuperAdmin && !isAdmin;

  const homeSection =
    isAdmin || isSuperAdmin
      ? {
          items: [
            {
              name: 'home',
              path: '/',
              message: messages.statistics,
              icon: DashboardIcon
            }
          ]
        }
      : {
          items: [
            {
              name: 'home',
              path: '/',
              message: messages.home,
              icon: Home
            }
          ]
        };

  const superAdminSection = [
    {
      name: 'users',
      path: '/usuarios',
      message: messages.users,
      icon: UsersIcon
    }
  ];

  const adminSection =
    isAdmin || isSuperAdmin
      ? [
          {
            name: 'documents',
            path: '/Documents',
            message: messages.documents,
            icon: InsertDriveFileIcon
          },
          {
            name: 'video',
            path: '/video',
            message: messages.videos,
            icon: OndemandVideoIcon
          },

          {
            name: 'databaseProfile',
            path: '/admin-base-usuarios',
            message: messages.dataBase,
            icon: StorageIcon
          },

          {
            name: 'adminWebinars',
            path: '/admin/webinars',
            message: messages.webinarsAdmin,
            icon: RecordVoiceOverIcon
          }
        ]
      : [
          {
            name: 'documentsweb',
            path: '/documentsweb',
            message: messages.documentsweb,
            icon: InsertDriveFileIcon
          },
          {
            name: 'videosweb',
            path: '/videosweb',
            message: messages.videosweb,
            icon: OndemandVideoIcon
          },
          {
            name: 'webinars',
            path: '/webinarsWeb',
            message: messages.webinars,
            icon: RecordVoiceOverIcon
          },
          {
            name: 'directorio',
            path: '/directorio',
            message: messages.directorio,
            icon: MenuBookIcon
          },
          {
            name: 'contact',
            path: '/contacto',
            message: messages.contact,
            icon: ContactPhone
          }
        ];

  return [
    homeSection,
    {
      title: messages.user,
      items: [
        ...(isDoctor
          ? [
              {
                name: 'profile',
                message: messages.profile,
                icon: ProfileIcon,
                path: '/perfil'
              }
            ]
          : []),
        {
          name: 'logout',
          message: messages.logout,
          icon: LogoutIcon,
          action: () => auth.actions.logout()
        }
      ]
    },
    {
      title: messages.management,
      items: [...(isSuperAdmin ? superAdminSection : []), ...adminSection]
    }
  ];
};
