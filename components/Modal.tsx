import Button from "./form/Button";

import styles from "./Modal.module.css";

export default function Modal({
	show,
	onClose,
	heading,
	body,
	buttonValue,
}: {
	show: boolean;
	onClose: () => void;
	heading: string;
	body: string;
	buttonValue: string;
}) {
	if (show)
		return (
			<div className={styles["container"]}>
				<div className={styles["element"]}>
					<h3 className={styles["title"]}>{heading}</h3>
					<p className={styles["body"]}>{body}</p>
					<button
						className={styles["button-close"]}
						type="button"
						onClick={onClose}
					>
						x
					</button>
					<div className={styles["container-button"]}>
						<Button type={"button"} onClick={onClose} primary={true}>
							{buttonValue}
						</Button>
					</div>
				</div>
			</div>
		);
	else null;
}
