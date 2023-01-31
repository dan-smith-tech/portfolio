import errorStyles from "../styles/error.module.css";

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

function Error({ statusCode }) {
	return (
		<div className={errorStyles["container-main"]}>
			<div className={"container-error"}>
				<div className={errorStyles["error-code"]}>
					{statusCode ? statusCode : "Client"}
				</div>
				<p className={errorStyles["error-summary"]}>
					{statusCode
						? `A ${statusCode} error occurred on server`
						: "An error occurred on client"}
				</p>
			</div>
		</div>
	);
}

export default Error;
