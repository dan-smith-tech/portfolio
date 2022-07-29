import buttonStyles from "../../styles/form/button.module.css";

export default function Button({
	type,
	onClick,
	primary,
	className,
	children,
}) {
	if (primary)
		return (
			<button
				type={type}
				className={
					buttonStyles["element"] +
					" " +
					buttonStyles["element-primary"] +
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
				className={
					buttonStyles["element"] + " " + buttonStyles["element-secondary"]
				}
				onClick={onClick}
			>
				{children}
			</button>
		);
}
