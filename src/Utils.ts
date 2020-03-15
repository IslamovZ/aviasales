
export const dateInputMask = (elm : HTMLInputElement) : void  => {
	elm.addEventListener('keypress', function(e : KeyboardEvent) {
	    let len = elm.value.length;
	    if(e.keyCode < 47 || e.keyCode > 57 || len>9) {
	      	e.preventDefault();
	    }

	    if(e.keyCode == 190 && len !== 1 && len !== 3) {
	        e.preventDefault();
	    }
	    if(len === 2) {
      		elm.value += '.';
	    }
	    if(len === 5) {
      		elm.value += '.';
	    }
	});
};



export function throttleWrapper<T extends Function>(func:T, ms:number): () => void {
	let isThrottled = false,
    	savedArgs:any,
    	savedThis:any;

  	function wrapper() {
    	if (isThrottled) {
      		savedArgs = arguments;
      		savedThis = this;
      		return;
    	}

    	func.apply(this, arguments);

    	isThrottled = true;

    	setTimeout(function() {
      		isThrottled = false;
      		if (savedArgs) {
        		wrapper.apply(savedThis, savedArgs);
        		savedArgs = savedThis = null;
      		}
    	}, ms);
  	}
	return wrapper;
}