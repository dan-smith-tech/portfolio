import fetch from "node-fetch";

export default async function contactHandler(req, res) {
	const { method } = req;
	const { name, email, body } = req.body;

	switch (method) {
		case "POST":
			const params = {
				username: "dansmith.tech",
				avatar_url: "https://www.dansmith.tech/images/discord-avatar.png",
				content: "New contact form submission:",
				embeds: [
					{
						author: {
							name: email,
						},
						title: name,
						description: body,
						color: 169459,
					},
				],
			};

			await fetch(process.env.CONTACT_WEBHOOK_DISCORD, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(params),
			}).catch((err) => {
				console.log(err);
			});

			await res.status(200).json({
				success: true,
				message: "Email sent.",
			});
			break;
		default:
			res.status(400).json({
				success: false,
				message: "Incorrect request method: " + method,
			});
			break;
	}
}
