# Write a function to find the shortest path from a source vertex to all 
# other vertices in a graph using Dijkstra's algorithm.

import heapq

def dijkstra(graph, source):
    
    distances = {vertex: float('inf') for vertex in graph}
    distances[source] = 0

    priority_queue = [(0, source)]

    while priority_queue:
        current_distance, current_vertex = heapq.heappop(priority_queue)

        if current_distance > distances[current_vertex]:
            continue

        for neighbor, weight in graph[current_vertex].items():
            distance = current_distance + weight

            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(priority_queue, (distance, neighbor))

    return distances

# Input: graph = {0: {1: 4, 2: 1}, 1: {3: 1}, 2: {1: 2, 3: 5}, 3: {}}
graph = {0: {1: 4, 2: 1}, 1: {3: 1}, 2: {1: 2, 3: 5}, 3: {}}
source = 0
print(dijkstra(graph, source))  
# Output: {0: 0, 1: 3, 2: 1, 3: 4}
