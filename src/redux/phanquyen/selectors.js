import { createSelector } from 'reselect';
const demographicSelect = (state) => state.phanQuyen;

const devModeChecks = { identityFunctionCheck: 'never' };

export const selectDemographic = createSelector([demographicSelect], (demographic) => demographic, { devModeChecks });
