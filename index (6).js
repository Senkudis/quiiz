<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مراجعة الرياضيات</title>
    <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
    <style>
        /* التصميم CSS */
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 20px; color: #333; }
        .container { width: 100%; max-width: 600px; text-align: center; }
        
        /* تنسيق اللوغو */
        .logo-container img { 
            width: 120px; 
            height: auto; 
            margin-bottom: 15px; 
            border-radius: 10px;
        }
        
        .card-container { perspective: 1000px; width: 100%; height: 350px; margin: 20px 0; cursor: pointer; }
        .card { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform 0.6s; box-shadow: 0 8px 16px rgba(0,0,0,0.1); border-radius: 15px; }
        .card.is-flipped { transform: rotateY(180deg); }
        .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; border-radius: 15px; background: white; border: 1px solid #ddd; overflow-y: auto; }
        .card-face.front { background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%); }
        .card-face.back { background-color: #e3f2fd; transform: rotateY(180deg); border-color: #90caf9; }
        .tag { background: #eee; padding: 5px 15px; border-radius: 20px; font-size: 0.8em; margin-bottom: 15px; color: #666; font-weight: bold; }
        .answer-tag { background: #1a73e8; color: white; }
        .content { font-size: 1.2em; line-height: 1.6; font-weight: 500; direction: rtl; } /* حجم خط أصغر قليلاً للمعادلات */
        .hint { font-size: 0.8em; color: #888; margin-top: 10px; }
        
        /* الأزرار */
        .controls { display: flex; justify-content: space-between; align-items: center; width: 100%; max-width: 400px; margin: 0 auto; background: white; padding: 10px; border-radius: 50px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        button { padding: 10px 25px; border: none; background-color: #1a73e8; color: white; border-radius: 25px; cursor: pointer; font-weight: bold; transition: 0.3s; }
        button:hover { background-color: #1557b0; }
        button:disabled { background-color: #ccc; cursor: default; }
        #counter { font-weight: bold; direction: ltr; }
    </style>
</head>
<body>

<div class="container">
    <div class="logo-container">
        <img src="https://i.ibb.co/gbYrVHwj/Picsart-25-01-17-22-34-53-499.png" alt="Logo">
    </div>
    <h2 style="margin-top:0; color:#1a73e8;">مراجعة الرياضيات</h2>
    
    <div class="card-container" onclick="flipCard()">
        <div class="card" id="card">
            <div class="card-face front">
                <span class="tag">السؤال</span>
                <div class="content" id="q">جاري التحميل...</div>
                <div class="hint">اضغط لقلب البطاقة</div>
            </div>
            <div class="card-face back">
                <span class="tag answer-tag">الإجابة</span>
                <div class="content" id="a">...</div>
            </div>
        </div>
    </div>

    <div class="controls">
        <button id="prevBtn" onclick="prevCard()">السابق</button>
        <span id="counter">1 / 40</span>
        <button id="nextBtn" onclick="nextCard()">التالي</button>
    </div>
</div>

<script>
    /* بيانات الملف الجديد (flashcards (1).csv) */
    const data = [{"Front": "ما هو تعريف الدالة الحدية (المونوميال)؟", "Back": "هي دالة على الصورة $د(س) = أ س^ن$ حيث $أ$ عدد حقيقي و $ن$ عدد صحيح غير سالب."}, {"Front": "في الدالة الحدية $د(س) = أ س^ن$, ماذا يسمى $أ$؟", "Back": "يُسمى $أ$ معامل الحد."}, {"Front": "في الدالة الحدية $د(س) = أ س^ن$, ماذا يسمى $ن$؟", "Back": "يُسمى $ن$ درجة الحد."}, {"Front": "ما هي درجة الدالة الحدية $د(س) = 5 س^3$؟", "Back": "الدرجة هي $3$."}, {"Front": "ما هي درجة الدالة الحدية $هـ(س) = 2 س$؟", "Back": "الدرجة هي $1$ (الأولى)."}, {"Front": "ما هي درجة الدالة الثابتة $ق(س) = 7$؟", "Back": "الدرجة هي صفر، لأن $ق(س) = 7 س^0$."}, {"Front": "متى نقول أن الحدود الجبرية متشابهة؟", "Back": "نقول إنها متشابهة إذا تساوت درجاتها."}, {"Front": "ما هو تعريف كثيرة الحدود (البولينوميال)؟", "Back": "هي جمع دوال حدية مختلفة الدرجات."}, {"Front": "ما هي الصورة العامة لكثيرة الحدود $ق(س)$ من الدرجة $ن$؟", "Back": "$ق(س) = أ_ن س^ن + أ_{ن-1} س^{ن-1} + ... + أ_1 س + أ_0$"}, {"Front": "في كثيرة الحدود $ق(س) = أ_ن س^ن + ... + أ_0$، ماذا تُسمى الأعداد الحقيقية $أ_0, أ_1, ..., أ_ن$؟", "Back": "تُسمى معاملات كثيرة الحدود."}, {"Front": "في كثيرة الحدود، ماذا يسمى $أ_ن$ (معامل أكبر قوة)؟", "Back": "يسمى المعامل الرئيس."}, {"Front": "في كثيرة الحدود، ماذا يسمى $أ_0$ (الحد الخالي من $س$)؟", "Back": "يسمى الحد الثابت (أو الحد المطلق)."}, {"Front": "ما هي درجة كثيرة الحدود؟", "Back": "هي أكبر درجة (أس) للحدود المكونة لها."}, {"Front": "حدد درجة كثيرة الحدود $ق(س) = 3س^5 - 2س^2 + 7$؟", "Back": "الدرجة الخامسة (لأن أكبر أس هو 5)."}, {"Front": "متى تتساوى كثيرتا حدود $ق(س)$ و $هـ(س)$؟", "Back": "تتساويان إذا كانت لهما نفس الدرجة، وكانت معاملات القوى المتناظرة لـ $س$ متساوية."}, {"Front": "كيف نجمع كثيرتي حدود؟", "Back": "نجمع المعاملات للحدود المتشابهة (التي لها نفس الدرجة)."}, {"Front": "كيف نطرح كثيرتي حدود (مثلاً $ق(س) - هـ(س)$)؟", "Back": "نجمع $ق(س)$ مع المعكوس الجمعي لـ $هـ(س)$ (أي نغير إشارات $هـ(س)$ ثم نجمع الحدود المتشابهة)."}, {"Front": "كيف نضرب كثيرتي حدود؟", "Back": "نضرب كل حد من حدود الأولى في جميع حدود الثانية، ثم نجمع الحدود المتشابهة."}, {"Front": "ما هي العلاقة بين درجة حاصل ضرب كثيرتي حدود ودرجتيهما؟", "Back": "درجة $(ق × هـ)(س)$ = درجة $ق(س)$ + درجة $هـ(س)$."}, {"Front": "إذا كانت درجة $ق(س)$ هي 3 ودرجة $هـ(س)$ هي 2، فما هي درجة حاصل ضربهما؟", "Back": "الدرجة = 3 + 2 = 5."}, {"Front": "ما هي خوارزمية القسمة لكثيرات الحدود؟", "Back": "$المقسوم = (المقسوم عليه × ناتج القسمة) + الباقي$، حيث درجة الباقي أقل من درجة المقسوم عليه."}, {"Front": "في خوارزمية القسمة، متى نتوقف عن عملية القسمة؟", "Back": "نتوقف عندما يكون الباقي صفراً، أو عندما تكون درجة الباقي أصغر من درجة المقسوم عليه."}, {"Front": "ما هو اسم الطريقة المختصرة لقسمة كثيرة حدود على كثيرة حدود من الدرجة الأولى؟", "Back": "القسمة التركيبية (Synthetic Dividing)."}, {"Front": "متى يمكن استخدام القسمة التركيبية؟", "Back": "عندما يكون المقسوم عليه على الصورة $(س - ج)$، أي كثيرة حدود من الدرجة الأولى ومعامل $س$ فيها يساوي $1$."}, {"Front": "في القسمة التركيبية، ماذا نكتب على يسار خط القسمة عند القسمة على $(س - 3)$؟", "Back": "نكتب صفر المقسوم عليه وهو $3$."}, {"Front": "في القسمة التركيبية، ماذا تمثل الأعداد في الصف الأخير (الناتج)؟", "Back": "تمثل معاملات خارج القسمة، وآخر عدد على اليمين هو الباقي."}, {"Front": "ما هي درجة خارج القسمة عند استخدام القسمة التركيبية؟", "Back": "تكون أقل من درجة المقسوم بمقدار واحد."}, {"Front": "إذا كان باقي قسمة $د(س)$ على $ق(س)$ يساوي صفراً، فماذا يعني ذلك؟", "Back": "يعني أن $د(س)$ تقبل القسمة على $ق(س)$ (أو أن $ق(س)$ عامل من عوامل $د(س)$)."}, {"Front": "عند قسمة $د(س) = 2س^3 - 3س^2 + 7س + 6$ على $هـ(س) = س - 3$ بالقسمة التركيبية، ما هو العدد الذي يوضع خارج خط القسمة؟", "Back": "العدد $3$."}, {"Front": "أكمل الخطوة: في القسمة التركيبية، أولاً نكتب _____ المقسوم مرتبة تنازلياً.", "Back": "معاملات"}, {"Front": "أكمل الخطوة: في القسمة التركيبية، إذا كان هناك حد مفقود في المقسوم (مثلاً لا يوجد $س^2$)، ماذا نكتب مكانه؟", "Back": "نكتب صفراً."}, {"Front": "ما هي نظرية الباقي؟", "Back": "باقي قسمة كثيرة الحدود $ق(س)$ على $(س - أ)$ يساوي قيمة الدالة عند $أ$، أي $ق(أ)$."}, {"Front": "باستخدام نظرية الباقي، كيف نجد باقي قسمة $ق(س)$ على $(س - 2)$؟", "Back": "نعوض بـ $2$ في الدالة، أي نحسب $ق(2)$."}, {"Front": "إذا كان $ق(س) = س^2 - 5س + 6$، فما هو باقي قسمته على $(س - 1)$؟", "Back": "الباقي = $ق(1) = (1)^2 - 5(1) + 6 = 1 - 5 + 6 = 2$."}, {"Front": "ما هي نظرية العامل؟", "Back": "يكون $(س - أ)$ عاملاً من عوامل كثيرة الحدود $ق(س)$ إذا وفقط إذا كان $ق(أ) = 0$ (أي الباقي صفر)."}, {"Front": "كيف نتحقق مما إذا كان $(س - 3)$ عاملاً لـ $ق(س)$؟", "Back": "نحسب $ق(3)$. إذا كان الناتج صفراً، فهو عامل. وإلا فلا."}, {"Front": "إذا كان $ق(2) = 0$، فماذا نستنتج عن $(س - 2)$؟", "Back": "نستنتج أن $(س - 2)$ هو عامل من عوامل $ق(س)$."}, {"Front": "لتحليل كثيرة حدود تكعيبية (من الدرجة الثالثة)، ما هي الخطوة الأولى عادةً؟", "Back": "البحث عن صفر للدالة (عدد يجعلها تساوي صفراً) بالتجريب في عوامل الحد الثابت."}, {"Front": "بعد إيجاد عامل واحد لكثيرة الحدود التكعيبية، كيف نجد باقي العوامل؟", "Back": "نقسم كثيرة الحدود على العامل الذي وجدناه (باستخدام القسمة المطولة أو التركيبية) للحصول على معادلة تربيعية، ثم نحللها."}, {"Front": "ما هي الأصفار النسبية المحتملة لكثيرة الحدود؟", "Back": "هي الأعداد التي تكون على صورة (عامل من عوامل الحد الثابت) / (عامل من عوامل المعامل الرئيس)."}];

    let currentIndex = 0;
    const cardElement = document.getElementById('card');
    const qEl = document.getElementById('q');
    const aEl = document.getElementById('a');
    const countEl = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function update() {
        qEl.innerHTML = data[currentIndex].Front; // Use innerHTML for MathJax rendering
        aEl.innerHTML = data[currentIndex].Back; // Use innerHTML for MathJax rendering
        countEl.textContent = (currentIndex + 1) + " / " + data.length;
        cardElement.classList.remove('is-flipped');
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === data.length - 1;
        
        // إعادة معالجة المعادلات الرياضية بعد تغيير المحتوى
        if (window.MathJax) {
            MathJax.typesetPromise([qEl, aEl]);
        }
    }

    function flipCard() { cardElement.classList.toggle('is-flipped'); }
    function nextCard() { if (currentIndex < data.length - 1) { currentIndex++; update(); } }
    function prevCard() { if (currentIndex > 0) { currentIndex--; update(); } }

    window.onload = update;
</script>
</body>
</html>
