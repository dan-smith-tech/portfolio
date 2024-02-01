import { useRef, useEffect, useState } from "react";
import Image from "next/image";

import styles from "./Project.module.css";

export default function Project({
	heading,
	summary,
	link,
	images,
	imageFirst,
}: {
	heading: string;
	summary: string;
	link: string;
	images: string[];
	imageFirst: boolean;
}) {
	const [intersection, setIntersection] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const containerMain = useRef<HTMLDivElement>(null);

	function selectImage(i: number) {
		setCurrentImage((currentImage) => {
			if (i != currentImage) {
				const imageElements = containerMain.current!.children[0].children;
				// Position the selected image at the left of its container (offset it based on the cumulative width of the number of siblings before it):
				const offset = -(i * imageElements[i].clientWidth);
				const imageContainer = containerMain.current!
					.children[0] as HTMLElement;
				imageContainer.style.marginLeft = offset + "px";
			}

			return i;
		});
	}

	const getImageContainerStyles = () => {
		if (!intersection) return styles["container-images"];
		return (
			styles["container-images"] + " " + styles["container-images-animate"]
		);
	};

	const getImageStyles = (i: number) => {
		if (i === currentImage)
			return (
				styles["container-image"] + " " + styles["container-image-current"]
			);
		if (Math.abs(i - currentImage) === 1) {
			if (i < currentImage)
				return (
					styles["container-image"] +
					" " +
					styles["container-image-back-previous"]
				);
			return (
				styles["container-image"] +
				" " +
				styles["container-image-back-next"]
			);
		}
		return styles["container-image"] + " " + styles["container-image-hidden"];
	};

	const getImageSelectStyles = (i: number) => {
		if (i === currentImage)
			return styles["image-select"] + " " + styles["image-select-current"];
		return styles["image-select"];
	};

	const getInfoContainerStyles = () => {
		if (!intersection) return styles["container-info"];
		return styles["container-info"] + " " + styles["container-info-animate"];
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
		observer.observe(containerMain.current!);

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
			<div className={styles["images"]}>
				{images &&
					images.map((image, i) => (
						<div
							className={getImageStyles(i)}
							onClick={() => selectImage(i)}
							key={i}
						>
							<Image
								src={"/images/projects/" + image}
								alt={`Image {i + 1} of ${heading}.`}
								layout="fill"
								className={styles["image"]}
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
			<div className={styles["container-image-select"]}>
				{images &&
					images.map((image, i) => (
						<button
							id={`${heading}-image-select-${i}`}
							aria-label="Select image"
							name="Select image"
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
			<h4>{heading}</h4>
			<p>{summary}</p>
			<a href={link} target={"_blank"}>
				View Project{" "}
			</a>
		</div>
	);

	if (imageFirst)
		return (
			<div className={styles["container-main"]}>
				{imageElement}
				{textElement}
			</div>
		);
	else
		return (
			<div
				className={
					styles["container-main"] + " " + styles["container-main-reorder"]
				}
			>
				{textElement}
				{imageElement}
			</div>
		);
}
