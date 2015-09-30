export const async = function(gen) {

  let it = gen();

  onFulfill();

  function onFulfill(res) {
    let ret;
    try {
      ret = it.next(res);
    }catch(e) {
      reject(e);
    }
    next(ret);
  }

  function onReject(res) {
    let ret;
    try {
      ret = it.throw(err);
    } catch (e) {
      return reject(e);
    }
    next(ret);
  }

  function next(ret) {
    if(!ret.done) return ret.value.then(onFulfill, onReject);;
  }
};