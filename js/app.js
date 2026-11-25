/* ==========================================================
   Faculty Perspectives on Academic Integrity – App Logic
   Requires: jQuery 3.x, Bootstrap 5 bundle, js/data.js
   ========================================================== */
(function ($) {
  'use strict';

  const TRUNCATE_AT = 220;   // characters before "Read more"
  const NAV_OFFSET  = 72;    // fixed app-bar height + spacing
  const data = window.SurveyData;

  // Respect users who prefer reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $.fx.off = true;
  }

  /* ---------------- Utilities ---------------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function formatText(str) {
    return escapeHtml(str).replace(/\n/g, '<br>');
  }

  function truncate(str) {
    if (str.length <= TRUNCATE_AT) return str;
    const cut = str.slice(0, TRUNCATE_AT);
    const lastSpace = cut.lastIndexOf(' ');
    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + '…';
  }

  function highlight(str, query) {
    if (!query) return formatText(str);
    const re = new RegExp('(' + escapeRegex(query) + ')', 'gi');
    return str.split(re).map(function (part, i) {
      return i % 2 ? '<mark>' + escapeHtml(part) + '</mark>' : escapeHtml(part);
    }).join('').replace(/\n/g, '<br>');
  }

  function debounce(fn, wait) {
    let timer;
    return function () {
      const ctx = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  function icon(name, extra) {
    return '<span class="material-icons-round ' + (extra || '') + '" aria-hidden="true">' + name + '</span>';
  }

  function isInView($el, offset) {
    offset = offset || 60;
    const top = $el.offset().top;
    const winBottom = $(window).scrollTop() + $(window).height();
    return top < winBottom - offset;
  }

  /* ---------------- Overview stats ---------------- */
  function renderStats() {
    const $grid = $('#statGrid');
    $.each(data.stats, function (_, s) {
      const decimals = s.decimals || 0;
      $grid.append(
        '<div class="col-sm-6 col-lg-4">' +
          '<div class="md-card stat-card reveal">' +
            '<div class="stat-icon">' + icon(s.icon) + '</div>' +
            '<div class="stat-value" data-target="' + s.value + '" data-decimals="' + decimals + '" data-suffix="' + escapeHtml(s.suffix) + '">' +
              (0).toFixed(decimals) + escapeHtml(s.suffix) +
            '</div>' +
            '<div class="stat-label">' + escapeHtml(s.label) + '</div>' +
          '</div>' +
        '</div>'
      );
    });
  }

  function animateCounter($el) {
    const target   = parseFloat($el.attr('data-target'));
    const decimals = parseInt($el.attr('data-decimals'), 10) || 0;
    const suffix   = $el.attr('data-suffix') || '';
    $({ n: 0 }).animate({ n: target }, {
      duration: 1400,
      easing: 'swing',
      step: function (now) { $el.text(now.toFixed(decimals) + suffix); },
      complete: function () { $el.text(target.toFixed(decimals) + suffix); }
    });
  }

  /* ---------------- Reasons bar chart ---------------- */
  function renderReasons(order) {
    const items = data.reasons.slice();
    if (order === 'desc') items.sort(function (a, b) { return b.value - a.value; });
    const max = Math.max.apply(null, items.map(function (r) { return r.value; }));
    const $chart = $('#reasonsChart').empty();

    items.forEach(function (r) {
      $chart.append(
        '<div class="hbar-row' + (r.value === max ? ' is-top' : '') + '">' +
          '<div class="hbar-label">' + escapeHtml(r.label) + '</div>' +
          '<div class="hbar-track" role="progressbar" aria-label="' + escapeHtml(r.label) + '" ' +
               'aria-valuenow="' + r.value + '" aria-valuemin="0" aria-valuemax="100">' +
            '<div class="hbar-fill" data-value="' + r.value + '"></div>' +
          '</div>' +
          '<div class="hbar-value">' + r.value + '%</div>' +
        '</div>'
      );
    });
  }

  function animateBars($scope) {
    $scope.find('[data-value]').each(function (i) {
      const $bar = $(this);
      $bar.stop(true).css('width', 0)
          .delay(i * 80)
          .animate({ width: $bar.attr('data-value') + '%' }, 900);
    });
  }

  /* ---------------- Donut charts ---------------- */
  function animateDonut($el) {
    const target = parseFloat($el.attr('data-percent'));
    const $label = $el.find('.donut-label');
    $({ p: 0 }).animate({ p: target }, {
      duration: 1200,
      step: function (now) {
        $el[0].style.setProperty('--p', now);
        $label.text(Math.round(now) + '%');
      },
      complete: function () {
        $el[0].style.setProperty('--p', target);
        $label.text(target + '%');
      }
    });
  }

  /* ---------------- Scroll-triggered animations ---------------- */
  function runAnimation($el) {
    switch ($el.attr('data-animate')) {
      case 'counters': $el.find('.stat-value').each(function () { animateCounter($(this)); }); break;
      case 'bars':     animateBars($el); break;
      case 'donut':    animateDonut($el); break;
    }
  }

  function checkReveal() {
    $('.reveal:not(.visible)').each(function () {
      if (isInView($(this))) $(this).addClass('visible');
    });
    $('[data-animate]').each(function () {
      const $el = $(this);
      if (!$el.data('done') && isInView($el)) {
        $el.data('done', true);
        runAnimation($el);
      }
    });
  }

  /* ---------------- Comment explorer ---------------- */
  function renderCommentText($card, query) {
    const full     = $card.data('full');
    const isLong   = full.length > TRUNCATE_AT;
    const expanded = $card.hasClass('expanded');
    const $text    = $card.find('.comment-text');
    const $more    = $card.find('.read-more');

    if (query) {                       // search mode: full text with highlights
      $text.html(highlight(full, query));
      $more.addClass('d-none');
      return;
    }

    $text.html(isLong && !expanded ? formatText(truncate(full)) : formatText(full));
    $more.toggleClass('d-none', !isLong)
         .html(expanded ? 'Show less ' + icon('expand_less', 'fs-6') : 'Read more ' + icon('expand_more', 'fs-6'))
         .attr('aria-expanded', expanded);
  }

  function buildExplorer($ex) {
    const setKey = $ex.attr('data-set');
    const set = data.comments[setKey];
    if (!set) return;

    const total = set.themes.reduce(function (n, t) { return n + t.comments.length; }, 0);

    const toolbar =
      '<div class="explorer-toolbar">' +
        '<div class="explorer-meta">' + icon('forum') + ' <strong>' + total + '</strong> faculty comments in <strong>' +
          set.themes.length + '</strong> themes</div>' +
        '<div class="d-flex flex-wrap gap-2 align-items-center">' +
          '<div class="input-group input-group-sm explorer-search-group">' +
            '<span class="input-group-text">' + icon('search', 'fs-6') + '</span>' +
            '<input type="search" class="form-control explorer-search" placeholder="Search comments…" aria-label="Search comments">' +
          '</div>' +
          '<div class="btn-group btn-group-sm" role="group">' +
            '<button type="button" class="btn btn-outline-dark btn-expand-all">' + icon('unfold_more', 'fs-6') + ' Expand all</button>' +
            '<button type="button" class="btn btn-outline-dark btn-collapse-all">' + icon('unfold_less', 'fs-6') + ' Collapse all</button>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="result-summary small text-muted mb-2"></div>';

    const $groups = $('<div class="theme-groups"></div>');

    set.themes.forEach(function (theme, ti) {
      const bodyId = setKey + '-theme-' + ti;
      const $group = $(
        '<div class="theme-group">' +
          '<button type="button" class="theme-header" aria-expanded="false" aria-controls="' + bodyId + '">' +
            '<span class="theme-icon">' + icon(theme.icon) + '</span>' +
            '<span class="theme-text">' +
              '<span class="theme-title">' + escapeHtml(theme.title) + '</span>' +
              '<span class="theme-summary">' + escapeHtml(theme.summary) + '</span>' +
            '</span>' +
            '<span class="badge rounded-pill theme-count">' + theme.comments.length + '</span>' +
            icon('expand_more', 'chevron') +
          '</button>' +
          '<div class="theme-body" id="' + bodyId + '" role="region"></div>' +
        '</div>'
      );

      const $body = $group.find('.theme-body');
      theme.comments.forEach(function (text) {
        const $card = $(
          '<div class="comment-card">' +
            icon('format_quote', 'quote-icon') +
            '<p class="comment-text"></p>' +
            '<a href="#" class="read-more d-none" role="button"></a>' +
          '</div>'
        );
        $card.data('full', text);
        renderCommentText($card, '');
        $body.append($card);
      });

      $groups.append($group);
    });

    $ex.append(toolbar, $groups,
      '<div class="no-results d-none">' + icon('search_off') + ' No comments match your search.</div>');
  }

  function toggleGroup($group, open) {
    $group.toggleClass('open', open);
    $group.find('.theme-header').attr('aria-expanded', open);
    const $body = $group.find('.theme-body').stop(true, true);
    open ? $body.slideDown(250) : $body.slideUp(250);
  }

  function filterExplorer($ex, rawQuery) {
    const query = $.trim(rawQuery);
    const q = query.toLowerCase();
    let totalMatches = 0;

    $ex.find('.theme-group').each(function () {
      const $group = $(this);
      const $cards = $group.find('.comment-card');
      let matches = 0;

      $cards.each(function () {
        const $card = $(this);
        const isMatch = !q || $card.data('full').toLowerCase().indexOf(q) !== -1;
        $card.toggle(isMatch);
        if (isMatch) {
          matches++;
          renderCommentText($card, query);
        }
      });

      totalMatches += matches;
      $group.find('.theme-count').text(q ? matches + ' / ' + $cards.length : $cards.length);
      $group.toggle(matches > 0);
      if (q) toggleGroup($group, matches > 0);
    });

    $ex.find('.no-results').toggleClass('d-none', totalMatches > 0);
    $ex.find('.result-summary').text(
      q ? totalMatches + ' matching comment' + (totalMatches === 1 ? '' : 's') + ' for "' + query + '"' : ''
    );
  }

  function bindExplorerEvents() {
    $(document)
      .on('click', '.theme-header', function () {
        const $group = $(this).closest('.theme-group');
        toggleGroup($group, !$group.hasClass('open'));
      })
      .on('click', '.read-more', function (e) {
        e.preventDefault();
        const $card = $(this).closest('.comment-card');
        $card.toggleClass('expanded');
        renderCommentText($card, '');
      })
      .on('click', '.btn-expand-all', function () {
        $(this).closest('.comment-explorer').find('.theme-group:visible').each(function () {
          toggleGroup($(this), true);
        });
      })
      .on('click', '.btn-collapse-all', function () {
        $(this).closest('.comment-explorer').find('.theme-group').each(function () {
          toggleGroup($(this), false);
        });
      })
      .on('input', '.explorer-search', debounce(function () {
        filterExplorer($(this).closest('.comment-explorer'), $(this).val());
      }, 150));
  }

  /* ---------------- Navigation ---------------- */
  function bindNavigation() {
    // Smooth scrolling for in-page links
    $(document).on('click', 'a[href^="#"]:not(.read-more)', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash.length < 2) return;
      const $target = $(hash);
      if (!$target.length) return;

      e.preventDefault();
      $('html, body').stop().animate({ scrollTop: Math.max($target.offset().top - NAV_OFFSET, 0) }, 600);

      // Close mobile menu after selection
      const navEl = document.getElementById('navLinks');
      if (navEl.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(navEl).hide();
      }
    });

    // Back to top
    $('#backToTop').on('click', function () {
      $('html, body').stop().animate({ scrollTop: 0 }, 600);
    });
  }

  let fabVisible = false;
  function updateScrollUI() {
    const scrollTop = $(window).scrollTop();

    // Active nav link
    const pos = scrollTop + NAV_OFFSET + 40;
    let current = '';
    $('main section[id]').each(function () {
      if ($(this).offset().top <= pos) current = this.id;
    });
    $('#navLinks .nav-link').removeClass('active')
      .filter('[href="#' + current + '"]').addClass('active');

    // Floating back-to-top button
    const shouldShow = scrollTop > 600;
    if (shouldShow !== fabVisible) {
      fabVisible = shouldShow;
      $('#backToTop').stop(true, true)[shouldShow ? 'fadeIn' : 'fadeOut'](200);
    }
  }

  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      checkReveal();
      updateScrollUI();
      ticking = false;
    });
  }

  /* ---------------- Init ---------------- */
  $(function () {
    if (!data) {
      console.error('SurveyData not found. Make sure js/data.js is loaded before js/app.js.');
      return;
    }

    renderStats();
    renderReasons('desc');
    $('.comment-explorer').each(function () { buildExplorer($(this)); });

    bindExplorerEvents();
    bindNavigation();

    // Sort toggle for reasons chart
    $('#reasonsSort').on('click', 'button', function () {
      const $btn = $(this);
      if ($btn.hasClass('active')) return;
      $btn.addClass('active').siblings().removeClass('active');
      renderReasons($btn.attr('data-order'));
      $('#reasonsChart').data('done', true);
      animateBars($('#reasonsChart'));
    });

    $('#year').text(new Date().getFullYear());

    checkReveal();
    updateScrollUI();
    $(window).on('scroll resize', onScroll);
  });

})(jQuery);
