import crypto from 'node:crypto';
import fs from 'node:fs/promises';

export class Service {
  #filename
  constructor({ filename }) {
    this.#filename = filename;
  }

  #hashPassword(password) {
    const hash = crypto.createHash('sha256')
      .update(password)
      .digest('hex');

    return hash;
  }

  create({ username, password }) {
    const data = JSON.stringify({
      username,
      password: this.#hashPassword(password),
      createdAt: new Date().toISOString(),
    }).concat('\n');

    return fs.appendFile(this.#filename, data);
  }

  async read() {
    try {
      const lines = (await fs.readFile(this.#filename, 'utf-8')).split('\n').filter(Boolean);

      if (!lines.length) {
        return [];
      }

      return lines
        .map((line) => JSON.parse(line))
        .map(({ password, ...user }) => user);
    } catch (error) {
      return [];
    }
  }
}
