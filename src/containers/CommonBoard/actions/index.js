import { getInvoiceActions } from './invoice';
import { getLoadsActions } from './loads';
import { getCommonActions } from './common';

export const getActions = (table, history, services) => {
  const common = () => getCommonActions(table, history, services);
  const invoices = () => getInvoiceActions(table, history, services);
  const loads = () => getLoadsActions(table, history, services);

  const types = {
    invoices, loads
  }
  return types[table] ? {...common(), ...types[table]()} : common();
}
