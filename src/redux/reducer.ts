import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import authReducer, { AuthState } from '../modules/auth/redux/authReducer';
import reducerItem, { IItem, IntlState1 } from '../modules/home/redux/homeForm';
import reducerPayroll, { IFilter, IPayrollList } from '../modules/home/redux/payroll';
import intlReducer, { IntlState } from '../modules/intl/redux/intlReducer';

export interface AppState {
  router: RouterState;
  intl: IntlState;
  profile: AuthState;
  home: IntlState1;
  payroll: IPayrollList;
}

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    intl: intlReducer,
    profile: authReducer,
    home: reducerItem,
    payroll: reducerPayroll,
  });
}
