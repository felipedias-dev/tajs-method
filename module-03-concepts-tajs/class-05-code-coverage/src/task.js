import { clearInterval } from 'node:timers';

export class Task {
  #tasks = new Set();

  save({ name, dueAt, fn }) {
    console.log(`Task [${name}] saved and will run at ${dueAt.toISOString()}`);

    this.#tasks.add({ name, dueAt, fn });
  }

  run(everyMs) {
    const intervalId = setInterval(() => {
      const now = new Date();

      if (this.#tasks.size === 0) {
        console.log('No tasks to run');
        clearInterval(intervalId);
        return;
      }

      for (const task of this.#tasks) {
        if (task.dueAt <= now) {
          task.fn();
          this.#tasks.delete(task);
        }
      }
    }, everyMs);
  }
}
