import { createReducer, on } from '@ngrx/store';
import { CoreActions, AuthApiActions } from './actions';
import { Usuario } from 'src/app/model';

export const coreFeatureKey = 'core';
export interface CoreState {
    idioma: string;
    mainLoaderVisible: boolean;
    usuario: Usuario;
}


const initialState: CoreState = {
    idioma: 'es',
    mainLoaderVisible: false,
    usuario: null
};

export const reducer = createReducer(
    initialState,
    on(CoreActions.showMainLoader, state => ({
        ...state,
        mainLoaderVisible: true
    })),
    on(CoreActions.hideMainLoader, state => ({
        ...state,
        mainLoaderVisible: false
    })),
    on(AuthApiActions.loadPerfilUsuarioOK, (state, { usuario }) => ({
        ...state,
        usuario
    }))
);

export const getIdioma = (state: CoreState) => state.idioma;
export const getMainLoaderVisible = (state: CoreState) => state.mainLoaderVisible;
