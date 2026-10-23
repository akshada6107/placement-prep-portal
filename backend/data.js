// Question bank and coding problems (the only copy of this data).

// Aptitude questions. 'correct' is the index of the right option.
const questions = [
  {
    id: 1,
    category: 'Quantitative Aptitude',
    question: 'If a train travels 120 km in 2 hours, what is its average speed?',
    options: ['40 km/h', '50 km/h', '60 km/h', '80 km/h'],
    correct: 2,
    explanation: 'Speed = distance / time = 120 km / 2 h = 60 km/h.',
  },
  {
    id: 2,
    category: 'Quantitative Aptitude',
    question: 'A can complete a work in 10 days and B in 15 days. How long will they take working together?',
    options: ['5 days', '6 days', '8 days', '10 days'],
    correct: 1,
    explanation: 'Combined rate = 1/10 + 1/15 = 1/6, so time = 6 days.',
  },
  {
    id: 3,
    category: 'Logical Reasoning',
    question: 'Find the next number in the series: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '48'],
    correct: 2,
    explanation: 'Pattern: n^2 + n; for n=5 => 5^2+5 = 30, next n=6 => 6^2+6 = 42.',
  },
  {
    id: 4,
    category: 'Quantitative Aptitude',
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correct: 1,
    explanation: '15% of 200 = 0.15 * 200 = 30.',
  },
  {
    id: 5,
    category: 'Logical Reasoning',
    question: 'If A=1, B=2, C=3, ... what is the sum of the letter values in CAB?',
    options: ['5', '6', '7', '8'],
    correct: 1,
    explanation: 'C(3) + A(1) + B(2) = 6.',
  },
];

// Coding problems shown on the Coding pages.
const problems = [
  {
    id: 1,
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Hash Table"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    inputFormat: "nums = [2, 7, 11, 15], target = 9",
    outputFormat: "[0, 1]",
    example: `Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].`,
    constraints: `2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.`,
    starterCode: `function twoSum(nums, target) {
  // Write your solution here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: 2,
    slug: "reverse-a-string",
    title: "Reverse a String",
    difficulty: "Easy",
    category: "String",
    tags: ["String", "Two Pointers"],
    description: "Write a function that reverses a string. The input string is given as an array of characters s. You must do this by modifying the input array in-place with O(1) extra memory.",
    inputFormat: 's = ["h","e","l","l","o"]',
    outputFormat: '["o","l","l","e","h"]',
    example: `Input: s = ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]`,
    constraints: `1 <= s.length <= 10^5
s[i] is a printable ascii character.`,
    starterCode: `function reverseString(s) {
  // Write your solution here
  let left = 0, right = s.length - 1;
  while (left < right) {
    const temp = s[left];
    s[left] = s[right];
    s[right] = temp;
    left++;
    right--;
  }
  return s;
}`
  },
  {
    id: 3,
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Medium",
    category: "Algorithms",
    tags: ["Array", "Binary Search"],
    description: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.",
    inputFormat: "nums = [-1,0,3,5,9,12], target = 9",
    outputFormat: "4",
    example: `Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4`,
    constraints: `1 <= nums.length <= 10^4
-10^4 < nums[i], target < 10^4
All integers in nums are unique.
nums is sorted in ascending order.`,
    starterCode: `function search(nums, target) {
  // Write your solution here
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
  },
  {
    id: 4,
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Medium",
    category: "Stack",
    tags: ["String", "Stack"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and closed in the correct order.",
    inputFormat: 's = "()[]{}"',
    outputFormat: "true",
    example: `Input: s = "()[]{}"
Output: true`,
    constraints: `1 <= s.length <= 10^4
s consists of parentheses only '()[]{}'.`,
    starterCode: `function isValid(s) {
  // Write your solution here
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`
  },
  {
    id: 5,
    slug: "merge-two-arrays",
    title: "Merge Two Arrays",
    difficulty: "Easy",
    category: "Array",
    tags: ["Array", "Sorting"],
    description: "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums2 into nums1 as one sorted array.",
    inputFormat: "nums1 = [1,2,3], nums2 = [2,5,6]",
    outputFormat: "[1,2,2,3,5,6]",
    example: `Input: nums1 = [1,2,3], nums2 = [2,5,6]
Output: [1,2,2,3,5,6]`,
    constraints: `0 <= nums1.length, nums2.length <= 200`,
    starterCode: `function mergeArrays(nums1, nums2) {
  // Write your solution here
  return [...nums1, ...nums2].sort((a, b) => a - b);
}`
  }
];

module.exports = { questions, problems };
