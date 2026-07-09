export function getMood(faceBlendshapes) {
  if (!faceBlendshapes || faceBlendshapes.length === 0) {
    return "No Face";
  }

  const scores = faceBlendshapes[0].categories;




  const getScore = (name) =>
    scores.find((item) => item.categoryName === name)?.score || 0;

  const smile =
    (getScore("mouthSmileLeft") + getScore("mouthSmileRight")) / 2;

  const frown =
    (getScore("mouthFrownLeft") + getScore("mouthFrownRight")) / 2;

  const surprise =
    (getScore("jawOpen") + getScore("browInnerUp")) / 2;

  // Happy
  if (smile > 0.6) {
    return "😊 Happy";
  }

  // Sad
  if (frown > 0.1) {
    return "😔 Sad";
  }

  // Surprised
  if (surprise > 0.5) {
    return "😲 Surprised";
  }

  // Default
  return "😐 Neutral";
}