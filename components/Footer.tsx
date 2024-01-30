import styles from "./Footer.module.css";

export default function Footer({ small }: { small?: boolean }) {
	const getPartialContainerStyles = () => {
		if (small)
			return (
				"container-partial " +
				styles["container-partial"] +
				" " +
				styles["container-partial-small"]
			);

		return "container-partial " + styles["container-partial"];
	};

	return (
		<footer id={"footer"}>
			<div className={"container-full " + styles["container-full"]}>
				<div className={getPartialContainerStyles()}>
					<p>Content Copyright © Dan Smith 2024</p>
					<p>
						This website is open-source:{" "}
						<a
							href={"https://github.com/dan-smith-tech/portfolio"}
							target={"_blank"}
						>
							Fork it on GitHub
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
}
