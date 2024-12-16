let mobileHamburger = document.getElementById("toggleMobileNavbar");
let mobileMenu = document.getElementById("mobileDivAppear");
let getStarted = document.getElementById("getStarted");


console.log(mobileHamburger)
mobileHamburger.addEventListener("click",() => {
    console.log("clicked")
    if(mobileMenu.classList.contains("hidden")){
        mobileMenu.classList.remove("hidden");
    }else{
        mobileMenu.classList.add("hidden");
    }
})

const animateFadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        console.log(entry.target.id)
        if(entry.isIntersecting){
            entry.target.classList.add("fade-in")
        }
    })
});

document.querySelectorAll('.animate-fade-in').forEach(element => {
    animateFadeInObserver.observe(element);
});

const slideInRightAnimateObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("slide-in-right")
        }
    })
})

document.querySelectorAll(".animate-slide-in-right").forEach(element => {
    slideInRightAnimateObserver.observe(element)
})

const slideInLeftAnimateObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("slide-in-left")
        }
    })
})

document.querySelectorAll(".animate-slide-in-left").forEach(element => {
    slideInLeftAnimateObserver.observe(element)
})


if(getStarted != null){
    getStarted.addEventListener('click',() => {
        let dropdownNavbarLoginDiv = document.getElementById("dropdownNavbarLinkFinancialTools");
        if(window.innerWidth < 768){
            let toggleMobileNavbar = document.getElementById("toggleMobileNavbar");
            toggleMobileNavbar.click();
            dropdownNavbarLoginDiv.click();
        }else{
            dropdownNavbarLoginDiv.click();
        }
    })
}