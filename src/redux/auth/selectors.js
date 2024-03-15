import { createSelector } from 'reselect';
const authSelect = (state) => state.auth;

export const selectAuth = createSelector([authSelect], (auth) => auth, {
  devModeChecks: { identityFunctionCheck: 'never' },
});
export const selectCurrentAdmin = createSelector([authSelect], (auth) => auth.currentLogin, {
  devModeChecks: { identityFunctionCheck: 'never' },
});

export const isAuthorize = createSelector([authSelect], (auth) => auth.isAuthorize, {
  devModeChecks: { identityFunctionCheck: 'never' },
});
