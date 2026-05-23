document.addEventListener("DOMContentLoaded", function() {

    const currencies = [
        { code: 'USD', name: 'الدولار', rate: 8.3, image: 'images/usd.png', title: 'تحويل الدولار 💵', placeholder: 'أدخل المبلغ بالدولار' },
        { code: 'EUR', name: 'اليورو', rate: 9.55, image: 'images/euro.png', title: 'تحويل اليورو 💶', placeholder: 'أدخل المبلغ باليورو' },
        { code: 'TRY', name: 'الليرة التركية', rate: 0.18, image: 'images/lry.png', title: 'تحويل الليرة التركية 🇹🇷', placeholder: 'أدخل المبلغ بالليرة التركية' },
        { code: 'SAR', name: 'الريال السعودي', rate: 2.75, image: 'images/sar.png', title: 'تحويل الريال السعودي 🇸🇦', placeholder: 'أدخل المبلغ بالريال السعودي' }
    ];

    let currentRate = 0;
    let currentCurrencyName = "";

    const grid = document.getElementById('currencyGrid');

    currencies.forEach(function(c) {
        const card = document.createElement('div');
        card.className = `card ${c.code.toLowerCase()}`;
        card.innerHTML = `<h3>${c.code}</h3><p>${c.rate}</p>`;
        card.onclick = function() { window.showConversion(c.code); };
        grid.appendChild(card);
    });

    // دوال متاحة عالمياً للوصول من HTML
    window.showConversion = function(code) {
        const currency = currencies.find(c => c.code === code);
        currentRate = currency.rate;
        currentCurrencyName = currency.name;

        document.getElementById('mainPage').style.display = 'none';
        const conversionPage = document.getElementById('conversionPage');
        conversionPage.style.display = 'block';
        conversionPage.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${currency.image}")`;
        document.getElementById('conversionTitle').innerText = currency.title;
        document.getElementById('amount').placeholder = currency.placeholder;
        clearForm();
        window.scrollTo(0, 0);
    }

    window.showHome = function() {
        document.getElementById('mainPage').style.display = 'block';
        document.getElementById('conversionPage').style.display = 'none';
        window.scrollTo(0, 0);
    }

    window.showRates = function() {
        document.getElementById('mainPage').style.display = 'block';
        document.getElementById('conversionPage').style.display = 'none';
        document.getElementById('rates').scrollIntoView({behavior: "smooth"});
    }

    function clearForm() {
        document.getElementById('amount').value = "";
        document.getElementById('accountNumber').value = "";
        document.getElementById('recipientName').value = "";
        document.getElementById('referenceNumber').value = "";
        document.getElementById('phoneNumber').value = "";
        document.getElementById('discount').value = "";
        document.getElementById('result').innerText = "";
    }

    window.convert = function() {
        const amount = parseFloat(document.getElementById('amount').value);
        const account = document.getElementById('accountNumber').value;
        const recipient = document.getElementById('recipientName').value;
        const reference = document.getElementById('referenceNumber').value;
        const discountPercent = parseFloat(document.getElementById('discount').value || 0);
        const countryCode = document.getElementById('countryCode').value;
        const phone = document.getElementById('phoneNumber').value;
        const resultEl = document.getElementById('result');

        if(!amount) {
            resultEl.innerText = 'الرجاء إدخال المبلغ';
            return;
        }

        const amountLYD = amount * currentRate;
        const discountAmount = amountLYD * (discountPercent / 100);
        const finalAmount = amountLYD - discountAmount;

        resultEl.innerText =
            `العملة: ${currentCurrencyName}\n` +
            `اسم المستلم: ${recipient}\n` +
            `رقم الإشاري: ${reference}\n` +
            `رقم الحساب: ${account}\n` +
            `الدولة: ${countryCode}\n` +
            `رقم الهاتف: ${phone}\n` +
            `المبلغ الأصلي: ${amountLYD.toFixed(2)} د.ل\n` +
            `الخصم: ${discountAmount.toFixed(2)} د.ل\n` +
            `المبلغ المتوقع استلامه: ${finalAmount.toFixed(2)} د.ل`;

        document.getElementById('cashSound').play();
    }

});