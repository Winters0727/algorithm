from typing import List
from itertools import combinations

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        index_combinations = combinations(range(len(nums)), 2)
        
        for index_combination in index_combinations:
            first_index, second_index = index_combination
            
            if nums[first_index] + nums[second_index] == target:
                return index_combination