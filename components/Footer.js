import footerStyles from "../styles/footer.module.css";

export default function Footer() {
	return (
		<footer>
			<div className={"container-full " + footerStyles["container-full"]}>
				<div
					className={
						"container-partial " + footerStyles["container-partial"]
					}
				>
					<p>Content Copyright © Dan Smith 2022</p>
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
