from typing import List
from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        keys = []
        anagram_storage = defaultdict(list)
        for word in strs:
            sorted_word = ''.join(sorted(word))

            if sorted_word not in keys:
                keys.append(sorted_word)

            anagram_storage[sorted_word].append(word)

        return [anagram_storage[key] for key in keys]