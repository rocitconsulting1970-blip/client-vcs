/* Nav menu init shim — replaces Elementor Pro's lazy-loaded nav-menu handler,
   which is unavailable on this static mirror. Uses the bundled SmartMenus
   library exactly as the original handler did. */
(function () {
	function init() {
		if (!window.jQuery || !jQuery.fn.smartmenus) return;
		var $ = jQuery;

		// Same chevron-down icon the widget's settings specify (fa-solid)
		var CHEVRON = '<svg class="e-font-icon-svg e-fas-caret-down" viewBox="0 0 320 512" xmlns="http://www.w3.org/2000/svg" style="width:.6em;height:.6em;margin-left:.3em;fill:currentColor;vertical-align:middle"><path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path></svg>';

		// Desktop horizontal menu: hover dropdowns
		$('.elementor-nav-menu--main .elementor-nav-menu').each(function () {
			var $menu = $(this);
			if ($menu.data('smartmenus')) return;
			$menu.smartmenus({
				subIndicatorsText: CHEVRON,
				subIndicatorsPos: 'append',
				subMenusMaxWidth: '25em'
			});
		});

		// Mobile: hamburger toggle shows/hides the dropdown nav
		$('.elementor-menu-toggle').each(function () {
			var $toggle = $(this);
			if ($toggle.data('navShimBound')) return;
			$toggle.data('navShimBound', true);
			var $dropdown = $toggle.closest('.elementor-widget-container')
				.find('nav.elementor-nav-menu--dropdown');
			$toggle.on('click', function () {
				var active = !$toggle.hasClass('elementor-active');
				$toggle.toggleClass('elementor-active', active)
					.attr('aria-expanded', active ? 'true' : 'false');
				$dropdown.attr('aria-hidden', active ? 'false' : 'true')
					.toggle(active);
				if (active) {
					$dropdown.find('.elementor-nav-menu').each(function () {
						var $m = $(this);
						if (!$m.data('smartmenus')) {
							$m.smartmenus({ subIndicatorsText: '', subIndicatorsPos: 'append' });
						}
					});
				}
			});
		});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', function () { setTimeout(init, 0); });
	} else {
		setTimeout(init, 0);
	}
	// jQuery/smartmenus load in the footer; retry briefly in case of ordering surprises
	var tries = 0;
	var t = setInterval(function () {
		if ((window.jQuery && jQuery.fn.smartmenus) || ++tries > 20) {
			clearInterval(t);
			init();
		}
	}, 250);
})();
