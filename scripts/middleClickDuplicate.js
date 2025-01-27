const start = () => {
    document.addEventListener('mousedown', function(event) {
        if (event.button === 1) { 
            var doubleClickEvent = new MouseEvent('dblclick', {
                bubbles: true,
                cancelable: true,
                view: window
            })
            event.target.dispatchEvent(doubleClickEvent)
        }
    })
}

export {start}