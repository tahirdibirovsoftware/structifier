import { NotFoundError } from '../exceptions';

class Node<T> {
  public data: T;
  public next: Node<T> | null;
  public prev: Node<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

export class LinkedList<T> {
  private header: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;
  constructor() {
    this.header = this.tail = null;
    this.size = 0;
  }
  public add(data: T): void {
    this.size++;
    const node = new Node(data);

    // Case 1: Empty list
    if (this.header === null) {
      this.header = node;
      this.tail = node;
      return;
    }

    // Case 2: List is not empty (2 or more elements, or the single-element case)
    // The old tail's 'next' must point to the new node.
    if (this.tail !== null) {
      this.tail.next = node;
      node.prev = this.tail; // New node's 'prev' points back to the old tail.
    }
    this.tail = node; // Update the list's tail to the new node.
  }
  public removeFirst(): T {
    if (this.header !== null) {
      const removed = this.header;
      this.header = this.header.next;

      if (this.header !== null) {
        this.header.prev = null;
      } else {
        // CRITICAL: If header is null, the list is now empty, so tail must be null too.
        this.tail = null;
      }

      this.size--;
      return removed.data;
    } else {
      throw new NotFoundError('Cannot remove an empty list');
    }
  }
  public removeLast(): T {
    // 1. Handle an empty list
    if (this.header === null) {
      throw new NotFoundError('Cannot remove an empty list');
    }

    // Since 'this.header' is not null, 'this.tail' must also not be null
    // in a correctly maintained list. We use a local variable for clarity.
    const removedNode = this.tail as Node<T>;
    const removedData = removedNode.data;
    this.size--;

    // 2. Handle a list with one element (header === tail)
    if (this.header === this.tail) {
      this.header = null;
      this.tail = null;
      return removedData;
    }

    // 3. Handle a list with two or more elements
    // The previous node is stored in the current tail's 'prev' pointer
    // We already checked that removedNode is not null.
    const newTail = removedNode.prev;

    // CRITICAL: Update the new tail's pointers
    if (newTail !== null) {
      // Break the link from the new tail to the old (removed) tail.
      newTail.next = null;
    }

    // Update the list's tail reference
    this.tail = newTail;

    return removedData;
  }
  public getSize(): number {
    return this.size;
  }
  public clear(): void {
    let current: Node<T> | null = this.header;
    let nextNode: Node<T> | null;

    while (current !== null) {
      nextNode = current.next;
      current.next = null;
      current = nextNode;
    }

    this.header = null;
    this.size = 0;
  }
  public reverse(): void {
    let current = this.header;
    let temp: Node<T> | null = null; // Used to swap prev and next

    // 1. Swap prev and next pointers for every node
    while (current !== null) {
      temp = current.prev; // Store current prev
      current.prev = current.next; // Flip prev to next
      current.next = temp; // Flip next to old prev
      current = current.prev; // Move to the next node (which is now in current.prev)
    }

    // 2. Swap header and tail references
    temp = this.header;
    this.header = this.tail;
    this.tail = temp;
  }
  public *listGenerator(): IterableIterator<T> {
    let current = this.header;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }
  *[Symbol.iterator](): IterableIterator<T> {
    let current = this.header;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }
}
