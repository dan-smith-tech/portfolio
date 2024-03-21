import type { Metadata } from "next";

import { Outfit } from "next/font/google";
const font = Outfit({ subsets: ["latin"] });

import { defaultSeo } from "@/content/seo";

export const metadata: Metadata = {
	title: defaultSeo.title,
	description: defaultSeo.description,
	openGraph: {
		title: defaultSeo.title,
		description: defaultSeo.description,
		images: [{ url: defaultSeo.image, width: 1200, height: 630 }],
	},
};

import Root from "@/components/Root";

import "./globals.css";
import Head from "next/head";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<Head>
				<script
					defer
					src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
					data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_KEY}
				/>
			</Head>
			<body className={font.className}>
				<noscript>
					<p className="noscript">
						JavaScript is not enabled in your browser. Please allow
						JavaScript to run in order to properly explore my portfolio :)
					</p>
				</noscript>
				<Root>{children}</Root>
			</body>
		</html>
	);
}
