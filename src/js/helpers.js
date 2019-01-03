(function(window, document, cutme, undefined) {

	const Helpers = function() {
        return {
            detach: detach,
            //detachAfter: detachAfter,
        	thisindex: thisindex
        };
    };
    
    const thisindex = function(elm) {
        let nodes = elm.parentNode.childNodes, node, i = 0, count = 0;
        while( (node = nodes.item(i++)) && node != elm ) {
            if( node.nodeType == 1 ) count++;            
        }
        return count;
    }


    const detach = function(node, target) {
        let parent = node.parentNode,
            next = node.nextSibling;

        if (!parent) { return; }
        
        parent.removeChild(node);
        target.appendChild(node, next);
    }

   /*
 const detachAfter = function(node, target) {
        var parent = node.parentNode;
        var next = node.nextSibling;
        if (!parent) { return; }
        
        function insertAfter(newNode, referenceNode) {
            referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
        }
        
        parent.removeChild(node);
        insertAfter(node, target);
    }

*/
    

    
    cutme.Helpers = new Helpers();



}(window, document, window.cutme = window.cutme  || {}));
