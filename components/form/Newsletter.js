import { useState } from "react";

import Input from "./Input";
import Button from "./Button";
import Modal from "../Modal";

import { isEmail } from "../../lib/helpers";
import sendFetchRequest from "../../lib/fetch";

export default function NewsletterForm() {
	const [showNewsletterModal, setShowNewsletterModal] = useState(false);

	function handleNewsletterSignup(e) {
		e.preventDefault();

		const email = e.target.email.value;

		if (email.length > 0 && isEmail(email)) {
			setShowNewsletterModal(true);
			sendFetchRequest(
				"/api/newsletter/subscribe?optInStage=1&bevlAnnouncements=true",
				"POST",
				{
					email,
				}
			);

			e.target.email.value = null;
		}
	}

	return (
		<>
			<form onSubmit={handleNewsletterSignup}>
				<p className={"form-p"}>
					Over at{" "}
					<a href="https://bevl.app" target={"_blank"}>
						bevl.app
					</a>
					, I'm woking on a minimalist, interactive personal planner. Sign
					up to this newsletter to stay up to date with its progress and
					get an exclusive deal at launch.
				</p>
				<div className={"form-row"}>
					<div className={"form-element"}>
						<Input
							type="text"
							name="email"
							placeholder="Enter your email..."
							required={true}
						/>
					</div>
					<Button type="submit" primary={true}>
						Sign Up
					</Button>
				</div>
			</form>
			<Modal
				show={showNewsletterModal}
				onClose={() => setShowNewsletterModal(false)}
				heading={"Confirm Subscription"}
				body={
					"Thank you for signing up to the newsletter! Please confirm your subscription through the email you have been sent."
				}
				buttonValue={"I've Confirmed My Email"}
			/>
		</>
	);
}
