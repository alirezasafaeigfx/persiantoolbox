import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MahrCalculator from '@/components/features/finance/MahrCalculator';

describe('mahr calculator legal/data correctness', () => {
  it('scopes the calculator to cash mahr and does not imply coin support', () => {
    render(<MahrCalculator />);

    expect(screen.getByLabelText('مبلغ مهریه به وجه رایج')).toBeInTheDocument();
    expect(screen.queryByText(/سکه/)).not.toBeInTheDocument();
  });

  it('uses explicit official annual-index inputs instead of unverified year presets', () => {
    render(<MahrCalculator />);

    expect(screen.getByLabelText('شاخص سال وقوع عقد')).toBeInTheDocument();
    expect(screen.getByLabelText('شاخص سال قبل از پرداخت')).toBeInTheDocument();
    expect(screen.queryByLabelText('سال فعلی')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('سال ازدواج')).not.toBeInTheDocument();
  });

  it('states the legally applicable previous-year formula', () => {
    render(<MahrCalculator />);

    expect(
      screen.getByText(/شاخص سال قبل از پرداخت.*شاخص سال وقوع عقد.*مبلغ مهریه/),
    ).toBeInTheDocument();
  });
});
