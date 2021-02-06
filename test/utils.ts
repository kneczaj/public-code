import { act, fireEvent, screen } from '@testing-library/react';

export const getButton = (label: string) =>
  screen.getByRole('button', { name: new RegExp(label, 'i') });

export async function clickButton(label: string) {
  return act(async () => {
    await fireEvent.click(getButton(label));
  });
}

export function fillInput(label: string, value: any) {
  const field = screen.getByLabelText(new RegExp(`^${label}$`, 'i'));
  act(() => {
    fireEvent.change(field, { target: { value } });
  });
}
