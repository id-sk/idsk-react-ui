/**
 * @vitest-environment jsdom
 */
import '@testing-library/jest-dom/vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { axe } from '../../test/axe';
import { Stepper } from './Stepper';
import { initAll } from './vanilla';

const defaultSteps = [{ label: 'Osobné údaje' }, { label: 'Adresa' }, { label: 'Potvrdenie' }];

describe('Stepper', () => {
  afterEach(() => {
    cleanup();
  });

  // ---------------------------------------------------------------------------
  // HTML structure
  // ---------------------------------------------------------------------------
  describe('HTML structure', () => {
    it('renders a <nav> landmark with aria-label', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(screen.getByRole('navigation', { name: 'Kroky formuláru' })).toBeInTheDocument();
    });

    it('has base class idsk-stepper', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(screen.getByRole('navigation')).toHaveClass('idsk-stepper');
    });

    it('merges custom className without removing base class', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} className="my-custom" />);
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass('idsk-stepper');
      expect(nav).toHaveClass('my-custom');
    });

    it('renders the toggle button with aria-expanded=false by default', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('dropdown is hidden by default', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(document.querySelector('.idsk-stepper__dropdown')).toHaveAttribute('hidden');
    });

    it('defaultExpanded=true opens the dropdown on mount', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} defaultExpanded />);
      expect(document.querySelector('.idsk-stepper__dropdown')).not.toHaveAttribute('hidden');
    });

    it('toggle button aria-controls matches dropdown id', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      const toggle = screen.getByRole('button');
      const dropdownId = toggle.getAttribute('aria-controls');
      expect(dropdownId).toBeTruthy();
      expect(document.getElementById(dropdownId!)).toHaveClass('idsk-stepper__dropdown');
    });

    it('dropdown has aria-hidden=true when collapsed', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(document.querySelector('.idsk-stepper__dropdown')).toHaveAttribute(
        'aria-hidden',
        'true',
      );
    });

    it('dropdown has aria-hidden=false when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(document.querySelector('.idsk-stepper__dropdown')).toHaveAttribute(
        'aria-hidden',
        'false',
      );
    });

    it('toggle icon span has aria-hidden="true"', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      const iconSpan = document.querySelector('.idsk-stepper__toggle-icon');
      expect(iconSpan).toHaveAttribute('aria-hidden', 'true');
    });

    it('toggle button has aria-label when collapsed', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Zobraziť zoznam krokov');
    });

    it('toggle button aria-label updates when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Skryť zoznam krokov');
    });
  });

  // ---------------------------------------------------------------------------
  // Header — step counter and progress bar
  // ---------------------------------------------------------------------------
  describe('Header', () => {
    it('shows "Krok 1/3" for activeStep=0 with 3 steps', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      const counter = document.querySelector('.idsk-stepper-step-counter');
      expect(counter).toHaveTextContent('Krok');
      expect(counter?.querySelector('.idsk-stepper-step-counter__value')).toHaveTextContent('1/3');
    });

    it('shows "Krok 2/3" for activeStep=1', () => {
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      const counter = document.querySelector('.idsk-stepper-step-counter');
      expect(counter?.querySelector('.idsk-stepper-step-counter__value')).toHaveTextContent('2/3');
    });

    it('renders progress bar with correct aria attributes', () => {
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      const bar = document.querySelector('.idsk-stepper-loader');
      expect(bar).toHaveAttribute('role', 'progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '2');
      expect(bar).toHaveAttribute('aria-valuemin', '1');
      expect(bar).toHaveAttribute('aria-valuemax', '3');
    });

    it('clamps activeStep below 0 to 0', () => {
      render(<Stepper steps={defaultSteps} activeStep={-5} />);
      const counter = document.querySelector('.idsk-stepper-step-counter');
      expect(counter?.querySelector('.idsk-stepper-step-counter__value')).toHaveTextContent('1/3');
    });

    it('clamps activeStep above total-1 to total-1', () => {
      render(<Stepper steps={defaultSteps} activeStep={99} />);
      const counter = document.querySelector('.idsk-stepper-step-counter');
      expect(counter?.querySelector('.idsk-stepper-step-counter__value')).toHaveTextContent('3/3');
    });
  });

  // ---------------------------------------------------------------------------
  // Expand / collapse
  // ---------------------------------------------------------------------------
  describe('Expand/collapse', () => {
    it('clicking toggle opens the dropdown', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(document.querySelector('.idsk-stepper__dropdown')).not.toHaveAttribute('hidden');
    });

    it('clicking toggle again closes the dropdown', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      const toggle = screen.getByRole('button');
      await user.click(toggle);
      await user.click(toggle);
      expect(document.querySelector('.idsk-stepper__dropdown')).toHaveAttribute('hidden');
    });

    it('toggle button aria-expanded reflects open state', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      const toggle = screen.getByRole('button');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await user.click(toggle);
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });

    it('shows "Prejsť na krok:" heading when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Prejsť na krok:')).toBeInTheDocument();
    });

    it('renders "Prejsť na krok:" as an <h3> element', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(
        screen.getByRole('heading', { level: 3, name: 'Prejsť na krok:' }),
      ).toBeInTheDocument();
    });

    it('dropdown has role="region"', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} defaultExpanded />);
      expect(document.querySelector('.idsk-stepper__dropdown')).toHaveAttribute('role', 'region');
    });

    it('dropdown aria-labelledby references the h3 id', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} defaultExpanded />);
      const dropdown = document.querySelector('.idsk-stepper__dropdown')!;
      const labelledById = dropdown.getAttribute('aria-labelledby');
      expect(labelledById).toBeTruthy();
      expect(document.getElementById(labelledById!)).toHaveTextContent('Prejsť na krok:');
    });

    it('renders an ordered list when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('renders correct number of list items when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getAllByRole('listitem')).toHaveLength(3);
    });

    it('renders each step label when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getByText('Osobné údaje')).toBeInTheDocument();
      expect(screen.getByText('Adresa')).toBeInTheDocument();
      expect(screen.getByText('Potvrdenie')).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------------------------
  // Step states (visible after expand)
  // ---------------------------------------------------------------------------
  describe('Step states', () => {
    it('applies idsk-stepper__item--completed to steps before activeStep', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={2} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveClass('idsk-stepper__item--completed');
      expect(items[1]).toHaveClass('idsk-stepper__item--completed');
    });

    it('applies idsk-stepper__item--active to the current step', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[1]).toHaveClass('idsk-stepper__item--active');
    });

    it('applies idsk-stepper__item--upcoming to steps after activeStep', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[1]).toHaveClass('idsk-stepper__item--upcoming');
      expect(items[2]).toHaveClass('idsk-stepper__item--upcoming');
    });

    it('first step active — rest upcoming', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveClass('idsk-stepper__item--active');
      expect(items[1]).toHaveClass('idsk-stepper__item--upcoming');
      expect(items[2]).toHaveClass('idsk-stepper__item--upcoming');
    });

    it('last step active — all previous completed', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={2} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[0]).toHaveClass('idsk-stepper__item--completed');
      expect(items[1]).toHaveClass('idsk-stepper__item--completed');
      expect(items[2]).toHaveClass('idsk-stepper__item--active');
    });
  });

  // ---------------------------------------------------------------------------
  // aria-current
  // ---------------------------------------------------------------------------
  describe('aria-current', () => {
    it('sets aria-current="step" on the active list item when expanded', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[1]).toHaveAttribute('aria-current', 'step');
    });

    it('does not set aria-current on other items', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[0]).not.toHaveAttribute('aria-current');
      expect(items[2]).not.toHaveAttribute('aria-current');
    });
  });

  // ---------------------------------------------------------------------------
  // Step indicators
  // ---------------------------------------------------------------------------
  describe('Step indicators', () => {
    it('shows step numbers in the list', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('shows SVG icon for summary step instead of number', async () => {
      const user = userEvent.setup();
      const steps = [{ label: 'Krok 1' }, { label: 'Zhrnutie', isSummary: true as const }];
      render(<Stepper steps={steps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      const summaryItem = document.querySelector('.idsk-stepper__item--summary');
      expect(summaryItem?.querySelector('svg')).toBeInTheDocument();
      expect(summaryItem?.querySelector('.idsk-stepper__number')).not.toBeInTheDocument();
    });

    it('applies idsk-stepper__item--summary class to isSummary step', async () => {
      const user = userEvent.setup();
      const steps = [{ label: 'Krok 1' }, { label: 'Zhrnutie', isSummary: true as const }];
      render(<Stepper steps={steps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[1]).toHaveClass('idsk-stepper__item--summary');
    });
  });

  // ---------------------------------------------------------------------------
  // onStepClick
  // ---------------------------------------------------------------------------
  describe('onStepClick', () => {
    it('completed steps render as <button> inside the dropdown', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={2} onStepClick={vi.fn()} />);
      await user.click(screen.getByRole('button'));
      // toggle button + 2 clickable steps = 3 buttons total
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('calls onStepClick with the step index on click', async () => {
      const user = userEvent.setup();
      const onStepClick = vi.fn();
      render(
        <Stepper steps={defaultSteps} activeStep={2} onStepClick={onStepClick} defaultExpanded />,
      );
      const stepButtons = screen.getAllByRole('button').slice(1); // exclude toggle (first in DOM)
      await user.click(stepButtons[0]);
      expect(onStepClick).toHaveBeenCalledWith(0);
    });

    it('calls onStepClick with correct index for second completed step', async () => {
      const user = userEvent.setup();
      const onStepClick = vi.fn();
      render(
        <Stepper steps={defaultSteps} activeStep={2} onStepClick={onStepClick} defaultExpanded />,
      );
      const stepButtons = screen.getAllByRole('button').slice(1); // exclude toggle (first in DOM)
      await user.click(stepButtons[1]);
      expect(onStepClick).toHaveBeenCalledWith(1);
    });

    it('clicking a step button collapses the dropdown', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={2} onStepClick={vi.fn()} defaultExpanded />);
      const stepButtons = screen.getAllByRole('button').slice(1); // exclude toggle (first in DOM)
      await user.click(stepButtons[0]);
      expect(document.querySelector('.idsk-stepper__dropdown')).toHaveAttribute('hidden');
    });

    it('moves focus to toggle button after clicking a step', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={2} onStepClick={vi.fn()} defaultExpanded />);
      const stepButtons = screen.getAllByRole('button').slice(1); // exclude toggle (first in DOM)
      await user.click(stepButtons[0]);
      expect(screen.getByRole('button', { name: 'Zobraziť zoznam krokov' })).toHaveFocus();
    });

    it('no step buttons when onStepClick is not provided', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={2} />);
      await user.click(screen.getByRole('button'));
      // only toggle button
      expect(screen.getAllByRole('button')).toHaveLength(1);
    });

    it('invokes onStepClick on keyboard Enter', async () => {
      const user = userEvent.setup();
      const onStepClick = vi.fn();
      render(
        <Stepper steps={defaultSteps} activeStep={2} onStepClick={onStepClick} defaultExpanded />,
      );
      const stepButton = screen.getAllByRole('button')[1];
      stepButton.focus();
      await user.keyboard('{Enter}');
      expect(onStepClick).toHaveBeenCalledWith(0);
    });

    it('previously visited steps remain clickable after navigating backwards', async () => {
      const onStepClick = vi.fn();
      const { rerender } = render(
        <Stepper steps={defaultSteps} activeStep={2} onStepClick={onStepClick} defaultExpanded />,
      );
      // Simulate parent navigating back to step 1
      rerender(
        <Stepper steps={defaultSteps} activeStep={0} onStepClick={onStepClick} defaultExpanded />,
      );
      // Steps at index 1 and 2 were visited — toggle + 2 step buttons = 3
      expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('clicking a previously visited step after going backwards calls onStepClick', async () => {
      const user = userEvent.setup();
      const onStepClick = vi.fn();
      const { rerender } = render(
        <Stepper steps={defaultSteps} activeStep={2} onStepClick={onStepClick} defaultExpanded />,
      );
      rerender(
        <Stepper steps={defaultSteps} activeStep={0} onStepClick={onStepClick} defaultExpanded />,
      );
      // Exclude toggle (first in DOM); first step button in dropdown then maps to
      // step index 1 (step index 0 is active, not a button).
      const stepButtons = screen.getAllByRole('button').slice(1);
      await user.click(stepButtons[0]);
      expect(onStepClick).toHaveBeenCalledWith(1);
    });

    it('invokes onStepClick on keyboard Space', async () => {
      const user = userEvent.setup();
      const onStepClick = vi.fn();
      render(
        <Stepper steps={defaultSteps} activeStep={2} onStepClick={onStepClick} defaultExpanded />,
      );
      const stepButton = screen.getAllByRole('button')[1];
      stepButton.focus();
      await user.keyboard(' ');
      expect(onStepClick).toHaveBeenCalledWith(0);
    });
  });

  // ---------------------------------------------------------------------------
  // Column midpoint
  // ---------------------------------------------------------------------------
  describe('Column layout', () => {
    it('adds idsk-stepper__item--col-end to the midpoint item (not last)', async () => {
      const user = userEvent.setup();
      // 4 steps: ceil(4/2)=2, index 1 gets col-end (not last)
      const steps = [{ label: 'A' }, { label: 'B' }, { label: 'C' }, { label: 'D' }];
      render(<Stepper steps={steps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      const items = screen.getAllByRole('listitem');
      expect(items[1]).toHaveClass('idsk-stepper__item--col-end');
      expect(items[0]).not.toHaveClass('idsk-stepper__item--col-end');
      expect(items[2]).not.toHaveClass('idsk-stepper__item--col-end');
    });

    it('does not add col-end when there is only 1 step', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={[{ label: 'A' }]} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(screen.getAllByRole('listitem')[0]).not.toHaveClass('idsk-stepper__item--col-end');
    });
  });

  // ---------------------------------------------------------------------------
  // Connectors
  // ---------------------------------------------------------------------------
  describe('Connector', () => {
    it('renders a top and bottom connector line for every step', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      expect(document.querySelectorAll('.idsk-stepper__line--top')).toHaveLength(
        defaultSteps.length,
      );
      expect(document.querySelectorAll('.idsk-stepper__line--bottom')).toHaveLength(
        defaultSteps.length,
      );
    });

    it('connector lines sit inside an aria-hidden indicator column', async () => {
      const user = userEvent.setup();
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      await user.click(screen.getByRole('button'));
      document
        .querySelectorAll('.idsk-stepper__line--top, .idsk-stepper__line--bottom')
        .forEach((line) =>
          expect(line.closest('.idsk-stepper__indicator-col')).toHaveAttribute(
            'aria-hidden',
            'true',
          ),
        );
    });
  });

  // ---------------------------------------------------------------------------
  // Accessibility
  // ---------------------------------------------------------------------------
  describe('Accessibility', () => {
    it('has no a11y violations — collapsed state', async () => {
      const { container } = render(
        <main>
          <Stepper steps={defaultSteps} activeStep={0} />
        </main>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no a11y violations — expanded state', async () => {
      const { container } = render(
        <main>
          <Stepper steps={defaultSteps} activeStep={1} defaultExpanded />
        </main>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no a11y violations — with clickable steps expanded', async () => {
      const { container } = render(
        <main>
          <Stepper steps={defaultSteps} activeStep={2} onStepClick={vi.fn()} defaultExpanded />
        </main>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });

    it('has no a11y violations — with summary step', async () => {
      const steps = [
        { label: 'Krok 1' },
        { label: 'Krok 2' },
        { label: 'Zhrnutie', isSummary: true as const },
      ];
      const { container } = render(
        <main>
          <Stepper steps={steps} activeStep={1} defaultExpanded />
        </main>,
      );
      expect(await axe(container)).toHaveNoViolations();
    });
  });
  describe('Vanilla initAll', () => {
    it('sa nenaviaže na React Stepper', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      initAll(document.body);
      expect(screen.getByRole('navigation')).not.toHaveAttribute('data-stepper-init');
    });
  });
});
