module.exports.formatFilters = (query) => {
  const filter = {};

  if (query.segment) {
    filter.segment = query.segment;
  }

  if (query.company) {
    filter.company = query.company;
  }

  if (query.state) {
    filter.state = query.state;
  }

  if (query.city) {
    filter.city = query.city;
  }

  if (query.neighborhood) {
    filter.neighborhood = query.neighborhood;
  }

  return filter;
};
