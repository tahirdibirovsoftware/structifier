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

/**
 * A doubly-linked list implementation supporting generic types, with methods for
 * adding, removing, reversing, and iterating over elements. This data structure
 * is useful for scenarios requiring efficient insertions/deletions at both ends
 * or bidirectional traversal.
 */
export class LinkedList<T> {
  private header: Node<T> | null;
  private tail: Node<T> | null;
  private size: number;

  constructor() {
    this.header = this.tail = null;
    this.size = 0;
  }

  /**
   * Adds a new node with the given data to the end of the list.
   * @param data The data to add to the list.
   * @throws {NotFoundError} If the operation fails due to an internal state issue.
   */
  public add(data: T): void {
    this.size++;
    const node = new Node(data);

    // Case 1: Empty list
    if (this.header === null) {
      this.header = node;
      this.tail = node;
      return;
    }

    // Case 2: List is not empty
    if (this.tail !== null) {
      this.tail.next = node;
      node.prev = this.tail;
    }
    this.tail = node;
  }

  /**
   * Removes and returns the first element from the list.
   * @returns The data of the removed node.
   * @throws {NotFoundError} If the list is empty.
   */
  public removeFirst(): T {
    if (this.header === null) {
      throw new NotFoundError('Cannot remove an empty list');
    }
    const removed = this.header;
    this.header = this.header.next;

    if (this.header !== null) {
      this.header.prev = null;
    } else {
      this.tail = null; // List is now empty
    }

    this.size--;
    return removed.data;
  }

  /**
   * Removes and returns the last element from the list.
   * @returns The data of the removed node.
   * @throws {NotFoundError} If the list is empty.
   */
  public removeLast(): T {
    if (this.header === null) {
      throw new NotFoundError('Cannot remove an empty list');
    }

    const removedNode = this.tail as Node<T>;
    const removedData = removedNode.data;
    this.size--;

    if (this.header === this.tail) {
      this.header = null;
      this.tail = null;
    } else {
      const newTail = removedNode.prev;
      if (newTail !== null) {
        newTail.next = null;
      }
      this.tail = newTail;
    }

    return removedData;
  }

  /**
   * Returns the current number of elements in the list.
   * @returns The size of the list.
   */
  public getSize(): number {
    return this.size;
  }

  /**
   * Clears all elements from the list, resetting it to an empty state.
   */
  public clear(): void {
    let current: Node<T> | null = this.header;
    while (current !== null) {
      const nextNode = current.next;
      current.next = null; // Help garbage collection
      current = nextNode;
    }
    this.header = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Reverses the order of elements in the list in-place.
   */
  public reverse(): void {
    let current = this.header;
    let temp: Node<T> | null = null;

    while (current !== null) {
      temp = current.prev; // Store previous
      current.prev = current.next; // Swap prev and next
      current.next = temp; // Complete the swap
      current = current.prev; // Move to next node
    }

    // Swap header and tail
    temp = this.header;
    this.header = this.tail;
    this.tail = temp;
  }

  /**
   * Generator function to iterate over the list's elements.
   * @returns An iterator yielding each element's data.
   */
  public *listGenerator(): IterableIterator<T> {
    let current = this.header;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }

  /**
   * Implements the iterable protocol for the list.
   * @returns An iterator yielding each element's data.
   */
  *[Symbol.iterator](): IterableIterator<T> {
    let current = this.header;
    while (current !== null) {
      yield current.data;
      current = current.next;
    }
  }

  /**
   * Converts the linked list to an array of its elements.
   * @returns An array containing all elements in order.
   */
  public toArray(): T[] {
    const result: T[] = [];
    for (const item of this.listGenerator()) {
      result.push(item);
    }
    return result;
  }

  /**
   * Finds the first node with data matching the provided value using strict equality.
   * @param value The value to search for.
   * @returns The data of the found node, or undefined if not found.
   */
  public find(value: T): T | undefined {
    let current = this.header;
    while (current !== null) {
      if (current.data === value) {
        return current.data;
      }
      current = current.next;
    }
    return undefined;
  }
}
