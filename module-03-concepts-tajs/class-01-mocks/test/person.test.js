import { describe, it, expect, jest } from '@jest/globals';
import { Person } from '../src/person.js';

describe('#Person Suite', () => {
  describe('#validate', () => {
    it('should throw if name is not provided', () => {
      const mockInvalidPerson = { name: '', cpf: '123.456.789-00' };
      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('name is required'));
    });

    it('should throw if cpf is not provided', () => {
      const mockInvalidPerson = { name: 'John', cpf: '' };
      expect(() => Person.validate(mockInvalidPerson))
        .toThrow(new Error('cpf is required'));
    });

    it('should not throw if person is valid', () => {
      const mockValidPerson = { name: 'John', cpf: '123.456.789-00' };
      expect(() => Person.validate(mockValidPerson)).not.toThrow();
      expect(Person.validate(mockValidPerson)).toBe('ok');
    });
  });

  describe('#format', () => {
    it('should return formatted person', () => {
      // AAA

      // Arrange
      const mockPerson = { name: 'John Doe', cpf: '123.456.789-00' };
      // Act
      const formattedPerson = Person.format(mockPerson);
      // Assert
      const expected = { name: 'John', lastName: 'Doe', cpf: '12345678900' };
      expect(formattedPerson).toStrictEqual(expected);
    });
  });

  describe('#save', () => {
    it('should throw if name is not provided', () => {
      const mockInvalidPerson = { name: '', lastName: 'Doe', cpf: '12345678900' };
      expect(() => Person.save(mockInvalidPerson))
        .toThrow(new Error('name is required'));
    });

    it('should throw if lastName is not provided', () => {
      const mockInvalidPerson = { name: 'John', lastName: '', cpf: '12345678900' };
      expect(() => Person.save(mockInvalidPerson))
        .toThrow(new Error('lastName is required'));
    });

    it('should throw if cpf is not provided', () => {
      const mockInvalidPerson = { name: 'John', lastName: 'Doe', cpf: '' };
      expect(() => Person.save(mockInvalidPerson))
        .toThrow(new Error('cpf is required'));
    });

    it('should throw if cpf is not formatted', () => {
      const mockInvalidPerson = { name: 'John', lastName: 'Doe', cpf: '123.456.789-00' };
      expect(() => Person.save(mockInvalidPerson))
        .toThrow(new Error('cpf is not formatted'));
    });

    it('should not throw if person is valid', () => {
      const mockValidPerson = { name: 'John', lastName: 'Doe', cpf: '12345678900' };
      expect(() => Person.save(mockValidPerson)).not.toThrow();
      expect(Person.save(mockValidPerson)).toBe('ok');
    });
  });

  describe('#process', () => {
    it('should process person', () => {
      // AAA

      // Arrange
      const mockPerson = { name: 'John Doe', cpf: '123.456.789-00' };
      // Mocking
      jest
        .spyOn(Person, Person.validate.name)
        .mockReturnValueOnce('ok');

      jest
        .spyOn(Person, Person.format.name)
        .mockReturnValueOnce({ name: 'John', lastName: 'Doe', cpf: '12345678900' });

      jest
        .spyOn(Person, Person.save.name)
        .mockReturnValueOnce('ok');

      // Act
      const result = Person.process(mockPerson);
      // Assert
      expect(result).toBe('ok');
    });
  });
});
