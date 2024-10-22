/**
 * Solving the Travelling Salesman Problem (TSP) using Dynamic Programming
 * 
 * Cities are represented as a graph with distances between them, and 
 * the program computes the shortest possible route.
 */

// Utility function to calculate distance between two points (Euclidean Distance)
function calculateDistance(pointA, pointB) {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
}

// Function to generate a matrix of distances between cities
function createDistanceMatrix(cities) {
    const numCities = cities.length;
    const distMatrix = Array.from({ length: numCities }, () => new Array(numCities).fill(0));

    for (let i = 0; i < numCities; i++) {
        for (let j = 0; j < numCities; j++) {
            if (i !== j) {
                distMatrix[i][j] = calculateDistance(cities[i], cities[j]);
            }
        }
    }
    return distMatrix;
}

// Travelling Salesman Problem using Dynamic Programming
function tsp(distMatrix, pos, visited, memo) {
    const numCities = distMatrix.length;

    // If all cities are visited, return to the starting point (city 0)
    if (visited === (1 << numCities) - 1) {
        return distMatrix[pos][0]; // Cost to return to start
    }

    // If the result is already in the memo table, return it
    if (memo[pos][visited] !== -1) {
        return memo[pos][visited];
    }

    let result = Infinity;

    // Try visiting each unvisited city and compute the cost recursively
    for (let city = 0; city < numCities; city++) {
        if ((visited & (1 << city)) === 0) {
            const newVisited = visited | (1 << city);
            const dist = distMatrix[pos][city] + tsp(distMatrix, city, newVisited, memo);
            result = Math.min(result, dist); // Get the minimum result
        }
    }

    // Save the result in the memoization table
    memo[pos][visited] = result;
    return result;
}

// Driver function to solve the TSP
function solveTSP(cities) {
    const numCities = cities.length;
    const distMatrix = createDistanceMatrix(cities);

    // Memoization table to store subproblem solutions
    const memo = Array.from({ length: numCities }, () => new Array(1 << numCities).fill(-1));

    // Start the recursion from city 0 and visited only city 0
    const minTourCost = tsp(distMatrix, 0, 1, memo);

    console.log("Minimum Tour Cost:", minTourCost);
    return minTourCost;
}

// Example usage:

// Define cities as points with x and y coordinates
const cities = [
    { x: 0, y: 0 },  // City 0 (starting point)
    { x: 2, y: 3 },  // City 1
    { x: 5, y: 4 },  // City 2
    { x: 1, y: 1 },  // City 3
    { x: 4, y: 0 },  // City 4
];

// Call the TSP solver
solveTSP(cities);
