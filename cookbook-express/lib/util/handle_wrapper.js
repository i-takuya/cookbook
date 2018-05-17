
const wrapper = (func) => {
  return (req, res) => {
    func(req).then((data) => {
      res.status(200).json(data);
    }).catch((err) => {
      res.status(500).end(err.message);
    });
  };
};

module.exports = wrapper;
