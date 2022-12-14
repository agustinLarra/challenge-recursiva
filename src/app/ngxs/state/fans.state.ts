import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { SetClubNames, SetFans } from '../action/fans.action';
import { patch } from '@ngxs/store/operators'
import { Fan } from '../model/fans.model';

export interface FansStateModel {
    fansArray: Fan[];
    clubNamesArray: string[];
}

@State<FansStateModel>({
    name: 'fans',
    defaults: {
        fansArray: [],
        clubNamesArray: []
    }
})

@Injectable()
export class FansState {


    @Selector()
    static getAllFans(state: FansStateModel) {
        return state.fansArray
    }

    @Selector()
    static getClubNames(state: FansStateModel) {
        return state.clubNamesArray
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
    @Action(SetClubNames)
    setClubNames(ctx: StateContext<FansStateModel>, { payload }: any) {
        const state = ctx.getState();
        const clubNames = this.getClubNamesArray(payload)
        ctx.setState(
            patch({
                clubNamesArray: clubNames
            })
        );
    }
    getClubNamesArray(fans: Fan[]) {
        var clubNames: string[] = []
        clubNames.push(fans[0].club)
        for (let i = 0; i < fans.length; i++) {
            const fan = fans[i];
            let exist = false
            for (let j = 0; j < clubNames.length; j++) {
                const element = clubNames[j];
                if (fan.club == element) {
                    exist = true
                }
            }
            if (exist == false && fans[i].club!='') {
                clubNames.push(fans[i].club)
            }
        }
        return clubNames.sort()
    }
}

