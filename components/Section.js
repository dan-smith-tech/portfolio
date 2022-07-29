import { useRef, useEffect, useState } from "react";

import sectionStyles from "../styles/section.module.css";

export default function Button({ subheading, heading, children }) {
	const intersectionDetectorRef = useRef();
	const [intersection, setIntersection] = useState(false);

	const getSubheadingStyles = () => {
		if (!intersection) return sectionStyles["subheading"];
		return (
			sectionStyles["subheading"] + " " + sectionStyles["subheading-animate"]
		);
	};

	const getHeadingStyles = () => {
		if (!intersection) return sectionStyles["heading"];
		return sectionStyles["heading"] + " " + sectionStyles["heading-animate"];
	};

	const getDividerStyles = () => {
		if (!intersection) return sectionStyles["divider"];
		return sectionStyles["divider"] + " " + sectionStyles["divider-animate"];
	};

	useEffect(() => {
		// Watch element to play animation when it loads into the viewport:
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!intersection && entry.isIntersecting) {
				setIntersection(true);
				observer.disconnect();
			}
		});
		observer.observe(intersectionDetectorRef.current);
	}, []);

	return (
		<div
			className={"container-full " + sectionStyles["container-full"]}
			id={subheading.toString().toLowerCase()}
		>
			<div
				className={
					"container-partial " + sectionStyles["container-partial"]
				}
			>
				<div className={"container-content "} ref={intersectionDetectorRef}>
					<h4 className={getSubheadingStyles()}>{subheading}</h4>
					<h2 className={getHeadingStyles()}>{heading}</h2>
					<div className={getDividerStyles()}></div>
				</div>
				{children}
			</div>
		</div>
	);
}
