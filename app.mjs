// Interfaz del generador. Sin analítica, sin cookies, sin peticiones de red:
// el QR se dibuja aquí mismo con uqr (MIT), incluido en este repositorio.
import { renderSVG } from './uqr.mjs'
import { parseReviewInput } from './review-link.mjs'

const $ = (id) => document.getElementById(id)
const form = $('form'), input = $('entrada'), error = $('error'), result = $('result')
const qr = $('qr'), out = $('url'), copyBtn = $('copiar'), test = $('probar')
let current = null

function download(href, name) {
	const a = document.createElement('a')
	a.href = href
	a.download = name
	a.click()
}

async function svgToPng(svg) {
	const img = new Image()
	img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
	await img.decode()
	const canvas = document.createElement('canvas')
	canvas.width = canvas.height = 1024
	const ctx = canvas.getContext('2d')
	ctx.imageSmoothingEnabled = false
	ctx.drawImage(img, 0, 0, 1024, 1024)
	return canvas.toDataURL('image/png')
}

form.addEventListener('submit', (e) => {
	e.preventDefault()
	const r = parseReviewInput(input.value)
	copyBtn.textContent = 'Copiar enlace'
	if (!r.ok) {
		current = null
		result.hidden = true
		error.textContent = r.error
		input.setAttribute('aria-invalid', 'true')
		return
	}
	error.textContent = ''
	input.removeAttribute('aria-invalid')
	const svg = renderSVG(r.url, { ecc: 'M', border: 2 })
	current = { url: r.url, svg }
	qr.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
	out.textContent = r.url
	test.href = r.url
	result.hidden = false
})

copyBtn.addEventListener('click', async () => {
	if (!current) return
	try {
		await navigator.clipboard.writeText(current.url)
		copyBtn.textContent = 'Copiado'
	} catch {
		copyBtn.textContent = 'No se pudo copiar'
	}
})

$('png').addEventListener('click', async () => {
	if (current) download(await svgToPng(current.svg), 'qr-resenas-google.png')
})

$('svg').addEventListener('click', () => {
	if (!current) return
	const href = URL.createObjectURL(new Blob([current.svg], { type: 'image/svg+xml' }))
	download(href, 'qr-resenas-google.svg')
	setTimeout(() => URL.revokeObjectURL(href), 1000)
})
