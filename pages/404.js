import errorStyles from "../styles/error.module.css";

function Custom404() {
	return (
		<div className={errorStyles["container"]}>
			<div className={errorStyles["code"]}>404</div>
			<p className={errorStyles["summary"]}>
				Sorry! This page does not exist.
			</p>
		</div>
	);
}

export default Custom404;
