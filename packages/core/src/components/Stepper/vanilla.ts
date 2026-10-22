/**
 * Stepper — vanilla TypeScript behaviour.
 *
 * Expects this HTML structure:
 *
 *   <nav class="idsk-stepper" data-idsk="stepper" aria-label="Kroky formuláru">
 *     <div class="idsk-stepper__header">
 *       <button
 *         type="button"
 *         class="idsk-stepper__toggle-btn"
 *         aria-expanded="false"
 *         aria-controls="<dropdown-id>"
 *         aria-label="Zobraziť zoznam krokov"
 *       >
 *         <span class="idsk-stepper__toggle-icon" aria-hidden="true"></span>
 *       </button>
 *       <div class="idsk-stepper__header-content">
 *         <span class="idsk-stepper-step-counter">
 *           <span class="idsk-stepper-step-counter__label">Krok</span>
 *           <span class="idsk-stepper-step-counter__value">1/5</span>
 *         </span>
 *         <div class="idsk-stepper-loader" role="progressbar"
 *              aria-valuenow="1" aria-valuemin="1" aria-valuemax="5" aria-label="Krok 1 z 5">
 *           <div class="idsk-stepper-loader__fill" style="width: 20%"></div>
 *         </div>
 *       </div>
 *     </div>
 *     <div id="<dropdown-id>" class="idsk-stepper__dropdown" hidden aria-hidden="true"
 *        role="region" aria-labelledby="<dropdown-id>-title">
 *       <h3 id="<dropdown-id>-title" class="idsk-stepper__dropdown-title">Prejsť na krok:</h3>
 *       <ol class="idsk-stepper__list">
 *         <!-- Completed steps use <button class="idsk-stepper__step"> -->
 *         <li class="idsk-stepper__item idsk-stepper__item--completed">
 *           <button type="button" class="idsk-stepper__step">
 *             <span class="idsk-stepper__indicator-col" aria-hidden="true">
 *               <span class="idsk-stepper__line idsk-stepper__line--top"></span>
 *               <span class="idsk-stepper__indicator"><!-- check icon --></span>
 *               <span class="idsk-stepper__line idsk-stepper__line--bottom"></span>
 *             </span>
 *             <span class="idsk-stepper__label">Krok 1</span>
 *           </button>
 *         </li>
 *         <!-- Active and upcoming steps use <div class="idsk-stepper__step"> -->
 *         <li class="idsk-stepper__item idsk-stepper__item--active" aria-current="step">
 *           <div class="idsk-stepper__step">
 *             <span class="idsk-stepper__indicator-col" aria-hidden="true">
 *               <span class="idsk-stepper__line idsk-stepper__line--top"></span>
 *               <span class="idsk-stepper__indicator">
 *                 <span class="idsk-stepper__number">2</span>
 *               </span>
 *               <span class="idsk-stepper__line idsk-stepper__line--bottom"></span>
 *             </span>
 *             <span class="idsk-stepper__label">Krok 2</span>
 *           </div>
 *         </li>
 *         <!-- Summary item: add idsk-stepper__item--summary class -->
 *         <li class="idsk-stepper__item idsk-stepper__item--upcoming idsk-stepper__item--summary">
 *           <div class="idsk-stepper__step">
 *             <span class="idsk-stepper__indicator-col" aria-hidden="true">
 *               <span class="idsk-stepper__line idsk-stepper__line--top"></span>
 *               <span class="idsk-stepper__indicator"><!-- list icon --></span>
 *               <span class="idsk-stepper__line idsk-stepper__line--bottom"></span>
 *             </span>
 *             <span class="idsk-stepper__label">Zhrnutie</span>
 *           </div>
 *         </li>
 *       </ol>
 *     </div>
 *   </nav>
 *
 * Fires `idsk-stepper:step-change` (bubbles, detail: { stepIndex: number }) when a
 * completed step button is clicked.
 *
 * Usage:
 *   import { initIDSK } from '@id-sk/react/vanilla';
 *   initIDSK();
 */

const CHECK_SVG = `<svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9.16154 16.5365L4.81779 12.1927L3.33862 13.6615L9.16154 19.4844L21.6615 6.98437L20.1928 5.51562L9.16154 16.5365Z" fill="currentColor"/></svg>`;
const LIST_ALT_SVG = `<svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M19.7917 5.20833V19.7917H5.20833V5.20833H19.7917ZM20.9375 3.125H4.0625C3.54167 3.125 3.125 3.54167 3.125 4.0625V20.9375C3.125 21.3542 3.54167 21.875 4.0625 21.875H20.9375C21.3542 21.875 21.875 21.3542 21.875 20.9375V4.0625C21.875 3.54167 21.3542 3.125 20.9375 3.125ZM11.4583 7.29167H17.7083V9.375H11.4583V7.29167ZM11.4583 11.4583H17.7083V13.5417H11.4583V11.4583ZM11.4583 15.625H17.7083V17.7083H11.4583V15.625ZM7.29167 7.29167H9.375V9.375H7.29167V7.29167ZM7.29167 11.4583H9.375V13.5417H7.29167V11.4583ZM7.29167 15.625H9.375V17.7083H7.29167V15.625Z" fill="currentColor"/></svg>`;
const EXPAND_MORE_SVG = `<svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.2812 8.64062L12.5 13.4115L7.71875 8.64062L6.25 10.1094L12.5 16.3594L18.75 10.1094L17.2812 8.64062Z" fill="currentColor"/></svg>`;
const EXPAND_LESS_SVG = `<svg width="1em" height="1em" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M12.5 8.64062L6.25 14.8906L7.71875 16.3594L12.5 11.5885L17.2812 16.3594L18.75 14.8906L12.5 8.64062Z" fill="currentColor"/></svg>`;

let idCounter = 0;

function indicatorHtml(stepNumber: number, isCompleted: boolean, isSummary: boolean): string {
  if (isSummary) return LIST_ALT_SVG;
  if (isCompleted) return CHECK_SVG;
  return `<span class="idsk-stepper__number">${stepNumber}</span>`;
}

function swapStepElement(item: HTMLElement, needsButton: boolean): void {
  const current = item.querySelector<HTMLElement>('.idsk-stepper__step');
  if (!current) return;

  const isButton = current.tagName === 'BUTTON';
  if (needsButton === isButton) return;

  const next = document.createElement(needsButton ? 'button' : 'div') as HTMLElement;
  if (needsButton) (next as HTMLButtonElement).type = 'button';
  next.className = current.className;
  next.innerHTML = current.innerHTML;
  delete next.dataset.stepClickInit;
  current.replaceWith(next);
}

function updateState(stepper: HTMLElement, newActiveIndex: number): void {
  const prevMax = parseInt(stepper.dataset.stepperMaxReached ?? String(newActiveIndex), 10);
  const maxReachedIndex = Math.max(prevMax, newActiveIndex);
  stepper.dataset.stepperMaxReached = String(maxReachedIndex);

  const items = Array.from(stepper.querySelectorAll<HTMLElement>('.idsk-stepper__item'));
  const total = items.length;

  items.forEach((item, index) => {
    const isCompleted = index < newActiveIndex;
    const isActive = index === newActiveIndex;
    const isSummary = item.classList.contains('idsk-stepper__item--summary');

    item.classList.toggle('idsk-stepper__item--completed', isCompleted);
    item.classList.toggle('idsk-stepper__item--active', isActive);
    item.classList.toggle('idsk-stepper__item--upcoming', !isCompleted && !isActive);

    if (isActive) {
      item.setAttribute('aria-current', 'step');
    } else {
      item.removeAttribute('aria-current');
    }

    const indicator = item.querySelector<HTMLElement>('.idsk-stepper__indicator');
    if (indicator) {
      indicator.innerHTML = indicatorHtml(index + 1, isCompleted, isSummary);
    }

    swapStepElement(item, index <= maxReachedIndex && !isActive);
  });

  const counterValue = stepper.querySelector<HTMLElement>('.idsk-stepper-step-counter__value');
  if (counterValue) {
    counterValue.textContent = `${newActiveIndex + 1}/${total}`;
  }

  const loader = stepper.querySelector<HTMLElement>('.idsk-stepper-loader');
  const loaderFill = stepper.querySelector<HTMLElement>('.idsk-stepper-loader__fill');
  if (loader && loaderFill) {
    const pct = total > 0 ? ((newActiveIndex + 1) / total) * 100 : 0;
    loader.setAttribute('aria-valuenow', String(newActiveIndex + 1));
    loader.setAttribute('aria-label', `Krok ${newActiveIndex + 1} z ${total}`);
    loaderFill.style.width = `${pct}%`;
  }
}

export function init(element: HTMLElement): void {
  if (element.dataset.stepperInit) return;
  element.dataset.stepperInit = 'true';

  const toggleBtn = element.querySelector<HTMLButtonElement>('.idsk-stepper__toggle-btn');
  const dropdown = element.querySelector<HTMLElement>('.idsk-stepper__dropdown');

  if (!toggleBtn || !dropdown) return;

  if (!dropdown.id) {
    dropdown.id = `idsk-stepper-dropdown-${++idCounter}`;
    toggleBtn.setAttribute('aria-controls', dropdown.id);
  }

  if (!dropdown.getAttribute('role')) {
    dropdown.setAttribute('role', 'region');
  }

  const titleEl = dropdown.querySelector<HTMLElement>('.idsk-stepper__dropdown-title');
  if (titleEl) {
    if (!titleEl.id) {
      titleEl.id = `${dropdown.id}-title`;
    }
    if (!dropdown.getAttribute('aria-labelledby')) {
      dropdown.setAttribute('aria-labelledby', titleEl.id);
    }
  }

  const toggleIcon = toggleBtn.querySelector<HTMLElement>('.idsk-stepper__toggle-icon');
  if (toggleIcon && !toggleIcon.children.length) {
    toggleIcon.innerHTML = EXPAND_MORE_SVG;
  }

  if (!element.dataset.stepperMaxReached) {
    const allItems = Array.from(element.querySelectorAll('.idsk-stepper__item'));
    const initialActive = allItems.findIndex((item) =>
      item.classList.contains('idsk-stepper__item--active'),
    );
    element.dataset.stepperMaxReached = String(Math.max(0, initialActive));
  }

  const setExpanded = (expanded: boolean): void => {
    toggleBtn.setAttribute('aria-expanded', String(expanded));
    dropdown.hidden = !expanded;
    dropdown.setAttribute('aria-hidden', String(!expanded));
    toggleBtn.setAttribute(
      'aria-label',
      expanded ? 'Skryť zoznam krokov' : 'Zobraziť zoznam krokov',
    );
    if (toggleIcon) {
      toggleIcon.innerHTML = expanded ? EXPAND_LESS_SVG : EXPAND_MORE_SVG;
    }
  };

  toggleBtn.addEventListener('click', () => {
    setExpanded(toggleBtn.getAttribute('aria-expanded') !== 'true');
  });

  dropdown.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setExpanded(false);
      toggleBtn.focus();
    }
  });

  function wireStepClicks(): void {
    element.querySelectorAll<HTMLButtonElement>('button.idsk-stepper__step').forEach((btn) => {
      if (btn.dataset.stepClickInit) return;
      btn.dataset.stepClickInit = 'true';

      const item = btn.closest<HTMLElement>('.idsk-stepper__item');
      if (!item) return;

      const allItems = Array.from(element.querySelectorAll('.idsk-stepper__item'));
      const stepIndex = allItems.indexOf(item);
      if (stepIndex === -1) return;

      btn.addEventListener('click', () => {
        updateState(element, stepIndex);
        wireStepClicks();
        setExpanded(false);
        element.dispatchEvent(
          new CustomEvent('idsk-stepper:step-change', {
            bubbles: true,
            detail: { stepIndex },
          }),
        );
      });
    });
  }

  wireStepClicks();
}

export function initAll(root: HTMLElement = document.body): void {
  root.querySelectorAll<HTMLElement>('[data-idsk="stepper"]').forEach(init);
}

export { initAll as default };
