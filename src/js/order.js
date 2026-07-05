/* ===========================================
   ORDER SYSTEM
=========================================== */
import Swal from "sweetalert2";
import { Modal } from 'bootstrap';
const menuSelect = document.getElementById("menuSelect");
const quantityInput = document.getElementById("quantity");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const totalPrice = document.getElementById("totalPrice");

// =============================
// Format Rupiah
// =============================

function formatRupiah(number) {

    return "Rp" + number.toLocaleString("id-ID");

}

// =============================
// Hitung Total
// =============================

function updateTotal() {

    const selectedOption =
        menuSelect.options[menuSelect.selectedIndex];

    const price =
        Number(selectedOption.dataset.price);

    const qty =
        Number(quantityInput.value);

    const total =
        price * qty;

    totalPrice.textContent =
        formatRupiah(total);

}

// =============================
// Tombol +
// =============================

plusBtn.addEventListener("click", () => {

    quantityInput.value++;

    updateTotal();

});

// =============================
// Tombol -
// =============================

minusBtn.addEventListener("click", () => {

    if (quantityInput.value > 1) {

        quantityInput.value--;

        updateTotal();

    }

});

// =============================
// Saat Menu Diganti
// =============================

menuSelect.addEventListener("change", updateTotal);

// =============================
// Pertama Kali Dibuka
// =============================

updateTotal();
/* ===========================================
   PAYMENT ACTIVE
=========================================== */

const paymentCards =
    document.querySelectorAll(".payment-card");

const paymentInputs =
    document.querySelectorAll("input[name='payment']");

paymentInputs.forEach(input => {

    input.addEventListener("change", () => {

        paymentCards.forEach(card =>
            card.classList.remove("active")
        );

        input.closest(".payment-card")
            .classList.add("active");

    });

});

paymentCards[0].classList.add("active");
/* ===========================================
   FORM
=========================================== */

const orderForm =
    document.getElementById("orderForm");

orderForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const nama =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const lokasi =
        document.getElementById("location").value.trim();

    const catatan =
        document.getElementById("note").value.trim() || "-";

    const menu =
        menuSelect.options[
            menuSelect.selectedIndex
        ].text;

    const qty =
        quantityInput.value;

    const payment =
        document.querySelector(
            "input[name='payment']:checked"
        ).value;

    if (!nama || !phone || !lokasi) {

        Swal.fire({

            icon: "warning",

            title: "Data belum lengkap",

            text: "Mohon lengkapi semua data."

        });

        return;

    }

    const result = await Swal.fire({

        title: "Konfirmasi Pesanan",

        html: `

            <b>Nama</b><br>
            ${nama}<br><br>

            <b>Menu</b><br>
            ${menu}<br><br>

            <b>Jumlah</b><br>
            ${qty}<br><br>

            <b>Lokasi</b><br>
            ${lokasi}<br><br>

            <b>Pembayaran</b><br>
            ${payment}<br><br>

            <b>Total</b><br>

            <h3>${totalPrice.textContent}</h3>

        `,

        icon:"question",

        showCancelButton:true,

        confirmButtonText:"Konfirmasi",

        cancelButtonText:"Batal"

    });

    if(!result.isConfirmed){

        return;

    }
    if(payment==="Cash"){

    Swal.fire({

        icon:"success",

        title:"Pesanan Berhasil",

        text:"Pesanan berhasil dikirim ke admin."

    });

}
else{

    await Swal.fire({

        title:"Scan QRIS",

        html:`

        <img
        src="/src/assets/images/pembayaran-qris.jpeg"
        style="width:250px;border-radius:15px;">

        <br><br>

        <h3>${totalPrice.textContent}</h3>

        `,

        confirmButtonText:"Saya Sudah Bayar"

    });

    Swal.fire({

        icon:"success",

        title:"Pembayaran Berhasil",

        text:"Pesanan berhasil dikirim."

    });

}

});