class Solution:
    def isPalindrome(self, s: str) -> bool:
        only_alpha = ''.join([char.lower() for char in s if char.isalnum()])
        return only_alpha == only_alpha[::-1]