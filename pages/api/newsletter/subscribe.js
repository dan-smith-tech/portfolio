const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.NEWSLETTER_API_KEY;

import { encryptEmail } from "../../../lib/crypto";

export default async function emailHandler(req, res) {
	switch (req.method) {
		case "POST":
			// create base URL for signup confirmation
			var link =
				process.env.NEWSLETTER_ABSOLUTE_URL +
				"/newsletter/subscribe/" +
				encryptEmail(req.body.email) +
				"?";

			// add query parameters depending on the specific newsltters signed up to
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

			// config Brevo API settings
			let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
			let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

			sendSmtpEmail.templateId = 6;
			sendSmtpEmail.sender = {
				name: process.env.NEWSLETTER_SENDER,
				email: process.env.NEWSLETTER_EMAIL,
			};
			sendSmtpEmail.to = [{ email: req.body.email }];
			sendSmtpEmail.replyTo = {
				name: process.env.NEWSLETTER_SENDER,
				email: process.env.NEWSLETTER_EMAIL,
			};
			sendSmtpEmail.params = { link };

			// send email with Brevo API
			await apiInstance
				.sendTransacEmail(sendSmtpEmail)
				.then((data) => {
					res.status(200).json({
						success: true,
						message: "Newsletter signup confirmation email sent.",
					});
				})
				.catch((err) => {
					res.status(500).json({
						success: false,
						message:
							"Problem sending newsletter signup confirmation email.",
					});
				});
			break;
		default:
			res.status(500).json({
				success: false,
				message: "Incorrect request method: " + req.method,
			});
			break;
	}
}
