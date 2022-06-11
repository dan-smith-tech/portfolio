import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import awardsStyles from "../styles/awards.module.css";

export default function Awards({}) {
	const [currentAward, setCurrentAward] = useState(0);
	const containerMain = useRef();

	const awards = [
		{ image: "cssda-best-innovation.png" },
		{ image: "cssda-best-ui.png" },
		{ image: "cssda-best-ux.png" },
	];

	function nextAward() {
		setCurrentAward((currentAward) => {
			// Make index infinitely loop by setting it back to the first element if it's at the end of the array:
			const i = currentAward === awards.length - 1 ? 0 : currentAward + 1;

			const awardElements = containerMain.current.children[0].children;
			// Get the width of the selected award element:
			const largeWidth = i > currentAward ? awardElements[i - 1].clientWidth : awardElements[i + 1].clientWidth;
			// Get the width of all the siblings to the selected award element:
			const smallWidth = awardElements[i].clientWidth;

			// Center the selected award horizontally in its container (offset it based on the cumulative width of the number of siblings before it):
			const offset = -(i * smallWidth) + (containerMain.current.clientWidth - largeWidth) / 2;
			containerMain.current.children[0].style.marginLeft = offset + "px";

			return i;
		});
	}

	const getAwardStyles = (i) => {
		if (i === currentAward) return awardsStyles["award"] + " " + awardsStyles["award-current"];
		if (Math.abs(i - currentAward) === 1) {
			if (i < currentAward)
				return (
					awardsStyles["award"] + " " + awardsStyles["award-back"] + " " + awardsStyles["award-back-previous"]
				);
			return awardsStyles["award"] + " " + awardsStyles["award-back"] + " " + awardsStyles["award-back-next"];
		}
		return awardsStyles["award"] + " " + awardsStyles["award-hidden"];
	};

	useEffect(() => {
		nextAward(1);
		const interval = setInterval(() => nextAward(), 3500);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={awardsStyles["container-main"]} ref={containerMain}>
			<div className={awardsStyles["container-awards"]}>
				{awards &&
					awards.map((award, i) => (
						<div className={getAwardStyles(i)} key={i}>
							<div className={awardsStyles["container-image"]}>
								<Image
									src={"/images/awards/" + award.image}
									layout="fill"
									className={awardsStyles["image"]}
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
