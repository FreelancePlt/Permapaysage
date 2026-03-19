export const metadata = {
	title: "Permapaysage — Studio",
	description: "Back-office Permapaysage",
	robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
	return (
		<div id="sanity">{children}</div>
	)
}
