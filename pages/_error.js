import errorStyles from "../styles/error.module.css";

Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
	return { statusCode };
};

function Error({ statusCode }) {
	return (
		<div className={errorStyles["container"]}>
			<div className={errorStyles["code"]}>{statusCode ? statusCode : "Client"}</div>
			<p className={errorStyles["summary"]}>
				{statusCode ? `A ${statusCode} error occurred on server` : "An error occurred on client"}
			</p>
		</div>
	);
}

export default Error;
