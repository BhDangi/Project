# Write a function to find the longest common subsequence 
# of two given strings.

def LCS(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i - 1] == str2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    
    lcs_length = dp[m][n]
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if str1[i - 1] == str2[j - 1]:
            lcs.append(str1[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] > dp[i][j - 1]:
            i -= 1
        else:
            j -= 1

    lcs.reverse()  

    return lcs_length, ''.join(lcs)


# Input: str1 = "abcde", str2 = "ace"

#str1 = "abcde" 
str1= input()
#str2 = "ace" 
str2 = input() 
length, lcs = LCS(str1, str2)
print(f"{length} (The LCS is \"{lcs}\")") 
# Output: 3 (The LCS is "ace")

