import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './css/style.css';
import './js/order.js';
import './js/app.js';   // <-- WAJIB ADA

AOS.init({
    duration: 1000,
    once: true,
    offset: 120
});