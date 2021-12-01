export interface IMonths {
    January: {
        [payment: string]: number;
    };
    February: {
        [payment: string]: number;
    };
    March: {
        [payment: string]: number;
    };
    April: {
        [payment: string]: number;
    };
    May: {
        [payment: string]: number;
    };
    June: {
        [payment: string]: number;
    };
    July: {
        [payment: string]: number;
    };
    August: {
        [payment: string]: number;
    };
    September: {
        [payment: string]: number;
    };
    October: {
        [payment: string]: number;
    };
    November: {
        [payment: string]: number;
    };
    December: {
        [payment: string]: number;
    };
}

export interface IProperty {
    name: string;
    incomes: {
        year: {
            [year: string]: IMonths;
        };
    };
    costs: {
        year: {
            [year: string]: IMonths;
        };
    };
}

export interface IPortfolio {
    properties: IProperty[];
}

export interface IAnalitycs {
    Profit(portfolio: IPortfolio, startDate: Date, endDate: Date): void;
    IdealProfit(portfolio: IPortfolio, startDate: Date, endDate: Date): void;
    NoPaymentPercent(portfolio: IPortfolio, startDate: Date, endDate: Date): void;
}