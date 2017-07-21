export function isInside(outer: ClientRect, inner: ClientRect): boolean {
  return (
    outer.left <= inner.left &&
    inner.left <= outer.right &&
    outer.left <= inner.right &&
    inner.right <= outer.right &&
    outer.top <= inner.top &&
    inner.top <= outer.bottom &&
    outer.top <= inner.bottom &&
    inner.bottom <= outer.bottom
  );
}
