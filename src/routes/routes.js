/* eslint-disable react-hooks/rules-of-hooks */
import {
  BaseLayout,
  FullScreenLayout,
  HeaderLogoLayout,
  HomeBaseLayout
} from 'layouts';
import {
  Login,
  Register,
  PasswordRecovery,
  VerifyAccount
} from 'components/Auth';
import { AdminStatistics } from 'components/AdminStatistics';
import { AdminUserBase } from 'components/AdminUserBase';
import { Error404 } from 'views/Error404';
import { Users } from 'components/Users';
import { Search } from 'components/Search/Search';
import { WebinarsWeb } from 'components/WebinarsWeb';
import { useIntl } from 'react-intl';
import { messages } from './NavigationMessages';
import { Images } from 'assets';
import { CreateWebinar as WebCreateWebinar } from 'components/WebinarsWeb/CreateWebinar';
import { EditWebinar as WebEditWebinar } from 'components/WebinarsWeb/EditWebinar';
import { Documents } from 'components/Documents';
import { Videos } from 'components/Videos';
import { Conferences } from 'components/Conferences';
import { Approve } from 'components/Approve';
import { ProfileUpdate } from 'components/Profile';
import { Directory } from 'components/Directory';
import { VideosWeb } from 'components/VideosWeb';
import { DocumentsWeb } from 'components/DocumentsWeb/DocumentsWeb';
import HomePage from 'components/HomePage/HomePage';
import Contact from 'components/Contact/Contact';
import { StreamSection } from 'components/StreamSection/StreamSection';
import { DatabaseProfile } from 'components/AdminUserBase/DatabaseProfile/DatabaseProfile';
import { CreateWebinar as DashboardCreateWebinar } from 'components/Conferences/CreateWebinar/CreateWebinar';
import { EditWebinar as DashboardEditWebinar } from 'components/Conferences/EditWebinar/EditWebinar';
import { FAQS } from 'components/FAQS';

export const routes = {
  'super-admin': [
    {
      path: '/usuarios',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'}
          title="Usuarios"
          {...props}
        />
      ),
      component: Users,
      exact: true,
      titleMessage: 'users',
      private: true,
      isAdmin: true
    }
  ],
  admin: [
    {
      path: '/',
      layout: HomeBaseLayout,
      component: AdminStatistics,
      exact: true,
      titleMessage: 'appName',
      private: true,
      isAdmin: true
    },
    {
      path: '/admin-base-usuarios',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'} //dashboard
          title="Base de usuarios"
          {...props}
        />
      ),
      component: AdminUserBase,
      exact: true,
      titleMessage: 'userBase',
      private: true,
      isAdmin: true
    },
    {
      path: '/database-profile',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'}
          title="Base de usuarios"
          arrowBack
          path="admin-base-usuarios"
          {...props}
        />
      ),
      component: DatabaseProfile,
      exact: true,
      titleMessage: 'userBaseProfile',
      private: true,
      isAdmin: true
    },
    {
      path: '/Video',
      layout: (props) => (
        <BaseLayout typeLayout={'dashboardLayout'} title="Videos" {...props} />
      ),
      component: Videos,
      exact: true,
      titleMessage: 'videos',
      private: true,
      isAdmin: true
    },
    {
      path: '/Documents',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'}
          title="Documentos"
          {...props}
        />
      ),
      component: Documents,
      exact: true,
      titleMessage: 'documents',
      private: true,
      isAdmin: true
    },
    {
      path: '/admin/webinars',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'}
          title="Webinars"
          {...props}
        />
      ),
      component: Conferences,
      exact: true,
      titleMessage: 'webinars',
      private: true,
      isAdmin: true
    },
    {
      path: '/admin/webinars/create',
      layout: (props) => {
        const intl = useIntl();

        return (
          <BaseLayout
            title={intl.formatMessage(messages.webinars)}
            appBaselayout
            arrowBack
            path={'admin/webinars'}
            {...props}
          />
        );
      },
      component: DashboardCreateWebinar,
      exact: true,
      titleMessage: 'webinars',
      private: true,
      isAdmin: true
    },
    {
      path: '/admin/webinars/edit/:id',
      layout: (props) => {
        const intl = useIntl();

        return (
          <BaseLayout
            title={intl.formatMessage(messages.webinarsWeb)}
            appBaselayout
            icon={Images.group}
            arrowBack
            path={'admin/webinars'}
            {...props}
          />
        );
      },
      component: DashboardEditWebinar,
      exact: true,
      titleMessage: 'webinars',
      private: true,
      isAdmin: true
    },
    {
      path: '/Approve',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'}
          title="Conferencias"
          {...props}
        />
      ),
      component: Approve,
      exact: true,
      titleMessage: 'approve',
      private: true,
      isAdmin: true
    },
    {
      path: '/search/:searchText',
      layout: (props) => <BaseLayout breadcrumbs={false} {...props} />,
      component: Search,
      exact: true,
      titleMessage: 'search',
      private: true,
      isAdmin: true
    },
    {
      layout: FullScreenLayout,
      component: Error404,
      titleMessage: '404'
    }
  ],
  doctor: [
    {
      path: '/',
      layout: (props) => (
        <BaseLayout
          typeLayout={'introLayout'} //Clinicas hemofilia
          {...props}
        />
      ),
      component: HomePage,
      exact: true,
      titleMessage: 'home',
      private: true,
      isAdmin: false
    },
    {
      path: '/perfil',
      layout: (props) => <BaseLayout logoHemofilia {...props} />,
      component: ProfileUpdate,
      exact: true,
      titleMessage: 'perfil',
      private: true,
      isAdmin: false
    },
    {
      path: '/contacto',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'} //dashboard
          title="Contacto"
          {...props}
        />
      ),
      component: Contact,
      exact: true,
      titleMessage: 'home',
      private: true,
      isAdmin: false
    },
    {
      path: '/webinarsWeb',
      layout: (props) => {
        const intl = useIntl();

        return (
          <BaseLayout
            title={intl.formatMessage(messages.webinarsWeb)}
            appBaselayout
            icon={Images.group}
            {...props}
          />
        );
      },
      component: WebinarsWeb,
      exact: true,
      titleMessage: 'webinarsWeb',
      private: true,
      isAdmin: false
    },
    {
      path: '/webinarsWeb/edit/:id',
      layout: (props) => {
        const intl = useIntl();

        return (
          <BaseLayout
            title={intl.formatMessage(messages.webinarsWeb)}
            appBaselayout
            icon={Images.group}
            arrowBack
            path={'webinarsWeb'}
            {...props}
          />
        );
      },
      component: WebEditWebinar,
      exact: true,
      titleMessage: 'webinarsWeb',
      private: true,
      isAdmin: false
    },
    {
      path: '/webinarsWeb/create',
      layout: (props) => {
        const intl = useIntl();

        return (
          <BaseLayout
            title={intl.formatMessage(messages.webinarsWeb)}
            appBaselayout
            arrowBack
            path={'webinarsWeb'}
            {...props}
          />
        );
      },
      component: WebCreateWebinar,
      exact: true,
      titleMessage: 'webinarsWeb',
      private: true,
      isAdmin: false
    },
    {
      path: '/videosweb/:videoId?',
      layout: (props) => (
        <BaseLayout typeLayout={'dashboardLayout'} title="Videos" {...props} />
      ),
      component: VideosWeb,
      exact: true,
      titleMessage: 'videos',
      private: true,
      isAdmin: false
    },
    {
      path: '/documentsWeb/:documentId?',
      layout: (props) => (
        <BaseLayout
          typeLayout={'dashboardLayout'}
          title="Documentos"
          {...props}
        />
      ),
      component: DocumentsWeb,
      exact: true,
      titleMessage: 'documents',
      private: true,
      isAdmin: false
    },
    {
      path: '/perfil',
      layout: (props) => <BaseLayout logoHemofilia {...props} />,
      component: ProfileUpdate,
      exact: true,
      titleMessage: 'perfil',
      private: true,
      isAdmin: false
    },
    {
      path: '/directorio',
      layout: (props) => (
        <BaseLayout
          appBaselayout
          icon={Images.contact}
          title="Directorio"
          {...props}
        />
      ),
      component: Directory,
      exact: true,
      titleMessage: 'directorio',
      private: true,
      isAdmin: false
    },
    {
      path: '/stream/:id',
      layout: (props) => (
        <BaseLayout hideTitleBar appBarSpacer={false} {...props} />
      ),
      component: StreamSection,
      exact: true,
      auth: true,
      titleMessage: 'stream'
    },
    {
      path: '/FAQS',
      layout: (props) => (
        <BaseLayout
          appBaselayout
          title="FAQS"
          icon={Images.faqsIcon}
          {...props}
        />
      ),
      component: FAQS,
      exact: true,
      titleMessage: 'FAQS',
      private: true,
      isAdmin: false
    },
    {
      layout: FullScreenLayout,
      component: Error404,
      titleMessage: '404'
    }
  ],
  public: [
    {
      path: '/login/:email?',
      layout: FullScreenLayout,
      component: Login,
      exact: true,
      titleMessage: 'login',
      isAdmin: false
    },
    {
      path: '/register',
      layout: HeaderLogoLayout,
      component: Register,
      exact: true,
      titleMessage: 'register',
      isAdmin: false
    },
    {
      path: '/password-recovery/:tokenPassword?',
      layout: HeaderLogoLayout,
      component: PasswordRecovery,
      exact: true,
      titleMessage: 'passwordRecovery',
      isAdmin: false
    },
    {
      path: '/verify-account',
      layout: HeaderLogoLayout,
      component: VerifyAccount,
      exact: true,
      titleMessage: 'verifyAccount',
      isAdmin: false
    },
    {
      layout: FullScreenLayout,
      component: Error404,
      titleMessage: '404'
    }
  ]
};
