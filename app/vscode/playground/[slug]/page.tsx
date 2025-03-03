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
      case 'typescript':
        return `// Welcome to the TypeScript playground!
// Write your TypeScript code here and click "Run Code" to see the output.

function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Try calling the function
const message = greet("Visitor");
console.log(message);

// You can also try more complex code
const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);
`;
      case 'java':
        return `// Welcome to the Java playground!
// Write your Java code here and click "Run Code" to see the output.

public class Main {
    public static void main(String[] args) {
        System.out.println(greet("Visitor"));
        
        // You can also try more complex code
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Doubled numbers: ");
        for (int n : numbers) {
            System.out.print(n * 2 + " ");
        }
    }
    
    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}
`;
      case 'cpp':
      case 'c++':
        return `// Welcome to the C++ playground!
// Write your C++ code here and click "Run Code" to see the output.

#include <iostream>
#include <vector>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    // Try calling the function
    std::string message = greet("Visitor");
    std::cout << message << std::endl;
    
    // You can also try more complex code
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    std::cout << "Doubled numbers: ";
    for (int n : numbers) {
        std::cout << n * 2 << " ";
    }
    
    return 0;
}
`;
      case 'csharp':
      case 'c#':
        return `// Welcome to the C# playground!
// Write your C# code here and click "Run Code" to see the output.

using System;
using System.Linq;

class Program {
    static string Greet(string name) {
        return $"Hello, {name}!";
    }
    
    static void Main() {
        // Try calling the function
        string message = Greet("Visitor");
        Console.WriteLine(message);
        
        // You can also try more complex code
        int[] numbers = {1, 2, 3, 4, 5};
        var doubled = numbers.Select(n => n * 2).ToArray();
        
        Console.Write("Doubled numbers: ");
        Console.WriteLine(string.Join(", ", doubled));
    }
}
`;
      case 'go':
        return `// Welcome to the Go playground!
// Write your Go code here and click "Run Code" to see the output.

package main

import (
    "fmt"
)

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    // Try calling the function
    message := greet("Visitor")
    fmt.Println(message)
    
    // You can also try more complex code
    numbers := []int{1, 2, 3, 4, 5}
    doubled := make([]int, len(numbers))
    
    for i, n := range numbers {
        doubled[i] = n * 2
    }
    
    fmt.Println("Doubled numbers:", doubled)
}
`;
      case 'ruby':
        return `# Welcome to the Ruby playground!
# Write your Ruby code here and click "Run Code" to see the output.

def greet(name)
  "Hello, #{name}!"
end

# Try calling the function
message = greet("Visitor")
puts message

# You can also try more complex code
numbers = [1, 2, 3, 4, 5]
doubled = numbers.map { |n| n * 2 }
puts "Doubled numbers: #{doubled}"
`;
      case 'rust':
        return `// Welcome to the Rust playground!
// Write your Rust code here and click "Run Code" to see the output.

fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    // Try calling the function
    let message = greet("Visitor");
    println!("{}", message);
    
    // You can also try more complex code
    let numbers = vec![1, 2, 3, 4, 5];
    let doubled: Vec<i32> = numbers.iter().map(|&n| n * 2).collect();
    println!("Doubled numbers: {:?}", doubled);
}
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
