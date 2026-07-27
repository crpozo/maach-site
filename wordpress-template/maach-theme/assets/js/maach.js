/**
 * Interacción del tema MAACH.
 *
 * Replica lo que en el sitio original hacía React: menús desplegables,
 * galería de la ficha, lightbox del portafolio y el formulario previo a
 * cada descarga. Sin dependencias.
 */
(function () {
	'use strict';

	var $ = function (sel, ctx) {
		return (ctx || document).querySelector(sel);
	};
	var $$ = function (sel, ctx) {
		return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
	};

	/* ─── Menús desplegables del header ──────────────────────────────── */
	function menus() {
		var nav = $('.maach-nav');
		if (!nav) return;

		var paneles = {};
		$$('[data-panel]').forEach(function (p) {
			paneles[p.getAttribute('data-panel')] = p;
		});

		function cerrar() {
			Object.keys(paneles).forEach(function (k) {
				paneles[k].classList.remove('is-open');
			});
		}

		$$('.maach-nav-item[data-dropdown]').forEach(function (item) {
			var nombre = item.getAttribute('data-dropdown');
			item.addEventListener('mouseenter', function () {
				cerrar();
				if (paneles[nombre]) paneles[nombre].classList.add('is-open');
			});
		});

		nav.addEventListener('mouseleave', cerrar);
		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') cerrar();
		});
	}

	/* ─── Menú móvil ─────────────────────────────────────────────────── */
	function drawer() {
		var boton = $('.nav-burger');
		var cajon = $('#maach-drawer');
		if (!boton || !cajon) return;
		boton.addEventListener('click', function () {
			var abierto = cajon.classList.toggle('is-open');
			boton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
			document.body.style.overflow = abierto ? 'hidden' : '';
		});
	}

	/* ─── Buscador del header ────────────────────────────────────────── */
	function buscador() {
		var boton = $('.maach-buscar-abrir');
		var caja = $('.maach-buscar');
		if (!boton || !caja) return;
		boton.addEventListener('click', function () {
			var visible = caja.style.display !== 'none';
			caja.style.display = visible ? 'none' : 'block';
			if (!visible) {
				var input = $('input[type="search"]', caja);
				if (input) input.focus();
			}
		});
	}

	/* ─── Galería de la ficha de producto ────────────────────────────── */
	function galeriaProducto() {
		var caja = $('[data-galeria]');
		if (!caja) return;

		var fotos = [];
		try {
			fotos = JSON.parse(caja.getAttribute('data-fotos') || '[]');
		} catch (e) {
			fotos = [];
		}
		if (!fotos.length) return;

		var principal = $('[data-principal]', caja);
		var contador = $('[data-contador]', caja);
		var thumbs = $$('[data-thumb]');
		var indice = 0;

		function pintar(i) {
			indice = (i + fotos.length) % fotos.length;
			if (principal) principal.src = fotos[indice];
			if (contador) {
				contador.textContent =
					String(indice + 1).padStart(2, '0') + ' / ' + String(fotos.length).padStart(2, '0');
			}
			thumbs.forEach(function (t, n) {
				t.classList.toggle('is-active', n === indice);
			});
		}

		var anterior = $('[data-anterior]', caja);
		var siguiente = $('[data-siguiente]', caja);
		if (anterior) anterior.addEventListener('click', function () { pintar(indice - 1); });
		if (siguiente) siguiente.addEventListener('click', function () { pintar(indice + 1); });
		thumbs.forEach(function (t, n) {
			t.addEventListener('click', function () { pintar(n); });
		});

		var abrirZoom = function () { abrirLightbox(fotos, indice); };
		if (principal) principal.addEventListener('click', abrirZoom);
		var zoom = $('[data-zoom]', caja);
		if (zoom) zoom.addEventListener('click', abrirZoom);

		pintar(0);
	}

	/* ─── Lightbox ───────────────────────────────────────────────────── */
	var lbFotos = [];
	var lbIndice = 0;

	function abrirLightbox(fotos, indice) {
		var caja = $('#maach-lightbox');
		if (!caja || !fotos.length) return;
		lbFotos = fotos;
		lbIndice = indice || 0;
		pintarLightbox();
		caja.classList.add('is-open');
		document.body.style.overflow = 'hidden';
	}

	function pintarLightbox() {
		var caja = $('#maach-lightbox');
		if (!caja) return;
		var img = $('img', caja);
		var cuenta = $('.lb-count', caja);
		if (img) {
			img.src = lbFotos[lbIndice];
			img.style.display = '';
		}
		if (cuenta) {
			cuenta.textContent =
				String(lbIndice + 1).padStart(2, '0') + ' / ' + String(lbFotos.length).padStart(2, '0');
		}
	}

	function cerrarLightbox() {
		var caja = $('#maach-lightbox');
		if (!caja) return;
		caja.classList.remove('is-open');
		document.body.style.overflow = '';
	}

	function lightbox() {
		var caja = $('#maach-lightbox');
		if (!caja) return;

		$('.lb-close', caja).addEventListener('click', cerrarLightbox);
		caja.addEventListener('click', function (e) {
			if (e.target === caja) cerrarLightbox();
		});
		$('.lb-prev', caja).addEventListener('click', function (e) {
			e.stopPropagation();
			lbIndice = (lbIndice - 1 + lbFotos.length) % lbFotos.length;
			pintarLightbox();
		});
		$('.lb-next', caja).addEventListener('click', function (e) {
			e.stopPropagation();
			lbIndice = (lbIndice + 1) % lbFotos.length;
			pintarLightbox();
		});
		document.addEventListener('keydown', function (e) {
			if (!caja.classList.contains('is-open')) return;
			if (e.key === 'Escape') cerrarLightbox();
			if (e.key === 'ArrowRight') { lbIndice = (lbIndice + 1) % lbFotos.length; pintarLightbox(); }
			if (e.key === 'ArrowLeft') { lbIndice = (lbIndice - 1 + lbFotos.length) % lbFotos.length; pintarLightbox(); }
		});

		// Mosaico del portafolio.
		var mosaico = $('[data-lightbox]');
		if (mosaico) {
			var fotos = [];
			try {
				fotos = JSON.parse(mosaico.getAttribute('data-fotos') || '[]');
			} catch (e) {
				fotos = [];
			}
			$$('.maach-tile', mosaico).forEach(function (tile) {
				tile.addEventListener('click', function () {
					abrirLightbox(fotos, parseInt(tile.getAttribute('data-indice'), 10) || 0);
				});
			});
		}
	}

	/* ─── Descarga con formulario previo ─────────────────────────────── */
	function descargas() {
		var gate = $('#maach-gate');
		var pendiente = null;

		function bajar(doc) {
			var a = document.createElement('a');
			a.href = doc.url;
			a.download = doc.archivo;
			document.body.appendChild(a);
			a.click();
			a.remove();
		}

		$$('.maach-descargar').forEach(function (boton) {
			boton.addEventListener('click', function () {
				var doc = {
					url: boton.getAttribute('data-url'),
					archivo: boton.getAttribute('data-archivo'),
					producto: boton.getAttribute('data-producto') || ''
				};
				if (!gate) {
					bajar(doc); // El formulario está desactivado en el personalizador.
					return;
				}
				pendiente = doc;
				gate.classList.add('is-open');
				var primero = $('input', gate);
				if (primero) primero.focus();
			});
		});

		// El botón BIM / CAD lleva a la lista de documentos.
		var irDocs = $('[data-ir-documentos]');
		if (irDocs) {
			irDocs.addEventListener('click', function () {
				var destino = $('#documentos');
				if (destino) destino.scrollIntoView({ behavior: 'smooth', block: 'center' });
			});
		}

		if (!gate) return;

		function cerrarGate() {
			gate.classList.remove('is-open');
			pendiente = null;
		}
		$('.gate-cerrar', gate).addEventListener('click', cerrarGate);
		gate.addEventListener('click', function (e) {
			if (e.target === gate) cerrarGate();
		});

		$('form', gate).addEventListener('submit', function (e) {
			e.preventDefault();
			if (!pendiente) return;

			var datos = new FormData();
			datos.append('action', 'maach_descarga');
			datos.append('nonce', window.MAACH ? window.MAACH.nonce : '');
			$$('input', gate).forEach(function (input) {
				datos.append(input.name, input.value);
			});
			datos.append('documento', pendiente.url);
			datos.append('producto', pendiente.producto);

			// El registro es informativo: la descarga no depende de él.
			if (window.MAACH && window.MAACH.ajax) {
				fetch(window.MAACH.ajax, { method: 'POST', body: datos, credentials: 'same-origin' }).catch(function () {});
			}

			bajar(pendiente);
			this.reset();
			cerrarGate();
		});
	}

	document.addEventListener('DOMContentLoaded', function () {
		menus();
		drawer();
		buscador();
		galeriaProducto();
		lightbox();
		descargas();
	});
})();
