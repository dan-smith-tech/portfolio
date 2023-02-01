import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import projectStyles from "../styles/project.module.css";

export default function Project({
	heading,
	summary,
	link,
	images,
	imageFirst,
}) {
	const [intersection, setIntersection] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const containerMain = useRef();

	function selectImage(i) {
		setCurrentImage((currentImage) => {
			if (i != currentImage) {
				const imageElements = containerMain.current.children[0].children;
				// Position the selected image at the left of its container (offset it based on the cumulative width of the number of siblings before it):
				const offset = -(i * imageElements[i].clientWidth);
				containerMain.current.children[0].style.marginLeft = offset + "px";
			}

			return i;
		});
	}

	const getImageContainerStyles = () => {
		if (!intersection) return projectStyles["container-images"];
		return (
			projectStyles["container-images"] +
			" " +
			projectStyles["container-images-animate"]
		);
	};

	const getImageStyles = (i) => {
		if (i === currentImage)
			return (
				projectStyles["container-image"] +
				" " +
				projectStyles["container-image-current"]
			);
		if (Math.abs(i - currentImage) === 1) {
			if (i < currentImage)
				return (
					projectStyles["container-image"] +
					" " +
					projectStyles["container-image-back-previous"]
				);
			return (
				projectStyles["container-image"] +
				" " +
				projectStyles["container-image-back-next"]
			);
		}
		return (
			projectStyles["container-image"] +
			" " +
			projectStyles["container-image-hidden"]
		);
	};

	const getImageSelectStyles = (i) => {
		if (i === currentImage)
			return (
				projectStyles["image-select"] +
				" " +
				projectStyles["image-select-current"]
			);
		return projectStyles["image-select"];
	};

	const getInfoContainerStyles = () => {
		if (!intersection) return projectStyles["container-info"];
		return (
			projectStyles["container-info"] +
			" " +
			projectStyles["container-info-animate"]
		);
	};

	useEffect(() => {
		if (imageFirst) selectImage(0);
		// If the image element is placed after the text, select the last image from the array to be the default:
		else selectImage(images.length - 1);

		// Watch element to play animation when it loads into the viewport:
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[0];
			if (!intersection && entry.isIntersecting) {
				setIntersection(true);
				observer.disconnect();
			}
		});
		observer.observe(containerMain.current);

		window.addEventListener("resize", () =>
			imageFirst ? selectImage(0) : selectImage(images.length - 1)
		);
		return () =>
			window.removeEventListener("resize", () =>
				imageFirst ? selectImage(0) : selectImage(images.length - 1)
			);
	}, []);

	const imageElement = (
		<div className={getImageContainerStyles()} ref={containerMain}>
			<div className={projectStyles["images"]}>
				{images &&
					images.map((image, i) => (
						<div
							className={getImageStyles(i)}
							onClick={() => selectImage(i)}
							key={i}
						>
							<Image
								src={"/images/projects/" + image}
								layout="fill"
								className={projectStyles["image"]}
								draggable="false"
								loading={"eager"}
								quality={85}
								blurDataURL={
									"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkmvq5HgAENgILsvB0aAAAAABJRU5ErkJggg=="
								}
								placeholder={"blur"}
							/>
						</div>
					))}
			</div>
			<div className={projectStyles["container-image-select"]}>
				{images &&
					images.map((image, i) => (
						<button
							className={getImageSelectStyles(i)}
							onClick={() => selectImage(i)}
							key={i}
						>
							<div></div>
						</button>
					))}
			</div>
		</div>
	);

	const textElement = (
		<div className={getInfoContainerStyles()} tabIndex={-1}>
			<h3>{heading}</h3>
			<p>{summary}</p>
			<a href={link} target={"_blank"}>
				View Project{" "}
			</a>
		</div>
	);

	if (imageFirst)
		return (
			<div className={projectStyles["container-main"]}>
				{imageElement}
				{textElement}
			</div>
		);
	else
		return (
			<div
				className={
					projectStyles["container-main"] +
					" " +
					projectStyles["container-main-reorder"]
				}
			>
				{textElement}
				{imageElement}
			</div>
		);
}
