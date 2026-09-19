export interface GlobalStatistics {
	totalCredits: number;
	totalUsers: number;
	totalScore: number;
}

function isNonNegativeInteger(value: unknown): value is number {
	return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

/**
 * Validates the global statistics response defined by the API contract.
 */
export function parseGlobalStatistics(value: unknown): GlobalStatistics | null {
	if (typeof value !== "object" || value === null) {
		return null;
	}

	const statistics = value as Record<string, unknown>;
	const { totalCredits, totalUsers, totalScore } = statistics;
	if (
		!isNonNegativeInteger(totalCredits) ||
		!isNonNegativeInteger(totalUsers) ||
		!isNonNegativeInteger(totalScore)
	) {
		return null;
	}

	return {
		totalCredits,
		totalUsers,
		totalScore,
	};
}
