import { Injectable } from '@angular/core';
import { AgeDataTable } from '../ngxs/model/agesTable.model';
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

    public filterByMaritalStatusAndStudysSortedByAge(fansArray: Fan[], maritalStatus: string, studyStatus: string) {
        var filtereds = this.filterByMaritalStatus(fansArray, maritalStatus)
        filtereds = this.filterByStudys(filtereds, studyStatus)

        filtereds.sort((a, b) => a.age - b.age);
        return filtereds
    }

    public filterByMaritalStatus(fansArray: Fan[], maritalStatus: string) {
        var filterByMaritalStatus: Fan[] = []
        fansArray.forEach(fan => {
            if (fan.maritalStatus == maritalStatus) {
                filterByMaritalStatus.push(fan)
            }
        });
        return filterByMaritalStatus
    }

    public filterByStudys(fansArray: Fan[], studyStatus: string) {
        var filterByStudyStatus: Fan[] = []
        fansArray.forEach(fan => {
            if (fan.studys == studyStatus) {
                filterByStudyStatus.push(fan)
            }
        });
        return filterByStudyStatus
    }

    public getAgeAverageByClub (fansArray: Fan[], club: string){
        var fansByClub = this.getFansByClub(fansArray, club)
        return this.getAgeAverage(fansByClub)
    }

    public getAgeAverage(fansArray: Fan[]){
        var sumTotalAges = 0
        const numberOfFans = fansArray.length
        fansArray.forEach(element => {
            sumTotalAges += element.age
        });
        var average = (sumTotalAges / numberOfFans).toFixed(2)
        return average
    }

    public getMaxAge(fansArray: Fan[]){
        var max = fansArray[0].age
        for (let index = 1; index < fansArray.length; index++) {
            const element = fansArray[index];
            if(element.age > max){
                max = element.age
            }
        }
        return max
    }
    public getMinAge(fansArray: Fan[]){
        var min = fansArray[0].age
        for (let index = 1; index < fansArray.length; index++) {
            const element = fansArray[index];
            if(element.age < min){
                min = element.age
            }
        }
        return min
    }


    public getAgesTable(fansArray: Fan[], clubs : string []){
        var agesTable : AgeDataTable[] = []
        for (let index = 0; index < clubs.length; index++) {
            const club = clubs[index];
            const fansByClub = this.getFansByClub(fansArray, club)
            const average = this.getAgeAverage(fansByClub)
            const minAge = this.getMinAge(fansByClub)
            const maxAge = this.getMaxAge(fansByClub)
            var data : AgeDataTable = {
                club: club,
                numberOfFans : fansByClub.length,
                minAge: minAge,
                maxAge: maxAge,
                ageAverage: average
            }
            agesTable.push(data)
        }
        agesTable.sort((a, b) => b.numberOfFans - a.numberOfFans);

        return agesTable
    }

}