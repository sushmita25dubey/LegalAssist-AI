import React, { act } from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { NotificationProvider } from '../../context/NotificationContext';
import { DocumentProvider } from '../../context/DocumentContext';
import { GroundedAskView } from '../../components/ask/GroundedAskView';

describe('GroundedAskView RTL Integration Tests', () => {
  it('should render suggested question pills and update input on pill click', async () => {
    const { getByText, getByPlaceholderText } = render(
      <NotificationProvider>
        <DocumentProvider>
          <GroundedAskView />
        </DocumentProvider>
      </NotificationProvider>
    );

    expect(getByText('Ask Your Document (Grounded Q&A)')).toBeInTheDocument();

    const pill = getByText('What are the termination conditions?');
    expect(pill).toBeInTheDocument();

    await act(async () => {
      pill.click();
    });

    const input = getByPlaceholderText(/Ask anything about/i) as HTMLInputElement;
    expect(input.value).toBe('What are the termination conditions?');
  });
});
