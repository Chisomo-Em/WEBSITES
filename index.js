  
    
        function toggleMenu() {
            document.getElementById('navMenu').classList.toggle('active');
        }

        function updateThemeIcon() {
            const icon = document.querySelector('#themeToggle i');
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        }

        function toggleTheme() {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
            updateThemeIcon();
        }

        // Set the correct icon on page load (theme itself is already applied by the inline head script)
        updateThemeIcon();

        // Makes a button draggable anywhere on the page. If it's just tapped/clicked
        // (barely moved), its normal action fires. If it's dragged and released on
        // empty space, it springs back to its original spot instead of staying put.
        function makeDraggableToggle(el, onTap) {
            if (!el) return;

            let pointerId = null;
            let dragging = false;
            let moved = false;
            let startX = 0, startY = 0;
            let currentX = 0, currentY = 0;
            const DRAG_THRESHOLD = 6; // px of movement before it counts as a drag, not a tap

            el.addEventListener('pointerdown', (e) => {
                pointerId = e.pointerId;
                dragging = true;
                moved = false;
                startX = e.clientX - currentX;
                startY = e.clientY - currentY;
                el.style.transition = 'none';
                el.setPointerCapture(pointerId);
            });

            el.addEventListener('pointermove', (e) => {
                if (!dragging || e.pointerId !== pointerId) return;
                const dx = e.clientX - startX - currentX;
                const dy = e.clientY - startY - currentY;
                if (!moved && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
                    moved = true;
                    el.classList.add('dragging');
                }
                if (moved) {
                    currentX = e.clientX - startX;
                    currentY = e.clientY - startY;
                    el.style.transform = `translate(${currentX}px, ${currentY}px)`;
                }
            });

            function endDrag(e) {
                if (!dragging || (e && e.pointerId !== pointerId)) return;
                dragging = false;
                el.classList.remove('dragging');

                if (moved) {
                    // Dropped on empty space: spring back to its original position.
                    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    el.style.transform = 'translate(0px, 0px)';
                    currentX = 0;
                    currentY = 0;
                } else {
                    // It was a tap/click, not a drag: run the button's normal action.
                    onTap();
                }
                moved = false;
            }

            el.addEventListener('pointerup', endDrag);
            el.addEventListener('pointercancel', endDrag);
        }

        makeDraggableToggle(document.getElementById('themeToggle'), toggleTheme);
        makeDraggableToggle(document.getElementById('navToggleBtn'), toggleMenu);

        
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });

    
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('navMenu').classList.remove('active');
            });
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    const form = document.getElementById('contactForm');
const status = document.getElementById('status');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Opens the visitor's default email app with a pre-filled message to you
  const subject = encodeURIComponent('New message from ' + name);
  const body = encodeURIComponent(
    message + '\n\nFrom: ' + name + '\nReply to: ' + email
  );

  window.location.href =
    'mailto:chisomombulo34@gmail.com?subject=' + subject + '&body=' + body;

  status.textContent = 'Opening your email app to send this message...';
});