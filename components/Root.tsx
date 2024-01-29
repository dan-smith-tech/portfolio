"use client";

import { useEffect, useRef } from "react";

export default function Root({ children }: { children: React.ReactNode }) {
	const mouseEffect = useRef<HTMLDivElement>(null);

	useEffect(() => {
		document.body.onpointermove = (e) => {
			const { clientX, clientY } = e;
			mouseEffect.current!.animate(
				{
					left: clientX + "px",
					top: clientY + "px",
				},
				{ duration: 18500, fill: "forwards" }
			);
		};
	}, []);

	return (
		<>
			<div className="front">{children}</div>
			<div className={"container-blur"}></div>
			<div className={"container-mouse-effect"}>
				<div className={"mouse-effect"} ref={mouseEffect} />
			</div>
		</>
	);
}
