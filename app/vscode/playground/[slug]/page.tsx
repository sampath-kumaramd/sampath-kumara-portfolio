'use client';

import React from 'react';
import CodeEditor from '@/components/vscode/code-editor';

export default function PlaygroundPage({
  params,
}: {
  params: { slug: string };
}) {
  // Extract language from slug
  const language = params.slug;

  // Default initial code based on language
  const getInitialCode = (lang: string) => {
    switch (lang) {
      case 'javascript':
        return `// Welcome to the interactive playground!
// Write your JavaScript code here and click "Run Code" to see the output.

function greet(name) {
  return "Hello, " + name + "!";
}

// Try calling the function
const message = greet("Visitor");
console.log(message);

// You can also try more complex code
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);
`;
      case 'python':
        return `# Welcome to the Python playground!
# Write your Python code here and click "Run Code" to see the output.

def greet(name):
    return f"Hello, {name}!"

# Try calling the function
message = greet("Visitor")
print(message)

# You can also try more complex code
numbers = [1, 2, 3, 4, 5]
doubled = [n * 2 for n in numbers]
print("Doubled numbers:", doubled)
`;
      // Add more language cases as needed
      default:
        return `// Welcome to the interactive playground!
// Write your code here and click "Run Code" to see the output.
`;
    }
  };

  return (
    <div className="h-full w-full">
      <CodeEditor initialCode={getInitialCode(language)} language={language} />
    </div>
  );
}
