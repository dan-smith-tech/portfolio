const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

import { encryptEmail, decryptEmail } from "../../../lib/crypto";

export default async function emailHandler(req, res) {
	const { method } = req;
	const { email } = req.body;

	switch (method) {
		case "POST":
			try {
				var link =
					process.env.ABSOLUTE_URL +
					"/newsletter/subscribe/" +
					encryptEmail(email) +
					"?";

				if (
					req.query.hasOwnProperty("bevlAnnouncements") &&
					req.query["bevlAnnouncements"] == "true"
				)
					link += "bevlAnnouncements=true&";
				if (
					req.query.hasOwnProperty("productivityTips") &&
					req.query["productivityTips"] == "true"
				)
					link += "productivityTips=true&";

				let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
				let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

				sendSmtpEmail.templateId = 6;
				sendSmtpEmail.sender = { name: "Bevl", email: "info@bevl.app" };
				sendSmtpEmail.to = [{ email }];
				sendSmtpEmail.replyTo = { name: "Bevl", email: "info@bevl.app" };
				sendSmtpEmail.params = { link };

				apiInstance
					.sendTransacEmail(sendSmtpEmail)
					.then((data) => {
						res.status(201).json({ success: true, data: { email } });
					})
					.catch((error) => {
						console.error(error);
					});
			} catch (err) {
				console.log(err);
				res.status(400).json({ success: false, message: err });
			}
			break;
		default:
			res.status(400).json({
				success: false,
				message: "Incorrect request method: " + method,
			});
			console.log("Incorrect request method" + method);
			break;
	}
}
