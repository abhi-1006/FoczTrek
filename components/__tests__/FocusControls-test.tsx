import { fireEvent, render, screen } from '@testing-library/react-native';

import { DurationInput } from '../DurationInput';
import { FocusTimer } from '../FocusTimer';
import { TaskPicker } from '../TaskPicker';
import type { PlannedTask } from '@/lib/types';

describe('DurationInput', () => {
  it('flags an invalid duration', () => {
    render(<DurationInput value="abc" onChange={jest.fn()} />);
    expect(screen.getByText(/Enter a time like 25:00/)).toBeTruthy();
  });

  it('applies a preset', () => {
    const onChange = jest.fn();
    render(<DurationInput value="25:00" onChange={onChange} />);
    fireEvent.press(screen.getByText('45 min'));
    expect(onChange).toHaveBeenCalledWith('45:00');
  });
});

describe('TaskPicker', () => {
  const tasks: PlannedTask[] = [
    { id: 'do-0', quadrant: 'do', name: 'Lab report', start: '', end: '' },
    { id: 'schedule-0', quadrant: 'schedule', name: 'Gym', start: '', end: '' },
  ];

  it('selects a planned task', () => {
    const onChange = jest.fn();
    render(<TaskPicker tasks={tasks} selection={{ name: '', custom: true }} onChange={onChange} />);
    fireEvent.press(screen.getByText('🕒 Gym'));
    expect(onChange).toHaveBeenCalledWith({ taskId: 'schedule-0', quadrant: 'schedule', name: 'Gym', custom: false });
  });

  it('shows a text field for a custom task', () => {
    render(<TaskPicker tasks={tasks} selection={{ name: '', custom: true }} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Focus task')).toBeTruthy();
  });

  it('hides the text field while a planned task is selected', () => {
    render(
      <TaskPicker
        tasks={tasks}
        selection={{ taskId: 'do-0', quadrant: 'do', name: 'Lab report', custom: false }}
        onChange={jest.fn()}
      />
    );
    expect(screen.queryByLabelText('Focus task')).toBeNull();
  });
});

describe('FocusTimer', () => {
  it('shows the duration as MM:SS and moves through start, pause, resume and reset', () => {
    const onStatusChange = jest.fn();
    render(<FocusTimer seconds={1500} onStatusChange={onStatusChange} />);
    expect(screen.getByText('25:00')).toBeTruthy();

    fireEvent.press(screen.getByText('Start'));
    expect(onStatusChange).toHaveBeenLastCalledWith('running');

    fireEvent.press(screen.getByText('Pause'));
    expect(onStatusChange).toHaveBeenLastCalledWith('paused');
    expect(screen.getByText('Paused')).toBeTruthy();

    fireEvent.press(screen.getByText('Resume'));
    expect(onStatusChange).toHaveBeenLastCalledWith('running');

    fireEvent.press(screen.getByText('Reset'));
    expect(onStatusChange).toHaveBeenLastCalledWith('idle');
    expect(screen.getByText('Start')).toBeTruthy();
  });

  it('cannot start while disabled', () => {
    const onStatusChange = jest.fn();
    render(<FocusTimer seconds={60} disabled onStatusChange={onStatusChange} />);
    fireEvent.press(screen.getByText('Start'));
    expect(onStatusChange).not.toHaveBeenCalled();
  });
});
