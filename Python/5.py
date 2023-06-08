class Solution:
    def longestPalindrome(self, s: str) -> str:
        window_size = len(s)

        while window_size > 1:
            for start_index in range(len(s) - window_size + 1):
                sub_s = s[start_index:start_index + window_size]
                if sub_s == sub_s[::-1]:
                    return sub_s
            else:
                window_size -= 1
        return s[0]