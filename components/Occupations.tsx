import { useRef, useEffect, useState } from "react";

import styles from "./Occupations.module.css";

export default function Occupations() {
	const [currentOccupation, setCurrentOccupation] = useState(0);
	const containerMain = useRef<HTMLDivElement>(null);

	const occupations = [
		{ name: "Machine Learning Enthusiast" },
		{ name: "Software Engineer" },
		{ name: "Front-End Web Developer" },
		{ name: "Full-Stack Web Developer" },
	];

	function nextOccupation() {
		setCurrentOccupation((currentOccupation) => {
			// Make index infinitely loop by setting it back to the first element if it's at the end of the array:
			const i =
				currentOccupation === 0
					? occupations.length - 1
					: currentOccupation - 1;

			// // Get the height of an occupation element:
			const height =
				containerMain.current!.children[0].children[0].clientHeight;

			// Center the selected occupation vertically in its container (offset it based on the cumulative width of the number of siblings before it):
			const offset =
				(containerMain.current!.clientHeight - height) / 2 - i * height;
			(containerMain.current!.children[0] as HTMLElement).style.marginTop =
				offset + "px";

			return i;
		});
	}

	const getOccupationStyles = (i: number) => {
		if (i === currentOccupation)
			return (
				styles["content-element"] + " " + styles["content-element-select"]
			);
		return styles["content-element"] + " " + styles["content-element-hidden"];
	};

	useEffect(() => {
		nextOccupation();
		const interval = setInterval(() => nextOccupation(), 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles["container-main"]} ref={containerMain}>
			<ul>
				{occupations &&
					occupations.map((occupation, i) => (
						<li className={getOccupationStyles(i)} key={i}>
							{occupations[i].name}
						</li>
					))}
			</ul>
		</div>
	);
}
