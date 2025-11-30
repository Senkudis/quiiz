<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مراجعة القواعد</title>
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
        .content { font-size: 1.4em; line-height: 1.6; font-weight: 500; }
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
    <h2 style="margin-top:0; color:#1a73e8;">مراجعة القواعد الإنجليزية</h2>
    
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
        <span id="counter">1 / 57</span>
        <button id="nextBtn" onclick="nextCard()">التالي</button>
    </div>
</div>

<script>
    /* البرمجة JS */
    const data = [{"Front": "وفقًا للفيديو، ما هي النسبة المئوية للقواعد الأساسية في اللغة الإنجليزية التي تغطي 80% من استخدام اللغة؟", "Back": "فقط 20% من القواعد الأساسية هي التي تغطي 80% من اللغة المستخدمة."}, {"Front": "ما هي ضمائر الفاعل في اللغة الإنجليزية التي تم ذكرها؟", "Back": "I (أنا), he (هو), she (هي), it (هو/هي لغير العاقل), we (نحن), they (هم), you (أنت/أنتم)."}, {"Front": "ما هو ضمير الفاعل الذي يعني \"أنا\" باللغة الإنجليزية؟", "Back": "I"}, {"Front": "ما هو ضمير الفاعل الذي يعني \"هو\" باللغة الإنجليزية؟", "Back": "He"}, {"Front": "ما هو ضمير الفاعل الذي يعني \"هي\" باللغة الإنجليزية؟", "Back": "She"}, {"Front": "ما هو ضمير الفاعل الذي يستخدم للإشارة إلى غير العاقل (جماد أو حيوان)؟", "Back": "It"}, {"Front": "ما هو ضمير الفاعل الذي يعني \"نحن\" باللغة الإنجليزية؟", "Back": "We"}, {"Front": "ما هو ضمير الفاعل الذي يعني \"هم\" باللغة الإنجليزية؟", "Back": "They"}, {"Front": "ما هو ضمير الفاعل الذي يعني \"أنت\" أو \"أنتم\" باللغة الإنجليزية؟", "Back": "You"}, {"Front": "لماذا لا يمكن أن توجد جملة اسمية بحتة (بدون فعل) في اللغة الإنجليزية، على عكس العربية؟", "Back": "لأن اللغة الإنجليزية تتطلب وجود فعل في كل جملة، حتى لو كان فعلاً مساعداً مثل (verb to be)."}, {"Front": "ما هو الفعل المساعد الذي يُستخدم في الجمل الإنجليزية التي ليس لها فعل رئيسي، ويعني \"يكون\"؟", "Back": "الفعل المساعد هو 'be'."}, {"Front": "ما هي الأشكال الثلاثة للفعل المساعد 'be' في زمن المضارع؟", "Back": "am, is, are"}, {"Front": "أي شكل من أشكال الفعل 'be' يأتي مع الضمير 'I'؟", "Back": "am (مثال: I am happy)"}, {"Front": "أي شكل من أشكال الفعل 'be' يأتي مع الضمائر 'he', 'she', 'it' أو ما يعادلها من أسماء مفردة؟", "Back": "is (مثال: He is a doctor)"}, {"Front": "أي شكل من أشكال الفعل 'be' يأتي مع الضمائر 'we', 'they', 'you'؟", "Back": "are (مثال: We are a team)"}, {"Front": "أكمل الفراغ: Ahmed _____ happy.", "Back": "is (لأن Ahmed يعادل الضمير 'he')"}, {"Front": "ما هي الأزمنة البسيطة الثلاثة الأساسية في اللغة الإنجليزية؟", "Back": "الماضي البسيط (Past Simple)، والمضارع البسيط (Present Simple)، والمستقبل البسيط (Future Simple)."}, {"Front": "كيف يُصاغ الفعل في زمن المضارع البسيط (Present Simple)؟", "Back": "الفاعل + الفعل في المصدر. (e.g., I drink tea)"}, {"Front": "متى تتم إضافة 's' إلى الفعل في زمن المضارع البسيط؟", "Back": "عندما يكون الفاعل مفرداً غائباً (he, she, it)."}, {"Front": "أكمل الفراغ: He like_____ travel.", "Back": "likes"}, {"Front": "كيف يتم تحويل معظم الأفعال العادية إلى زمن الماضي البسيط (Past Simple)؟", "Back": "بإضافة 'ed' إلى نهاية الفعل. (مثال: travel -> traveled)"}, {"Front": "ماذا تسمى الأفعال التي لا تتبع قاعدة إضافة 'ed' في الماضي، مثل 'buy' التي تصبح 'bought'؟", "Back": "أفعال شاذة (Irregular verbs)."}, {"Front": "كيف يتم تكوين جملة في زمن المستقبل البسيط (Future Simple)؟", "Back": "بإضافة كلمة 'will' قبل الفعل في المصدر. (مثال: I will travel)"}, {"Front": "ما هي الأداة التي تستخدم في الإنجليزية لـ \"التعريف\" (مثل \"ال\" في العربية) عندما نتحدث عن شيء محدد؟", "Back": "the (مثال: The boy is clever)"}, {"Front": "ما هي الأدوات التي تستخدم في الإنجليزية لـ \"التنكير\" عندما نتحدث عن شيء غير محدد؟", "Back": "a / an"}, {"Front": "لماذا لا يمكن ترك اسم مفرد نكرة بمفرده في الجملة الإنجليزية؟", "Back": "لأنه يجب أن يسبقه أداة تنكير ('a' أو 'an')."}, {"Front": "متى نستخدم أداة التنكير 'an' بدلاً من 'a'؟", "Back": "عندما يبدأ الاسم بصوت حرف علة (a, e, i, o, u)."}, {"Front": "أكمل الفراغ: This is _____ apple.", "Back": "an"}, {"Front": "أكمل الفراغ: This is _____ book.", "Back": "a"}, {"Front": "ما هو الفرق بين الأسماء المعدودة (Countable) وغير المعدودة (Uncountable)؟", "Back": "الأسماء المعدودة يمكن عدها وجمعها (book, books)، بينما غير المعدودة لا يمكن عدها مباشرة (sugar, money)."}, {"Front": "هل كلمة 'money' (فلوس) تعتبر اسماً معدوداً أم غير معدود؟", "Back": "غير معدود. يمكن عد العملة (ريال، دولار) ولكن ليس الكلمة نفسها."}, {"Front": "كيف يمكننا تحديد كمية لاسم غير معدود مثل 'sugar'؟", "Back": "باستخدام وحدة قياس أو وعاء، مثل 'two spoons of sugar' (ملعقتين من السكر)."}, {"Front": "متى يُستخدم الزمن المستمر (Continuous Tense)؟", "Back": "للتعبير عن فعل كان، أو لا يزال، أو سيكون مستمراً في الحدوث خلال فترة زمنية معينة."}, {"Front": "ما هي تركيبة زمن المضارع المستمر (Present Continuous) الذي يعبر عن شيء يحدث الآن؟", "Back": "الفاعل + (am/is/are) + الفعل مضافاً له 'ing'."}, {"Front": "كيف تقول \"أنا أعمل الآن\" باستخدام زمن المضارع المستمر؟", "Back": "I am working now."}, {"Front": "ما هي تركيبة زمن الماضي المستمر (Past Continuous) الذي يعبر عن فعل كان مستمراً في وقت معين بالماضي؟", "Back": "الفاعل + (was/were) + الفعل مضافاً له 'ing'."}, {"Front": "متى نستخدم 'was' ومتى نستخدم 'were' في الماضي المستمر؟", "Back": "تستخدم 'was' مع (I, he, she, it)، وتستخدم 'were' مع (we, they, you)."}, {"Front": "كيف تقول \"أنا سأكون ألعب\" باستخدام المستقبل المستمر؟", "Back": "I will be playing."}, {"Front": "ما هي تركيبة زمن المستقبل المستمر (Future Continuous)؟", "Back": "الفاعل + will be + الفعل مضافاً له 'ing'."}, {"Front": "كيف تقول \"أنا سأكون ألعب\" باستخدام المستقبل المستمر؟", "Back": "I will be playing."}, {"Front": "ما هي حروف الجر الثلاثة الأساسية للوقت التي تم شرحها؟", "Back": "in, on, at"}, {"Front": "وفقًا للقاعدة المبسطة (شهور، أيام، ساعات)، أي حرف جر يُستخدم مع الشهور؟", "Back": "in"}, {"Front": "وفقًا للقاعدة المبسطة (شهور، أيام، ساعات)، أي حرف جر يُستخدم مع الأيام؟", "Back": "on"}, {"Front": "وفقًا للقاعدة المبسطة (شهور، أيام، ساعات)، أي حرف جر يُستخدم مع الساعات؟", "Back": "at"}, {"Front": "أكمل الفراغ: We will meet _____ Sunday.", "Back": "on"}, {"Front": "أكمل الفراغ: I will see you _____ 5 PM.", "Back": "at"}, {"Front": "ما هي وظيفة الصفة (Adjective) في الجملة؟", "Back": "الصفة تصف الاسم (noun) وتقدم معلومات إضافية عنه."}, {"Front": "أين يكون موقع الصفة في الجملة الإنجليزية بالنسبة للاسم الذي تصفه؟", "Back": "تأتي الصفة قبل الاسم الموصوف (مثال: a good man)."}, {"Front": "ما هي وظيفة الحال (Adverb) في الجملة؟", "Back": "الحال يصف الفعل (verb) ويبين كيف تم القيام به."}, {"Front": "كيف يتم تكوين الحال غالبًا من الصفة؟", "Back": "بإضافة 'ly' إلى نهاية الصفة (مثال: slow -> slowly)."}, {"Front": "ترجم \"أنا أمشي ببطء\" إلى الإنجليزية.", "Back": "I walk slowly."}, {"Front": "ما هي أداة الاستفهام التي تسأل عن \"ماذا\" أو \"ما\"؟", "Back": "What"}, {"Front": "ما هي أداة الاستفهام التي تسأل عن \"أين\"؟", "Back": "Where"}, {"Front": "ما هي أداة الاستفهام التي تسأل عن \"متى\"؟", "Back": "When"}, {"Front": "ما هي أداة الاستفهام التي تسأل عن \"لماذا\"؟", "Back": "Why"}, {"Front": "ما هي أداة الاستفهام التي تسأل عن \"مَن\" (للأشخاص)؟", "Back": "Who"}, {"Front": "ما هي أداة الاستفهام التي تستخدم للسؤال عن \"أي\" للاختيار بين عدة خيارات؟", "Back": "Which"}];

    let currentIndex = 0;
    const cardElement = document.getElementById('card');
    const qEl = document.getElementById('q');
    const aEl = document.getElementById('a');
    const countEl = document.getElementById('counter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    function update() {
        qEl.textContent = data[currentIndex].Front;
        aEl.textContent = data[currentIndex].Back;
        countEl.textContent = (currentIndex + 1) + " / " + data.length;
        cardElement.classList.remove('is-flipped');
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === data.length - 1;
    }

    function flipCard() { cardElement.classList.toggle('is-flipped'); }
    function nextCard() { if (currentIndex < data.length - 1) { currentIndex++; update(); } }
    function prevCard() { if (currentIndex > 0) { currentIndex--; update(); } }

    window.onload = update;
</script>
</body>
</html>
