export class BankAccount
{
    constructor(balance = 0)
    {
        this.balance = balance;
    }

    validation(amount, status)
    {
        if(!amount || !status)
        {
            return 'The amount cannot null';
        }

        let intAmount = parseInt(amount);
        
        if(isNaN(intAmount))
        {
            return `The amount you want to ${status} must be a number`;
        }

        if(intAmount <= 0)
        {
            return `The amount you want to ${status} cannot be less than or equal to 0`;
        }

        if(status == "withdraw")
        {
            if(intAmount > this.balance)
            {
                return `Withdraw: ${amount} failed, the balance is insufficient`;
            }
        }

        return intAmount;
    }

    deposit(amount)
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let result = this.validation(amount, "deposit");

                if(isNaN(result)){
                    reject(result);
                }

                this.balance += amount;
                resolve(`Deposit: ${amount} successfull`);
            });
        }, 2000);
    }

    withdraw(amount)
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let result = this.validation(amount, "withdraw");

                if(isNaN(result)){
                    reject(result);
                }

                this.balance -= amount;
                resolve(`Withdraw: ${amount} successfull`);
            });
        }, 2000);
    }
}