import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetFans } from '../action/fans.action';
import { patch } from '@ngxs/store/operators'
import { Fan } from '../model/fans.model';

export interface FansStateModel {
    fansArray: Fan[]
}

@State<FansStateModel>({
    name: 'fans',
    defaults: {
        fansArray: []
    }
})

@Injectable()
export class FansState {

    
    @Selector()
    static getAllFans(state: FansStateModel) {
        return state.fansArray
    }

    @Selector()
    static countFans(state: FansStateModel) {
        return state.fansArray.length
    }
    

    @Action(SetFans)
    setFans(ctx: StateContext<FansStateModel>, { payload }: any) {
        const state = ctx.getState();
        ctx.setState(
            patch({
                fansArray: payload
            })
        );
    }  
    
}

