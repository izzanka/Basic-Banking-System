let saldo = 0;

let txtTotalSaldo = document.createElement("p");
let btnTambahSaldo = document.createElement("button");
let btnKurangSaldo = document.createElement("button");

txtTotalSaldo.innerHTML = `Total saldo: ${saldo}`;
txtTotalSaldo.id = "txtTotalSaldo";
document.body.appendChild(txtTotalSaldo);

btnTambahSaldo.innerHTML = "Tambahkan saldo";
btnTambahSaldo.onclick = () => tambahSaldo();
document.body.appendChild(btnTambahSaldo);

btnKurangSaldo.innerHTML = "Kurangi saldo";
btnKurangSaldo.onclick = () => kurangiSaldo();
document.body.appendChild(btnKurangSaldo);


function tambahSaldo()
{
	let jumlahSaldoTambah = prompt("Masukkan jumlah saldo yang ingin ditambahkan", "0");

	let hasilValidasi = validasiSaldo(jumlahSaldoTambah, "ditambahkan");

	if(hasilValidasi)
	{
		saldo += hasilValidasi;
		alert(`Penambahan saldo berhasil. Total saldo saat ini: ${saldo}`);
		updateTextTotalSaldo();
	}
}

function kurangiSaldo()
{
	let jumlahSaldoKurang = prompt("Masukkan jumlah saldo yang ingin dikurangi", "0");

	let hasilValidasi = validasiSaldo(jumlahSaldoKurang, "dikurangi");

	if(hasilValidasi)
	{
		saldo -= hasilValidasi;
		alert(`Pengurangan saldo berhasil. Total saldo saat ini: ${saldo}`);
		updateTextTotalSaldo();
	}
}

function validasiSaldo(jumlahSaldo, keterangan)
{	
	if(!jumlahSaldo || !keterangan)
	{
		return;
	}

	let intJumlahSaldo = parseInt(jumlahSaldo);

	if(isNaN(intJumlahSaldo))
	{
		alert(`Jumlah saldo yang ingin ${keterangan} harus berupa angka.`);
		return;
	}

	if(intJumlahSaldo <= 0)
	{
		alert(`Jumlah saldo yang ingin ${keterangan} tidak boleh kurang dari atau sama dengan 0.`);
	  	return;
	}

	if(keterangan == "dikurangi")
	{
		if(intJumlahSaldo > saldo)
		{
			alert("Saldo tidak mencukupi.");
			return;
		}
	}

	return intJumlahSaldo;
}

function updateTextTotalSaldo()
{
	let txtTotalSaldo = document.getElementById("txtTotalSaldo");
	txtTotalSaldo.innerHTML = `Total saldo: ${saldo}`;
}


// import { BankAccount } from "./banking_system.js";

// const person = new BankAccount();

// async function transaction()
// {
// 	try {

//         console.log(`Saldo: ${person.balance}`);
//         console.log('--------------------------------');

// 		const personDeposit= await person.deposit(5000);
// 		console.log(personDeposit);

//         const personWithdraw= await person.withdraw(2000);
// 		console.log(personWithdraw);

//         console.log('--------------------------------');
//         console.log(`Saldo: ${person.balance}`);

// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// transaction();