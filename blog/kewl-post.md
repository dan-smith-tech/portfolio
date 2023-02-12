---
title: Test post
description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
thumbnail: street.png
published: "2022-11-12"
updated: "2022-11-12"
tags:
   - Machine Learning
---

## kewl title

Really cool and long paragraph.

## annuda fing

```js
const posts = files.map((fileName) => {
	const slug = fileName.replace(".md", "");
	const readFile = fs.readFileSync("./blog/" + fileName, "utf-8");
	const { data: frontmatter } = matter(readFile);

	return {
		slug,
		frontmatter,
	};
});
```
