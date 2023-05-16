import { useRef } from "react";

import Input from "./Input";
import Button from "./Button";

import sendFetchRequest from "../../lib/fetch";

export default function ContactForm() {
	const contactFormElement = useRef();
	const contactFormLoaderElement = useRef();
	const contactFormMessageElement = useRef();

	function handleContactSubmit(e) {
		e.preventDefault();

		if (!e.target.do_not_check.checked) {
			contactFormElement.current.classList.add("form-sent");

			sendFetchRequest("/api/contact", "POST", {
				name: e.target.name.value,
				email: e.target.email.value,
				body: e.target.body.value,
			}).then((res) => {
				contactFormLoaderElement.current.classList.add("loading-hidden");
				contactFormMessageElement.current.innerHTML = res.message;
			});
		}
	}

	return (
		<form onSubmit={handleContactSubmit} ref={contactFormElement}>
			<div className={"form-row"}>
				<div className={"form-element"}>
					<label htmlFor="name">Name*</label>
					<Input
						type="text"
						name="name"
						placeholder="Enter your name..."
						required={true}
					/>
				</div>
				<div className={"form-element"}>
					<label htmlFor="email">Email*</label>
					<Input
						type="text"
						name="email"
						placeholder="Enter your email..."
						required={true}
					/>
				</div>
			</div>
			<div className={"form-row"}>
				<div className={"form-element"}>
					<label htmlFor="body">Message*</label>
					<Input
						type="textarea"
						name="body"
						placeholder="Enter your message..."
						required={true}
					/>
				</div>
			</div>
			<div className={"form-row"}>
				<input
					type="checkbox"
					name="do_not_check"
					className={"checkbox-hidden"}
				/>
				<Button type="submit" primary={true}>
					Send Message
				</Button>
			</div>
			<div className={"form-response"}>
				<p ref={contactFormMessageElement}></p>
				<div
					id="contact-form-button-loading"
					className="loading"
					ref={contactFormLoaderElement}
				>
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>
			</div>
		</form>
	);
}
