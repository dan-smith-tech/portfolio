import fs from "fs";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

import postStyles from "../../styles/blog/post.module.css";

export async function getStaticPaths() {
	const files = fs.readdirSync("blog");

	const paths = files.map((fileName) => ({
		params: {
			id: fileName.replace(".md", ""),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({ params: { id } }) {
	const fileName = fs.readFileSync(`blog/${id}.md`, "utf-8");

	const { data: frontmatter, content } = matter(fileName);

	return {
		props: {
			frontmatter,
			content,
		},
	};
}

export default function Post({ frontmatter, content }) {
	return (
		<div className={"container-full " + postStyles["container-full"]}>
			<div className={"container-partial"}>
				<h1 className={"title"}>{frontmatter.title}</h1>
				<ReactMarkdown children={content} />
			</div>
		</div>
	);
}
