// const url = 'http://t.yushu.im/v2/movie';
const url = 'https://douban-api.uieee.com/v2/movie';
const ajax = require('../utils/ajax.js')

function find(type, start, count, city='北京') {
  const URI = url + '/' + type;
  const params = Object.assign({start, count, city})
  return ajax(URI, params).then(res => res.data)
}
function findOne(id) {
  const url_id = url + '/subject/' + id;
  return ajax(url_id).then(res => res.data);
}
module.exports = {
  find,
  findOne
}