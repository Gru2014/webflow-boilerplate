// Project section in Homepage
import gsap from "gsap";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
export default function startProjects() {

    gsap.registerPlugin(ScrollTrigger);

    let cachedIndex = 0
    if (window.innerWidth > 768) {
        let wrapEl = $("[carousel='wrap']");
        let itemEl = wrapEl.children().children();
        let sections = gsap.utils.toArray(".section");

        gsap.set(".project", { overflow: "hidden" })

        const welcome_width = document.querySelector(".welcome-div").clientWidth

        let cachedIndex = 0;
        const onUpdate = () => {
            const projectList = document.querySelector(".project-list");
            const degree = Math.abs(gsap.getProperty(projectList, "--3d-carousel-rotate"));
            const currentIndex = Math.round(degree / rotateAmount)

            const btn = document.getElementsByClassName('btn-more')
            const modal = document.getElementsByClassName("background-blur")
            btn[currentIndex].onclick = (e) => {
                const cloned = modal[currentIndex].cloneNode(true);
                cloned.id = 'clonedModal'
                document.querySelector('.blur').style.zIndex = 1
                document.querySelector('.background').style.zIndex = 0
                document.querySelector('.background').style.display = 'block'
                document.querySelector('.blur').style.display = 'block'
                gsap.to(document.body, { overflow: "hidden" });
                cloned.style.display = 'block'
                document.body.appendChild(cloned)
                const exit = cloned.querySelector('.exit')
                exit.style.cursor = "pointer"
                exit.addEventListener('click', function () {
                    document.querySelector('.blur').style.zIndex = -1
                    document.querySelector('.blur').style.display = 'none'

                    document.querySelector('.background').style.zIndex = -1
                    document.querySelector('.background').style.display = 'none'
                    cloned.remove()
                    gsap.to(document.body, { overflow: "auto" });
                })
            }

            document.querySelectorAll('.collection-item-2').forEach(item => item.classList.remove('smaller'))

            if (currentIndex !== cachedIndex) {
                cachedIndex = currentIndex;
                document.querySelectorAll('.card-disabled')[currentIndex].style = "display:none"
            }
            document.querySelectorAll('.btn-more')[currentIndex].style = "opacity:100%"
            document.querySelectorAll('.collection-item')[currentIndex].style = "bottom:0px"
            document.querySelectorAll('.collection-item-2')[currentIndex].classList.add('project-card')
            document.querySelectorAll('.border')[currentIndex].classList.add('img-zoom')
            document.querySelectorAll('.title')[currentIndex].style.fontSize = '41px'

            document.querySelectorAll('.title')[currentIndex].style.fontFamily = '"Fontspring Demo 3 Mundial Tty", sans-serif'
            if (document.querySelectorAll('.collection-item-2')[currentIndex - 1])
                document.querySelectorAll('.collection-item-2')[currentIndex - 1].classList.add('smaller')
            if (document.querySelectorAll('.collection-item-2')[currentIndex + 1])
                document.querySelectorAll('.collection-item-2')[currentIndex + 1].classList.add('smaller')
            itemEl.each((i, item) => {
                if (i !== currentIndex) {
                    document.querySelectorAll('.card-disabled')[i].style = "display:block"
                    document.querySelectorAll('.btn-more')[i].style = "opacity:0%"
                    document.querySelectorAll('.collection-item-2')[i].classList.remove('project-card')
                    document.querySelectorAll('.border')[i].classList.remove('img-zoom')
                    document.querySelectorAll('.title')[i].style.fontFamily = '"Fontspring Demo 2 Mundial Tty", sans-serif'
                    document.querySelectorAll('.title')[i].style.fontSize = '36px'
                    document.querySelectorAll('.collection-item')[i].style = "bottom:-70px"

                }
            })
        }

        let timeline = gsap.timeline({ scrollTrigger: { trigger: ".project", pin: true, scrub: 1, end: "+=8000", onUpdate } });

        timeline.to(sections[0], { x: -welcome_width, duration: 0.4 })
        timeline.to(sections[1], { x: -welcome_width, duration: 0.4 }, "<")
        timeline.to(sections[2], { x: -welcome_width, duration: 0.4 }, "<")
        timeline.to(sections[3], { x: -welcome_width, duration: 0.4 }, "<")

        timeline.to(".about-work", { width: 452, duration: 0.4 })
        timeline.to(sections[0], { x: -welcome_width - 350, duration: 0.4 }, "<")
        timeline.to(sections[1], { x: -welcome_width - 350, duration: 0.4 }, "<")
        timeline.to(sections[2], { x: -welcome_width - 350, duration: 0.4 }, "<")
        timeline.to(sections[3], { x: -welcome_width - 350, duration: 0.4 }, "<")

        timeline.to(sections[0], { x: -welcome_width - 350 - window.innerWidth })
        timeline.to(sections[1], { x: -welcome_width - 350 - window.innerWidth }, "<")
        timeline.to(sections[2], { x: -welcome_width - 350 - window.innerWidth }, "<")
        timeline.to(sections[3], { x: -welcome_width - 350 - window.innerWidth }, "<")

        let rotateAmount = 18;
        let zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 135));
        let negTranslate = `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
        let posTranslate = `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;

        wrapEl.css("--3d-carousel-z", negTranslate);
        wrapEl.css("perspective", posTranslate);

        itemEl.each(function (index) {
            $(this).css("position", "absolute")
            $(this).css("transform", `rotateY(${rotateAmount * index}deg) translateZ(${posTranslate})`);
        });

        timeline.fromTo(wrapEl, {
            "--3d-carousel-rotate": 0
        }, {
            "--3d-carousel-rotate": -(18 * itemEl.length - rotateAmount),
            duration: 1,
            ease: "none",
        });

        timeline.to(sections[0], { x: -welcome_width - 350 - window.innerWidth * 2 })
        timeline.to(sections[1], { x: -welcome_width - 350 - window.innerWidth * 2 }, "<")
        timeline.to(sections[2], { x: -welcome_width - 350 - window.innerWidth * 2 }, "<")
        timeline.to(sections[3], { x: -welcome_width - 350 - window.innerWidth * 2 }, "<")
    }

    else {
        const projects = gsap.utils.toArray(".collection-item-2")

        const panels = gsap.utils.toArray(".section")
        let timeline1 = gsap.timeline({ scrollTrigger: { trigger: ".carousel_container", pin: true, pinSpacing: true, start: "top top", end: `+=${(projects.length) * 450}` } })

        timeline1.to(projects, {
            xPercent: -100 * (projects.length),
            ease: 'none',
            scrollTrigger: {
                trigger: ".collection-list",
                scrub: 1,
                start: "top top",
                duration: 0.3,
                end: "+=3000",
                onUpdate: (self) => {
                    const currentIndex = Math.round((self.progress - 0.04) / (1 / (projects.length - 1)))
                    activeCard(currentIndex)
                }
            }
        })

        const activeCard = (currentIndex) => {
            const btn = document.getElementsByClassName('btn-more')
            const modal = document.getElementsByClassName("background-blur")
            btn[currentIndex].onclick = (e) => {
                const cloned = modal[currentIndex].cloneNode(true);
                cloned.id = 'clonedModal'
                document.querySelector('.blur').style.zIndex = 1
                document.querySelector('.blur').style.display = 'block'
                document.querySelector('.background').style.zIndex = 0
                document.querySelector('.background').style.display = 'block'
                gsap.to(document.body, { overflow: "hidden" });
                cloned.style.display = 'block'
                document.body.appendChild(cloned)
                const exit = cloned.querySelector('.exit')
                exit.style.cursor = "pointer"
                exit.addEventListener('click', function () {
                    document.querySelector('.blur').style.zIndex = -1
                    document.querySelector('.blur').style.display = 'none'
                    document.querySelector('.background').style.zIndex = -1
                    document.querySelector('.background').style.display = 'none'
                    cloned.remove()
                    gsap.to(document.body, { overflow: "auto" });
                })
            }

            document.querySelectorAll('.collection-item-2').forEach(item => item.classList.remove('smaller'))

            if (currentIndex !== cachedIndex) {
                cachedIndex = currentIndex;
                document.querySelectorAll('.card-disabled')[currentIndex].style = "display:none"
            }

            document.querySelectorAll('.btn-more')[currentIndex].style = "opacity:100%"
            document.querySelectorAll('.collection-item')[currentIndex].style = "bottom:0px"
            document.querySelectorAll('.collection-item-2')[currentIndex].classList.add('project-card')
            document.querySelectorAll('.border')[currentIndex].classList.add('img-zoom')
            document.querySelectorAll('.title')[currentIndex].style.fontSize = '39px'
            document.querySelectorAll('.title')[currentIndex].style.fontFamily = '"Fontspring Demo 3 Mundial Tty", sans-serif'
            if (document.querySelectorAll('.collection-item-2')[currentIndex - 1])
                document.querySelectorAll('.collection-item-2')[currentIndex - 1].classList.add('smaller')
            if (document.querySelectorAll('.collection-item-2')[currentIndex + 1])
                document.querySelectorAll('.collection-item-2')[currentIndex + 1].classList.add('smaller')
            projects.forEach((item, i) => {
                if (i !== currentIndex) {
                    document.querySelectorAll('.card-disabled')[i].style = "display:block"
                    document.querySelectorAll('.btn-more')[i].style = "opacity:0%"
                    document.querySelectorAll('.collection-item-2')[i].classList.remove('project-card')
                    document.querySelectorAll('.border')[i].classList.remove('img-zoom')
                    document.querySelector('.background').style.zIndex = -1
                    document.querySelector('.background').style.display = 'none'
                    document.querySelectorAll('.title')[i].style.fontSize = '36px'

                    document.querySelectorAll('.collection-item')[i].style = "bottom:-70px"
                    document.querySelectorAll('.title')[i].style.fontFamily = '"Fontspring Demo 2 Mundial Tty", sans-serif'
                }
            })
        }
    }
}