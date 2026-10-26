// Generador de enlace de reseñas de Google: de un Place ID o de un enlace de
// Google a la URL del formulario de reseñas. Todo en el navegador, sin red.
// La URL de salida se construye siempre con piezas validadas (Place ID o id de
// g.page); nunca se reutiliza tal cual lo que pega el usuario.
// Misma lógica que https://www.ramilink.es/herramientas/enlace-resenas-google

const PLACE_ID = /^[A-Za-z0-9_-]{16,300}$/
const GPAGE_ID = /^[A-Za-z0-9_-]{6,200}$/

export const writeReviewUrl = (placeId) => `https://search.google.com/local/writereview?placeid=${placeId}`

const EMPTY = 'Pega tu Place ID o el enlace para pedir reseñas de tu ficha de Google.'
const NOT_REVIEW = 'Ese enlace abre tu ficha, no el formulario de reseñas. En tu Perfil de Empresa, pulsa «Pedir reseñas» y copia ese enlace, o usa tu Place ID.'
const INVALID = 'No reconocemos ese formato. Pega un Place ID (suele empezar por «ChIJ») o el enlace de «Pedir reseñas» de Google.'

function fromUrl(u) {
	const host = u.hostname.toLowerCase().replace(/^www\./, '')
	const placeParam = u.searchParams.get('placeid') ?? u.searchParams.get('query_place_id') ?? u.searchParams.get('place_id')
	if (placeParam && PLACE_ID.test(placeParam) && ['search.google.com', 'google.com', 'google.es', 'maps.google.com'].includes(host)) {
		return { ok: true, url: writeReviewUrl(placeParam), via: 'enlace_google' }
	}
	if (host === 'g.page') {
		// https://g.page/r/<id>/review: el enlace de «Pedir reseñas»
		const m = /^\/r\/([^/]+)\/review\/?$/.exec(u.pathname)
		if (m && GPAGE_ID.test(m[1])) return { ok: true, url: `https://g.page/r/${m[1]}/review`, via: 'enlace_google' }
		return { ok: false, error: NOT_REVIEW }
	}
	if (host === 'maps.app.goo.gl' || host === 'goo.gl' || host.startsWith('google.') || host === 'maps.google.com') return { ok: false, error: NOT_REVIEW }
	return { ok: false, error: INVALID }
}

/** @returns {{ok:true,url:string,via:string}|{ok:false,error:string}} */
export function parseReviewInput(raw) {
	const v = String(raw ?? '').trim()
	if (!v) return { ok: false, error: EMPTY }
	if (v.length > 2000) return { ok: false, error: INVALID }
	if (PLACE_ID.test(v) && !/^(https?|g\.page)/i.test(v)) return { ok: true, url: writeReviewUrl(v), via: 'place_id' }
	let url
	try {
		url = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`)
	} catch {
		return { ok: false, error: INVALID }
	}
	if (url.protocol !== 'https:' && url.protocol !== 'http:') return { ok: false, error: INVALID }
	return fromUrl(url)
}
