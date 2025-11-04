export function calculateGameTotals(playerData) {
  if (!playerData || !playerData.scores) return [];
  const games = ["tic-tac-toe", "memory-cards", "rock-paper-scissors"];
  return games.map(game => {
    const victories = playerData.scores.victories[game] || 0;
    const draws = playerData.scores.draws[game] || 0;
    const totalScore = victories * 100 + draws * 50;
    const normalizedGame = game.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
    return {
      name: normalizedGame,
      victories,
      draws,
      totalScore
    };
  });
}