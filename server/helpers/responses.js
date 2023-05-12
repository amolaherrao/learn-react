/**
 * @author Amol Aher
 * @param {String} message
 * @param {Arrya|Object} data
 * @param {Number} pages
 * @param {Number} total
 * @returns Object
 */
export const success = (message, data, pages = null, total = null) => {
  const isExists = Boolean(
    data && ((data instanceof Array && data.length > 0) || data instanceof Object)
  );
  if (isExists) {
    if (pages && total) {
      return { message, status: 1, pages, total, data };
    } else {
      return { message, status: 1, data };
    }
  } else if (data) {
    return { message, status: 1, id: parseInt(data) };
  } else {
    return { message, status: 1 };
  }
};

/**
 * @author Amol Aher
 * @param {String} messages
 * @returns Object
 */
export const error = (message) => {
  return { message, status: 0 };
};
