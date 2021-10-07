import { getBrokerActions } from './broker';
import { getCommonActions } from './common';
import { get, getByID, save } from '../../../services/';

const services = {get, getByID, save}
export const getActions = (context, table, history, dispatch) => {
  const common = getCommonActions(services, table, history, dispatch);

  const types = {
    brokers: getBrokerActions(services, table, history)
  }

  return types[table] ? {...common, ...types[table]} : common;
}
