import styles from "./Button.module.css";

export default function Button({
	type,
	onClick,
	primary,
	className,
	children,
}: {
	type: "button" | "submit" | "reset";
	onClick?: () => void;
	primary: boolean;
	className?: string;
	children: string;
}) {
	if (primary)
		return (
			<button
				type={type}
				className={
					styles["element"] +
					" " +
					styles["element-primary"] +
					" " +
					className
				}
				onClick={onClick}
			>
				{children}
			</button>
		);
	else
		return (
			<button
				type={type}
				className={styles["element"] + " " + styles["element-secondary"]}
				onClick={onClick}
			>
				{children}
			</button>
		);
}
