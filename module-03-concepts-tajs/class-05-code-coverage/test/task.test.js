import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Task } from '../src/task';

describe('#Task Test Suite', () => {
  let _task;
  let _logMock;

  beforeEach(() => {
    _logMock = jest.spyOn(console, console.log.name).mockImplementation();
    _task = new Task();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should only run tasks that are due with fake timers (fast)', async () => {
    // AAA = Arrange | Act | Assert

    // Arrange
    jest.useFakeTimers();

    const tasks = [
      {
        name: 'task5',
        dueAt: new Date(Date.now() + 5e3),
        fn: jest.fn(),
      },
      {
        name: 'task10',
        dueAt: new Date(Date.now() + 10e3),
        fn: jest.fn(),
      },
    ];

    // Act
    _task.save(tasks.at(0));
    _task.save(tasks.at(1));

    _task.run(200);

    jest.advanceTimersByTime(4e3);

    // Assert
    expect(tasks.at(0).fn).not.toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1e3);
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(5e3);
    expect(tasks.at(0).fn).toHaveBeenCalled();
    expect(tasks.at(1).fn).toHaveBeenCalled();
  });

  it('should log a message when there are no tasks to run', () => {
    // Arrange
    jest.useFakeTimers();

    // Act
    _task.run(200);

    jest.advanceTimersByTime(200);

    // Assert
    expect(_logMock).toHaveBeenCalledWith('No tasks to run');
  });
});
