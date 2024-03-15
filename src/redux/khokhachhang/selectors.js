import { createSelector } from 'reselect';
const demographicSelect = (state) => state.khoKhachHang;

const devModeChecks = { identityFunctionCheck: 'never' };

export const selectDemographic = createSelector([demographicSelect], (demographic) => demographic, { devModeChecks });
