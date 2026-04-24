/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export async function getRecommendations(seekerProfile: any, companions: any[]) {
  try {
    const response = await fetch("/api/ai/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ seekerProfile, companions }),
    });

    if (!response.ok) {
      throw new Error(`AI Request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("AIService Error:", error);
    return [];
  }
}
