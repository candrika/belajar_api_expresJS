import mysql from 'mysql';

export const connects = mysql.createConnection({
	host:'localhost',
	user:'dikaeka',
	password:'passku',
	database:'sekolah_sma_yossudarso'
});
