import { BankAccount } from "./bank_account.js";

const person = new BankAccount();

async function transaction()
{
	try {

        console.log(`Saldo: ${person.balance}`);
        console.log('--------------------------------');

		const personDeposit= await person.deposit(5000);
		console.log(personDeposit);

        const personWithdraw= await person.withdraw(2000);
		console.log(personWithdraw);

        console.log('--------------------------------');
        console.log(`Saldo: ${person.balance}`);

	} catch (error) {
		console.log(error);
	}
}

transaction();