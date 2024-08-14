const knightGraph = {};

function getKnightsMoves(x, y, boardSize = 8) {
  const moves = [
    [x + 1, y + 2], [x + 1, y - 2],
    [x - 1, y + 2], [x - 1, y - 2],
    [x + 2, y - 1], [x + 2, y + 1],
    [x - 2, y - 1], [x - 2, y + 1]
  ];
  
  const validMoves = moves.filter(([nx, ny]) =>
    nx >= 0 && nx < boardSize && ny >= 0 && ny < boardSize;
  )

  return validMoves;
}

function makeGraph(boardSize = 8) {
  for (let x = 0; x < boardSize; x++) {
    for (let y = 0; y < boardSize; y++) {
      knightGraph[`${x},${y}`] = getKnightsMoves(x, y);
    }
  }
}

function knightMoves(start, end) {
  const queue = [[start]];
  const visited = new Set([start.toString()]); 

  while (queue.length > 0) {
    let currentPath = queue.shift();
    let currentCell = currentPath[currentPath.length - 1].toString();
    const variants = knightGraph[currentCell];

    for (let variant of variants) {
      if (variant[0] === end[0] && variant[1] === end[1]) {
        const finalPath = [...currentPath, variant];
        printPath(finalPath);
        return finalPath;
      }

      let variantStr = variant.toString();
      if (!visited.has(variantStr)) {
        visited.add(variantStr);
        queue.push([...currentPath, variant]);
      }      
    }
  }

  return null;
}

function printPath(path) {
  const steps = path.length - 1;
  console.log(`You made it in ${steps} moves! Here is your path:`);
  path.forEach(position => {
    console.log(position);
  });
}

makeGraph();

knightMoves([3, 3], [4, 3]);
knightMoves([0,0],[7,7]);
knightMoves([3,3],[0,0]);