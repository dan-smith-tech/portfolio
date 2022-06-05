import { useRef, useEffect, useState } from "react";
import Link from "next/link";

import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Section from "../components/Section";
import Occupations from "../components/Occupations";
import Skills from "../components/Skills";
import Awards from "../components/Awards";
import Project from "../components/Project";
import Modal from "../components/Modal";

import sendFetchRequest from "../lib/fetch";
import { isEmail } from "../lib/helpers";

import landingStyles from "../styles/landing.module.css";

function Landing() {
	const [showNewsletterModal, setShowNewsletterModal] = useState(false);
	const splashSection = useRef();

	var aboutSection = null;
	var skillsElementContainerFirst = null;
	var skillsElementFirst = null;
	var workSection = null;
	var contactSection = null;
	var newsletterSection = null;
	var skillsElementContainerSecond = null;
	var skillsElementSecond = null;
	var skillsElementHeight = null;

	// Calculate the 'top' value for the skills carousel positioned sticky (the container is sticky) on the right of the screen:
	function calculateSkillsElementPosition() {
		// Get the height of the two sections the sticky carousel container needs to vertically fill (splash & 'about'):
		var totalHeightSectionFirst = splashSection.current.clientHeight + aboutSection.clientHeight;
		// Center the skills carousel vertically on the screen, for the sections defined above:
		var topFirst = (window.innerHeight - skillsElementHeight) / 2;
		skillsElementFirst.style.top = topFirst + "px";
		// Add buffer to the bottom of the container to keep the element centered in the screen when the sticky positioning disengages:
		skillsElementContainerFirst.style.height = totalHeightSectionFirst - topFirst + "px";

		// Get the height of the two sections the sticky carousel container needs to vertically fill ('contact' & 'newsletter'):
		var totalHeightSectionSecond = contactSection.clientHeight + newsletterSection.clientHeight;
		// Center the skills carousel vertically on the screen, for the sections defined above:
		var topSecond = (window.innerHeight - skillsElementHeight) / 2;
		skillsElementSecond.style.top = topSecond + "px";
		// Position the container at the bottom of the page to align with the sections defined above:
		var topContainerSecond = splashSection.current.clientHeight + aboutSection.clientHeight + workSection.clientHeight;
		skillsElementContainerSecond.style.top = topContainerSecond + topSecond + "px";
		// Add buffer to the top and bottom of the container to keep the element centered in the screen when the sticky positioning disengages:
		skillsElementContainerSecond.style.height = totalHeightSectionSecond - topSecond * 2 + "px";
	}

	function handleNewsletterSignup(e) {
		e.preventDefault();
		const email = e.target.email.value;
		if (email.length > 0 && isEmail(email)) {
			setShowNewsletterModal(true);
			sendFetchRequest("https://bevl.app/api/email?bevlAnnouncements=true", "POST", { email: email });
			e.target.email.value = null;
		}
	}

	useEffect(() => {
		// Hard-coded section refs to avoid forwardRef issues:
		aboutSection = splashSection.current.nextSibling.nextSibling;
		skillsElementContainerFirst = aboutSection.previousSibling;
		skillsElementFirst = skillsElementContainerFirst.children[0];
		workSection = aboutSection.nextSibling;
		contactSection = aboutSection.nextSibling.nextSibling;
		newsletterSection = contactSection.nextSibling.nextSibling;
		skillsElementContainerSecond = contactSection.nextSibling;
		skillsElementSecond = contactSection.nextSibling.children[0];
		skillsElementHeight = skillsElementFirst.clientHeight;

		calculateSkillsElementPosition();
		window.addEventListener("resize", calculateSkillsElementPosition);
		return () => window.removeEventListener("resize", calculateSkillsElementPosition);
	}, []);

	return (
		<>
			<section className={"container-full " + landingStyles["container-full"]} ref={splashSection}>
				<div className={"container-partial " + landingStyles["container-partial"]}>
					<div className={"container-content"}>
						<h1 className={landingStyles["header"]}>
							<span>Hi, </span>
							<span>I'm Dan.</span>
						</h1>
						<h3 className={landingStyles["roles"]}>
							<span>I'm a... </span>
							<Occupations />
						</h3>
						<div className={landingStyles["container-button"]}>
							<Link href="#work">
								<Button type="button" primary={true}>
									View My Work
								</Button>
							</Link>
							<Link href="#contact">
								<Button type="button" primary={false}>
									Contact Me
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Skills collapsible={true} />
			<Section subheading={"ABOUT"} heading={"UX is my passion, programming is my hobby."}>
				<div className={"container-content"}>
					<p>I love creating minimalist, modern, and enjoyable experiences. I believe the best UX exists where the least UI does, so the UI that does exist must be outstanding.</p>
					<p>I believe that innovation can only truly happen when technology is developed by a multitude of diverse people, and I therefore strive to partake in and support open-source wherever I can.</p>
					<Awards />
				</div>
			</Section>
			<Section subheading={"WORK"} heading={"Talk is cheap. Let's get to the good stuff."}>
				<Project
					heading="Bevl"
					summary="Built with Node.js, Express.js, and MongoDb, Bevl is a simple, personal planner app. I built Bevl to facilitate my planning philospphy, which involves assigning ambiguous chunks of time to tasks, as making hyper-specific plans are not realistic."
					link="https://bevl.app"
					images={["/images/projects/bevl/website.png", "/images/projects/bevl/dashboard.png", "/images/projects/bevl/labels.png"]}
					imageFirst={true}
				/>
			</Section>
			<Section subheading={"CONTACT"} heading={"Let's connect, and get in touch."}>
				<div className={"container-content"}>
					<form method="POST" name="Contact" data-netlify="true" netlify-honeypot="bot-field">
						<div className={"form-row"}>
							<div className={"form-element"}>
								<label htmlFor="name">Name*</label>
								<Input type="text" name="name" placeholder="Enter your name..." required={true} />
							</div>
							<div className={"form-element"}>
								<label htmlFor="email">Email*</label>
								<Input type="text" name="email" placeholder="Enter your email..." required={true} />
							</div>
						</div>
						<div className={"form-row"}>
							<div className={"form-element"}>
								<label htmlFor="body">Message*</label>
								<Input type="textarea" name="body" placeholder="Enter your message..." required={true} />
							</div>
						</div>
						<div className={"form-row"}>
							<Button type="submit" primary={true}>
								Send Message
							</Button>
						</div>
					</form>
				</div>
			</Section>
			<Skills collapsible={false} />
			<Section subheading={"NEWSLETTER"} heading={"Stay up to date with my latest projects."}>
				<div className={"container-content"}>
					<form onSubmit={handleNewsletterSignup}>
						<p className={"form-p"}>
							Over at{" "}
							<a href="https://bevl.app" target={"_blank"}>
								bevl.app
							</a>
							, I'm woking on a minimalist, interactive personal planner. Sign up to this newsletter to stay up to date with its progress and get an exclusive deal at launch.
						</p>
						<div className={"form-row"}>
							<div className={"form-element"}>
								<Input type="text" name="email" placeholder="Enter your email..." required={true} />
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
						body={"Thank you for signing up to the newsletter! Please confirm your subscription through the email you have been sent."}
						buttonValue={"I've Confirmed My Email"}
					/>
				</div>
			</Section>
		</>
	);
}

export default Landing;
