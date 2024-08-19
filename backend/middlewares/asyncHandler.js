/**
 * Creates an async handler function that wraps the given function with error handling.
 *
 * @param {Function} fn - The function to be wrapped.
 * @returns {Function} - The wrapped function.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = asyncHandler
