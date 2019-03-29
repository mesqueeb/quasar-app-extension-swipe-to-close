
/**
 * checks if an element is visible in the viewport or not
 *
 * @export
 * @param {*} el a DOM element
 * @returns {boolean}
 */
export function isElementInViewport (el) {
  const rect = el.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}
