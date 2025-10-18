import { NotFoundError } from '../exceptions';
import { LinkedList } from '../index';

describe('LinkedList', () => {
  const createList = <T>(values: T[] = []): LinkedList<T> => {
    const list = new LinkedList<T>();
    values.forEach((v) => list.add(v));
    return list;
  };

  describe('Iteration', () => {
    test('should iterate over primitive values', () => {
      const list = createList([1, 2, 3]);
      expect(Array.from(list)).toEqual([1, 2, 3]);
    });

    test('should iterate over object values', () => {
      const objects = [
        { id: 1, name: 'Ibrahim' },
        { id: 2, name: 'Abdullah' },
      ];
      const list = createList(objects);
      expect(Array.from(list)).toEqual(objects);
    });

    test('should iterate using generator function', () => {
      const list = createList([4, 6, 7]);
      const gen = list.listGenerator();

      expect(gen.next()).toEqual({ value: 4, done: false });
      expect(gen.next()).toEqual({ value: 6, done: false });
      expect(gen.next()).toEqual({ value: 7, done: false });
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });

  describe('Removal First Element', () => {
    test('should remove first element from head and return their values', () => {
      const list = createList([44, 32, 22]);
      expect(list.removeFirst()).toBe(44);
      expect(list.removeFirst()).toBe(32);
      expect(list.removeFirst()).toBe(22);
      expect(() => list.removeFirst()).toThrow(NotFoundError);
    });

    test('should throw NotFoundError on empty list', () => {
      const list = createList();
      expect(() => list.removeFirst()).toThrow(NotFoundError);
    });
  });

  describe('Removal Last Element', () => {
    test('should remove last element from tail and return their value', () => {
      const list = createList([33, 45, 67]);
      expect(list.removeLast()).toBe(67);
      expect(list.removeLast()).toBe(45);
      expect(list.removeLast()).toBe(33);
      expect(() => list.removeLast()).toThrow(NotFoundError);
    });

    test('should throw NotFoundError on empty list', () => {
      const list = createList();
      expect(() => list.removeLast()).toThrow(NotFoundError);
    });
  });

  describe('Clearing', () => {
    test('should clear the LinkedList', () => {
      const list = createList([6, 3, 2]);
      list.clear();
      expect(Array.from(list)).toEqual([]);
      expect(list.getSize()).toBe(0);
    });

    test('should handle clearing an empty list', () => {
      const list = createList();
      list.clear();
      expect(Array.from(list)).toEqual([]);
      expect(list.getSize()).toBe(0);
    });
  });

  describe('Size', () => {
    test('should return correct size after operations', () => {
      const list = createList([1, 2, 3]);
      list.clear();
      expect(list.getSize()).toBe(0);

      list.add(1);
      list.add(2);
      list.add(3);
      list.removeFirst();
      expect(list.getSize()).toBe(2);
    });

    test('should return zero for empty list', () => {
      const list = createList();
      expect(list.getSize()).toBe(0);
    });
  });

  describe('Reversal', () => {
    test('should correctly reverse different list cases', () => {
      const list = createList([1, 2, 3]);
      const emptyList = createList();
      const singleList = createList([10]);

      list.reverse();
      emptyList.reverse();
      singleList.reverse();

      expect(Array.from(list)).toEqual([3, 2, 1]);
      expect(Array.from(emptyList)).toEqual([]);
      expect(Array.from(singleList)).toEqual([10]);
    });

    test('should maintain size after reversal', () => {
      const list = createList([1, 2, 3]);
      const sizeBefore = list.getSize();
      list.reverse();
      expect(list.getSize()).toBe(sizeBefore);
    });
  });

  describe('toArray', () => {
    test('should convert list to array with correct order', () => {
      const list = createList([1, 2, 3]);
      expect(list.toArray()).toEqual([1, 2, 3]);
    });

    test('should return empty array for empty list', () => {
      const list = createList();
      expect(list.toArray()).toEqual([]);
    });

    test('should handle object values', () => {
      const objects = [{ id: 1 }, { id: 2 }];
      const list = createList(objects);
      expect(list.toArray()).toEqual(objects);
    });
  });

  describe('find', () => {
    test('should find existing value', () => {
      const list = createList([1, 2, 3, 2]);
      expect(list.find(2)).toBe(2);
      expect(list.find(3)).toBe(3);
    });

    test('should return undefined for non-existent value', () => {
      const list = createList([1, 2, 3]);
      expect(list.find(4)).toBeUndefined();
    });

    test('should return undefined for empty list', () => {
      const list = createList();
      expect(list.find(1)).toBeUndefined();
    });

    test('should find object by reference', () => {
      const obj = { id: 1 };
      const list = createList([obj, { id: 2 }]);
      expect(list.find(obj)).toBe(obj);
    });
  });
});
