from typing import List
from collections import Counter
import re

class Solution:
    def mostCommonWord(self, paragraph: str, banned: List[str]) -> str:
        words = [word.lower() for word in re.sub('[\s!?\',;.]+', ' ', paragraph).strip().split(' ') if word.lower() not in banned]
        return Counter(words).most_common(1)[0][0]