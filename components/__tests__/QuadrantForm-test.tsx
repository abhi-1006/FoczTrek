import { fireEvent, render, screen } from '@testing-library/react-native';

import { QuadrantForm } from '../QuadrantForm';
import { getQuadrant } from '@/lib/quadrants';

describe('QuadrantForm', () => {
  it('always shows five task rows, prefilled with saved tasks', () => {
    render(
      <QuadrantForm
        quadrant={getQuadrant('do')}
        initialTasks={[{ name: 'Lab report', start: '9:00', end: '' }]}
        submitLabel="Save"
        onSubmit={jest.fn()}
      />
    );
    expect(screen.getAllByLabelText('What needs doing?')).toHaveLength(5);
    expect(screen.getByDisplayValue('Lab report')).toBeTruthy();
    expect(screen.getByText('1 of 5 tasks filled in')).toBeTruthy();
  });

  it('submits what the user typed', () => {
    const onSubmit = jest.fn();
    render(<QuadrantForm quadrant={getQuadrant('schedule')} initialTasks={[]} submitLabel="Save" onSubmit={onSubmit} />);

    fireEvent.changeText(screen.getAllByLabelText('What needs doing?')[1], 'Read chapter 4');
    fireEvent.changeText(screen.getAllByLabelText('Start')[1], '14:00');
    fireEvent.press(screen.getByText('Save'));

    const drafts = onSubmit.mock.calls[0][0];
    expect(drafts).toHaveLength(5);
    expect(drafts[1]).toEqual({ name: 'Read chapter 4', start: '14:00', end: '' });
    expect(drafts[0]).toEqual({ name: '', start: '', end: '' });
  });
});
