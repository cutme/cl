const validate = require("validate.js");

document.addEventListener('DOMContentLoaded',function() {

    window.validateForm = function() {        
    
        const form = document.getElementsByClassName('js-validate');


        const init = function(el) {
        
            console.log('validate start');

            // These are the constraints used to validate the form
        	let constraints = {
        		email: {
        			presence: true,
        			email: true
        		},
        		expertise: {
        			presence: true
        		},
        		firstname: {
                    presence: true,
                    length: {
                        minimum: 3,
                        maximum: 20
                    },
                    format: {
                        // We don't allow anything that a-z and 0-9
                        pattern: "[a-z0-9]+",
                
                        // but we don't care if the username is uppercase or lowercase
                        flags: "i",
                        message: "can only contain a-z and 0-9"
                    }
                },
                lastname: {
                    presence: true,
                    length: {
                        minimum: 3,
                        maximum: 20
                    },
                    format: {
                        // We don't allow anything that a-z and 0-9
                        pattern: "[a-z0-9]+",
                
                        // but we don't care if the username is uppercase or lowercase
                        flags: "i",
                        message: "can only contain a-z and 0-9"
                    }
                },
        		password: {
                    presence: true,
                    length: {
                        minimum: 5
                    }
                },
                "confirm-email": {
                    presence: true,
                    equality: {
                        attribute: "email"
                    }
                },
        		"confirm-password": {
                    presence: true,
                    equality: {
                        attribute: "password"
                    }
                },
        	};

    		el.addEventListener('submit', function(ev) {
    			handleFormSubmit(form);
    			ev.returnValue = false;
    		});
    
    		// Hook up the inputs to validate on the fly
    		let inputs = el.querySelectorAll("input, textarea, select");
    
    		for (let i = 0; i < inputs.length; ++i) {
    			inputs.item(i).addEventListener("change", function(ev) {
    				let errors = validate(form, constraints) || {};
    				showErrorsForInput(this, errors[this.name]);
    			});
    		}

    
    		function handleFormSubmit(form, input) {
    
    			let errors = validate(form, constraints);
    
    			showErrors(form, errors || {});
    
    			if (!errors) {
    				showSuccess(form);
    			} 
    		}
    		
    		// Recusively finds the closest parent that has the specified class
    		function closestParent(child, className) {
    			if (!child || child == document) {
    				return null;
    			}
    
    			if (child.classList.contains(className)) {
    				return child;
    			} else {
    				return closestParent(child.parentNode, className);
    			}
    		}
    
    		// Updates the inputs with the validation errors
    		const showErrors = function(form, errors) {
    			let arr = el.querySelectorAll("input[name]");
    		
    			for (let i = 0; i < arr.length; i ++ ) {
    				let input = arr[i];
    				showErrorsForInput(input, errors && errors[input.name]);
    			}
    		}
    
    
    		// Shows the errors for a specific input
    		const showErrorsForInput = function(input, errors) {
    			
    			// This is the root of the input
    			let formGroup = input.parentNode;
    
    			// First we remove any old messages and resets the classes
    			resetFormGroup(formGroup);
    		
    			// If we have errors
    			if (errors) {
    				// we first mark the group has having errors
    				formGroup.classList.add("has-error");
    		
    			} else {
    			// otherwise we simply mark it as success
    				formGroup.classList.add("has-success");
    			}
    		}
    
    
    		// Remove the success and error classes
    		function resetFormGroup(formGroup) {
    
    			formGroup.classList.remove("has-error");
    		    formGroup.classList.remove("has-success");			
    			
    			/*
    var arr = formGroup.querySelectorAll(".help-block.error");
    		
    			for (var i = 0; i < arr.length; i ++ ) {
    				var el = arr[i];
    
    				el.parentNode.removeChild(el);
    			}
    */
    		}
    
    		function showSuccess(form) {
    
    			sendData();
    		}

        }
        
        
        if (form.length > 0) {
            for (let i = 0; i < form.length; i ++) {
                init(form[i]);
            }
        }
    };


    window.validateForm();

	
}, false);

