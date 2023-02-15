import Link from "next/link";
import Image from "next/image";

import postStyles from "../../styles/blog/post.module.css";

export default function Post({ imageLink, tags, title, summary, postLink }) {
	return (
		<div className={postStyles["element"]}>
			<div className={postStyles["container-image"]}>
				<Image
					src={imageLink}
					layout="fill"
					className={postStyles["image"]}
					draggable="false"
				/>
			</div>
			<div className={postStyles["container-tags"]}>
				{tags &&
					tags.map((tag) => (
						<div className={postStyles["tag"]}>{tag}</div>
					))}
			</div>
			<div className={postStyles["container-title"]}>
				<h2 className={postStyles["title"]}>{title}</h2>
			</div>
			<div className={postStyles["container-summary"]}>
				<p className={postStyles["summary"]}>{summary}</p>
			</div>
			<div className={postStyles["container-button"]}>
				<Link href={"/blog/" + postLink} draggable="false">
					<a>Read Post </a>
				</Link>
			</div>
		</div>
	);
}
