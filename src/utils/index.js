const handleError = (res, message) => res.status(400).send({ message });

module.exports = {
  handleError,
};