// WCAG 2.x relative luminance in sRGB. Composite alpha before linearisation.
export function rgb(hex) {
  if (!/^#[\da-f]{6}$/i.test(hex)) throw new Error('Expected a six-digit sRGB hex colour');
  return hex.slice(1).match(/../g).map(value => parseInt(value, 16));
}
export function luminance(value) {
  const channels = (typeof value === 'string' ? rgb(value) : value).map(channel => {
    const c = channel / 255;
    return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
  });
  return channels.reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
}
export function contrast(foreground, background) {
  const a = luminance(foreground), b = luminance(background);
  return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
}
export function composite(foreground, alpha, background) {
  const fg = typeof foreground === 'string' ? rgb(foreground) : foreground;
  const bg = typeof background === 'string' ? rgb(background) : background;
  return fg.map((channel, index) => alpha * channel + (1 - alpha) * bg[index]);
}
