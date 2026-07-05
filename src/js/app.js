const btn = document.getElementById("toggleMenu");
const moreMenu = document.getElementById("moreMenu");

btn.classList.toggle("active");
btn.addEventListener("click", () => {

    moreMenu.classList.toggle("show");

    if (moreMenu.classList.contains("show")) {

        btn.innerHTML = `
            <i class="bi bi-chevron-up"></i>
            Sembunyikan Menu
        `;

    } else {

        btn.innerHTML = `
            <i class="bi bi-chevron-down"></i>
            Lihat Semua Menu
        `;

    }

});