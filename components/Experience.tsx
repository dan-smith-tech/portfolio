import styles from "./Experience.module.css";

export default function Footer({
	title,
	date,
	summary,
}: {
	title: string;
	date: string;
	summary: string;
}) {
	return (
		<div className={styles["element"]}>
			<small className={styles["date"]}>{date}</small>
			<h3 className={styles["title"]}>{title}</h3>
			<p className={styles["summary"]}>{summary}</p>
		</div>
	);
}
