import { useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";

import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Section from "../components/Section";
import Occupations from "../components/Occupations";
import Skills from "../components/Skills";
import Awards from "../components/Awards";
import Experience from "../components/Experience";
import Project from "../components/Project";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

import sendFetchRequest from "../lib/fetch";
import { isEmail } from "../lib/helpers";

import landingStyles from "../styles/landing.module.css";

function Landing() {
	const [showNewsletterModal, setShowNewsletterModal] = useState(false);
	const splashSection = useRef();

	function handleContactSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const email = e.target.email.value;
		const body = e.target.body.value;
		sendFetchRequest("/api/contact", "POST", { name, email, body });
	}

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
			<section
				id={"splash"}
				className={"container-full " + landingStyles["container-full"]}
				ref={splashSection}
			>
				<div
					className={
						"container-partial " + landingStyles["container-partial"]
					}
				>
					<div className={"container-content"}>
						<h1 className={landingStyles["header"]}>
							<span className={landingStyles["header-content"]}>
								Hey
							</span>
							<span className={landingStyles["header-punctuation"]}>
								,
							</span>{" "}
							<span className={landingStyles["header-content"]}>
								I'm{" "}
								<span className={landingStyles["header-name"]}>
									Dan
								</span>
							</span>
							<span className={landingStyles["header-punctuation"]}>
								.
							</span>
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
			<Section
				subheading={"ABOUT"}
				heading={"UX is my passion, programming is my hobby."}
			>
				<div className={"container-content"}>
					<p>
						I love creating minimalist, modern, and enjoyable experiences.
						I believe the best UX exists where the least UI does, so the
						UI that does exist must be outstanding.
					</p>
					<p>
						Innovation can only truly happen when technology is developed
						by a multitude of diverse people, and I therefore strive to
						partake in and support open-source wherever I can.
					</p>
					<Awards />
				</div>
			</Section>
			<Section
				subheading={"WORK"}
				heading={"Talk is cheap. Let's get to the good stuff."}
			>
				<Project
					heading="Bevl"
					summary="Built with Next.js, Node, Express, and MongoDB, Bevl is a modern todo list for productive visual plans. I created Bevl to facilitate my planning philosophy; assigning ambiguous chunks of time to todos, as making hyper-specific plans cause us to overlook the unpredictable nature of our goals."
					link="https://bevl.app"
					images={[
						"bevl/website.png",
						"bevl/tasks.png",
						"bevl/lists.png",
						"bevl/labels.png",
					]}
					imageFirst={true}
				/>
				<Project
					heading="Shelf"
					summary="Written in vanilla HTML, Shelf is a fully customisable, open-source browser startscreen. I made Shelf to exhibit the relative importance/priority of bookmarks, by their size."
					link="https://github.com/dan-smith-tech/shelf"
					images={[
						"shelf/loading.png",
						"shelf/colour.png",
						"shelf/layouts.png",
						"shelf/demo.png",
					]}
					imageFirst={false}
				/>
			</Section>
			<Section
				subheading={"EXPERIENCE"}
				heading={"I focus on the learning, not the finishing."}
			>
				<div className={"container-content"}>
					<Experience
						title={"Nutrition Mobile App Team Project"}
						date={"February 2023 - Present"}
						summary={
							"I am working in a team of 7, using the Agile SCRUM methodology to develop a personal informatics software application using Java (Android Studio) and SQL. Users can track their nutrition intake and mood fluctuations throughout the day, to set goals and track progress over time. We are conducting 2-week long sprints and I am acting as a SCRUM master, ensuring everyone stays on-task, work is distributed equitably, and that there are frequent check-ins."
						}
					/>
					<Experience
						title={"Digital Content/Marketing Placement"}
						date={"February 2023 - March 2023"}
						summary={
							"I conducted both online (secondary) and in-person (primary) research for a marketing agency. Working with two other consultants, we conducted in-person questionnaires and undertook desk research to identify he most effective segments and segment sizes for this digital marketing agency. Findings were presented in a concise presentation to the founders of the business."
						}
					/>
					<Experience
						title={"3-Day Startup"}
						date={"October 2022"}
						summary={
							"I worked with 3 people I had never met before to create a business plan and pitch deck - which we presented in front of investors - over the course of 1 weekend."
						}
					/>
					<Experience
						title={"Neural Network and Deep Learning Research"}
						date={"December 2021"}
						summary={
							"For my IB Extended Essay I investigated and experimented with the relationship between neuron density / number of hidden layers and efficiency / accuracy of a neural network. I implemented a neural network and collected a large amount of data to demonstrate a relationship between the above characteristics. As per the requirements of the Extended Essay, I presented this information in a dissertation-style essay."
						}
					/>
					<Experience
						title={"Front-End Web Developer for the IB"}
						date={"June 2020 - August 2020"}
						summary={
							"I secured a summer internship at age 16 in the IB IT department, working on the interface (as well as providing content) for a digital resource library using HTML, CSS, and JavaScript. I communicated with a team of designers and developers and pitched my ideas for navigation and responsive card layouts through designs and prototypes."
						}
					/>
					<Experience
						title={"UX/UI Consultant – Hive Learning"}
						date={"March 2020 - May 2020"}
						summary={
							"As a result of my IB MYP personal project (a mobile game I released on the Google Play Store made with Unity/C#), I was invited to work with the development team at Hive Learning to provide feedback on how their interface, UX, and content could better target their users. This required me to produce documents and diagrams to convey my ideas accurately and concisely."
						}
					/>
				</div>
			</Section>
			<Section
				subheading={"CONTACT"}
				heading={"Let's connect, and get in touch."}
			>
				<div className={"container-content"}>
					<form onSubmit={handleContactSubmit}>
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
							<Button type="submit" primary={true}>
								Send Message
							</Button>
						</div>
					</form>
				</div>
			</Section>
			<Section
				subheading={"NEWSLETTER"}
				heading={"Stay up to date with my latest projects."}
			>
				<div className={"container-content"}>
					<form onSubmit={handleNewsletterSignup}>
						<p className={"form-p"}>
							Over at{" "}
							<a href="https://bevl.app" target={"_blank"}>
								bevl.app
							</a>
							, I'm woking on a minimalist, interactive personal planner.
							Sign up to this newsletter to stay up to date with its
							progress and get an exclusive deal at launch.
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
				</div>
			</Section>
			<Skills
				topElementId={"splash"}
				bottomElementId={"work"}
				readHeightFromTopOfTop={true}
				collapsible={true}
			/>
			<Skills
				topElementId={"work"}
				bottomElementId={"footer"}
				readHeightFromTopOfTop={false}
				collapsible={false}
			/>
			<Footer />
		</>
	);
}

export default Landing;
