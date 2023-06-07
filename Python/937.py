from typing import List

class Solution:
    def reorderLogFiles(self, logs: List[str]) -> List[str]:
        letters = sorted([log for log in logs if not ''.join(log.split(' ')[1]).isdigit()], key=lambda x: [' '.join(x.split(' ')[1:]), x.split(' ')[0]])
        digits = [log for log in logs if ''.join(log.split(' ')[1]).isdigit()]
        return letters + digits
    