export default {//节流函数
  debounce(fn, delay = 500) {   //默认500毫秒
    let timer = null
    return function() {
      let args = arguments;
      if(timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(this, args);   // this 指向vue
      }, delay);
    };
  }
}
