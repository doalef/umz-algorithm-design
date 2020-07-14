export function dfs(graph, current, goal) {
	var stack = [];
	var visited = [];
	var node;
	stack.push(current);
	visited[current] = true;
	while (stack.length) {
		node = stack.pop();
		if (node === goal) {
			return true;
		}
		for (var i = 0; i < graph[node].length; i += 1) {
			if (graph[node][i] && !visited[i]) {
				stack.push(i);
				visited[i] = true;
			}
		}
	}
	return false;
}

export function bfs(graph, startNode, targetNode) {
	function buildPath(parents, targetNode) {
		var result = [targetNode];
		while (parents[targetNode] !== null) {
			targetNode = parents[targetNode];
			result.push(targetNode);
		}
		return result.reverse();
	}

	var parents = [];
	var queue = [];
	var visited = [];
	var current;
	queue.push(startNode);
	parents[startNode] = null;
	visited[startNode] = true;
	while (queue.length) {
		current = queue.shift();
		if (current === targetNode) {
			return buildPath(parents, targetNode);
		}
		for (var i = 0; i < graph.length; i += 1) {
			if (i !== current && graph[current][i] && !visited[i]) {
				parents[i] = current;
				visited[i] = true;
				queue.push(i);
			}
		}
	}
	return null;
}

export function topological(graph) {
	function topologicalSortHelper(node, visited, temp, graph, result) {
		temp[node] = true;
		var neighbors = graph[node];
		for (var i = 0; i < neighbors.length; i += 1) {
			var n = neighbors[i];
			if (temp[n]) {
				throw new Error("The graph is not a DAG");
			}
			if (!visited[n]) {
				topologicalSortHelper(n, visited, temp, graph, result);
			}
		}
		temp[node] = false;
		visited[node] = true;
		result.push(node);
	}

	var result = [];
	var visited = [];
	var temp = [];
	for (var node in graph) {
		if (!visited[node] && !temp[node]) {
			topologicalSortHelper(node, visited, temp, graph, result);
		}
	}
	return result.reverse();
}

export function dijkstra(graph, s) {
	var solutions = {};
	solutions[s] = [];
	solutions[s].dist = 0;

	while (true) {
		var parent = null;
		var nearest = null;
		var dist = Infinity;

		//for each existing solution
		for (var n in solutions) {
			if (!solutions[n]) continue;
			var ndist = solutions[n].dist;
			var adj = graph[n];
			//for each of its adjacent nodes...
			for (var a in adj) {
				//without a solution already...
				if (solutions[a]) continue;
				//choose nearest node with lowest *total* cost
				var d = adj[a] + ndist;
				if (d < dist) {
					//reference parent
					parent = solutions[n];
					nearest = a;
					dist = d;
				}
			}
		}

		//no more solutions
		if (dist === Infinity) {
			break;
		}

		//extend parent's solution path
		solutions[nearest] = parent.concat(nearest);
		//extend parent's cost
		solutions[nearest].dist = dist;
	}

	return solutions;
}
