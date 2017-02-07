'use strict';
module.exports = class user_income {
    /*
    {
        age: 20,
        monthSalary: 9000000,
        salaryIncrement: 10,
        bonusReward: 9000000,
        monthReceiveBonus: 4,
        fixCost: 4000000,
        fixCostIncrement: 10,
        bankInterest: 0.53,
        inflationRate: 10,
        calculationDuration: 2,
        typeOfCurrency: 'usd',
        typeOfFormat: 'year',
        totalSaving: []
    }
    */

    constructor (userIncome) {
        this.age                = parseInt(userIncome.age);
        this.monthSalary        = parseInt(userIncome.monthSalary);
        this.salaryIncrement    = parseFloat(userIncome.salaryIncrement);
        this.bonusReward        = parseInt(userIncome.bonusReward);
        this.monthReceiveBonus  = parseInt(userIncome.monthReceiveBonus);
        this.fixCost            = parseInt(userIncome.fixCost);
        this.fixCostIncrement   = parseFloat(userIncome.fixCostIncrement);
        this.bankInterest       = parseFloat(userIncome.bankInterest);
        this.inflationRate      = parseFloat(userIncome.inflationRate);
        this.calculationDuration= parseInt(userIncome.calculationDuration);
        this.typeOfCurrency     = userIncome.typeOfCurrency;
        this.typeOfFormat       = userIncome.typeOfFormat;
        this.totalSaving        = [];
    }
/*      CheckInput check all the input from user.
*       the input are POSITIVE NUMBER
*       and typeOfFormat must be YEAR or MONTH.
*/

    setDefault() {
        this.age                = isNaN(this.age) ? undefined : this.age;
        this.monthSalary        = isNaN(this.monthSalary) ? 10000000 : this.monthSalary;
        this.salaryIncrement    = isNaN(this.salaryIncrement) ? 10   : this.salaryIncrement;
        this.bonusReward        = isNaN(this.bonusReward) ? 10000000 : this.bonusReward;
        this.monthReceiveBonus  = isNaN(this.bonusReward) ? 1 : this.monthReceiveBonus;
        this.fixCost            = isNaN(this.fixCost ) ? 4000000 : this.fixCost ;
        this.fixCostIncrement   = isNaN(this.fixCostIncrement) ? 0 : this.fixCostIncrement ;
        this.bankInterest       = isNaN(this.bankInterest) ? 0.5 : this.bankInterest ;
        this.inflationRate      = isNaN(this.inflationRate) ? 7 : this.inflationRate ;
        this.calculationDuration= isNaN(this.calculationDuration) ? 1 : this.calculationDuration ;
        // for (var i in this) {
        //     console.log(this[i]);
        //     }
        }

    CheckInput() {
        let isPositiveNumber;
        for (let key in this) {
            if (this[key] < 0) {
                isPositiveNumber = false;
                break;
            } else isPositiveNumber = true;
        }
        let isCorrectTypeFormat = (this.typeOfFormat.toLowerCase() == 'year') ||
        (this.typeOfFormat.toLowerCase() == 'month') ;

        return (isPositiveNumber && isCorrectTypeFormat);
    }
/* EstimationSaving calculate the totalAsset from user input.
*  monthReceiveBonus is NEGATIVE if the bonus equal <monthSalary>
*/
    EstimationSaving () {
        if ( this.CheckInput() ) {
            let salary  =   this.monthSalary;
            let fixCost =   this.fixCost;
            let calculationDuration = Math.ceil(this.calculationDuration) ?
            Math.ceil(this.calculationDuration) : 1; // the smallest duration is 1 YEAR
            let bankInterest        = this.bankInterest/100 + 1;
            let salaryIncrement     = this.salaryIncrement/100 + 1;
            let fixCostIncrement    = this.fixCostIncrement/100 + 1;
            let totalAsset          =  [salary - fixCost];
            let currentMonth        =  1; //totalAsset in first month = first monthSalary


            for (let month = 2; month <= 12; month++) {
                if (month != this.monthReceiveBonus) {
                    currentMonth++;
                    totalAsset[currentMonth - 1] = totalAsset[currentMonth - 2] *
                    bankInterest + salary - fixCost;
                } else {
                    currentMonth++;
                    totalAsset[month - 1] = totalAsset[month - 2] *
                    bankInterest + salary + this.bonusReward - fixCost;
                }
            }
            //Bonus - 13th month salary.
            totalAsset[currentMonth-1] +=  salary;
            // from the 2nd year - if it exist
            for (let year = 1 ; year < calculationDuration; year++){
                salary   *= salaryIncrement;
                fixCost  *= fixCostIncrement;
                for (let month = 1 ; month <= 12 ; month++) {
                    if (month != this.monthReceiveBonus) {
                        currentMonth++;
                        totalAsset[currentMonth - 1] = totalAsset[currentMonth - 2] *
                        bankInterest + salary - fixCost;
                    } else {
                        currentMonth++;
                        totalAsset[currentMonth - 1] = (totalAsset[currentMonth - 2] *
                        bankInterest + salary + this.bonusReward - fixCost);
                    }
                }
            }
            return totalAsset;
        } else return  Promise.reject (
            {err : { msg : 'Invalid input! Please input possitive number ' +
                            'or check again the Bonus salary.'}});
    }

    ConvertToLetter(arrayOfTotalAsset){
        let convertedToLetter = arrayOfTotalAsset;
        if(this.typeOfCurrency == "vnd") {
            for (let order in convertedToLetter) {
                convertedToLetter[order] = parseInt(convertedToLetter[order] / 1000000) +
                " triệu " + parseInt(convertedToLetter[order] % 1000000) + " ngàn Đồng";
            }
        } else if (this.typeOfCurrency == "usd"){
            for (let order in convertedToLetter) {
                if (!parseInt(convertedToLetter[order] / 1000000)) {
                    convertedToLetter[order] = parseInt(convertedToLetter[order] / 1000) +
                    " thousand(s) " + parseInt(convertedToLetter[order] % 1000) + "$Trump";
                } else {
                    convertedToLetter[order] = parseInt(convertedToLetter[order] / 1000000) +
                    " million(s) " + parseInt(convertedToLetter[order] % 1000000) + " thousand(s) "+
                    " $Trump ";
                }
            }
        } else {
            return  Promise.reject (
                {err : { msg : 'Invalid input! Please input correct curreny type.' +
                                'Or check again your input.'}});
        }
        return convertedToLetter;
    }

    FormatByPeriod (EstimationSaving){
        let formattedByPeriod = [];
        if (this.typeOfFormat == 'year') {
            for (var totalAssetByMonth in EstimationSaving) {
                if (((parseInt(totalAssetByMonth) + 1) % 12) == 0) {
                    formattedByPeriod.push(EstimationSaving[totalAssetByMonth]);
                }
            }
            return formattedByPeriod;
        } else if (this.typeOfFormat == 'month') {
            return EstimationSaving;
        } else {
            return  Promise.reject (
                {err : { msg : 'Invalid input! Please input correct time format.' +
                                'Or check again your input.'}});
        }
    }

    InflationReduction (){
        let remainAssetAfterReduction = 1 - this.inflationRate/100;
        let finalInflationRate = 1;
        if (this.CheckInput()) {
            for (var i = 1; i <= this.calculationDuration; i++) {
                finalInflationRate *= remainAssetAfterReduction;
            }
            return finalInflationRate;
        } else {
            return Promise.reject(
                {err : {msg : "Please input again! Input Invalid"}}
            )
        }
    }

    ReadableEstimationSaving (){
        let EstimationSaving   = this.EstimationSaving();
        let readableEstimation  = [];
        let usedPeriodFormat    = this.typeOfFormat;

        // console.log(EstimationSaving);
        if (typeof EstimationSaving == 'object') {
            let formattedByPeriod = this.FormatByPeriod(EstimationSaving);
            let convertedToLetter = this.ConvertToLetter(formattedByPeriod);
            if (usedPeriodFormat == 'year'|| usedPeriodFormat == 'month') {
                for (var totalAssetByEachYear in convertedToLetter) {
                    readableEstimation.push({
                        name : (parseInt(totalAssetByEachYear) + 1) + 'th ' + usedPeriodFormat,
                        asset: convertedToLetter[totalAssetByEachYear]
                    });
;
                }
            } else {
                    return Promise.reject (
                        {err : {msg : "Invalid type of Format"}}
                    );
                }
        } else {
            EstimationSaving.catch ((err) =>{
                return Promise.reject(err);
            })
        }
        return readableEstimation;
    }

}
