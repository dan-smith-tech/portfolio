import footerStyles from "../styles/footer.module.css";

export default function Footer({ small }) {
	const getPartialContainerStyles = () => {
		if (small)
			return (
				"container-partial " +
				footerStyles["container-partial"] +
				" " +
				footerStyles["container-partial-small"]
			);

		return "container-partial " + footerStyles["container-partial"];
	};

	return (
		<footer id={"footer"}>
			<div className={"container-full " + footerStyles["container-full"]}>
				<div className={getPartialContainerStyles()}>
					<p>Content Copyright © Dan Smith 2023</p>
					<p>
						This website is open-source:{" "}
						<a
							href={"https://github.com/dan-smith-tech/website"}
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
