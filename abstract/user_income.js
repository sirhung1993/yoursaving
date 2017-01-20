module.exports = class user_income {
    /*
    {
          age: '111',
          monthSalary: '111',
          bonusReward: '111',
          monthReceiveBonus: '111',
          salaryIncrement: '111',
          fixCost: '111',
          fixCostIncrement: '111',
          bankInterest: '11',
          inflationRate: '11',
          calculationDuration: '11',
          typeOfFormat: 'year'
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
        this.typeOfFormat       = userIncome.typeOfFormat;
        this.totalSaving        = [];
    }
/*      CheckInput check all the input from user.
*       the input are POSITIVE NUMBER
*       and typeOfFormat must be YEAR or MONTH.
*/
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
        for (let order in arrayOfTotalAsset) {
            arrayOfTotalAsset[order] = parseInt(arrayOfTotalAsset[order] / 1000000) +
            " Triệu " + parseInt(arrayOfTotalAsset[order] % 1000000) + " Ngàn ";
        }
        return arrayOfTotalAsset;
    }
    ReadableEstimationSaving (){
        let EstimationSaving   = this.EstimationSaving();
        let readableEstimation  = [];
        let month = 0;
        // console.log(EstimationSaving);
        if (typeof EstimationSaving == 'object') {
            let totalAssetByMonth = this.ConvertToLetter(EstimationSaving);
            for (let value in totalAssetByMonth) {
                let name    = ++month + "th month";
                let asset   = totalAssetByMonth[value]
                readableEstimation[value] = {name , asset};
            }
            // console.log(readableEstimation[0].asset);
            return readableEstimation;
        } else {
            totalAssetByMonth.catch ((err) => {
                return Promise.reject(err);
            })
        }
    }

}
