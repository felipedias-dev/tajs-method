import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { Service } from '../src/service';
import fs from 'node:fs/promises';

describe('#Service Test Suite', () => {
  let _service;
  const filename = 'testfile.ndjson';

  beforeEach(() => {
    _service = new Service({ filename });
  })

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('#read', () => {
    it('should return an empty array when file is empty', async () => {
      jest.spyOn(fs, fs.readFile.name).mockResolvedValue('');

      const result = await _service.read();

      expect(result).toStrictEqual([]);
    });

    it('should return an empty array when file does not exist', async () => {
      jest.spyOn(fs, fs.readFile.name).mockRejectedValue('File not found');

      const result = await _service.read();

      expect(result).toStrictEqual([]);
    });

    it('should return an array of users without password when file has users', async () => {
      const dbData = [
        {
          username: 'john.doe',
          password: 'hashed-password',
          createdAt: new Date().toISOString(),
        },
        {
          username: 'jane.doe',
          password: 'hashed-password',
          createdAt: new Date().toISOString(),
        },
      ]

      const fileContents = dbData.map((data) => JSON.stringify(data).concat('\n')).join('');

      jest.spyOn(fs, fs.readFile.name).mockResolvedValue(fileContents);

      const result = await _service.read();

      const expected = dbData.map(({ password, ...user }) => user);

      expect(result).toStrictEqual(expected);
    });
  });
});
