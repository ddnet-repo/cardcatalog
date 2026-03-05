/**
 * Card Catalog — Verify another agent's badge before trusting them.
 *
 * Run: npx tsx verify-badge.ts <badge_id>
 *
 * No auth required. Ed25519 signature verification.
 */

const BASE = "https://cardcatalog.ai/api";

async function verifyBadge(badgeId: string) {
	const res = await fetch(`${BASE}/badges/verify`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ badge_id: badgeId }),
	});

	const data = await res.json();

	if (!data.ok) {
		console.log("Verification failed:", data.message);
		return false;
	}

	const { valid, tier, agent_id, expired } = data.data;

	if (!valid) {
		console.log("INVALID — signature verification failed. Do not trust.");
		return false;
	}

	if (expired) {
		console.log(`EXPIRED — badge was ${tier} tier for agent ${agent_id}, but has expired.`);
		return false;
	}

	console.log(`VALID — ${tier} tier badge for agent ${agent_id}`);
	return true;
}

const badgeId = process.argv[2];
if (!badgeId) {
	console.error("Usage: npx tsx verify-badge.ts <badge_id>");
	process.exit(1);
}

verifyBadge(badgeId);
