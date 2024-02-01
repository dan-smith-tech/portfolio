import { useRef, useEffect, useState } from "react";

import { skillsContent } from "@/content/skills";

import styles from "./Skills.module.css";

export default function Skills({
	topElementId,
	bottomElementId,
	readHeightFromTopOfTop,
	collapsible,
}: {
	topElementId: string;
	bottomElementId: string;
	readHeightFromTopOfTop: boolean;
	collapsible: boolean;
}) {
	const [currentSkill, setCurrentSkill] = useState<number>(0);
	const containerMain = useRef<HTMLDivElement>(null);
	const element = useRef<HTMLDivElement>(null);

	function nextSkill() {
		setCurrentSkill((currentSkill) => {
			// Make index infinitely loop by setting it back to the first element if it's at the end of the array:
			const i =
				currentSkill === skillsContent.length - 1 ? 0 : currentSkill + 1;

			// Get the height of the selected skill element:
			const largeHeight = 60;
			// Get the height of all the siblings to the selected skill element:
			const smallHeight = 46;

			// Center the selected skill vertically in its container (offset it based on the cumulative width of the number of siblings before it):
			const offset =
				(containerMain.current!.children[0].clientHeight - largeHeight) /
					2 -
				i * smallHeight;
			(
				containerMain.current!.children[0].children[0] as HTMLElement
			).style.marginTop = offset + "px";

			return i;
		});
	}

	const getSkillStyles = (i: number) => {
		if (i === currentSkill)
			return (
				styles["content-element"] + " " + styles["content-element-select"]
			);
		if (Math.abs(i - currentSkill) <= 2) {
			if (i < currentSkill) return styles["content-element"];
			return styles["content-element"];
		}
		return styles["content-element"] + " " + styles["content-element-hidden"];
	};

	function calculateElementPosition() {
		const top =
			window.pageYOffset +
			(readHeightFromTopOfTop
				? document
						.querySelector("#" + topElementId)!
						.getBoundingClientRect().top
				: document
						.querySelector("#" + topElementId)!
						.getBoundingClientRect().bottom);
		const bottom =
			window.pageYOffset +
			document.querySelector("#" + bottomElementId)!.getBoundingClientRect()
				.top;

		containerMain.current!.style.top =
			top + (window.innerHeight - element.current!.clientHeight) / 2 + "px";
		containerMain.current!.style.height =
			bottom -
			top -
			(window.innerHeight - element.current!.clientHeight) +
			"px";

		element.current!.style.top =
			(window.innerHeight - element.current!.clientHeight) / 2 + "px";

		element.current!.style.opacity = "1";
	}

	useEffect(() => {
		calculateElementPosition();
		window.addEventListener("resize", calculateElementPosition);

		nextSkill();
		const interval = setInterval(() => nextSkill(), 1500);
		return () => {
			window.removeEventListener("resize", calculateElementPosition);
			clearInterval(interval);
		};
	}, []);

	return (
		<div
			className={
				!collapsible
					? styles["container-main"]
					: styles["container-main"] +
					  " " +
					  styles["container-main-collapsible"]
			}
			ref={containerMain}
		>
			<div
				className={styles["container-content"]}
				tabIndex={-1}
				ref={element}
			>
				<ul className={styles["list"] + " " + styles["content"]}>
					{skillsContent &&
						skillsContent.map((skill, i) => (
							<li className={getSkillStyles(i)} key={i}>
								{skillsContent[i].name}
							</li>
						))}
				</ul>
				<ul className={styles["list"] + " " + styles["links"]}>
					<li className={styles["links-element"]}>
						<a
							href={"https://github.com/dan-smith-tech"}
							target="_blank"
							aria-label="GitHub link"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
							>
								<path
									fill="#ffffff"
									fillOpacity="1"
									d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
								></path>
							</svg>
						</a>
					</li>
					<li className={styles["links-element"]}>
						<a
							href={"https://www.linkedin.com/in/dan-smith-tech"}
							target="_blank"
							aria-label="LinkedIn link"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
							>
								<circle
									fill="#ffffff"
									fillOpacity="1"
									cx="4.983"
									cy="5.009"
									r="2.188"
								></circle>
								<path
									fill="#ffffff"
									fillOpacity="1"
									d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
								></path>
							</svg>
						</a>
					</li>
					<li className={styles["links-element"]}>
						<a
							href={"https://codepen.io/dan-smith-tech"}
							target="_blank"
							aria-label="CodePen link"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
							>
								<path
									fill="#ffffff"
									fillOpacity="1"
									d="M21.838 8.445c0-.001-.001-.001 0 0l-.003-.004-.001-.001v-.001a.809.809 0 0 0-.235-.228l-9.164-6.08a.834.834 0 0 0-.898 0L2.371 8.214A.786.786 0 0 0 2 8.897v6.16a.789.789 0 0 0 .131.448v.001l.002.002.01.015v.002h.001l.001.001.001.001c.063.088.14.16.226.215l9.165 6.082a.787.787 0 0 0 .448.139.784.784 0 0 0 .45-.139l9.165-6.082a.794.794 0 0 0 .371-.685v-6.16a.793.793 0 0 0-.133-.452zm-9.057-4.172 6.953 4.613-3.183 2.112-3.771-2.536V4.273zm-1.592 0v4.189l-3.771 2.536-3.181-2.111 6.952-4.614zm-7.595 6.098 2.395 1.59-2.395 1.611v-3.201zm7.595 9.311-6.96-4.617 3.195-2.15 3.765 2.498v4.269zm.795-5.653-3.128-2.078 3.128-2.105 3.131 2.105-3.131 2.078zm.797 5.653v-4.27l3.766-2.498 3.193 2.15-6.959 4.618zm7.597-6.11-2.396-1.611 2.396-1.59v3.201z"
								></path>
							</svg>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
