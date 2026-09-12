(function () {
    const hidden   = document.getElementById('login-otp');
    const boxes    = Array.from(document.querySelectorAll('.otp-box'));
    const mobile   = document.getElementById('mobile');
    const sentNote = document.getElementById('otp-sent-note');
    const resend   = document.getElementById('resendBtn');
    const sendBtn  = document.getElementById('sendOtpBtn');
    if (!hidden || !boxes.length) return;

    /* --- 6 visual boxes <-> the single #login-otp value --- */
    const paint = () => {
        const v = hidden.value.replace(/\D/g, '').slice(0, 6);
        hidden.value = v;
        boxes.forEach((b, i) => { b.value = v[i] || ''; });
    };
    boxes.forEach((box, i) => {
        box.addEventListener('focus', () => box.select());
        box.addEventListener('input', () => {
            box.value = box.value.replace(/\D/g, '').slice(0, 1);
            if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
            hidden.value = boxes.map(b => b.value).join('').slice(0, 6);
        });
        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !box.value && i > 0) {
                boxes[i - 1].value = '';
                boxes[i - 1].focus();
                hidden.value = boxes.map(b => b.value).join('');
            }
            if (e.key === 'ArrowLeft'  && i > 0) boxes[i - 1].focus();
            if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
        });
        box.addEventListener('paste', (e) => {
            const text = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
            if (!text) return;
            e.preventDefault();
            hidden.value = text;
            paint();
            boxes[Math.min(text.length, boxes.length - 1)].focus();
        });
    });
    hidden.addEventListener('input', paint);
    paint();


    const note = () => {
        if (!sentNote || !mobile) return;
        const v = mobile.value.trim();
        sentNote.textContent = v.length === 10
            ? 'We have sent a 6-digit OTP to +91 ' + v
            : 'We will send a 6-digit OTP to your mobile number';
    };
    mobile && mobile.addEventListener('input', note);
    sendBtn && sendBtn.addEventListener('click', () => setTimeout(note, 500));
    note();

    let tick = null;
    const startTimer = (seconds) => {
        if (!resend) return;
        clearInterval(tick);
        let left = seconds;
        const draw = () => {
            resend.disabled = true;
            resend.textContent = 'Resend OTP in 00:' + String(left).padStart(2, '0');
        };
        draw();
        tick = setInterval(() => {
            left -= 1;
            if (left <= 0) {
                clearInterval(tick);
                resend.disabled = false;
                resend.textContent = 'Resend OTP';
            } else { draw(); }
        }, 1000);
    };
    sendBtn && sendBtn.addEventListener('click', () => startTimer(30));
    resend  && resend.addEventListener('click', () => { sendBtn && sendBtn.click(); startTimer(30); });
})();

(function () {
    const hidden   = document.getElementById('login-otp');
    const boxes    = Array.from(document.querySelectorAll('.otp-box'));
    const mobile   = document.getElementById('mobile');
    const sentNote = document.getElementById('otp-sent-note');
    const resend   = document.getElementById('resendBtn');
    const sendBtn  = document.getElementById('sendOtpBtn');
    if (!hidden || !boxes.length) return;

    const commit = () => { hidden.value = boxes.map(b => b.value).join('').slice(0, 6); };

    const paint = () => {
        const v = hidden.value.replace(/\D/g, '').slice(0, 6);
        hidden.value = v;
        boxes.forEach((b, i) => { b.value = v[i] || ''; });
    };

    boxes.forEach((box, i) => {
        box.addEventListener('focus', () => box.select());

        box.addEventListener('input', () => {
            box.value = box.value.replace(/\D/g, '').slice(0, 1);
            if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
            commit();
        });

        box.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !box.value && i > 0) {
                boxes[i - 1].value = '';
                boxes[i - 1].focus();
                commit();
            }
            if (e.key === 'ArrowLeft'  && i > 0) boxes[i - 1].focus();
            if (e.key === 'ArrowRight' && i < boxes.length - 1) boxes[i + 1].focus();
        });

        box.addEventListener('paste', (e) => {
            const text = (e.clipboardData || window.clipboardData)
                .getData('text').replace(/\D/g, '').slice(0, 6);
            if (!text) return;
            e.preventDefault();
            hidden.value = text;
            paint();
            boxes[Math.min(text.length, boxes.length - 1)].focus();
        });
    });

    hidden.addEventListener('input', paint);
    paint();

    /* "We have sent a 6-digit OTP to +91 …" */
    const note = () => {
        if (!sentNote || !mobile) return;
        const v = mobile.value.trim();
        sentNote.textContent = v.length === 10
            ? 'We have sent a 6-digit OTP to +91 ' + v
            : 'We will send a 6-digit OTP to your mobile number';
    };
    mobile && mobile.addEventListener('input', note);
    sendBtn && sendBtn.addEventListener('click', () => setTimeout(note, 500));
    note();

    /* resend cooldown — reuses your existing Send OTP handler */
    let tick = null;
    const startTimer = (seconds) => {
        if (!resend) return;
        clearInterval(tick);
        let left = seconds;
        const draw = () => {
            resend.disabled = true;
            resend.textContent = 'Resend OTP in 00:' + String(left).padStart(2, '0');
        };
        draw();
        tick = setInterval(() => {
            left -= 1;
            if (left <= 0) {
                clearInterval(tick);
                resend.disabled = false;
                resend.textContent = 'Resend OTP';
            } else draw();
        }, 1000);
    };

    sendBtn && sendBtn.addEventListener('click', () => startTimer(30));
    resend  && resend.addEventListener('click', () => { sendBtn && sendBtn.click(); startTimer(30); });
})();

const Login = getElementById("loginBtn");
Login.addEventListener("click", function(event){
    event.preventDefault();
    window.location.href = "../../User/Dashboard/user-dashboard.html"
})