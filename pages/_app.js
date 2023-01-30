import Head from "next/head";

import Footer from "../components/Footer";

import "../styles/global.css";

function DanSmithPortfolio({ Component, pageProps }) {
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
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossorigin
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Assistant:wght@600;700;800&display=swap"
					rel="stylesheet"
				/>
			</Head>
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default DanSmithPortfolio;
