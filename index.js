(() => {
    let dragStart = false
    let div
    let startX, startY = 0
    let currentId

    const snapShot = (x, y, w, h) => {
        console.log('snap shot')
        html2canvas(document.body, {
            onrendered: function(canvas) {
                const newCanvas = document.createElement('canvas')
                newCanvas.width = w
                newCanvas.height = h
                const ctx = newCanvas.getContext('2d')
                const image = new Image()
                image.onload = function(event){
                    ctx.drawImage(this, x, y, w, h, 0, 0, w, h)
                    document.getElementById("result").src = newCanvas.toDataURL()
                }
                image.src = canvas.toDataURL()
            }
        });
    }
    
    const evtMouseDown = (e) => {
        dragStart = true
        document.body.style.userSelect = 'none'
        div = document.createElement('div')
        currentId = `range-${Math.round(Math.random()*1000)}`
        div.id = currentId
        div.style.backgroundColor = '#ddd'
        div.style.border = '1px solid #aaa'
        div.style.opacity = 0.5
        div.style.position = 'absolute'
        div.style.zIndex = 9999
        startX = e.pageX
        startY = e.pageY
        document.body.appendChild(div)
        console.log('mouse down', e)
    }

    const evtMouseMove = (e) => {
        if (dragStart) {
            if (e.pageX > startX && e.pageY > startY) {
                // 右下
                div.style.left = `${startX}px`
                div.style.top = `${startY}px`
                div.style.width = `${e.pageX - startX}px`
                div.style.height = `${e.pageY - startY}px`
            } else if (e.pageX > startX && e.pageY < startY) {
                // 右上
                div.style.left = `${startX}px`
                div.style.top = `${startY - (startY - e.pageY)}px`
                div.style.width = `${e.pageX - startX}px`
                div.style.height = `${startY - e.pageY}px`
            } else if (e.pageX < startX && e.pageY > startY) {
                // 左下
                div.style.left = `${startX - (startX - e.pageX)}px`
                div.style.top = `${startY}px`
                div.style.width = `${startX - e.pageX}px`
                div.style.height = `${e.pageY - startY}px`
            } else {
                // 左上
                div.style.left = `${startX - (startX - e.pageX)}px`
                div.style.top = `${startY - (startY - e.pageY)}px`
                div.style.width = `${startX - e.pageX}px`
                div.style.height = `${startY - e.pageY}px`
            }
            console.log('mouse move', e)
        }
    }

    const evtMouseUp = (e) => {
        dragStart = false
        const rect = document.getElementById(currentId).getBoundingClientRect()
        snapShot(rect.x, rect.y, rect.width, rect.height)
        console.log('mouse up', e)
    }

    const addEvent = () => {
        document.addEventListener('mousedown', evtMouseDown)
        document.addEventListener('mousemove', evtMouseMove)
        document.addEventListener('mouseup', evtMouseUp)
    }

    addEvent()
    
})()