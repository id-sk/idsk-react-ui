/**
 * Tooltip — vanilla TypeScript behavior.
 *
 * Expects this HTML structure:
 *
 *   <div class="idsk-tooltip__wrapper">
 *     <span class="idsk-tooltip__label">Label</span>          <!-- optional -->
 *     <button
 *       type="button"
 *       class="idsk-tooltip__trigger"
 *       aria-label="Accessible name"
 *       data-content="Tooltip text here"
 *       data-side="top"                                       <!-- optional, default: top -->
 *     >
 *       <span aria-hidden="true"><!-- icon SVG --></span>
 *     </button>
 *   </div>
 *
 * Usage:
 *   import { initIDSK } from '@id-sk/react/vanilla';
 *   initIDSK();
 */

const ARROW_SVG = `<svg class="idsk-tooltip__arrow" width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M14.7223 16.5C13.5676 18.5 10.6808 18.5 9.5261 16.5L-0.000174975 -5.78326e-07L24.2485 0L14.7223 16.5Z" fill="currentColor"/></svg>`;

const SIDE_OFFSET = 16;
const ARROW_HEIGHT = 18;
const COLLISION_PADDING = 10;

type Side = 'top' | 'bottom' | 'left' | 'right';
const OPPOSITE: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

let idCounter = 0;

function positionBubble(
  trigger: HTMLElement,
  bubble: HTMLElement,
  arrowEl: HTMLElement,
  preferredSide: Side,
) {
  bubble.style.visibility = 'hidden';
  bubble.style.display = 'block';

  const tr = trigger.getBoundingClientRect();
  const cr = bubble.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const fits = (s: Side) => {
    if (s === 'top') return tr.top - cr.height - SIDE_OFFSET - ARROW_HEIGHT >= COLLISION_PADDING;
    if (s === 'bottom')
      return tr.bottom + cr.height + SIDE_OFFSET + ARROW_HEIGHT <= vh - COLLISION_PADDING;
    if (s === 'left') return tr.left - cr.width - SIDE_OFFSET - ARROW_HEIGHT >= COLLISION_PADDING;
    /* right */ return tr.right + cr.width + SIDE_OFFSET + ARROW_HEIGHT <= vw - COLLISION_PADDING;
  };

  const side: Side = fits(preferredSide)
    ? preferredSide
    : fits(OPPOSITE[preferredSide])
      ? OPPOSITE[preferredSide]
      : preferredSide;

  bubble.setAttribute('data-side', side);

  const centerX = tr.left + tr.width / 2;
  const centerY = tr.top + tr.height / 2;
  let top: number;
  let left: number;

  if (side === 'top') {
    top = tr.top - cr.height - SIDE_OFFSET - ARROW_HEIGHT;
    left = Math.max(
      COLLISION_PADDING,
      Math.min(centerX - cr.width / 2, vw - cr.width - COLLISION_PADDING),
    );
  } else if (side === 'bottom') {
    top = tr.bottom + SIDE_OFFSET + ARROW_HEIGHT;
    left = Math.max(
      COLLISION_PADDING,
      Math.min(centerX - cr.width / 2, vw - cr.width - COLLISION_PADDING),
    );
  } else if (side === 'left') {
    left = tr.left - cr.width - SIDE_OFFSET - ARROW_HEIGHT;
    top = Math.max(
      COLLISION_PADDING,
      Math.min(centerY - cr.height / 2, vh - cr.height - COLLISION_PADDING),
    );
  } else {
    left = tr.right + SIDE_OFFSET + ARROW_HEIGHT;
    top = Math.max(
      COLLISION_PADDING,
      Math.min(centerY - cr.height / 2, vh - cr.height - COLLISION_PADDING),
    );
  }

  bubble.style.top = `${top}px`;
  bubble.style.left = `${left}px`;

  if (side === 'top' || side === 'bottom') {
    const arrowLeft = centerX - left - 12;
    arrowEl.style.left = `${Math.max(8, Math.min(cr.width - 32, arrowLeft))}px`;
    arrowEl.style.right = '';
    arrowEl.style.top = side === 'top' ? '100%' : 'auto';
    arrowEl.style.bottom = side === 'bottom' ? '100%' : 'auto';
    arrowEl.style.transform = side === 'bottom' ? 'rotate(180deg)' : '';
  } else {
    arrowEl.style.top = `${centerY - top - 9}px`;
    arrowEl.style.bottom = '';
    arrowEl.style.left = side === 'right' ? 'auto' : '100%';
    arrowEl.style.right = side === 'right' ? '100%' : 'auto';
    arrowEl.style.transform = side === 'right' ? 'rotate(270deg)' : 'rotate(90deg)';
  }

  bubble.style.visibility = 'visible';
}

/**
 * Initialises tooltip behaviour on a single `.idsk-tooltip__trigger` button.
 * The button must have a `data-content` attribute with the tooltip text.
 *
 * Returns a cleanup function that removes the bubble and all event listeners.
 */
export function initTooltip(trigger: HTMLButtonElement): () => void {
  const content = trigger.dataset.content ?? '';
  const preferredSide = (trigger.dataset.side ?? 'top') as Side;

  if (!content || trigger.dataset.tooltipInit) return () => {};
  trigger.dataset.tooltipInit = 'true';

  const id = `idsk-tooltip-${++idCounter}`;

  const bubble = document.createElement('div');
  bubble.className = 'idsk-tooltip__content';
  bubble.setAttribute('role', 'tooltip');
  bubble.setAttribute('id', id);
  bubble.setAttribute('data-state', 'closed');
  bubble.style.cssText = 'display:none; position:fixed; pointer-events:none;';
  bubble.textContent = content;

  const arrowEl = document.createElement('div');
  arrowEl.style.cssText = 'position:absolute;';
  arrowEl.innerHTML = ARROW_SVG;
  bubble.appendChild(arrowEl);
  trigger.insertAdjacentElement('afterend', bubble);

  if (!trigger.getAttribute('aria-label')) {
    trigger.setAttribute('aria-label', 'Zobraziť informácie');
  }
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', id);
  trigger.setAttribute('aria-describedby', id);

  let open = false;
  let manuallyClosedRef = false;
  let openTimer: ReturnType<typeof setTimeout> | null = null;
  let closeTimer: ReturnType<typeof setTimeout> | null = null;
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  // Matches Radix delayDuration={200}
  const OPEN_DELAY = 200;
  // Grace period: time cursor has to travel from trigger → bubble (or bubble → trigger)
  const CLOSE_DELAY = 150;

  const show = (via: 'hover' | 'interaction' = 'interaction') => {
    if (open) return;
    open = true;
    trigger.setAttribute('aria-expanded', 'true');
    bubble.setAttribute('data-state', via === 'hover' ? 'delayed-open' : 'instant-open');
    bubble.style.pointerEvents = 'auto';
    positionBubble(trigger, bubble, arrowEl, preferredSide);
  };

  const hide = () => {
    if (openTimer !== null) {
      clearTimeout(openTimer);
      openTimer = null;
    }
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    if (!open) return;
    open = false;
    trigger.setAttribute('aria-expanded', 'false');
    bubble.setAttribute('data-state', 'closed');
    bubble.style.display = 'none';
    bubble.style.pointerEvents = 'none';
  };

  // Trigger mouse events — open with 200 ms delay; leave schedules close with grace period
  const onMouseEnterTrigger = () => {
    if (isTouchDevice || manuallyClosedRef) return;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    if (!open) openTimer = setTimeout(() => show('hover'), OPEN_DELAY);
  };

  const onMouseLeaveTrigger = () => {
    if (isTouchDevice) return;
    if (openTimer !== null) {
      clearTimeout(openTimer);
      openTimer = null;
    }
    if (open) closeTimer = setTimeout(hide, CLOSE_DELAY);
  };

  // Bubble mouse events — cancel close when cursor enters; schedule close when it leaves
  const onMouseEnterBubble = () => {
    if (isTouchDevice) return;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  const onMouseLeaveBubble = () => {
    if (isTouchDevice || !open) return;
    closeTimer = setTimeout(hide, CLOSE_DELAY);
  };

  const onFocus = () => {
    if (!manuallyClosedRef) show('interaction');
  };
  const onBlur = () => {
    manuallyClosedRef = false;
    hide();
  };

  const onClick = () => {
    if (open) {
      manuallyClosedRef = true;
      hide();
      setTimeout(() => {
        manuallyClosedRef = false;
      }, 300);
    } else {
      manuallyClosedRef = false;
      show('interaction');
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      manuallyClosedRef = true;
      hide();
      setTimeout(() => {
        manuallyClosedRef = false;
      }, 300);
    }
  };

  const onPointerDown = (e: PointerEvent) => {
    if (!bubble.contains(e.target as Node) && e.target !== trigger) hide();
  };

  trigger.addEventListener('mouseenter', onMouseEnterTrigger);
  trigger.addEventListener('mouseleave', onMouseLeaveTrigger);
  trigger.addEventListener('focus', onFocus);
  trigger.addEventListener('blur', onBlur);
  trigger.addEventListener('click', onClick);
  trigger.addEventListener('keydown', onKeyDown);
  bubble.addEventListener('mouseenter', onMouseEnterBubble);
  bubble.addEventListener('mouseleave', onMouseLeaveBubble);
  document.addEventListener('pointerdown', onPointerDown);

  return () => {
    if (openTimer !== null) clearTimeout(openTimer);
    if (closeTimer !== null) clearTimeout(closeTimer);
    trigger.removeEventListener('mouseenter', onMouseEnterTrigger);
    trigger.removeEventListener('mouseleave', onMouseLeaveTrigger);
    trigger.removeEventListener('focus', onFocus);
    trigger.removeEventListener('blur', onBlur);
    trigger.removeEventListener('click', onClick);
    trigger.removeEventListener('keydown', onKeyDown);
    bubble.removeEventListener('mouseenter', onMouseEnterBubble);
    bubble.removeEventListener('mouseleave', onMouseLeaveBubble);
    document.removeEventListener('pointerdown', onPointerDown);
    bubble.remove();
  };
}

/**
 * Initialises all `.idsk-tooltip__trigger[data-content]` buttons within
 * `root` (defaults to `document.body`).
 *
 * Returns a cleanup function that tears down all initialised tooltips.
 */
export function initAll(root: HTMLElement = document.body): () => void {
  const triggers = Array.from(
    root.querySelectorAll<HTMLButtonElement>('.idsk-tooltip__trigger[data-content]'),
  );
  const cleanups = triggers.map(initTooltip);
  return () => cleanups.forEach((c) => c());
}

// Alias consumed by the auto-discovery registry in src/vanilla.ts
export { initAll as init };
