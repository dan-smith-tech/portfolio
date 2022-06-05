import buttonStyles from "../../styles/form/button.module.css";

export default function Button({ type, onClick, primary, children }) {
	if (primary)
		return (
			<button type={type} className={buttonStyles["element"] + " " + buttonStyles["element-primary"]} onClick={onClick}>
				{children}
			</button>
		);
	else
		return (
			<button type={type} className={buttonStyles["element"] + " " + buttonStyles["element-secondary"]} onClick={onClick}>
				{children}
			</button>
		);
}
