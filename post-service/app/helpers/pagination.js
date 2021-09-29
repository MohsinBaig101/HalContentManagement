module.exports = (data, page, itemsPerPage) => {
    const items = data.rows || [];
    page = page || 1;
    const totalItems = data.count || 0;
    itemsPerPage = itemsPerPage || 10;

    return {
        items: items,
        currentPage: page,
        hasNextPage: itemsPerPage * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / itemsPerPage),
        totalItems: totalItems
    };
};