import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'example-component',
        title: 'Example',
        translate: 'EXAMPLE',
        type: 'item',
        icon: 'whatshot',
        url: '/example',
      },
      {
        id: 'calendar',
        title: 'Calendar',
        translate: 'CALENDAR',
        type: 'item',
        icon: 'today',
        url: '/calendar',
      },
      {
        id: 'mesPatients',
        title: 'mesPatients',
        translate: 'mesPatients',
        type: 'item',
        icon: 'groupIcon',
        url: '/mesPatients',
      },
      {
        id: 'Collaborateur',
        title: 'Collaborateur',
        translate: 'Collaborateur',
        type: 'collapse',
        icon: 'personIcon',
        children: [
          {
            id: 'ChercherCollaborateur',
            title: 'Chercher Collaborateur',
            type: 'item',
            url: '/Collaborateur/chercher',
          },
          {
            id: 'ListeCollaborateur',
            title: 'Liste Collaborateur',
            type: 'item',
            url: '/Collaborateur/liste',
          },
          {
            id: 'Documentreçus',
            title: 'Document Reçus',
            type: 'item',
            url: '/Collaborateur/document',
          },
          {
            id: 'Documentenvoyé',
            title: 'Document Envoyé',
            type: 'item',
            url: '/Collaborateur/envoi',
          },
          

        ]
      }
    ],
  },
];

export default navigationConfig;
