import experienceStyles from "../styles/experience.module.css";

export default function Footer({ title, date, summary }) {
	return (
		<div className={experienceStyles["element"]}>
			<small className={experienceStyles["date"]}>{date}</small>
			<h3 className={experienceStyles["title"]}>{title}</h3>
			<p className={experienceStyles["summary"]}>{summary}</p>
		</div>
	);
}
