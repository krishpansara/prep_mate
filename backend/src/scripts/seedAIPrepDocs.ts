import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Topic } from '../models/Topic';
import { Concept } from '../models/Concept';
import { Question } from '../models/Question';

dotenv.config();

const SEED_DATA = {
  topics: [
    {
      name: 'System Design',
      slug: 'system-design',
      description: 'Master the art of designing large-scale distributed systems.',
      icon: 'architecture',
      color: '#3B82F6', // blue
      order: 1,
      published: true,
    },
    {
      name: 'Data Structures',
      slug: 'data-structures',
      description: 'Core concepts for organizing and storing data efficiently.',
      icon: 'account_tree',
      color: '#10B981', // green
      order: 2,
      published: true,
    },
    {
      name: 'Algorithms',
      slug: 'algorithms',
      description: 'Step-by-step procedures for problem solving and computation.',
      icon: 'functions',
      color: '#8B5CF6', // purple
      order: 3,
      published: true,
    },
    {
      name: 'Frontend Engineering',
      slug: 'frontend-engineering',
      description: 'Master React, DOM, standard practices and UI architectures.',
      icon: 'web',
      color: '#EC4899', // pink
      order: 4,
      published: true,
    }
  ],
  concepts: {
    'system-design': [
      {
        title: 'CAP Theorem',
        slug: 'cap-theorem',
        summary: 'Understanding Consistency, Availability, and Partition Tolerance.',
        body: '# CAP Theorem\n\nThe CAP theorem states that a distributed data store can only simultaneously provide two out of the following three guarantees:\n\n1. **Consistency**: Every read receives the most recent write or an error.\n2. **Availability**: Every request receives a (non-error) response, without the guarantee that it contains the most recent write.\n3. **Partition Tolerance**: The system continues to operate despite an arbitrary number of messages being dropped or delayed by the network between nodes.\n\nIn the presence of a network partition (P), one has to choose between consistency (C) and availability (A).',
        difficulty: 'MEDIUM',
        hasCode: false,
        published: true,
      },
      {
        title: 'Load Balancing',
        slug: 'load-balancing',
        summary: 'Distributing incoming network traffic across multiple servers.',
        body: '# Load Balancing\n\nA load balancer distributes incoming client requests across a group of servers. It ensures that no single server bears too much demand. By spreading the work evenly, load balancing improves application responsiveness.\n\n### Algorithms:\n- **Round Robin**: Requests are distributed across the group of servers sequentially.\n- **Least Connections**: A new request is sent to the server with the fewest current connections.\n- **IP Hash**: The IP address of the client is used to determine which server receives the request.',
        difficulty: 'EASY',
        hasCode: false,
        published: true,
      }
    ],
    'data-structures': [
      {
        title: 'Hash Tables',
        slug: 'hash-tables',
        summary: 'Fast key-value storage using hashing functions.',
        body: '# Hash Tables\n\nA Hash Table (or hash map) is a data structure that implements an associative array abstract data type, a structure that can map keys to values. A hash table uses a hash function to compute an index, also called a hash code, into an array of buckets or slots, from which the desired value can be found.\n\n### Time Complexity:\n- Average lookup: O(1)\n- Average insertion: O(1)\n- Averation deletion: O(1)',
        difficulty: 'EASY',
        hasCode: true,
        published: true,
      }
    ],
    'algorithms': [
      {
        title: 'Binary Search',
        slug: 'binary-search',
        summary: 'Find an item in a sorted array in O(log n) time.',
        body: '# Binary Search\n\nBinary search is an efficient algorithm for finding an item from a sorted list of items. It works by repeatedly dividing in half the portion of the list that could contain the item, until you\'ve narrowed down the possible locations to just one.\n\n```python\ndef binary_search(arr, target):\n    low = 0\n    high = len(arr) - 1\n    \n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n```',
        difficulty: 'EASY',
        hasCode: true,
        published: true,
      }
    ],
    'frontend-engineering': [
      {
        title: 'Virtual DOM',
        slug: 'virtual-dom',
        summary: 'Understanding how React updates the UI efficiently.',
        body: '# Virtual DOM\n\nThe virtual DOM (VDOM) is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM. This process is called reconciliation.\n\nUpdating the virtual DOM is much faster than updating the real DOM because nothing is drawn on the screen.',
        difficulty: 'MEDIUM',
        hasCode: false,
        published: true,
      }
    ]
  },
  questions: {
    'system-design': [
      {
        title: 'Design URL Shortener',
        problemStatement: 'Design a scalable URL shortening service like TinyURL. Focus on the data model, capacity planning, and API design.',
        constraints: 'The system must support 100M new URLs per month. The short URLs should be as short as possible.',
        example: 'Input: https://www.google.com -> Output: http://tiny.url/xyz123',
        solution: 'Use Base62 encoding to generate short strings from an auto-incrementing database ID. Alternatively, use a hash function (like MD5) and take the first 6-7 characters.',
        hint: 'Think about how many distinct URLs you can store with a given character length (e.g., 62^7 = 3.5 trillion).',
        difficulty: 'MEDIUM',
        concepts: ['CAP Theorem', 'Database Design', 'Hashing'],
        published: true,
      }
    ],
    'data-structures': [
      {
        title: 'Two Sum',
        problemStatement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        constraints: '2 <= nums.length <= 10^4, -10^9 <= nums[i] <= 10^9',
        example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
        solution: 'Use a Hash Map to store numbers and their indices as you iterate. `diff = target - nums[i]`. If `diff` in map, return indices.',
        hint: 'Can we do this in one pass using a hash table?',
        difficulty: 'EASY',
        concepts: ['Hash Tables', 'Arrays'],
        published: true,
      }
    ],
    'algorithms': [
      {
        title: 'Find Minimum in Rotated Sorted Array',
        problemStatement: 'Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find the minimum element in O(log n) time.',
        constraints: 'n == nums.length, 1 <= n <= 5000',
        example: 'Input: nums = [3,4,5,1,2]\nOutput: 1',
        solution: 'Use Binary Search. We know that if `arr[mid] > arr[high]`, the min must be in the right half. Else, it must be in the left half.',
        hint: 'Use binary search. Compare mid element with the rightmost element to decide which half is unsorted.',
        difficulty: 'MEDIUM',
        concepts: ['Binary Search', 'Arrays'],
        published: true,
      }
    ],
    'frontend-engineering': [
      {
        title: 'Debounce vs Throttle',
        problemStatement: 'Explain the difference between debounce and throttle in JavaScript, and implement a `debounce` function.',
        constraints: 'Wait time should be customizable.',
        example: 'debounce(() => console.log("hi"), 500)',
        solution: '```javascript\nfunction debounce(func, wait) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer);\n    timer = setTimeout(() => { func.apply(this, args) }, wait);\n  }\n}\n```',
        hint: 'Debounce resets the timer on every call. Throttle enforces a maximum number of times a function can be called over time.',
        difficulty: 'MEDIUM',
        concepts: ['Closures', 'Async', 'Event Handlers'],
        published: true,
      }
    ]
  }
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepmate');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to DB: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing AI seeded data (optional: or all data)
    console.log('Clearing existing data...');
    await Topic.deleteMany({});
    await Concept.deleteMany({});
    await Question.deleteMany({});

    console.log('Inserting Topics...');
    const insertedTopics = await Topic.insertMany(SEED_DATA.topics);

    const topicMap: Record<string, any> = {};
    for (const t of insertedTopics) {
      topicMap[t.slug] = t._id;
    }

    console.log('Inserting Concepts...');
    const conceptDocs = [];
    for (const [topicSlug, concepts] of Object.entries(SEED_DATA.concepts)) {
      const topicId = topicMap[topicSlug];
      for (const concept of concepts) {
        conceptDocs.push({ ...concept, topicId });
      }
    }
    await Concept.insertMany(conceptDocs);

    console.log('Inserting Questions...');
    const questionDocs = [];
    for (const [topicSlug, questions] of Object.entries(SEED_DATA.questions)) {
      const topicId = topicMap[topicSlug];
      for (const question of questions) {
        questionDocs.push({ ...question, topicId });
      }
    }
    await Question.insertMany(questionDocs);

    console.log('Successfully seeded AI Prep Docs!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
