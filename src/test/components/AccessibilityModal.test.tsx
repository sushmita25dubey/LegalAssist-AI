import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AccessibilityProvider, useAccessibility } from '../../context/AccessibilityContext';
import { AccessibilityModal } from '../../components/common/AccessibilityModal';

const TestComponent: React.FC = () => {
  const { openAccessibilityModal } = useAccessibility();
  return (
    <div>
      <button onClick={openAccessibilityModal}>Open A11y</button>
      <AccessibilityModal />
    </div>
  );
};

describe('AccessibilityModal Integration Tests', () => {
  it('should render modal title when opened and support Escape key close', async () => {
    const { getByText, queryByText } = render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    await act(async () => {
      getByText('Open A11y').click();
    });

    expect(getByText('Accessibility Center')).toBeInTheDocument();

    await act(async () => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });

    expect(queryByText('Accessibility Center')).not.toBeInTheDocument();
  });

  it('should toggle high contrast mode when checkbox is clicked', async () => {
    const { getByText, getByLabelText } = render(
      <AccessibilityProvider>
        <TestComponent />
      </AccessibilityProvider>
    );

    await act(async () => {
      getByText('Open A11y').click();
    });

    const checkbox = getByLabelText('High Contrast Mode') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);

    await act(async () => {
      checkbox.click();
    });
    expect(checkbox.checked).toBe(true);
  });
});
