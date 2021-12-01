import { IPortfolio, IAnalitycs, IMonths } from './interfaces';
import { addMonths, monthNames, toFloatRounded } from './utils';

class Analitycs implements IAnalitycs{

    Profit(portfolio: IPortfolio, startDate: Date, endDate: Date): void {
        this.calculateProfit(portfolio, startDate, endDate);
    }

    IdealProfit(portfolio: IPortfolio, startDate: Date, endDate: Date): void {
        this.calculateProfit(portfolio, startDate, endDate, true);
    }

    NoPaymentPercent(portfolio: IPortfolio, startDate: Date, endDate: Date): void {
        console.log("We are developing this feature...");
    }

    private calculateProfit(
        portfolio: IPortfolio,
        startDate: Date, 
        endDate: Date,
        withIdealProfit: boolean = false,
    ) {
        /* 
          As the rent and expenses are monthly, for simplicity approximate startDate
          to the following month and endDate the month of the date.
        */
        const startMonth: number = addMonths(startDate, -1).getMonth();
        const endMonth: number = endDate.getMonth();
        const startYear: number = addMonths(startDate, -1).getFullYear();
        const endYear: number = endDate.getFullYear();
    
        let totalIncomes: number = 0;
        let totalCosts: number = 0;
        let profit: number = 0;
        let idealIncomes: number = 0;
    
        portfolio.properties.forEach(prop => {
            let currentYear: number = startYear;
            let currentMonth: number = startMonth;
            while (currentYear <= endYear) {
                while (currentMonth < 12) {
                    if (currentMonth === endMonth && currentYear === endYear) break;
                    const strMonth: string = monthNames[currentMonth];
                    const incomes: { [payment: string]: number } = prop.incomes.year[currentYear][strMonth];
                    const costs: { [payment: string]: number } = prop.costs.year[currentYear][strMonth];
                    for (const payment in incomes) {
                        const value = incomes[payment];
                        if (withIdealProfit && payment === 'rent') {
                            if (value != 0) {
                                idealIncomes += toFloatRounded(value);
                            } else {
                                const yearIncomes = prop.incomes.year[currentYear];
                                idealIncomes += toFloatRounded(this.calculateExpectedRent(yearIncomes, currentMonth));
                            }
                        } else {
                            totalIncomes += toFloatRounded(value);
                        }
                    };
                    for (const payment in costs) {
                        const value = costs[payment];
                        totalCosts += toFloatRounded(value);
                    };
                    currentMonth += 1;
                };
                currentYear += 1;
                currentMonth = 0;
            };
    
            if (withIdealProfit) {
                profit += toFloatRounded(idealIncomes - totalCosts);
            } else {
                profit += toFloatRounded(totalIncomes - totalCosts);
            }
        });
        profit = toFloatRounded(profit);
    
        if (withIdealProfit) {
            console.log(`The Ideal profit of the portfolio is: ${profit} UF`);
        } else {
            console.log(`The profit of the portfolio is: ${profit} UF`);
        }
    }

    private calculateExpectedRent(yearIncomes: IMonths, currentMonth: number): number {
        /* 
            To calculate an unpaid rent, the average between the last and the next rent is calculated. 
            If there is no next rental, the average of the last 3 rentals is calculated. 
        */
        let month = currentMonth - 1;
        let nextRent = 0;
        while(month < 12){
            const strMonth = monthNames[month];
            if (yearIncomes[strMonth]['rent'] != 0) {
                nextRent = yearIncomes[strMonth]['rent'];
                break;
            }
            month += 1;
        }
        if (nextRent != 0) {
            month = currentMonth - 1;
            let lastRent = 0;
            while(month > 0){
                const strMonth = monthNames[month];
                if (yearIncomes[strMonth]['rent'] != 0) {
                    lastRent = yearIncomes[strMonth]['rent'];
                    break;
                }
                month -= 1;
            }
            return (lastRent + nextRent) / 2
        } else {
            month = currentMonth - 1;
            let rentsSum = 0;
            let rentCounter = 0;
            while(month > 0){
                const strMonth = monthNames[month];
                if (yearIncomes[strMonth]['rent'] != 0) {
                    rentsSum += yearIncomes[strMonth]['rent'];
                    rentCounter += 1;
                    if (rentCounter === 3) break;
                }
                month -= 1;
            }
            return rentsSum / rentCounter;
        }
    }
}

export default Analitycs;