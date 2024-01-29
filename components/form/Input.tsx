import styles from "./Input.module.css";

export default function Input({
	type,
	name,
	placeholder,
	required,
}: {
	type: "text" | "email" | "password" | "textarea";
	name: string;
	placeholder: string;
	required: boolean;
}) {
	if (type != "textarea")
		return (
			<input
				type={type}
				name={name}
				id={name}
				className={styles["element"]}
				placeholder={placeholder}
				required={required}
			></input>
		);
	else
		return (
			<textarea
				name={name}
				id={name}
				className={styles["element"] + " " + styles["element-textarea"]}
				placeholder={placeholder}
				required={required}
			></textarea>
		);
}
