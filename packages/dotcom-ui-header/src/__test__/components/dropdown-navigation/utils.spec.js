import { isEqual } from '../../../components/dropdown-navigation/utils';

describe('isEqual', () => {
    it('should return true for identical objects', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]

        const obj2 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for objects with different values', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]

        const obj2 = [
            {
                key1: "newValue1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should return false for objects with different keys', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]

        const obj2 = [
            {
                newKey1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should return false for objects with extra keys', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]

        const obj2 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true,
                key5: 'value5'
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should return false for objects with missing keys', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]

        const obj2 = [
            {
                key1: "value1",
                key3: true,
                key4: true,

            },
        ]
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should return true for same objects but different key order', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true
            },
        ]

        const obj2 = [
            {
                key1: "value1",
                key4: true,
                key2: "value2",
                key3: true,
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should return true for deeply nested objects with identical values', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true,
                key5: {
                    subKey1: "subValue1",
                    subKey2: "subValue2"
                },
                key6: {
                    subKey1: "subValue1",
                    subKey2: {
                        subSubKey1: "subSubValue1",
                        subSubKey2: "subSubValue2"
                    }
                }
            },
        ]

        const obj2 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true,
                key5: {
                    subKey1: "subValue1",
                    subKey2: "subValue2"
                },
                key6: {
                    subKey1: "subValue1",
                    subKey2: {
                        subSubKey1: "subSubValue1",
                        subSubKey2: "subSubValue2"
                    }
                }
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(true);
    });

    it('should return false for deeply nested objects with different values', () => {
        const obj1 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true,
                key5: {
                    subKey1: "subValue1",
                    subKey2: "subValue2"
                },
                key6: {
                    subKey1: "subValue1",
                    subKey2: {
                        subSubKey1: "subSubValue1",
                        subSubKey2: "newSubSubValue2"
                    }
                }
            },
        ]

        const obj2 = [
            {
                key1: "value1",
                key2: "value2",
                key3: true,
                key4: true,
                key5: {
                    subKey1: "subValue1",
                    subKey2: true
                },
                key6: {
                    subKey1: "subValue1",
                    subKey2: {
                        subSubKey1: "subSubValue1",
                        subSubKey2: "subSubValue2"
                    }
                }
            },
        ]
        expect(isEqual(obj1, obj2)).toBe(false);
    });

    it('should return true for two empty objects', () => {
        expect(isEqual([], [])).toBe(true);
        expect(isEqual({}, {})).toBe(true);
    });

    it('should return false if one value is null and the other is an object', () => {
        expect(isEqual(null, {})).toBe(false);
        expect(isEqual({}, null)).toBe(false);
    });

    it('should return false if one of the objects is empty', () => {
        expect(isEqual([], [1])).toBe(false);
        expect(isEqual({}, {key1:1})).toBe(false);
    });

    it('should return false for objects with different types', () => {
        expect(isEqual([1], {key1:1})).toBe(false);
    });
});