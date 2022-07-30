function generateSiteMap(date) {
	return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://www.dansmith.tech</loc>
		 <lastmod>${date}</lastmod>
     </url>
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
	const sitemap = generateSiteMap(new Date().toISOString());

	res.setHeader("Content-Type", "text/xml");
	res.write(sitemap);
	res.end();

	return {
		props: {},
	};
}

export default function SiteMap() {}
