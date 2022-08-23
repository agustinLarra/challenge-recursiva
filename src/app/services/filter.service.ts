import { Injectable } from '@angular/core';
import { Fan } from '../ngxs/model/fans.model';
import { NameCount } from '../ngxs/model/nameCount.model';


@Injectable()
export class FilterService {

    public getPopularNamesByClub(fansArray: Fan[], club: string) {
        var fansByClub = this.getFansByClub(fansArray, club)
        var fansByName: NameCount[] = []
        fansByName.push({ fan: fansByClub[0], count: 0 })
        for (let i = 0; i < fansByClub.length; i++) {
            const fan = fansByClub[i];
            var index = this.nameExists(fansByName, fan)
            if (index >= 0) {
                fansByName[index].count += 1
            } else {
                fansByName.push({ fan: fan, count: 1 })
            }
        }
        fansByName.sort((a, b) => b.count - a.count);
        return fansByName
    }

    nameExists(fansByName: NameCount[], fan: Fan) {
        var index = -1
        for (let i = 0; i < fansByName.length; i++) {
            const element = fansByName[i];
            if (fan.name == element.fan.name) {
                index = i
            }
        }
        return index
    }

    public getFansByClub(fansArray: Fan[], club: string) {
        var fansByClubArray: Fan[] = []
        fansArray.forEach(fan => {
            if (fan.club == club) {
                fansByClubArray.push(fan)
            }
        });
        return fansByClubArray
    }

}