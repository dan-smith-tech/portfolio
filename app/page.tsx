"use client";

import { useRef } from "react";

import Button from "../components/form/Button";
import Section from "../components/Section";
import Occupations from "../components/Occupations";
import Skills from "../components/Skills";
import Awards from "../components/Awards";
import Experience from "../components/Experience";
import Project from "../components/Project";
import ContactForm from "../components/form/Contact";
import Footer from "../components/Footer";

import styles from "./page.module.css";
import { aboutContent } from "@/content/about";
import { projectsContent } from "@/content/projects";
import { experienceContent } from "@/content/experience";

export default function Landing() {
	const splashSection = useRef<HTMLElement | null>(null);

	return (
		<>
			<section
				id={"splash"}
				className={"container-full " + styles["container-full"]}
				ref={splashSection}
			>
				<div className={"container-partial " + styles["container-partial"]}>
					<div className={"container-content"}>
						<h1 className={styles["header"]}>
							<span className={styles["header-content"]}>Hey</span>
							<span className={styles["header-punctuation"]}>
								,
							</span>{" "}
							<span className={styles["header-content"]}>
								I&apos;m{" "}
								<span className={styles["header-name"]}>Dan</span>
							</span>
							<span className={styles["header-punctuation"]}>.</span>
						</h1>
						<h2 className={styles["roles"]}>
							<span>I&apos;m a... </span>
							<Occupations />
						</h2>
						<div className={styles["container-button"]}>
							<Button
								type="button"
								primary={true}
								onClick={() =>
									window.scrollTo(
										0,
										document.getElementById("projects")!.offsetTop
									)
								}
							>
								View My Work
							</Button>
							<Button
								type="button"
								primary={false}
								onClick={() =>
									window.scrollTo(
										0,
										document.getElementById("contact")!.offsetTop
									)
								}
							>
								Contact Me
							</Button>
						</div>
					</div>
				</div>
			</section>
			<Section
				subheading={"about"}
				heading={"UX is my passion, programming is my hobby."}
			>
				<div className={"container-content"}>
					{aboutContent.text.map((paragraph: string, i: number) => (
						<p key={i}>{paragraph}</p>
					))}
					<Awards />
				</div>
			</Section>
			<Section
				subheading={"projects"}
				heading={"Talk is cheap. Let's get to the good stuff."}
			>
				{projectsContent.map((project, i) => (
					<Project
						key={i}
						heading={project.heading}
						summary={project.summary}
						link={project.link}
						images={
							i % 2 === 0 ? project.images : project.images.reverse()
						}
						imageFirst={i % 2 === 0}
					/>
				))}
			</Section>
			<Section
				subheading={"experience"}
				heading={"I love to experiment with technology and its uses."}
			>
				<div className={"container-content"}>
					{experienceContent.map((experience, i) => (
						<Experience
							key={i}
							title={experience.title}
							date={experience.date}
							summary={experience.summary}
						/>
					))}
				</div>
			</Section>
			<Section
				subheading={"contact"}
				heading={"Let's connect, and start a conversation."}
			>
				<div className={"container-content"}>
					<ContactForm />
				</div>
			</Section>
			<Skills
				topElementId={"splash"}
				bottomElementId={"projects"}
				readHeightFromTopOfTop={true}
			/>
			<Skills
				topElementId={"projects"}
				bottomElementId={"footer"}
				readHeightFromTopOfTop={false}
			/>
			<Footer />
		</>
	);
}
