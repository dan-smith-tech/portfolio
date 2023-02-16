import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
		<div className={"container-full"}>
			<div
				className={"container-partial " + postStyles["container-partial"]}
			>
				<div className={postStyles["header"]}>
					<div className={postStyles["header-info"]}>
						<h1>{frontmatter.title}</h1>
						<ul className={postStyles["header-list"]}>
							<li>
								<strong>Written by</strong>:{" "}
								<Link href={"/"}>
									<a>Dan Smith</a>
								</Link>
							</li>
							<li>
								<strong>Published</strong>:{" "}
								{new Date(frontmatter.published).toLocaleDateString(
									"en-UK",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</li>
							<li>
								<strong>Updated</strong>:{" "}
								{new Date(frontmatter.updated).toLocaleDateString(
									"en-UK",
									{
										year: "numeric",
										month: "long",
										day: "numeric",
									}
								)}
							</li>
						</ul>
					</div>
					<div
						className={
							postStyles["container-image"] +
							" " +
							postStyles["header-container-image"]
						}
					>
						<Image
							src={"/images/blog/" + frontmatter.thumbnail}
							layout="fill"
							className={postStyles["image"]}
							draggable="false"
						/>
					</div>
				</div>
				<ReactMarkdown
					className={postStyles["content"]}
					children={content}
					// https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
					components={{
						code({ node, inline, className, children, ...props }) {
							const match = /language-(\w+)/.exec(className || "");
							return !inline && match ? (
								<SyntaxHighlighter
									children={String(children).replace(/\n$/, "")}
									style={atomDark}
									language={match[1]}
									PreTag="div"
									{...props}
								/>
							) : (
								<code className={className} {...props}>
									{children}
								</code>
							);
						},
					}}
				/>
			</div>
		</div>
	);
}
