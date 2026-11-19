import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {contrast, composite} from './color-contrast.mjs';

const css = readFileSync(new URL('../client/src/brand-tokens.css', import.meta.url), 'utf8');
const tokens = Object.fromEntries([...css.matchAll(/--assist-([\w-]+):\s*(#[\da-f]{6})/gi)].map(match => [match[1],match[2]]));
const check = (foreground: string, background: string, minimum = 4.5) => {
  const ratio = contrast(tokens[foreground], tokens[background]);
  assert.ok(ratio >= minimum, `${foreground}/${background}: ${ratio} < ${minimum}`);
};
test('colour roles retain AA text contrast in both themes and fixed navy panels', () => {
  for (const background of ['canvas','surface','surface-alt','brand-band','report-scene']) {
    for (const foreground of ['ink','muted','link']) check(foreground,background);
  }
  for (const background of ['dark-canvas','dark-surface','dark-tint','dark-report-scene']) {
    for (const foreground of ['dark-ink','dark-muted','dark-action']) check(foreground,background);
  }
  for (const state of ['action','action-hover','action-pressed']) check('white',state);
  check('success','success-surface'); check('error','error-surface'); check('warning','warning-surface');
  check('dark-success','dark-success-surface'); check('dark-error','dark-error-surface');
  check('white','ink'); check('on-navy-muted','ink'); check('muted','disabled');
});
test('controls, focus and essential chart marks retain at least 3:1', () => {
  for (const background of ['canvas','surface','surface-alt','brand-band']) {
    check('control',background,3); check('focus',background,3); check('primary-edge',background,3);
  }
  for (const background of ['dark-canvas','dark-surface','dark-tint','ink']) {
    check('dark-control',background,3); check('dark-action',background,3); check('primary-edge',background,3);
  }
  check('chart-edge','white',3); check('chart-edge','chart-fill',3); check('chart-trend','white',3);
  check('dark-chart-edge','dark-surface',3); check('dark-chart-edge','dark-chart-fill',3);
  check('white','action',3); // Hatching carries the active-bar distinction without hue alone.
});
test('alpha is composited before contrast, including both gradient endpoints', () => {
  assert.equal(contrast('#000000','#FFFFFF'),21);
  assert.deepEqual(composite('#000000',.5,'#FFFFFF'),[127.5,127.5,127.5]);
  for (const endpoint of ['canvas','surface']) {
    const backdrop = composite(tokens.ink,.06,tokens[endpoint]);
    assert.ok(contrast(tokens.muted,backdrop) >= 4.5);
  }
});
