export type ApiResponse = {
	status: number;
	message: string;
};

export default function sendFetchRequest(
	route: string,
	method: string,
	data: any
) {
	return new Promise((resolve, reject) => {
		fetch(route, {
			method: method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				resolve(data);
			});
	});
}
