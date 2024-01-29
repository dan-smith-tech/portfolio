import { useRef, useEffect, useState } from "react";

import styles from "./Section.module.css";

export default function Button({
	subheading,
	heading,
	children,
}: {
	subheading: string;
	heading: string;
	children: React.ReactNode;
}) {
	const intersectionDetectorRef = useRef<HTMLDivElement>(null);
	const [intersection, setIntersection] = useState(false);

	const getSubheadingStyles = () => {
		if (!intersection) return styles["subheading"];
		return styles["subheading"] + " " + styles["subheading-animate"];
	};

	const getHeadingStyles = () => {
		if (!intersection) return styles["heading"];
		return styles["heading"] + " " + styles["heading-animate"];
	};

	const getDividerStyles = () => {
		if (!intersection) return styles["divider"];
		return styles["divider"] + " " + styles["divider-animate"];
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
		observer.observe(intersectionDetectorRef.current!);
	}, []);

	return (
		<section
			className={"container-full " + styles["container-full"]}
			id={subheading.toString().toLowerCase()}
			tabIndex={-1}
		>
			<div className={"container-partial " + styles["container-partial"]}>
				<div className={"container-content "} ref={intersectionDetectorRef}>
					<h4 className={getSubheadingStyles()}>{subheading}</h4>
					<h2 className={getHeadingStyles()}>{heading}</h2>
					<div className={getDividerStyles()}></div>
				</div>
				{children}
			</div>
		</section>
	);
}
