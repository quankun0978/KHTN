import { createSelector } from 'reselect';
const tiemNangSelect = (state) => state.tiemNang;

const devModeChecks = { identityFunctionCheck: 'never' };

export const selectTiemNang = createSelector([tiemNangSelect], (tiemNang) => tiemNang, { devModeChecks });
