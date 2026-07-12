/**
 * testLayout.js
 * Programmatic validator for the Git Branching History SVG Timeline layout.
 * Ensures nodes do not overlap and Bezier curve connections contain valid numerical bounds.
 */

export function calculateCoordinates(commit, index) {
  // Lane positions: Lane 0 (main) = 30, Lane 1 (internship) = 75, Lane 2 (achievements) = 120
  const laneOffsets = [30, 75, 120];
  const x = laneOffsets[commit.lane] || 30;
  const y = 40 + index * 70;
  return { x, y };
}

export function generateBezierPath(x1, y1, x2, y2) {
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
    throw new Error(`Invalid non-numeric coordinates passed to Bezier: ${x1}, ${y1}, ${x2}, ${y2}`);
  }
  // Compute cubic Bezier control points to smooth out branching/merging curve
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

export function validateTimelineLayout(timelineData) {
  const coordinates = timelineData.map((commit, index) => ({
    id: commit.id,
    ...calculateCoordinates(commit, index),
    lane: commit.lane,
    row: index
  }));

  // Assert node parameters
  coordinates.forEach((node, i) => {
    // 1. Check numeric correctness
    if (isNaN(node.x) || isNaN(node.y)) {
      throw new Error(`Node layout failure at index ${i}: NaN detected in coordinate x=${node.x}, y=${node.y}`);
    }

    // 2. Check overlap in coordinates
    coordinates.forEach((otherNode, j) => {
      if (i !== j) {
        if (node.x === otherNode.x && node.y === otherNode.y) {
          throw new Error(`Coordinate collision detected: node ${node.id} and node ${otherNode.id} both mapped to (${node.x}, ${node.y})`);
        }
      }
    });
  });

  return {
    success: true,
    nodesCount: coordinates.length,
    coordinates
  };
}
