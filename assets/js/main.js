/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					$('<div class="close">Close</div>')
						.appendTo($this)
						.on('click', function() {
							location.hash = '';
						});

				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

			// Addition 
			const words = [
				"Business Consultant",
				"Scaled Ops",
				"Stakeholder Management",
				"Business Analyst",
				"Tech Consultant",
				"Automation Specialist",
				"API Integration Expert",
				"AI Agent Systems Architect"
			];
			
			let wordIndex = 0;
			let letterIndex = 0;
			let deleting = false;
			
			function typeEffect() {
				const target = document.getElementById("typing");
			
				const current = words[wordIndex];
			
				if (!deleting) {
					target.textContent = current.substring(0, letterIndex++);
				} else {
					target.textContent = current.substring(0, letterIndex--);
				}
			
				if (!deleting && letterIndex === current.length + 1) {
					deleting = true;
					setTimeout(typeEffect, 1500);
					return;
				}
			
				if (deleting && letterIndex === 0) {
					deleting = false;
					wordIndex = (wordIndex + 1) % words.length;
				}
			
				setTimeout(typeEffect, deleting ? 50 : 100);
			}
			
			typeEffect();

			const toggle = document.getElementById("themeToggle");
			const toggleIcon = toggle.querySelector(".icon");

			function applyTheme(isLight) {
				document.body.classList.toggle("light-theme", isLight);
				toggleIcon.classList.toggle("fa-moon", !isLight);
				toggleIcon.classList.toggle("fa-sun", isLight);
			}

			applyTheme(localStorage.getItem("theme") === "light");

			toggle.onclick = () => {
				const isLight = !document.body.classList.contains("light-theme");
				applyTheme(isLight);
				localStorage.setItem("theme", isLight ? "light" : "dark");
			};

			const mainNav = document.getElementById("mainNav");
			const navToggle = document.getElementById("navToggle");
			const navToggleIcon = navToggle.querySelector(".icon");

			function setNavOpen(isOpen) {
				mainNav.classList.toggle("nav-open", isOpen);
				navToggle.setAttribute("aria-expanded", isOpen);
				navToggleIcon.classList.toggle("fa-bars", !isOpen);
				navToggleIcon.classList.toggle("fa-times", isOpen);
			}

			navToggle.onclick = () => setNavOpen(!mainNav.classList.contains("nav-open"));

			mainNav.querySelectorAll("ul a").forEach(link => {
				link.addEventListener("click", () => setNavOpen(false));
			});

document.querySelectorAll(".tech-card, .experience-card, .highlight").forEach(card=>{

	card.addEventListener("mousemove",(e)=>{

	const rect=card.getBoundingClientRect();

	const x=e.clientX-rect.left;

	const y=e.clientY-rect.top;

	card.style.transform=

	`translateY(-6px) rotateX(${-(y-rect.height/2)/15}deg) rotateY(${(x-rect.width/2)/15}deg)`;

	});

	card.addEventListener("mouseleave",()=>{

	card.style.transform="";

	});

	});

			document.querySelectorAll(
				".tech-card, .experience-card, .highlight, .career-summary > div, .testimonial-card"
			).forEach(el => el.classList.add("reveal"));

			new MutationObserver(mutations => {
				mutations.forEach(mutation => {
					const article = mutation.target;
					if (!article.classList.contains("active") || article.dataset.revealed) return;
					article.dataset.revealed = "true";
					article.querySelectorAll(".reveal").forEach((el, i) => {
						setTimeout(() => el.classList.add("in-view"), i * 80);
					});
				});
			}).observe(document.getElementById("main"), {
				attributes: true,
				attributeFilter: ["class"],
				subtree: true
			});

			const testimonialCards = Array.from(document.querySelectorAll(".testimonial-card"));
			const testimonialDots = Array.from(document.querySelectorAll(".carousel-dots .dot"));
			let currentTestimonial = 0;

			function showTestimonial(index) {
				currentTestimonial = (index + testimonialCards.length) % testimonialCards.length;
				testimonialCards.forEach((card, i) => card.classList.toggle("current", i === currentTestimonial));
				testimonialDots.forEach((dot, i) => dot.classList.toggle("active", i === currentTestimonial));
			}

			const prevArrow = document.querySelector(".carousel-arrow.prev");
			const nextArrow = document.querySelector(".carousel-arrow.next");
			if (prevArrow) prevArrow.addEventListener("click", () => showTestimonial(currentTestimonial - 1));
			if (nextArrow) nextArrow.addEventListener("click", () => showTestimonial(currentTestimonial + 1));
			testimonialDots.forEach((dot, i) => dot.addEventListener("click", () => showTestimonial(i)));

			if (testimonialCards.length) showTestimonial(0);

	const sections=document.querySelectorAll("article");

const nav=document.querySelectorAll("nav a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

if(pageYOffset>=section.offsetTop-150){

current=section.id;

}

});

nav.forEach(link=>{

link.classList.remove("active");

if(link.href.includes(current)){

link.classList.add("active");

}

});

});

function toggleProject(button){

	const details=button.nextElementSibling;
	
	details.style.display=
	
	details.style.display==="block"
	
	?
	
	"none"
	
	:
	
	"block";
	
	}
	const counters = document.querySelectorAll(".counter");

counters.forEach(counter=>{

    const update=()=>{

        const target=+counter.dataset.target;
        const current=+counter.innerText;

        const increment=target/150;

        if(current<target){

            counter.innerText=Math.ceil(current+increment);

            setTimeout(update,20);

        }else{

            counter.innerText=target;

        }

    }

    update();

});


})(jQuery);