import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { env } from './config/env';
import { User } from './models/User';
import { Topic } from './models/Topic';
import { Concept } from './models/Concept';
import { Question } from './models/Question';
import { UserProgress } from './models/UserProgress';
import { Streak } from './models/Streak';
import { Milestone } from './models/Milestone';

async function seed(): Promise<void> {
  await mongoose.connect(env.MONGODB_URI);
  console.log('✅  Connected to MongoDB');

  // ── Admin User ─────────────────────────────────────────────────────────────
  const adminEmail = 'admin@prepmate.io';
  let adminUserId;
  const passwordHash = await bcrypt.hash('Admin@1234', 12);
  const admin = await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: 'PrepMate Admin',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
      emailVerified: true,
      status: 'ACTIVE',
    },
    { upsert: true, new: true }
  );
  adminUserId = admin._id;
  console.log('✅  Admin user created/updated → admin@prepmate.io / Admin@1234');

  // ── Sample Topics ──────────────────────────────────────────────────────────
  const topics = [
    { name: 'Data Structures & Algorithms', slug: 'dsa', description: 'Arrays, trees, graphs, sorting, dynamic programming and more.', icon: 'code', color: '#2563eb', order: 1, published: true },
    { name: 'System Design', slug: 'system-design', description: 'Scalable architecture, databases, caching, and distributed systems.', icon: 'hub', color: '#7c3aed', order: 2, published: true },
    { name: 'Python', slug: 'python', description: 'Core Python language, OOP, async programming, and best practices.', icon: 'terminal', color: '#059669', order: 3, published: true },
    { name: 'JavaScript', slug: 'javascript', description: 'ES6+, async/await, event loop, and modern JS patterns.', icon: 'javascript', color: '#d97706', order: 4, published: true },
    { name: 'Databases', slug: 'databases', description: 'SQL, NoSQL, indexing, transactions, and query optimization.', icon: 'storage', color: '#dc2626', order: 5, published: false },
  ];

  const topicDocs = [];
  for (const topic of topics) {
    const t = await Topic.findOneAndUpdate({ slug: topic.slug }, topic, { upsert: true, new: true });
    topicDocs.push(t);
  }
  console.log(`✅  ${topics.length} topics seeded`);

  // ── Concepts ───────────────────────────────────────────────────────────────
  const dsaTopicId = topicDocs.find(t => t.slug === 'dsa')?._id;
  const sysDesignTopicId = topicDocs.find(t => t.slug === 'system-design')?._id;
  
  if (dsaTopicId && sysDesignTopicId) {
    const concepts = [
      {
        title: 'Big O Notation & Complexity Analysis',
        slug: 'big-o-notation',
        topicId: dsaTopicId,
        difficulty: 'EASY',
        summary: 'Understand time and space complexity with simple mental models.',
        body: `## Introduction to Big O Notation

Big O notation is the mathematical language we use to describe how the runtime or space requirements of an algorithm grow as the input size grows. It focuses on the dominant term and ignores constants, providing an abstracted standard to compare one algorithm against another.

### Why does it matter?
When writing software at scale, doing operations efficiently is the difference between a system operating instantaneously versus completely failing during a traffic spike. A loop that iterates \`N^2\` times will fall over for massive inputs comparing to \`N log N\`.

### Common Complexities

1. **O(1) - Constant Time**
   The operation takes the same amount of time regardless of the input size. Let's look at a Hash Map lookup or an array index lookup.
   \`\`\`python
   def get_first_element(arr):
       return arr[0] if arr else None
   \`\`\`

2. **O(log N) - Logarithmic Time**
   The operation halves the search space each step. Think Binary Search.
   \`\`\`python
   def binary_search(arr, target):
       low, high = 0, len(arr) - 1
       while low <= high:
           mid = (low + high) // 2
           if arr[mid] == target: return mid
           elif arr[mid] < target: low = mid + 1
           else: high = mid - 1
       return -1
   \`\`\`

3. **O(N) - Linear Time**
   The time increases linearly with the input size. Iterating over an array once.
   \`\`\`python
   def print_all(arr):
       for item in arr:
           print(item)
   \`\`\`

4. **O(N log N) - Linearithmic Time**
   Usually seen in sorting algorithms like Merge Sort, Heap Sort, and Quick Sort (average case). It means we do a linear amount of work for each level of a logarithmic number of divisions.

5. **O(N^2) - Quadratic Time**
   Nested loops. Often inefficient and causes performance bottlenecks.
   \`\`\`python
   def print_pairs(arr):
       for i in arr:
           for j in arr:
               print(i, j)
   \`\`\`

> **Note:** We typically always care about the _worst-case scenario_, though sometimes average case matters more (e.g. Quicksort's average \`O(N log N)\` vs worst \`O(N^2)\`).`,
        hasCode: true,
        published: true
      },
      {
        title: 'Hash Maps & Collision Resolution',
        slug: 'hash-maps-collision',
        topicId: dsaTopicId,
        difficulty: 'MEDIUM',
        summary: 'Deep dive into hashing functions and resolving collisions in constant time.',
        body: `## Overview of Hash Maps

A **Hash Map** (or Hash Table) is arguably the single most important data structure for technical interviews. It allows you to store key-value pairs and retrieve them in \`O(1)\` constant average time.

### How it Works
When a key is added, it passes through a **Hash Function** which maps the key to a specific bucket index in an underlying array. 
- Hash formulas must be deterministic (same input = same output).
- The index is mathematically calculated, making lookups instant.

### Collisions
What happens when two different keys map to the same bucket index? This is called a **collision**.

#### Strategy 1: Chaining
In chaining, each bucket holds a pointer to a **Linked List**. When a collision occurs, the new entry is appended to the linked list at that bucket. 
- **Pros**: Easy to implement.
- **Cons**: Poor cache locality, extra memory for pointers.

#### Strategy 2: Open Addressing (Linear Probing)
When a collision occurs, we simply search the immediately adjacent buckets forward linearly until we find an empty slot.
- **Pros**: Good cache locality.
- **Cons**: Can lead to **clustering**. Re-sizing tables becomes complex.

\`\`\`python
# Example of O(1) retrieval leveraging a Dictionary in Python
def two_sum(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\`

### Summary
When writing algorithms to reduce time complexity, often your first thought should be _"Can I use a Hash Map here?"_.`,
        hasCode: true,
        published: true
      },
      {
        title: 'Caching Strategies',
        slug: 'caching-strategies',
        topicId: sysDesignTopicId,
        difficulty: 'HARD',
        summary: 'Learn about Write-Through, Write-Back, and Write-Around caching architectures.',
        body: `## What is Caching?

Caching involves storing copies of often-used data in a temporary storage location (like RAM) so that subsequent requests for that data can be served faster than querying the primary database.

Common distributed caches include **Redis** and **Memcached**.

## Cache Invalidation
A famous quote in computer science states: _"There are only two hard things in Computer Science: cache invalidation and naming things."_

When primary DB data changes, the cached data becomes stale. We must invalidate it.

### 1. Write-Through Cache
Under a write-through strategy, data is written to the cache and the backing database completely synchronously.
- **Pros**: Fast retrieval, complete data consistency between cache and storage.
- **Cons**: Every write operation carries double the latency (writing to two systems).

### 2. Write-Around Cache
Data is written directly to the storage database, bypassing the cache.
- **Pros**: Cache isn't flooded with writes that may never be read.
- **Cons**: A read request for recently written data will always result in a "cache miss", requiring slowing fetching from the database before populating the cache.

### 3. Write-Back Cache
Data is written only to the cache. The cache immediately confirms the write operation to the client. Periodically, the cache asynchronously flushes these updated records to the database.
- **Pros**: Highly performant write operations. Ideal for write-heavy workloads.
- **Cons**: Risk of data loss. If the cache node crashes before flushing, the data is lost forever.

## Eviction Policies
When the cache is full, we need to decide what to evict:
- **LRU (Least Recently Used)**: Evict the data that hasn't been accessed for the longest time.
- **LFU (Least Frequently Used)**: Evict data that gets requested the least amount of times.
- **FIFO (First In First Out)**: Evict data strictly in the order it was added.`,
        hasCode: false,
        published: true
      }
    ];

    for (const c of concepts) {
      await Concept.findOneAndUpdate({ slug: c.slug }, c, { upsert: true, new: true });
    }
    console.log(`✅  ${concepts.length} comprehensive concepts seeded`);
    
    // ── Questions ───────────────────────────────────────────────────────────
    const questions = [
      {
        title: 'Two Sum',
        topicId: dsaTopicId,
        difficulty: 'EASY',
        problemStatement: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
        constraints: '2 <= nums.length <= 10^4\\n-10^9 <= nums[i] <= 10^9',
        example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]',
        solution: `def twoSum(nums, target):
    prevMap = {} # val : index
    for i, n in enumerate(nums):
        diff = target - n
        if diff in prevMap:
            return [prevMap[diff], i]
        prevMap[n] = i`,
        hint: 'Can you do this in one pass using a Hash Map?',
        concepts: ['Hash Maps', 'Arrays'],
        published: true
      },
      {
        title: 'Valid Anagram',
        topicId: dsaTopicId,
        difficulty: 'EASY',
        problemStatement: 'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.',
        constraints: '1 <= s.length, t.length <= 5 * 10^4\\ns and t consist of lowercase English letters.',
        example: 'Input: s = "anagram", t = "nagaram"\nOutput: true',
        solution: `def isAnagram(s, t):
    if len(s) != len(t):
        return False
        
    countS, countT = {}, {}
    for i in range(len(s)):
        countS[s[i]] = 1 + countS.get(s[i], 0)
        countT[t[i]] = 1 + countT.get(t[i], 0)
    for c in countS:
        if countS[c] != countT.get(c, 0):
            return False
            
    return True`,
        hint: 'You can sort both strings or count the frequency of each character.',
        concepts: ['Hash Maps', 'Strings'],
        published: true
      }
    ];
    
    for (const q of questions) {
      await Question.findOneAndUpdate({ title: q.title }, q, { upsert: true, new: true });
    }
    console.log(`✅  ${questions.length} questions seeded`);

    // ── Learner Progress (Admin user test data) ────────────────────────────
    if (adminUserId) {
      await UserProgress.findOneAndUpdate(
        { userId: adminUserId, topicId: dsaTopicId },
        { progressPercent: 42, updatedAt: new Date() },
        { upsert: true, new: true }
      );
      
      await Streak.findOneAndUpdate(
        { userId: adminUserId },
        { currentDays: 5, longestDays: 14, lastActiveAt: new Date(), updatedAt: new Date() },
        { upsert: true, new: true }
      );
      
      const milestoneExists = await Milestone.findOne({ userId: adminUserId, title: 'First Topic Mastered' });
      if (!milestoneExists) {
        await Milestone.create({
          userId: adminUserId,
          title: 'First Topic Mastered',
          subtitle: 'Completed Data Structures & Algorithms'
        });
      }
      console.log('✅  Learner progress populated for Admin user dashboard');
    }
  }

  await mongoose.disconnect();
  console.log('🎉  Seed complete!');
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
