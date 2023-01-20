function getPaginationPageList (totalPages, page, maxLength) {
  if (maxLength < 5) return []

  function range (start, end) {
    return Array.from(Array(end - start + 1), (_, i) => i + start)
  }

  const sideWith = maxLength < 9 ? 1 : 2
  const leftWidth = (maxLength - sideWith * 2 - 3) >> 1
  const rightWidth = (maxLength - sideWith * 2 - 2) >> 1
  if (totalPages <= maxLength) {
    return range(1, totalPages)
  }

  if (page <= maxLength - sideWith - 1 - rightWidth) {
    return range(1, maxLength - sideWith - 1).concat([0]).concat(range(totalPages - sideWith + 1, totalPages))
  }

  if (page >= totalPages - sideWith - 1 - rightWidth) {
    return range(1, sideWith)
      .concat([0])
      .concat(range(totalPages - sideWith - 1 - rightWidth - leftWidth, totalPages))
  }

  return range(1, sideWith)
    .concat([0])
    .concat(range(page - leftWidth, page + rightWidth))
    .concat([0])
    .concat(range(totalPages - sideWith + 1, totalPages))
}

export { getPaginationPageList }
