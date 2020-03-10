import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/model';

export const loadPerfilUsuarioOK = createAction('[Auth/API] Perfil de usuario cargado', props<{ usuario: Usuario }>());
