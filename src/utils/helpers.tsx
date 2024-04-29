/* eslint-disable import/prefer-default-export */

export const refactorCurrency = (currency: number): string => {
  return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
