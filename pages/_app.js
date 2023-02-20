import { useEffect, useRef } from "react";
import Head from "next/head";

import Footer from "../components/Footer";

import "../styles/global.css";

function DanSmithPortfolio({ Component, pageProps }) {
	const mouseEffect = useRef();

	useEffect(() => {
		document.body.onpointermove = (e) => {
			const { clientX, clientY } = e;
			console.log(clientX, clientY);
			mouseEffect.current.animate(
				{
					left: clientX + "px",
					top: clientY + "px",
				},
				{ duration: 15000, fill: "forwards" }
			);
		};
	}, []);

	return (
		<>
			<Head>
				<link rel="icon" href="/images/favicon.svg" />
				<title>Dan Smith • Full-Stack Web Developer Portfolio</title>
				<meta
					property="og:title"
					content="Dan Smith • Full-Stack Web Developer Portfolio"
				/>
				<meta
					name="description"
					content="I create minimalist, modern, and enjoyable experiences. I believe the best UX exists where the least UI does, so the UI that does exist must be outstanding."
				/>
				<meta
					property="og:description"
					content="I create minimalist, modern, and enjoyable experiences. I believe the best UX exists where the least UI does, so the UI that does exist must be outstanding."
				/>
				<meta name="keywords" content="portfolio, developer, full-stack" />
				<meta
					property="og:image"
					content="https://www.dansmith.tech/images/open-graph/index.png"
				/>
			</Head>

			<div className="front">
				<Component className={"front"} {...pageProps} />
			</div>
			<div className={"container-blur"}></div>
			<div className={"container-mouse-effect"}>
				<div className={"mouse-effect"} ref={mouseEffect} />
			</div>

			<Footer />
		</>
	);
}

export default DanSmithPortfolio;
