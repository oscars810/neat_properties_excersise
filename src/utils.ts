import { IMonths, IProperty, IPortfolio } from './interfaces';

const N_PORTFOLIOS = 5;
const N_PROPERTIES = 20;
const CREDIT_YEARS = 20;
const UNEXPECTED_PROB = 0.05; // Represent the probability that an unexpected cost will appear.
const RENT_PROB = 0.9; // Represent the probability that renter pay each month.

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const toFloatRounded = (num: number): number => {
    return parseFloat(num.toFixed(3));
}

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomUFPayment(min: number, max: number): number {
    /* Generate a random monthly UF payment for X years */
    const total = getRandomInt(min, max);
    const toPaidAnually = (total * 0.9) / CREDIT_YEARS; // 10% footing and 20-year credit are assumed
    return Math.round(((toPaidAnually/12) + Number.EPSILON) * 100) / 100;
}

function addMonths(date: Date, months: number): Date {
    var day = date.getDate();
    date.setMonth(date.getMonth() + months);
    if (date.getDate() != day) {
      date.setDate(0);
    }
    return date;
}

function generateRent(value: number): number {
    /* Generate a rent with a probability */
    return Math.random() <= RENT_PROB ? value : 0;
}

function generateUnexpectedCost(): number {
    /* Generate a random UF cost with a probability */
    return Math.random() <= UNEXPECTED_PROB ? getRandomInt(1, 2) : 0;
}

function simulateData(): Array<IPortfolio> {
    const data: Array<IPortfolio> = [];
    for (let port = 0; port < N_PORTFOLIOS; port++) {
        const portfolio: IPortfolio = { properties: [] };
        for (let prop = 0; prop < N_PROPERTIES; prop++) {
            const property: IProperty = {
                name: `Property ${prop}`,
                incomes: {
                    year: {},
                },
                costs: {
                    year: {},
                }
            };
            /* Incomes includes the probability that it will be paid by the resident that month */
            const monthlyPayment = getRandomUFPayment(1500, 3000);
            property.incomes.year['2020'] = {
                January: {
                    rent: generateRent(monthlyPayment),
                },
                February: {
                    rent: generateRent(monthlyPayment),
                },
                March: {
                    rent: generateRent(monthlyPayment),
                },
                April: {
                    rent: generateRent(monthlyPayment),
                },
                May: {
                    rent: generateRent(monthlyPayment),
                },
                June: {
                    rent: generateRent(monthlyPayment),
                },
                July: {
                    rent: generateRent(monthlyPayment),
                },
                August: {
                    rent: generateRent(monthlyPayment),
                },
                September: {
                    rent: generateRent(monthlyPayment),
                },
                October: {
                    rent: generateRent(monthlyPayment),
                },
                November: {
                    rent: generateRent(monthlyPayment),
                },
                December: {
                    rent: generateRent(monthlyPayment),
                },
            };
            /* A few months there is an equal chance of an unexpected cost occurring */
            const dividend = toFloatRounded(monthlyPayment * 0.9); // Assume that the lease generates a 10% profit
            property.costs.year['2020'] = {
                January: {
                    dividend,
                    unexpectedCost: generateUnexpectedCost(),
                },
                February: {
                    dividend,
                },
                March: {
                    dividend,
                    unexpectedCost: generateUnexpectedCost(),
                },
                April: {
                    dividend,
                },
                May: {
                    dividend,
                    unexpectedCost: generateUnexpectedCost(),
                },
                June: {
                    dividend,
                },
                July: {
                    dividend,
                    unexpectedCost: generateUnexpectedCost(),
                },
                August: {
                    dividend,
                },
                September: {
                    dividend,
                    unexpectedCost: generateUnexpectedCost(),
                },
                October: {
                    dividend,
                },
                November: {
                    dividend,
                    unexpectedCost: generateUnexpectedCost(),
                },
                December: {
                    dividend,
                },
            };
            portfolio.properties.push(property);
        }
        data.push(portfolio);
    }
    return data;
}

export { monthNames, addMonths, simulateData, toFloatRounded };
