import type { Realisation } from "@/lib/sanity/types";

export function cityLocation(city: string): string {
	const name = city.trim();

	if (/^Le\s/i.test(name)) {
		return `au ${name.slice(3)}`;
	}

	if (/^Les\s/i.test(name)) {
		return `aux ${name.slice(4)}`;
	}

	return `à ${name}`;
}

/** Exact matching after accents, punctuation and repeated spaces; never a partial city match. */
export function normalizeCityName(value: string): string {
	return value
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, " ")
		.trim();
}

export function selectCityProjects(
	city: string,
	projects: readonly Realisation[],
	linked: readonly (Realisation & { publie?: boolean })[] = [],
): Realisation[] {
	const seen = new Set<string>();
	const candidates = [
		...linked.filter((project) => project?.publie === true),
		...projects.filter(
			(project) =>
				typeof project.ville === "string" &&
				normalizeCityName(project.ville) === normalizeCityName(city),
		),
	];
	return candidates.filter((project) => {
		if (!project?._id || !project.slug?.current || seen.has(project._id))
			return false;
		seen.add(project._id);
		return true;
	});
}

export function safeHttpsLink(value: unknown): string | undefined {
	if (typeof value !== "string") return undefined;
	try {
		const url = new URL(value);
		return url.protocol === "https:" && !url.username && !url.password
			? url.href
			: undefined;
	} catch {
		return undefined;
	}
}
