const MOOD_DEFINITIONS = [
  {
    name: "happy",
    threshold: 0.5,
    score: (s) => (s("mouthSmileLeft") + s("mouthSmileRight")) / 2,
  },
  {
    name: "surprised",
    threshold: 0.4,
    score: (s) =>
      (s("jawOpen") + s("browInnerUp") +
        s("browOuterUpLeft") + s("browOuterUpRight")) / 4,
  },
  {
    name: "😔 Sad",
    threshold: 0.2,
    score: (s) =>
      (s("mouthFrownLeft") + s("mouthFrownRight")) / 2 * 0.7 +
      (s("browInnerUp")) * 0.3,
  },
];

/**
 * Determines the dominant facial mood from MediaPipe FaceLandmarker blendshapes.
 * @param {Array<{categories: Array<{categoryName: string, score: number}>}>} faceBlendshapes
 * @returns {string} An emoji-labeled mood string.
 */
export function getMood(faceBlendshapes) {
  if (!faceBlendshapes?.length) {
    return "No Face";
  }

  const categories = faceBlendshapes[0]?.categories;
  if (!categories?.length) {
    return "No Face";
  }

  // O(1) lookups instead of re-scanning the array for every score
  const scoreMap = new Map(categories.map((c) => [c.categoryName, c.score]));
  const s = (name) => scoreMap.get(name) ?? 0;

  // Evaluate every mood, keep the highest-confidence one that clears its threshold
  let best = { name: "😐 Neutral", value: -Infinity };

  for (const mood of MOOD_DEFINITIONS) {
    const value = mood.score(s);
    if (value >= mood.threshold && value > best.value) {
      best = { name: mood.name, value };
    }
  }

  return best.value > -Infinity ? best.name : "Neutral";
}