const Slugify = (string) => `${string
  .toString()
  .trim()
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\-]+/g, '')
  .replace(/\-\-+/g, '-')
  .replace(/^-+/, '')
  .replace(/-+$/, '')}-${Date.now()}`;

module.exports = { Slugify };
