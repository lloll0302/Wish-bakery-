$(document).ready(function(){
    
    // Scroll Progress Bar
    function updateScrollProgress() {
        var scrollTop = $(window).scrollTop();
        var docHeight = $(document).height() - $(window).height();
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        $('.scroll-progress').css('width', progress + '%');
    }

    $(window).on('scroll', updateScrollProgress);
    $(window).on('resize', updateScrollProgress);
    updateScrollProgress();

    // 漢堡選單
    $('.burger-btn').on('click', function () {
        $(this).toggleClass('active');
        $('.navbar').toggleClass('open');
    });

    // Wish Story 滑入動畫
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // 只觸發一次
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.wish-story-title, .pick-wish-main-title, .baking-hours .contact-title, .contact-info .contact-title').forEach(function(el) {
        observer.observe(el);
    });

    // 點選連結後關閉選單
    $('.navbar a').on('click', function () {
        $('.burger-btn').removeClass('active');
        $('.navbar').removeClass('open');
    });

    $("#s2").fancybox({
    openEffect  : 'elastic', 
    closeEffect : 'elastic',
    helpers : {
        overlay : {
            locked : false 
        },
        title : {
            type : 'float' 
        }
    },
    
    autoCenter : true
    });

    const cards = [...document.querySelectorAll('.stack-card')];
    const dots  = [...document.querySelectorAll('.dot')];
    const N = cards.length;
    let top = 0;

    const rotations = [-2, 3, -1.5, 2.5];
    const offsets   = [[0,0],[6,4],[-5,8],[3,12]];

    function render(){
        cards.forEach((_, i) => {
            const pos = (i - top + N) % N;
            const c   = cards[(top + pos) % N];
            const z   = N - pos;
            const sc  = pos===0 ? 1 : pos===1 ? .97 : pos===2 ? .94 : .91;
            const tx  = offsets[pos][0];
            const ty  = offsets[pos][1];
            const rot = pos===0 ? 0 : rotations[pos];
            c.style.zIndex    = z;
            c.style.transform = `translate(${tx}px,${ty}px) rotate(${rot}deg) scale(${sc})`;
            c.style.opacity   = pos > 2 ? .5 : 1;
        });
        dots.forEach((d, i) => d.classList.toggle('active', i === top));
    }

    function next(){
        cards[top].style.transform = `translate(60px,-30px) rotate(12deg) scale(.9)`;
        cards[top].style.opacity   = '0';
        setTimeout(() => { top = (top + 1) % N; render(); }, 220);
    }

    cards.forEach(c => c.addEventListener('click', next));
    dots.forEach(d => d.addEventListener('click', () => {
        const t = +d.dataset.d;
        const steps = (t - top + N) % N;
        if(steps === 0) return;
        let i = 0;
        const iv = setInterval(() => { if(i++ >= steps) clearInterval(iv); else next(); }, 300);
    }));

    render();

});