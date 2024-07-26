public class q3 {

    public static int knapsack(int[] weights, int[] values, int capacity) {
        int n = weights.length;
        // Create a 2D array to store the maximum value at each n-th item and capacity w
        int[][] dp = new int[n + 1][capacity + 1];

        // Build the dp array from bottom up
        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    // Choose the maximum value between including or excluding the item
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                    // If the item cannot be included, carry forward the value
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        // dp[n][capacity] contains the maximum value that can be obtained with n items and capacity
        return dp[n][capacity];
    }

    public static void main(String[] args) {
        int[] weights = {1, 2, 3};
        int[] values = {10, 15, 40};
        int capacity = 6;

        int maxValue = knapsack(weights, values, capacity);
        System.out.println(maxValue + " (Maximum value that can be obtained)" ); // Output: 55
    }
}
