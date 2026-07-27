/**
 * Galería editable en el administrador: añadir, quitar y reordenar fotos
 * con el selector de medios de WordPress.
 */
(function ($) {
	'use strict';

	$(function () {
		var $lista = $('#maach-galeria-lista');
		var $campo = $('#maach_galeria');
		if (!$lista.length) return;

		function sincronizar() {
			var ids = $lista
				.find('.maach-galeria-item')
				.map(function () {
					return $(this).data('id');
				})
				.get();
			$campo.val(ids.join(','));
		}

		$lista.sortable({ items: '.maach-galeria-item', cursor: 'move', update: sincronizar });

		$('#maach-galeria-add').on('click', function (e) {
			e.preventDefault();
			var marco = wp.media({
				title: 'Fotos del producto',
				button: { text: 'Añadir a la galería' },
				library: { type: 'image' },
				multiple: true
			});

			marco.on('select', function () {
				marco
					.state()
					.get('selection')
					.each(function (adjunto) {
						var datos = adjunto.toJSON();
						if ($lista.find('[data-id="' + datos.id + '"]').length) return;
						var src = datos.sizes && datos.sizes.thumbnail ? datos.sizes.thumbnail.url : datos.url;
						$lista.append(
							'<div class="maach-galeria-item" data-id="' + datos.id + '" ' +
							'style="position:relative;width:96px;height:96px;border:1px solid #ccd0d4;background:#fff">' +
							'<img src="' + src + '" style="width:100%;height:100%;object-fit:contain">' +
							'<button type="button" class="maach-galeria-quitar button-link-delete" ' +
							'style="position:absolute;top:2px;right:4px;background:#fff;line-height:1">&times;</button>' +
							'</div>'
						);
					});
				sincronizar();
			});

			marco.open();
		});

		$lista.on('click', '.maach-galeria-quitar', function (e) {
			e.preventDefault();
			$(this).closest('.maach-galeria-item').remove();
			sincronizar();
		});
	});
})(jQuery);
