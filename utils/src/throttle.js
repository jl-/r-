/**
 * window.on('scroll', throttle(fn, 20, 200, obj, [2]));
 */
function throttle(fn, delay, mustRun, context, ...args) {
  var tid, prevRunAt = new Date();
  mustRun = mustRun || delay;
  function wrapped(...params) {
    clearTimeout(tid);
    var curr = new Date(), lasting = curr - prevRunAt, remaining;
    if (lasting >= mustRun) {
      fn.call(context || this, ...args, ...params);
      prevRunAt = new Date();
    } else {
      remaining = mustRun - lasting;
      tid = setTimeout(function() {
        fn.call(context || this, ...args, ...params);
        prevRunAt = new Date();
      }, delay > remaining ? remaining : delay)
    }
  }

  return wrapped;
}

export default throttle
