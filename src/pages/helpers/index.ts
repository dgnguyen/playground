export const calPointsBaseball = (ops): number => {
  const result = ops.reduce((acc, cur, index) => {

    if (cur === '+' && index > 1) {
      return [
        ...acc,
        Number(acc[acc.length - 1]) + Number(acc[acc.length - 2])
      ]
    }
    if (cur === 'C' && index > 0) {

      return [...acc.slice(0, index - 1)]
    }
    if (cur === 'D' && index > 0) {

      return [...acc.slice(0, index - 1), Number(acc[acc.length - 1]) * 2]
    }

    return [...acc, Number(cur)]
  }, [])
  return result.reduce((acc, cur) => acc + cur, 0)
}

export function findCommonKeys(obj1, obj2) {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  let commonKeys = keys1.filter(key => keys2.includes(key))

  for (const key of commonKeys) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      const nestedCommonKeys = findCommonKeys(obj1[key], obj2[key])
      commonKeys.push(...nestedCommonKeys.map(nestedKey => `${key}.${nestedKey}`))
    }
  }

  return commonKeys
}


export function climbingLeaderboard(ranked: number[], player: number[]): number[] {
  // Create an array of objects with the original values and their indices
  const indexedArr = ranked.map((value, index) => ({ value, index }))

  // Sort the array based on the values
  const sortIndexArr = indexedArr.sort((a, b) => b.value - a.value)

  let rank = 1
  const rankedToRank = sortIndexArr.reduce((acc, cur, i) => {
    if (sortIndexArr[i + 1]?.value && sortIndexArr[i + 1]?.value !== cur.value) {
      return [
        ...acc,
        {
          ...cur,
          // eslint-disable-next-line no-plusplus
          rank: rank++,
        }
      ]
    }
    return [
      ...acc,
      {
        ...cur,
        rank
      }
    ]
  }, [])

  // Sort the array back to the original order
  const sortRankedToRank = rankedToRank.sort((a, b) => a.index - b.index)
  // Extract the ranks and return them as an array
  const ranks = sortRankedToRank.map(item => item.rank)
  // Add the player's score at the end
  const playerRank: number[] = player.reduce((acc, cur) => {
    if (ranked.includes(cur)) {
      const indexRank = ranked.findIndex(item => item === cur)
      return [
        ...acc,
        ranks[indexRank]
      ]
    }
    if (cur > sortRankedToRank[0].value) {
      return [
        ...acc,
        1,
      ]
    }
    if (cur < sortRankedToRank[sortRankedToRank.length - 1].value) {
      rank += 1
      return [
        ...acc,
        rank
      ]
    }
    // player rank is smaller than highest ranked but not in ranked array
    const minRankIndex = sortRankedToRank.findLastIndex(item => item.value > cur)
    const minRank = sortRankedToRank[minRankIndex].rank
    return [
      ...acc,
      minRank + 1
    ]

  }, [])
  return playerRank
}
