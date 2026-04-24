import React, { useState } from 'react';
import { 
  Microscope, Activity, ChevronLeft, Info, List, ClipboardList, 
  LineChart, TestTube2, Droplets, Beaker, Thermometer, Clock, 
  GitMerge, Fingerprint, Dna, Zap, Home, Image as ImageIcon,
  CheckCircle2, XCircle, BrainCircuit, FileText, Send, Sparkles, X, Download,
  Calculator, BookOpen, RefreshCw, TableProperties, ListChecks
} from 'lucide-react';

// --- DATA: 8 המעבדות (כולל קישורי גוגל דרייב) ---
const labsData = [
  {
    id: 1,
    title: "קביעת ריכוז KMnO4",
    subtitle: "ספקטרופוטומטריה וחוק בר-למברט",
    icon: <Activity />,
    color: "from-purple-500 to-pink-500",
    textAccent: "text-purple-400",
    borderAccent: "border-purple-500/40",
    cardHover: "hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
    presentationImg: "https://drive.google.com/file/d/1U_vS2HejCdLG36ou6w-DfElxf-1JudFc/view", 
    infographicImg: "https://drive.google.com/open?id=1OVmAE8Q5q94SZ9qynzrBVCVsmu1B7qsZ",
    metrics: [{ label: "אורך גל", value: "530 nm" }, { label: "משתנה תלוי", value: "בליעה" }],
    background: "מדידת ריכוז תמיסת אשלגן פרמנגנט (KMnO4) המבוססת על חוק בר-למברט, הקובע יחס ישר בין ריכוז החומר לבין מידת בליעת האור שלו.",
    researchQuestion: "מהו ריכוז תמיסת הנעלם של KMnO4 בהסתמך על עקום כיול?",
    materials: ["תמיסת KMnO4", "מים מזוקקים", "ספקטרופוטומטר", "קיווטות"],
    procedure: ["סריקת אורך גל אופטימלי", "הכנת מיהולים לעקום כיול", "איפוס בלנק", "מדידת נעלם"],
    tableHeaders: ["ריכוז (mM)", "בליעה (A)"],
    chartType: "scatter", 
    graphTitle: "עקום כיול: בליעה כתלות בריכוז KMnO4",
    xAxis: "ריכוז KMnO4 (mM)", yAxis: "בליעה אופטית (A)",
    chartData: [{x: 0.008, y: 0.126}, {x: 0.016, y: 0.245}, {x: 0.024, y: 0.399}, {x: 0.032, y: 0.506}, {x: 0.040, y: 0.631}],
    quiz: [{ q: "למה צריך בלנק?", options: ["לחיטוי", "לאיפוס בליעת הממס", "לחימום המכשיר"], correct: 1, exp: "הבלנק מנקה את בליעת הרקע של המים והקיווטה." }]
  },
  {
    id: 2,
    title: "ריכוז חלבון (ביורט)",
    subtitle: "כימות חלבונים בספקטרופוטומטריה",
    icon: <Droplets />,
    color: "from-blue-500 to-cyan-400",
    textAccent: "text-cyan-400",
    borderAccent: "border-cyan-500/40",
    cardHover: "hover:border-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    presentationImg: "https://drive.google.com/file/d/12087yBWPElKtzNTTiUhu626zJgLOnlt8/view", 
    infographicImg: "https://drive.google.com/open?id=1C-gbgTw7TO5u8F4CaFz3TF5fKHWXmgz9",
    metrics: [{ label: "אורך גל", value: "540 nm" }, { label: "סטנדרט", value: "BSA" }],
    background: "שיטת ביורט יוצרת קומפלקס סגול בין יוני נחושת לקשרים פפטידיים בסביבה בסיסית.",
    researchQuestion: "מהו ריכוז החלבון בנעלם על בסיס עקום כיול BSA?",
    materials: ["חלבון BSA", "מגיב ביורט", "ספקטרופוטומטר"],
    procedure: ["הכנת סדרת ריכוזים", "הוספת מגיב ביורט", "הדגרה ל-20 דקות", "מדידה ב-540nm"],
    tableHeaders: ["ריכוז BSA (mg/ml)", "בליעה (A)"],
    chartType: "scatter", 
    graphTitle: "עקום כיול ביורט: בליעה כתלות בריכוז BSA",
    xAxis: "ריכוז BSA (mg/ml)", yAxis: "בליעה (A)",
    chartData: [{x: 0.2, y: 0.12}, {x: 0.4, y: 0.24}, {x: 0.6, y: 0.36}, {x: 0.8, y: 0.48}, {x: 1.0, y: 0.58}],
    quiz: [{ q: "מה יוצר את הצבע הסגול?", options: ["סוכר", "קשרים פפטידיים", "שומנים"], correct: 1, exp: "הנחושת נקשרת לחנקן שבקשר הפפטידי." }]
  },
  { id: 3, title: "אינוורטאז (pH)", subtitle: "קינטיקה אנזימטית", icon: <TestTube2 />, color: "from-emerald-400 to-green-500", textAccent: "text-emerald-400", borderAccent: "border-emerald-500/40", cardHover: "hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]", presentationImg: "https://drive.google.com/open?id=1h_CAOlJLfWxALWUp51K9qcCaVrKTuk0I", infographicImg: "https://drive.google.com/open?id=1ZoRaztttffrwTr46xWsKAtz7yKHMLILf", metrics: [{label:"אנזים", value:"אינוורטאז"}, {label:"מגיב", value:"סמנר"}], chartType: "bell", chartData: [{x: 3, y: 15}, {x: 4.5, y: 100}, {x: 7, y: 5}], graphTitle: "השפעת pH על קצב פעילות אינוורטאז", xAxis: "pH", yAxis: "קצב פעילות (%)", background: "אינוורטאז מפרק סוכרוז לגלוקוז ופרוקטוז. בניסוי נבחן את השפעת רמות ה-pH השונות על קצב פעילות האנזים.", procedure: ["הכנת סדרת בופרים", "הוספת מצע ואנזים", "הדגרה וחימום עם סמנר", "מדידת בליעה"], quiz: [] },
  { id: 4, title: "בטא-עמילאז", subtitle: "קינטיקה ומיכאליס-מנטן", icon: <Microscope />, color: "from-orange-400 to-red-500", textAccent: "text-orange-400", borderAccent: "border-orange-500/40", cardHover: "hover:border-orange-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]", presentationImg: "https://drive.google.com/open?id=1yyguQ1miFmHGnQ-4-6ZpaRHdDMgbUQA7", infographicImg: "https://drive.google.com/open?id=1wtS4xMXOfm4fpyZBD6RgDZBkX4a03FT-", metrics: [{label:"אנזים", value:"β-עמילאז"}, {label:"קבועים", value:"Vmax & Km"}], chartType: "michaelis", chartData: [{x: 0, y: 0}, {x: 40, y: 80}, {x: 120, y: 95}], graphTitle: "קינטיקת מיכאליס-מנטן", xAxis: "ריכוז מצע [S]", yAxis: "מהירות (V)", background: "בטא-עמילאז מפרק עמילן למלטוז. הניסוי מחולק לבניית עקום כיול ולקביעת המהירות כתלות בריכוז המצע.", procedure: ["בניית עקום כיול מלטוז", "הכנת סדרת ריכוזי עמילן", "הדגרה עם אנזים והרתחה עם סמנר", "עיבוד תוצאות לקבועים"], quiz: [] },
  { id: 5, title: "טריפסין (טמפ')", subtitle: "השפעת טמפרטורה", icon: <Thermometer />, color: "from-pink-500 to-rose-600", textAccent: "text-pink-400", borderAccent: "border-pink-500/40", cardHover: "hover:border-pink-500 hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]", presentationImg: "https://drive.google.com/file/d/1yyguQ1miFmHGnQ-4-6ZpaRHdDMgbUQA7/view", infographicImg: "https://drive.google.com/open?id=1R-z7R8NT4v-3L0_l_t0Yjs49Bid4qf5b", metrics: [{label:"אנזים", value:"טריפסין"}, {label:"מצע", value:"BANI"}], chartType: "bell", chartData: [{x: 0, y: 5}, {x: 37, y: 95}, {x: 70, y: 2}], graphTitle: "השפעת טמפרטורה על טריפסין", xAxis: "טמפרטורה (C)", yAxis: "בליעה (A)", background: "פרוטאז המפרק מצע כרומוגני צהוב. הניסוי בוחן את טמפרטורת האופטימום והשפעת דנטורציה טרמית.", procedure: ["השוואת טמפרטורות למצע", "הוספת אנזים ל-10 דקות", "עצירת תגובה בעזרת חומצה", "מדידת הצבע בספקטרופוטומטר"], quiz: [] },
  { id: 6, title: "קיבוע שמרים", subtitle: "תסיסה במערכת רציפה", icon: <Fingerprint />, color: "from-yellow-500 to-amber-600", textAccent: "text-yellow-400", borderAccent: "border-yellow-500/40", cardHover: "hover:border-yellow-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]", presentationImg: "https://drive.google.com/file/d/1iiR7wb66pspTSrdtUtKTIDsiNrd7T3nB/view", infographicImg: "https://drive.google.com/open?id=1S6X9YyiJhh8RJn3C88yWwhe4SDSiYdbS", metrics: [{label:"פולימר", value:"אלגינט"}, {label:"תהליך", value:"תסיסה"}], chartType: "bar", chartData: [{x: "חדשים", y: 15.5}, {x: "שימוש חוזר", y: 14.2}], graphTitle: "קצב תסיסה: חדשים מול חוזרים", xAxis: "סוג שמרים", yAxis: "נפח NaOH (מ\"ל)", background: "קיבוע שמרים באלגינט ומדידת קצב התסיסה שלהם (פליטת CO2) בעזרת טיטור חוזר המעיד על המשך פעילות.", procedure: ["ערבוב שמרים ואלגינט", "טפטוף לסידן כלוריד לקיבוע", "הכנסה למצע גלוקוז", "איסוף CO2 למים וטיטור בסיס"], quiz: [] },
  { id: 7, title: "טרנספורמציה (pGLO)", subtitle: "החדרת פלסמיד", icon: <Dna />, color: "from-lime-400 to-green-600", textAccent: "text-lime-400", borderAccent: "border-lime-500/40", cardHover: "hover:border-lime-500 hover:shadow-[0_0_30px_rgba(132,204,22,0.3)]", presentationImg: "https://drive.google.com/file/d/1wsfDbcEyr7-pOolFsJv8W_utpsYXEA4p/view", infographicImg: "https://drive.google.com/file/d/1hgWO_MRm7Z6C5L1Pj0T74WcrgJnyqclJ/view", metrics: [{label:"חיידק", value:"E.coli"}, {label:"גן מדווח", value:"GFP"}], chartType: "bar", chartData: [{x: "LB", y: 250}, {x: "Amp", y: 45}, {x: "Ara", y: 45}], graphTitle: "צמיחת מושבות pGLO", xAxis: "מצע גידול", yAxis: "מספר מושבות", background: "החדרת פלסמיד מהונדס המכיל גן לעמידות לאנטיביוטיקה (סלקציה) וגן מדווח זורח (פלואורסצנטי) בבקרת ארבינוז.", procedure: ["הכנת חיידקים קומפטנטיים בקרח", "מכת חום וקליטת פלסמיד", "הדגרת התאוששות", "זריעה על צלחות סלקטיביות"], quiz: [] },
  { id: 8, title: "עריכה גנטית", subtitle: "CRISPR-Cas9", icon: <GitMerge />, color: "from-teal-400 to-blue-600", textAccent: "text-teal-400", borderAccent: "border-teal-500/40", cardHover: "hover:border-teal-500 hover:shadow-[0_0_30px_rgba(20,184,166,0.3)]", presentationImg: "https://drive.google.com/file/d/1wsfDbcEyr7-pOolFsJv8W_utpsYXEA4p/view", infographicImg: "https://drive.google.com/file/d/1Ysaaq1-tJyMcFBfEGP8TVK69o7rG1dSu/view", metrics: [{label:"אנזים", value:"Cas9"}, {label:"מטרה", value:"LacZ"}], chartType: "bar", chartData: [{x: "כחולות", y: 100}, {x: "לבנות (ערוכות)", y: 92}], graphTitle: "יעילות עריכת CRISPR", xAxis: "פנוטיפ", yAxis: "% מושבות", background: "עריכת גנום ממוקדת באמצעות חיתוך גן LacZ ותיקונו על ידי תבנית פגומה בכוונה (Knockout).", procedure: ["החדרת פלסמיד עריכה", "השראת Cas9 בעזרת ארבינוז", "חיתוך ותיקון הגנום בחיידק", "זיהוי מושבות ערוכות על מצע כרומוגני"], quiz: [] }
];

// --- רכיב עזר להצגת גרפים ---
const ScientificChart = ({ data, type, xAxis, yAxis, textAccent, graphTitle }) => {
  const isBar = type === 'bar';
  const padLeft = 60, padBottom = 50, padRight = 20, padTop = 40;
  const width = 500, height = 300;
  const innerW = width - padLeft - padRight, innerH = height - padTop - padBottom;
  const maxDataX = isBar ? data.length : (Math.max(...data.map(d => Number(d.x))) || 1);
  const maxDataY = Math.max(...data.map(d => Number(d.y))) || 1;
  const yScaleMax = maxDataY * 1.1; 
  
  let strokeColor = "#22d3ee";
  const getX = (val) => padLeft + (val / maxDataX) * innerW;
  const getY = (val) => height - padBottom - (val / yScaleMax) * innerH;

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 p-4 mt-4 shadow-xl">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <text x={width/2} y={25} fill="white" fontSize="14" fontWeight="bold" textAnchor="middle">{graphTitle}</text>
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={height - padBottom} stroke="#475569" strokeWidth="2" />
        <line x1={padLeft} y1={height - padBottom} x2={width - padRight} y2={height - padBottom} stroke="#475569" strokeWidth="2" />
        {data.map((d, i) => isBar ? (
          <rect key={i} x={padLeft + (i * (innerW/data.length)) + 5} y={getY(d.y)} width={(innerW/data.length)-10} height={height-padBottom-getY(d.y)} fill={strokeColor} opacity="0.8" rx="2" />
        ) : (
          <circle key={i} cx={getX(d.x)} cy={getY(d.y)} r="4" fill={strokeColor} />
        ))}
      </svg>
    </div>
  );
};

// --- עוזר ג'מיני (מותאם למובייל ומאובטח) ---
const GeminiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'model', text: 'שלום! אני ג\'מיני 🧬. איך אוכל לעזור לך להתכונן לבגרות?' }]);
  const [isLoading, setIsLoading] = useState(false);

  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userText = input.trim();
    setMessages(prev => [...prev, {role: 'user', text: userText}]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] }));
      
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [...history, { role: 'user', parts: [{ text: userText }] }],
          systemInstruction: { parts: [{ text: "אתה עוזר וירטואלי מומחה למעבדות ביוטכנולוגיה לבגרות בישראל. ענה בעברית מקצועית ואדיבה." }] }
        })
      });
      const data = await res.json();
      const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "לא הצלחתי לייצר תשובה.";
      setMessages(prev => [...prev, {role: 'model', text: responseText}]);
    } catch (e) {
      setMessages(prev => [...prev, {role: 'model', text: "שגיאת תקשורת. וודא שמפתח ה-API תקין בהגדרות שלך."}]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-10 sm:left-10 z-[100]" dir="rtl">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full p-4 sm:px-8 sm:py-6 shadow-2xl hover:scale-105 transition-all font-black flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> <span className="hidden sm:inline text-xl">שאל את ג'מיני</span>
        </button>
      ) : (
        <div className="w-[calc(100vw-2rem)] sm:w-[400px] h-[70vh] max-h-[600px] bg-slate-900/95 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <span className="font-black text-xl text-white">ג'מיני AI</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 p-1"><X /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-base ${m.role === 'user' ? 'bg-cyan-600 text-white' : 'bg-white/10 text-slate-200 border border-white/10'} whitespace-pre-wrap`}>{m.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-end">
                <div className="max-w-[85%] p-4 rounded-3xl text-base bg-white/10 text-slate-400 border border-white/10">מקליד...</div>
              </div>
            )}
          </div>
          <div className="p-4 bg-black/40 border-t border-white/10 flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white text-base outline-none focus:border-cyan-500" placeholder="שאלה..." disabled={isLoading} />
            <button onClick={handleSend} disabled={isLoading} className="bg-cyan-500 p-3 rounded-full text-white"><Send size={20}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

// --- האפליקציה המרכזית ---
export default function App() {
  const [activeLabId, setActiveLabId] = useState(null);
  const activeLab = labsData.find(l => l.id === activeLabId);

  return (
    <div dir="rtl" className="min-h-screen bg-[#030712] text-slate-300 font-sans flex flex-col overflow-x-hidden">
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900/40 via-[#030712] to-[#030712] pointer-events-none"></div>

      <main className="flex-1 relative p-4 sm:p-10 z-10 max-w-7xl mx-auto w-full">
        {!activeLabId ? (
          <div className="pt-10 animate-in fade-in duration-1000">
            <div className="text-center mb-16">
              <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-cyan-600 leading-none mb-4 tracking-tighter">BIOTECH</h1>
              <p className="text-cyan-300 text-lg sm:text-3xl font-light tracking-[0.1em] sm:tracking-[0.2em] uppercase text-center">מעבדת חקר וירטואלית לבגרות</p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-12">
                <a href="https://drive.google.com/open?id=1CuPij_51RcNfXzZ56tbliB3Id8JBotFn" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"><FileText size={18}/> מצגת הקורס</a>
                <a href="https://drive.google.com/open?id=12-uho9AGii0H3hgVJ_qT3BloYfoqTXg1" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2"><ImageIcon size={18}/> מפת הקורס</a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {labsData.map(lab => (
                <div key={lab.id} onClick={() => setActiveLabId(lab.id)} className={`cursor-pointer bg-slate-900/40 border border-white/10 rounded-3xl p-6 hover:-translate-y-2 transition-all duration-300 shadow-xl ${lab.cardHover}`}>
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${lab.textAccent}`}>{lab.icon}</div>
                  <h3 className="text-2xl font-black text-white mb-2">{lab.title}</h3>
                  <p className="text-slate-400 text-sm font-light">{lab.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-left-10 duration-500">
            <button onClick={() => setActiveLabId(null)} className="flex items-center gap-2 text-white font-bold mb-8 hover:text-cyan-400"><ChevronLeft /> חזרה</button>
            
            <div className="mb-10">
              <h2 className="text-4xl sm:text-6xl font-black text-white mb-2">{activeLab.title}</h2>
              <p className={`text-xl ${activeLab.textAccent}`}>{activeLab.subtitle}</p>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              {activeLab.presentationImg && <a href={activeLab.presentationImg} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-300 font-bold flex items-center gap-2 hover:bg-blue-600 hover:text-white transition-all"><FileText size={18}/> מצגת מסכמת</a>}
              {activeLab.infographicImg && <a href={activeLab.infographicImg} target="_blank" rel="noreferrer" className="px-6 py-3 rounded-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-2 hover:bg-emerald-600 hover:text-white transition-all"><ImageIcon size={18}/> אינפוגרפיקה</a>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
                  <h4 className="text-cyan-400 font-bold mb-4 uppercase text-sm tracking-widest">רקע מדעי</h4>
                  <p className="text-lg leading-relaxed">{activeLab.background}</p>
                </div>
                <div className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800">
                  <h4 className="text-cyan-400 font-bold mb-4 uppercase text-sm tracking-widest">מהלך הניסוי</h4>
                  <ul className="space-y-3">
                    {activeLab.procedure?.map((s, i) => <li key={i} className="flex gap-3"><CheckCircle2 className="text-cyan-500 shrink-0" size={20}/> <span>{s}</span></li>)}
                  </ul>
                </div>
              </div>
              <div className="bg-slate-900/40 p-6 rounded-3xl border border-slate-800 flex flex-col">
                <h4 className="text-cyan-400 font-bold mb-4 uppercase text-sm tracking-widest">תוצאות וגרף</h4>
                {activeLab.chartData && <ScientificChart data={activeLab.chartData} type={activeLab.chartType} xAxis={activeLab.xAxis} yAxis={activeLab.yAxis} textAccent={activeLab.textAccent} graphTitle={activeLab.graphTitle} />}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 text-center border-t border-slate-800 text-slate-600 text-sm z-10">
        מערכת מעבדות ביוטכנולוגיה | הכנה לבגרות
      </footer>

      <GeminiAssistant />
    </div>
  );
}