var CryptoJS = require("crypto-js");

function encryptEmail(email) {
	return CryptoJS.AES.encrypt(email, process.env.EMAIL_ENCRYPT_SECRET)
		.toString()
		.replace(/\+/g, "6uanw1g86o")
		.replace(/\//g, "2b7jodrk9s")
		.replace(/=/g, "1ukudmc4hy");
}

function decryptEmail(ciphertext) {
	var bytes = CryptoJS.AES.decrypt(
		ciphertext
			.toString()
			.replace(/6uanw1g86o/g, "+")
			.replace(/2b7jodrk9s/g, "/")
			.replace(/1ukudmc4hy/g, "="),
		process.env.EMAIL_ENCRYPT_SECRET
	);
	return bytes.toString(CryptoJS.enc.Utf8);
}

export { encryptEmail, decryptEmail };
