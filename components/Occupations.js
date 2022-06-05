import { useRef, useEffect, useState } from "react";

import occupationsStyles from "../styles/occupations.module.css";

export default function Occupations({}) {
	const [currentOccupation, setCurrentOccupation] = useState(0);
	const containerMain = useRef();

	const occupations = [{ name: "Machine Learning Enthusiast" }, { name: "Software Engineer" }, { name: "Front-End Web Developer" }, { name: "Full-Stack Web Developer" }];

	function nextOccupation() {
		setCurrentOccupation((currentOccupation) => {
			// Make index infinitely loop by setting it back to the first element if it's at the end of the array:
			const i = currentOccupation === 0 ? occupations.length - 1 : currentOccupation - 1;

			// // Get the height of an occupation element:
			const height = containerMain.current.children[0].children[0].clientHeight;

			// Center the selected occupation vertically in its container (offset it based on the cumulative width of the number of siblings before it):
			const offset = (containerMain.current.clientHeight - height) / 2 - i * height;
			containerMain.current.children[0].style.marginTop = offset + "px";

			// Change the title of the page in time with the carousel:
			document.title = "Dan Smith • " + occupations[i].name + " Portfolio";

			return i;
		});
	}

	const getOccupationStyles = (i) => {
		if (i === currentOccupation) return occupationsStyles["content-element"] + " " + occupationsStyles["content-element-select"];
		return occupationsStyles["content-element"] + " " + occupationsStyles["content-element-hidden"];
	};

	useEffect(() => {
		nextOccupation(0);
		const interval = setInterval(() => nextOccupation(), 2000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={occupationsStyles["container-main"]} ref={containerMain}>
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
