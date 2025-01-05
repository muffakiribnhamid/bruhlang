# BruhLang

A modern programming language designed for simplicity and expressiveness.

## Features

- Simple and intuitive syntax
- Strong type system
- Modern web-based IDE
- Real-time compilation and execution
- Built-in error handling and debugging

## Project Structure

```
BruhLang/
├── compiler/                 # Core language implementation
│   ├── lexer.js             # Tokenization
│   ├── parser.js            # AST generation
│   ├── analyzer.js          # Semantic analysis
│   └── generator.js         # Code generation
├── backend/                 
│   ├── server.js            # Express server
│   ├── routes/              # API routes
│   └── middleware/          # Custom middleware
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── styles/          # CSS modules
│   │   └── utils/           # Helper functions
│   └── public/              # Static assets
└── examples/                # Example programs
```

## Language Syntax

```bruh
// Variables
let x = 42;
const PI = 3.14;

// Functions
fn add(a: number, b: number): number {
    return a + b;
}

// Control Flow
if (condition) {
    // code
} else {
    // code
}

// Loops
for (let i = 0; i < 10; i++) {
    // code
}

// Classes
class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    greet(): string {
        return "Hello, I'm ${this.name}!";
    }
}
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   ```
3. Start the development server:
   ```bash
   # Start backend
   cd backend && npm run dev
   
   # Start frontend (in another terminal)
   cd frontend && npm run dev
   ```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
