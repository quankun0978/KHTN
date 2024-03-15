import { DASHBOARD } from '@/router/routes';

if (!window.location.pathname.includes(DASHBOARD)) {
  window.history.replaceState('', '', DASHBOARD + window.location.pathname);
}
