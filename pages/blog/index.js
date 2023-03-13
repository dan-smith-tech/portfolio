import Head from "next/head";
import Link from "next/link";

import fs from "fs";
import matter from "gray-matter";

import Post from "../../components/blog/Post";
import Button from "../../components/form/Button";

import blogStyles from "../../styles/blog/index.module.css";
import Footer from "../../components/Footer";

export async function getStaticProps() {
	const files = fs.readdirSync("blog");

	const posts = files.map((fileName) => {
		const slug = fileName.replace(".md", "");
		const readFile = fs.readFileSync("./blog/" + fileName, "utf-8");
		const { data: frontmatter } = matter(readFile);

		return {
			slug,
			frontmatter,
		};
	});

	return {
		props: {
			posts,
		},
	};
}

export default function Blog({ posts }) {
	return (
		<>
			<Head>
				<title>Dan Smith • Blog</title>
			</Head>
			<div className={"container-full " + blogStyles["container-full"]}>
				<div className={"container-partial"}>
					<div className={blogStyles["heading"]}>
						<h1>
							<span className={blogStyles["title-light"]}>
								Dan Smith
								<span className={blogStyles["title-period"]}>.</span>
							</span>{" "}
							<span>
								Blog
								<span className={blogStyles["title-period"]}>.</span>
							</span>
						</h1>
						<p className={blogStyles["summary"]}>
							Here I document everything I learn as I explore and learn
							new things in the world of technology an productivity.
							These include tutorials, experiences, projects, and
							walkthroughs.
						</p>
						<Link href="/">
							<Button type="button" primary={true}>
								View Portfolio
							</Button>
						</Link>
					</div>
					<div className={blogStyles["container-posts"]}>
						{posts &&
							posts.map(({ slug, frontmatter }, i) => (
								<Post
									imageLink={"/images/blog/" + frontmatter.thumbnail}
									title={frontmatter.title}
									tags={frontmatter.tags}
									summary={frontmatter.description}
									postLink={slug}
								/>
							))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
