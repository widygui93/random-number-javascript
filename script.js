const x = 2; // x adalah jumlah baris dalam tabel
const y = 10; // y adalah jumlah kolom dalam tabel
// ======== panggil createTable untuk membuat table Batu Goncang ===========
createTable('tableBatuGoncang',x,y,1);
// ======== panggil createTable untuk membuat my Table ===========
createTable('myTable',1,y,0);

/* 
	FUNCTION MEMBUAT TABLE BERDASARKAN 
	JUMLAH BARIS, JUMLAH KOLOM, TIPE (APAKAH NILAI BERATURAN ATAU NILAI ACAK)
	DENGAN DOM JAVASCRIPT
*/
function createTable(nmTable,jlhBrs,jlhKolom,tipe){
	var isi;
	// tipe nilai 1 berarti nilai kolom beraturan
	// tipe nilai 0 berarti nilai kolom acak 1 - jumlah x*y
	if(tipe == 1) isi = 1;
	if(tipe != 1) isi= Math.ceil(Math.random() * (x*y));

	const tabel = document.getElementById(nmTable);
	tabel.appendChild(document.createElement("table"));

	for(let baris = 0; baris < jlhBrs; baris++){
		var brs = document.createElement("tr");
		for(let kolom = 0; kolom < jlhKolom; kolom++){
			var klm = document.createElement("td");
			var nomor = document.createTextNode(isi);
			klm.appendChild(nomor); 
			brs.appendChild(klm);		
			if (tipe == 1) isi = isi + 1;
			if (tipe != 1) isi = Math.ceil(Math.random() * (x*y));
		}
		tabel.appendChild(brs);
	}
	return tabel;
}

// menampilkan jumlah kesempatan bermain
document.getElementById("kesempatan").innerHTML = 18;

const tableBG = document.getElementById("tableBatuGoncang");
const rowBG = tableBG.getElementsByTagName("tr");

const MyTableBG = document.getElementById("myTable");
const rowMyTableBG = MyTableBG.getElementsByTagName("tr");
const colMyTableBG = rowMyTableBG[0].getElementsByTagName("td");

const hasil = document.getElementById("hasil");

// isi nilai-nilai acak yang di tabel myTable ke dalam array isiMyTabel
const isiMyTabel = [];
for (let i = 0; i < 10; i++){
	isiMyTabel.push(colMyTableBG[i].innerText);
}
// isi nilai-nilai beraturan yang di tabel tableBatuGoncang ke dalam array valueTableBG
let valueTableBG = [];
for (let i4 = 1; i4 <= (x*y); i4++){
	valueTableBG.push(i4);
}

//ketika button play di klik
let nilaiTerpilih = 0;
const tombolPlay = document.getElementsByTagName('button')[0];
tombolPlay.addEventListener('click', function() {
	let nilaiBarisAcak = 0;
	let nilaiKolomAcak = 0;
	let nilaiTabel = 0;
	let indexAda = [];
	let ada = false;
	let indexTabel = 0;
	let simpanIdxBrs = 0;
	let simpanIdxKlm = 0;
	let chance = 0;

	// cari index dari array valueTableBG secara random
	indexTabel = Math.floor(Math.random() * valueTableBG.length);
	// isi variabel nilaiTabel berdasarkan index random di array valueTableBG
	nilaiTabel = valueTableBG[indexTabel];
	// cek nilaiTabel ini ada nya di baris index ke berapa dan kolom index ke berapa di tableBatuGoncang
	for(let idxBrsTblBg = 0; idxBrsTblBg < rowBG.length; idxBrsTblBg++){
		let colBG = rowBG[idxBrsTblBg].getElementsByTagName("td");
		for(let idxKlmTblBg = 0; idxKlmTblBg < colBG.length; idxKlmTblBg++){
			if(nilaiTabel == colBG[idxKlmTblBg].innerText){
				simpanIdxBrs = idxBrsTblBg;
				simpanIdxKlm = idxKlmTblBg;
			}
		}
	}
	// beri warna di cell di tableBatuGoncang
	colBG = rowBG[simpanIdxBrs].getElementsByTagName("td");
	colBG[simpanIdxKlm].style.backgroundColor = "#00FF00";

	// buang nilaiTabel di dalam array valueTableBG
	let delIdx = valueTableBG.indexOf(nilaiTabel);
	if (delIdx > -1){
		valueTableBG.splice(delIdx, 1);
	}

	// cek apakah nilaiTabel yang dipilih random ini ada atau tidak nilainya di myTable
	// kalau ada maka simpan index-index ny di array indexAda 
	// karena bisa saja di myTable ada ditemukan lebih dari 1 atau tidak ada sama sekali
	for(let i2 = 0; i2 < isiMyTabel.length; i2 ++){
		if(nilaiTabel == isiMyTabel[i2]){
			ada = true;
			indexAda.push(i2);
		} 
	}
	// kalau ada maka beri warna di cell-cell di myTable
	if (ada == true){
		for(let i3 = 0; i3 < indexAda.length; i3 ++){
			colMyTableBG[indexAda[i3]].style.backgroundColor = "#00FF00";
			nilaiTerpilih ++;
		}
	}
	
	// kurangi kesempatan bermain
	chance = document.getElementById("kesempatan").innerText;
	chance = chance - 1;

	// menampilkan kembali update jumlah kesempatan bermain
	document.getElementById("kesempatan").innerHTML = chance;

	// cek apakah player menang
	if(nilaiTerpilih == 10 && chance >= 0){
		// tambahkan component alert suskes bootstrap ke dokumen HTML
		hasil.innerHTML = '<div class="alert alert-success">You <strong>WON!</strong></div>';
		// panggil function agar ukuran alertnya sesuai dengan konten
		alertSize();
		tombolPlay.disabled = true;
	}
	// cek apakah player kalah
	if(nilaiTerpilih != 10 && chance == 0){
		// tambahkan component alert danger bootstrap ke dokumen HTML
		hasil.innerHTML = '<div class="alert alert-danger">You <strong>LOSE!</strong></div>';
		// panggil function agar ukuran alertnya sesuai dengan konten
		alertSize();
		tombolPlay.disabled = true;
	}
});

// ketika button reset di klik
const tombolReset = document.getElementsByTagName('button')[1];
tombolReset.addEventListener('click', function() {
	window.location.reload();
});

// function agar ukuran alert bootstrap sesuai dengan konten
function alertSize(){
	document.getElementsByClassName("alert")[0].style.display = "inline-block";
}