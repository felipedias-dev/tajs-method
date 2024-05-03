import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import { Service } from '../src/service';

describe('#Service Test Suite', () => {
  let _service;
  const filename = 'testfile.ndjson';
  const MOCKED_HASH_PASSWORD = 'hashed-password';

  beforeEach(() => {
    jest.spyOn(crypto, crypto.createHash.name).mockReturnValue({
      update: jest.fn().mockReturnThis(),
      digest: jest.fn().mockReturnValue(MOCKED_HASH_PASSWORD),
    });

    jest.spyOn(fs, fs.appendFile.name).mockResolvedValue();

    _service = new Service({ filename });
  });

  describe('#create', () => {
    it('should call appendFile with right params', async () => {
      // AAA - Arrange Act Assert

      const expectedCreatedAt = new Date().toISOString();

      jest
        .spyOn(Date.prototype, Date.prototype.toISOString.name)
        .mockReturnValue(expectedCreatedAt);

      const input = {
        username: 'john.doe',
        password: 'password_123',
      }

      await _service.create(input);

      expect(crypto.createHash).toHaveBeenCalledWith('sha256');
      expect(crypto.createHash).toHaveBeenCalledTimes(1);
      expect(crypto.createHash().update).toHaveBeenCalledWith(input.password);
      expect(crypto.createHash().digest).toHaveBeenCalledWith('hex');

      const expectedData = JSON.stringify({
        ...input,
        password: MOCKED_HASH_PASSWORD,
        createdAt: expectedCreatedAt,
      }).concat('\n');

      expect(fs.appendFile).toHaveBeenCalledTimes(1);
      expect(fs.appendFile).toHaveBeenCalledWith(filename, expectedData);
    });
  });
});
