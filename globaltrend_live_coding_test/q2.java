// Write a function to find the shortest path from a source vertex to all other vertices in a graph using Dijkstra's algorithm.

import java.util.*;

public class q2 {

    public static Map<Integer, Integer> dijkstra(Map<Integer, Map<Integer, Integer>> graph, int source) {
        
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        Map<Integer, Integer> distances = new HashMap<>();
        Set<Integer> visited = new HashSet<>();

        for (Integer vertex : graph.keySet()) {
            distances.put(vertex, Integer.MAX_VALUE);
        }
        distances.put(source, 0);
        minHeap.add(new int[]{source, 0});

        while (!minHeap.isEmpty()) {
            int[] current = minHeap.poll();
            int currentVertex = current[0];
            int currentDistance = current[1];

            if (visited.contains(currentVertex)) {
                continue;
            }

            visited.add(currentVertex);

            Map<Integer, Integer> neighbors = graph.get(currentVertex);
            if (neighbors != null) {
                for (Map.Entry<Integer, Integer> neighbor : neighbors.entrySet()) {
                    int neighborVertex = neighbor.getKey();
                    int weight = neighbor.getValue();

                    if (visited.contains(neighborVertex)) {
                        continue;
                    }

                    int newDistance = currentDistance + weight;
                    if (newDistance < distances.get(neighborVertex)) {
                        distances.put(neighborVertex, newDistance);
                        minHeap.add(new int[]{neighborVertex, newDistance});
                    }
                }
            }
        }

        return distances;
    }

    public static void main(String[] args) {
        Map<Integer, Map<Integer, Integer>> graph = new HashMap<>();
        // graph = {0: {1: 4, 2: 1}, 1: {3: 1}, 2: {1: 2, 3: 5}, 3: {}}
        
        graph.put(0, Map.of(1, 4, 2, 1)); 
        graph.put(1, Map.of(3, 1));
        graph.put(2, Map.of(1, 2, 3, 5));
        graph.put(3, new HashMap<>());

        // source = 0
        int source = 0;
        Map<Integer, Integer> shortestPaths = dijkstra(graph, source);
        
       
        System.out.print("{");
        for (Map.Entry<Integer, Integer> entry : shortestPaths.entrySet()) {
            System.out.print(entry.getKey() + ": " + entry.getValue() + ", ");
        }
        System.out.println("\b\b}");
        // Output: {0:0, 1:3, 2:1, 3:4}
    }
}
