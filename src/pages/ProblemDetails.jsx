import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowLeft, Play, Send, Terminal } from 'lucide-react';

const codingProblems = [
  {
    slug: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'nums = [2, 7, 11, 15], target = 9',
    outputFormat: '[0, 1]',
    example: 'Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9',
    starterCode: `function twoSum(nums, target) {\n  // Write your solution here\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
  },
  {
    slug: 'reverse-a-string',
    title: 'Reverse a String',
    difficulty: 'Easy',
    category: 'Strings',
    description: 'Write a function that reverses a string. The input string is given as an array of characters.',
    inputFormat: 's = ["h","e","l","l","o"]',
    outputFormat: '["o","l","l","e","h"]',
    example: 'Input: s = ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]',
    constraints: '1 <= s.length <= 10^5',
    starterCode: `function reverseString(s) {\n  return s.reverse();\n}`,
  },
  {
    slug: 'binary-search',
    title: 'Binary Search',
    difficulty: 'Medium',
    category: 'Searching',
    description: 'Given an array of integers sorted in ascending order and a target integer, return the index of target using binary search. Return -1 if not found.',
    inputFormat: 'nums = [-1,0,3,5,9,12], target = 9',
    outputFormat: '4',
    example: 'Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4.',
    constraints: '1 <= nums.length <= 10^4\nAll values are distinct.',
    starterCode: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    else if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
  },
  {
    slug: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Medium',
    category: 'Stacks',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    inputFormat: 's = "()[]{}"',
    outputFormat: 'true',
    example: 'Input: s = "()[]{}"\nOutput: true\n\nInput: s = "(]"\nOutput: false',
    constraints: '1 <= s.length <= 10^4',
    starterCode: `function isValid(s) {\n  const stack = [];\n  const map = { ')': '(', '}': '{', ']': '[' };\n  for (const ch of s) {\n    if ('({['.includes(ch)) stack.push(ch);\n    else if (stack.pop() !== map[ch]) return false;\n  }\n  return stack.length === 0;\n}`,
  },
  {
    slug: 'merge-two-arrays',
    title: 'Merge Two Arrays',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given two sorted arrays, merge them into one sorted array.',
    inputFormat: 'nums1 = [1,2,3], nums2 = [2,5,6]',
    outputFormat: '[1,2,2,3,5,6]',
    example: 'Input: nums1 = [1,2,3], nums2 = [2,5,6]\nOutput: [1,2,2,3,5,6]',
    constraints: '0 <= nums1.length, nums2.length <= 200',
    starterCode: `function mergeSortedArrays(nums1, nums2) {\n  return [...nums1, ...nums2].sort((a, b) => a - b);\n}`,
  },
];

export default function ProblemDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const problem = codingProblems.find((p) => p.slug === slug) || codingProblems[0];

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(problem.starterCode);
  const [outputMessage, setOutputMessage] = useState('');
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const handleRunCode = () => {
    setOutputMessage('Run functionality will be connected to the backend later.');
    setIsOutputVisible(true);
  };

  const handleSubmitCode = () => {
    setOutputMessage('Submission engine will be connected to the backend later.');
    setIsOutputVisible(true);
  };

  return (
    <div className="problem-details-page container">
      <div className="problem-details-header">
        <button className="back-btn" onClick={() => navigate('/coding')}>
          <ArrowLeft size={18} /> Back to Problems
        </button>
        <div className="problem-header-info">
          <h2>{problem.title}</h2>
          <span className={`difficulty-badge badge-${problem.difficulty.toLowerCase()}`}>
            {problem.difficulty}
          </span>
        </div>
      </div>

      <div className="workspace-split">
        <div className="problem-panel left-panel">
          <div className="panel-tab">Problem Description</div>
          <div className="panel-content">
            <h3 className="problem-main-title">Problem: {problem.title}</h3>

            <section className="problem-section">
              <h4>Description</h4>
              <p>{problem.description}</p>
            </section>

            <section className="problem-section">
              <h4>Input Format</h4>
              <pre className="code-block">{problem.inputFormat}</pre>
            </section>

            <section className="problem-section">
              <h4>Output Format</h4>
              <pre className="code-block">{problem.outputFormat}</pre>
            </section>

            <section className="problem-section">
              <h4>Example</h4>
              <pre className="code-block">{problem.example}</pre>
            </section>

            <section className="problem-section">
              <h4>Constraints</h4>
              <pre className="code-block">{problem.constraints}</pre>
            </section>
          </div>
        </div>

        <div className="problem-panel right-panel">
          <div className="editor-control-bar">
            <div className="language-selector">
              <label htmlFor="lang-select">Language:</label>
              <select
                id="lang-select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="select-dropdown"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
                <option value="java">Java</option>
              </select>
            </div>
            <span className="editor-tag">Initial UI Sandbox</span>
          </div>

          <div className="editor-container">
            <textarea
              className="code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your code here..."
              spellCheck="false"
            />
          </div>

          <div className="editor-actions">
            <Button variant="outline" onClick={handleRunCode}>
              <Play size={16} style={{ marginRight: '6px' }} /> Run Code
            </Button>
            <Button variant="primary" onClick={handleSubmitCode}>
              <Send size={16} style={{ marginRight: '6px' }} /> Submit
            </Button>
          </div>

          {isOutputVisible && (
            <div className="output-panel">
              <div className="output-header">
                <Terminal size={16} />
                <span>Output</span>
              </div>
              <div className="output-body">
                <p className="output-text">{outputMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
