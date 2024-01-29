import fetch from "node-fetch";

export async function POST(req: Request) {
	const { name, email, body } = await req.json();

	const res = await fetch(process.env.DISCORD_SERVER_WEBHOOK as string, {
		method: "POST",
		headers: {
			"Content-type": "application/json",
		},
		body: JSON.stringify({
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
		}),
	});

	if (res.ok)
		return new Response(
			JSON.stringify({
				success: true,
				message: "Your message has been sent. Thanks for getting in touch!",
			})
		);

	return new Response(
		JSON.stringify({
			status: 500,
			message:
				"There was a problem sending your message. Please try again later. Sorry!",
		})
	);
}
