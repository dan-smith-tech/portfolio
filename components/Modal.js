import Button from "./form/Button";

import modalStyles from "../styles/modal.module.css";

export default function Modal({ show, onClose, heading, body, buttonValue }) {
	if (show)
		return (
			<div className={modalStyles["container"]}>
				<div className={modalStyles["element"]}>
					<h3 className={modalStyles["title"]}>{heading}</h3>
					<p className={modalStyles["body"]}>{body}</p>
					<button
						className={modalStyles["button-close"]}
						type="button"
						onClick={onClose}
					>
						x
					</button>
					<div className={modalStyles["container-button"]}>
						<Button type={"button"} onClick={onClose} primary={true}>
							{buttonValue}
						</Button>
					</div>
				</div>
			</div>
		);
	else null;
}
