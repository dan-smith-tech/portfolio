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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={font.className}>
				<Root>{children}</Root>
			</body>
		</html>
	);
}
