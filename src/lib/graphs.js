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
