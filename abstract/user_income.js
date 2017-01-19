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
        this.salaryIncrement    = parseInt(userIncome.salaryIncrement);
        this.bonusReward        = parseInt(userIncome.bonusReward);
        this.monthReceiveBonus  = parseInt(userIncome.monthReceiveBonus);
        this.fixCost            = parseInt(userIncome.fixCost);
        this.fixCostIncrement   = parseInt(userIncome.fixCostIncrement);
        this.bankInterest       = parseInt(userIncome.bankInterest);
        this.inflationRate      = parseInt(userIncome.inflationRate);
        this.calculationDuration= parseInt(userIncome.calculationDuration);
        this.typeOfFormat       = userIncome.typeOfFormat;
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
            let salary = this.monthSalary;
            let fixCost =   this.fixCost;
            let calculationDuration = Math.ceil(this.calculationDuration) ?
            Math.ceil(this.calculationDuration) : 1; // the smallest duration is 1 YEAR
            let bankInterest        = this.bankInterest + 1;
            let salaryIncrement     = this.salaryIncrement + 1;
            let fixCostIncrement    = this.fixCostIncrement + 1;
            let totalAsset          =  [salary];
            let currentMonth        =  1; //totalAsset in first month = first monthSalary
            console.log(calculationDuration + " " + totalAsset);
            for (let month = 2; month <= 12; month++) {
                if (month != this.monthReceiveBonus) {
                    currentMonth++;
                    totalAsset[month - 1] = totalAsset[month - 2] *
                    (this.bankInterest + 1) + salary - fixCost;
                } else {
                    currentMonth++;
                    totalAsset[month - 1] = totalAsset[month - 2] *
                    (this.bankInterest + 1) + salary + this.bonusReward - fixCost;
                }
            }
            for (let year = 1 ; year < calculationDuration; year++){
                totalAsset[currentMonth+1] += salary;
                salary   *= salaryIncrement;
                fixCost  *= fixCostIncrement;
                for (let month = 1 ; month <= 12 ; month++) {
                    if (month != this.monthReceiveBonus) {
                        currentMonth++;
                        totalAsset[currentMonth - 1] = totalAsset[currentMonth - 2] *
                        (this.bankInterest + 1) + salary - fixCost;
                    } else {
                        currentMonth++;
                        totalAsset[currentMonth - 1] = totalAsset[currentMonth - 2] *
                        (this.bankInterest + 1) + salary + this.bonusReward - fixCost;
                    }
                }
            }
            console.log("totalAsset : " + totalAsset);
        } else return new Promise.reject (
            {err : { msg : 'Invalid input! Please input possitive number ' +
                            'or check again the Bonus salary.'}});
    }

}
