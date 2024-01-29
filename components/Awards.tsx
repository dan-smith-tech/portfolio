import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import { aboutContent } from "@/content/about";

import styles from "./Awards.module.css";

export default function Awards() {
	const [currentAward, setCurrentAward] = useState(0);
	const containerMain = useRef<HTMLDivElement>(null);

	const awards = aboutContent.awards;

	function nextAward() {
		setCurrentAward((currentAward) => {
			// Make index infinitely loop by setting it back to the first element if it's at the end of the array:
			const i = currentAward === awards.length - 1 ? 0 : currentAward + 1;

			const awardElements = containerMain.current!.children[0].children;
			// Get the width of the selected award element:
			const largeWidth =
				i > currentAward
					? awardElements[i - 1].clientWidth
					: awardElements[i + 1].clientWidth;
			// Get the width of all the siblings to the selected award element:
			const smallWidth = awardElements[i].clientWidth;

			// Center the selected award horizontally in its container (offset it based on the cumulative width of the number of siblings before it):
			const offset =
				-(i * smallWidth) +
				(containerMain.current!.clientWidth - largeWidth) / 2;
			(containerMain.current!.children[0] as HTMLElement).style.marginLeft =
				offset + "px";

			return i;
		});
	}

	const getAwardStyles = (i: number) => {
		if (i === currentAward)
			return styles["award"] + " " + styles["award-current"];
		if (Math.abs(i - currentAward) === 1) {
			if (i < currentAward)
				return (
					styles["award"] +
					" " +
					styles["award-back"] +
					" " +
					styles["award-back-previous"]
				);
			return (
				styles["award"] +
				" " +
				styles["award-back"] +
				" " +
				styles["award-back-next"]
			);
		}
		return styles["award"] + " " + styles["award-hidden"];
	};

	useEffect(() => {
		nextAward();
		const interval = setInterval(() => nextAward(), 3500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles["container-main"]} ref={containerMain}>
			<div className={styles["container-awards"]}>
				{awards &&
					awards.map((award, i) => (
						<div className={getAwardStyles(i)} key={i}>
							<div className={styles["container-image"]}>
								<Image
									src={"/images/awards/" + award.image}
									alt={`Award ${i + 1} of ${awards.length}`}
									layout="fill"
									className={styles["image"]}
									draggable="false"
									loading={"eager"}
									quality={85}
									blurDataURL={
										"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmvq5HgAENgILsvB0aAAAAABJRU5ErkJggg=="
									}
									placeholder={"blur"}
								/>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
