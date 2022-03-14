const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('canvas')), ctx = canvas.getContext('2d')

canvas.height = window.innerHeight
canvas.width = document.body.offsetWidth


const render = () => {

    const imageData = /** @type {ImageData} */ (ctx.createImageData(canvas.width, canvas.height))

    for (let i = 0; i < imageData.data.length; i += 4) {
        let x = Math.ceil(i/4 % canvas.width)
        let y = Math.ceil(i/4 / canvas.width)


        let [r,g,b] = getColor(x,y)

        imageData.data[i + 0] = r 
        imageData.data[i + 1] = g
        imageData.data[i + 2] = b
        imageData.data[i + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)

}

let cycle = 0

const getColor = (x, y) => {
    
    let x0 = x - canvas.width / 2
    let y0 = y - canvas.height / 2
    let r = 200
    
    if (x == 0) return [0, 0, 0]


    if (y % 36 || x % 36) return [0,0,0]

    cycle += 0.122702 *  1080 / canvas.width;
    if (cycle > 100) {
        cycle = 0;
    }
    r = ~~(Math.sin(.999799 * cycle) * 127 + 128 + (x0 % r)) 
    g = ~~(Math.cos(.988866 * cycle) * 127 + 128 + (y0 % r)) 
    b = ~~(Math.tan(.999111 * cycle) * 127 + 128)

    return [r,g,b]

}

render()

window.addEventListener('resize', () => location.reload())