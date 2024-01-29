import { useRef } from "react";

import sendFetchRequest, { ApiResponse } from "@/lib/fetch";

import Input from "./Input";
import Button from "./Button";

type FormTarget = {
	do_not_check: { checked: boolean };
	name: { value: string };
	email: { value: string };
	body: { value: string };
};

export default function ContactForm() {
	const contactFormElement = useRef<HTMLFormElement>(null);
	const contactFormLoaderElement = useRef<HTMLDivElement>(null);
	const contactFormMessageElement = useRef<HTMLDivElement>(null);

	function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const formTarget = e.target as unknown as FormTarget;

		if (!formTarget.do_not_check.checked) {
			contactFormElement.current!.classList.add("form-sent");

			sendFetchRequest("/api/contact", "POST", {
				name: formTarget.name.value,
				email: formTarget.email.value,
				body: formTarget.body.value,
			}).then((response: unknown) => {
				const res = response as ApiResponse;
				console.log(res);
				contactFormLoaderElement.current!.classList.add("loading-hidden");
				contactFormMessageElement.current!.innerHTML = res.message;
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
					tabIndex={-1}
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
