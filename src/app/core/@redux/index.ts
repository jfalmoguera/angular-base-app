import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  Action
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromCore from './core.reducer';
import { InjectionToken } from '@angular/core';

/**
 * Identificamos cada reducer como una tabla de un base de datos.
 * Esto se traduce en que el nivel mas alto de nuestro Estado son las Keys 
 * que identifican esas tablas.
 */
export interface State {
  [fromCore.coreFeatureKey]: fromCore.CoreState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>('Root reducers token',
  {
    factory: () => ({
      [fromCore.coreFeatureKey]: fromCore.reducer
    }),
  });

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(`%c${action.type}`, 'color:darkblue; text-transform: uppercase;');
    console.log('prev state', state);
    console.log('%caction', 'color:red', action);
    console.log('%cnext state', 'color:green', result);
    console.groupEnd();

    return result;
  };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];


/**
 * Estado: Core
 */
const coreState = createFeatureSelector<State, fromCore.CoreState>(
  fromCore.coreFeatureKey
);

export const getIdioma = createSelector(
  coreState,
  fromCore.getIdioma
);

export const getMainLoaderVisible = createSelector(
  coreState,
  fromCore.getMainLoaderVisible
);
