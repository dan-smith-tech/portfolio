import Link from "next/link";

import Button from "../components/form/Button";

import errorStyles from "../styles/error.module.css";

function Custom404() {
	return (
		<div className={errorStyles["container-main"]}>
			<div className={errorStyles["container-error"]}>
				<div className={errorStyles["error-code"]}>404</div>
				<p className={errorStyles["error-summary"]}>
					Sorry! This page does not exist.
				</p>
			</div>
			<div className={errorStyles["container-button"]}>
				<Link href="/">
					<Button type="button" primary={true}>
						Return to Portfolio
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Custom404;
