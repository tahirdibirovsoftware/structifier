# Structifier

A TypeScript library providing robust and efficient data structure implementations for JavaScript environments. Currently, it includes a doubly-linked list, with plans to expand to graphs, stacks, queues, and more.

## Installation

Install Structifier via npm:

```bash
npm install structifier
```

## Usage

Structifier is designed to be used with ES Modules. Here's a basic example using the `LinkedList` implementation:

```typescript
import { LinkedList } from 'structifier';

// Create a new linked list
const list = new LinkedList<number>();

// Add elements
list.add(1);
list.add(2);
list.add(3);

// Iterate over elements
for (const value of list) {
  console.log(value); // Outputs: 1, 2, 3
}

// Remove first element
console.log(list.removeFirst()); // Outputs: 1

// Convert to array
console.log(list.toArray()); // Outputs: [2, 3]

// Find an element
console.log(list.find(2)); // Outputs: 2
```

## Features

- **Doubly-Linked List**: Supports adding, removing, reversing, and iterating over elements with O(1) operations at both ends.
- **Type Safety**: Fully typed with TypeScript for robust development.
- **Extensible**: Planned additions include graphs, stacks, and queues.

## API Documentation

- `LinkedList<T>`:
  - `add(data: T): void` - Adds an element to the end of the list.
  - `removeFirst(): T` - Removes and returns the first element.
  - `removeLast(): T` - Removes and returns the last element.
  - `getSize(): number` - Returns the current number of elements.
  - `clear(): void` - Removes all elements.
  - `reverse(): void` - Reverses the list in-place.
  - `toArray(): T[]` - Converts the list to an array.
  - `find(value: T): T | undefined` - Finds the first occurrence of a value.
  - `[Symbol.iterator](): IterableIterator<T>` - Enables `for...of` iteration.
  - `listGenerator(): IterableIterator<T>` - Provides a custom generator for iteration.

## Development

### Prerequisites

- Node.js (LTS version)
- npm

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/tahirdibirovsoftware/structs.git
   cd structs
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:

   ```bash
   npm run build
   ```

### Testing

Run the test suite with:

```bash
npm test
```

### Linting and Formatting

- Lint: `npm run lint`
- Fix lint issues: `npm run lint:fix`
- Format: `npm run format`

### Releasing

Releases are automated with semantic-release. Make a commit with a conventional message (e.g., `feat: add new feature`) and push to `main` to trigger a new version.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request. Follow the Conventional Commits standard for commit messages.

## License

This project is licensed under the MIT License - see the LICENSE file for details.