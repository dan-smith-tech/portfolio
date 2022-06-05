import Head from "next/head";

import Footer from "../components/partials/Footer";

import "../styles/global.css";

function DanSmithPortfolio({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/images/favicon.svg" />
				<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
				<title>Dan Smith • Full-Stack Web Developer Portfolio</title>
			</Head>
			<Component {...pageProps} />
			<Footer />
		</>
	);
}

export default DanSmithPortfolio;
