import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetPopularNamesByClub, SetFans } from '../action/fans.action';
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

    @Action(GetPopularNamesByClub)
    getPopularNames(ctx: StateContext<FansState>, { club }: any) {
//        const state = ctx.getState().fansArray;
        console.log("club",club)
        console.log("state",ctx.getState())
        
        //var array = state.fansArray

    /*     let arrayByClub = array.filter(fan => fan.club == club)


        console.log("arrayByClub",arrayByClub) */
    }

     
      
    
}

