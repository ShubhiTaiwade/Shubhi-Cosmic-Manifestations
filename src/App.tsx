import { useState, useEffect, useRef } from "react";

const MOODS = [
  { label: "Grateful", emoji: "🌸", bg: ["#2d1b4e","#6b3fa0","#f9a8d4"], accent: "#f9a8d4" },
  { label: "Hopeful", emoji: "🌅", bg: ["#1a2a4a","#2563eb","#fbbf24"], accent: "#fbbf24" },
  { label: "Powerful", emoji: "🔥", bg: ["#1a0a0a","#7f1d1d","#f97316"], accent: "#f97316" },
  { label: "Peaceful", emoji: "🌊", bg: ["#0a1a2a","#0e7490","#a5f3fc"], accent: "#a5f3fc" },
];

const AFFIRMATIONS = [
  "The universe is conspiring in your favour ✨",
  "You are a magnet for miracles 🌟",
  "Your desires are already on their way to you 🌙",
  "You are worthy of everything you dream of 💫",
  "Magic flows through you naturally 🔮",
  "You attract abundance effortlessly 🌺",
  "The cosmos celebrate your existence 🪐",
  "Your energy is a beacon of light 🕯️",
];

const ASTRO_EVENTS = [
  { name: "New Moon", date: "March 29, 2026", sign: "Aries", meaning: "New beginnings & bold intentions" },
  { name: "Full Moon", date: "April 12, 2026", sign: "Libra", meaning: "Release & harvest of desires" },
  { name: "Venus enters Taurus", date: "April 5, 2026", sign: "Taurus", meaning: "Love, beauty & abundance" },
  { name: "Mercury Retrograde ends", date: "April 7, 2026", sign: "Aries", meaning: "Clarity & forward movement" },
  { name: "Spring Equinox", date: "March 20, 2026", sign: "Aries", meaning: "Rebirth & cosmic reset" },
];

const inputStyle = {
  width:"100%", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.2)",
  borderRadius:12, padding:"12px 16px", color:"#e9d5ff", fontSize:15,
  outline:"none", boxSizing:"border-box", fontFamily:"inherit",
};
const btnStyle = {
  border:"none", borderRadius:12, padding:"12px 24px", color:"white",
  fontWeight:700, cursor:"pointer", fontFamily:"inherit", letterSpacing:0.5,
};

function StarField() {
  const stars = Array.from({length:80},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*2.5+0.5,delay:Math.random()*4,dur:Math.random()*3+2}));
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
      {stars.map(s=><div key={s.id} style={{position:"absolute",left:`${s.x}%`,top:`${s.y}%`,width:s.size,height:s.size,borderRadius:"50%",background:"white",opacity:0.7,animation:`twinkle ${s.dur}s ${s.delay}s infinite alternate`}}/>)}
    </div>
  );
}

function Particle({x,y,onDone}) {
  const [opacity,setOpacity]=useState(1);
  const [posY,setPosY]=useState(y);
  useEffect(()=>{
    let frame,start;
    const animate=(ts)=>{
      if(!start)start=ts;
      const p=(ts-start)/2000;
      setOpacity(1-p);setPosY(y-p*220);
      if(p<1)frame=requestAnimationFrame(animate);else onDone();
    };
    frame=requestAnimationFrame(animate);
    return()=>cancelAnimationFrame(frame);
  },[]);
  return <div style={{position:"fixed",left:x,top:posY,pointerEvents:"none",opacity,fontSize:20,zIndex:100}}>✨</div>;
}

function OnboardingScreen({onDone}) {
  const [name,setName]=useState("");
  const [dob,setDob]=useState("");
  const [birthTime,setBirthTime]=useState("");
  const [birthPlace,setBirthPlace]=useState("");
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24,position:"relative",zIndex:10}}>
      <div style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(16px)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:24,padding:40,maxWidth:460,width:"100%",textAlign:"center"}}>
        <div style={{fontSize:52,marginBottom:12}}>🔮</div>
        <h1 style={{color:"#e9d5ff",fontSize:26,fontWeight:700,marginBottom:8}}>Welcome, Cosmic Soul</h1>
        <p style={{color:"#c4b5fd",fontSize:14,marginBottom:28,lineHeight:1.6}}>Share your celestial details so the universe can craft your perfectly personalised spells, rituals & astrology chart.</p>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your first name" style={inputStyle}/>
        <div style={{marginTop:14}}>
          <label style={{color:"#a78bfa",fontSize:13,display:"block",marginBottom:6,textAlign:"left"}}>Date of Birth *</label>
          <input type="date" value={dob} onChange={e=>setDob(e.target.value)} style={inputStyle}/>
        </div>
        <div style={{marginTop:14}}>
          <label style={{color:"#a78bfa",fontSize:13,display:"block",marginBottom:6,textAlign:"left"}}>Birth Time (optional — for rising sign)</label>
          <input type="time" value={birthTime} onChange={e=>setBirthTime(e.target.value)} style={inputStyle}/>
        </div>
        <div style={{marginTop:14}}>
          <label style={{color:"#a78bfa",fontSize:13,display:"block",marginBottom:6,textAlign:"left"}}>Birth Place (optional — city)</label>
          <input value={birthPlace} onChange={e=>setBirthPlace(e.target.value)} placeholder="e.g. Mumbai, India" style={inputStyle}/>
        </div>
        <button disabled={!name||!dob} onClick={()=>onDone({name,dob,birthTime,birthPlace})} style={{...btnStyle,marginTop:24,width:"100%",fontSize:16,opacity:(!name||!dob)?0.4:1,cursor:(!name||!dob)?"not-allowed":"pointer",background:"linear-gradient(135deg,#7c3aed,#db2777)"}}>
          Enter the Cosmos ✨
        </button>
      </div>
    </div>
  );
}

function getZodiac(dob) {
  const d=new Date(dob),m=d.getMonth()+1,day=d.getDate();
  if((m===3&&day>=21)||(m===4&&day<=19))return"Aries ♈";
  if((m===4&&day>=20)||(m===5&&day<=20))return"Taurus ♉";
  if((m===5&&day>=21)||(m===6&&day<=20))return"Gemini ♊";
  if((m===6&&day>=21)||(m===7&&day<=22))return"Cancer ♋";
  if((m===7&&day>=23)||(m===8&&day<=22))return"Leo ♌";
  if((m===8&&day>=23)||(m===9&&day<=22))return"Virgo ♍";
  if((m===9&&day>=23)||(m===10&&day<=22))return"Libra ♎";
  if((m===10&&day>=23)||(m===11&&day<=21))return"Scorpio ♏";
  if((m===11&&day>=22)||(m===12&&day<=21))return"Sagittarius ♐";
  if((m===12&&day>=22)||(m===1&&day<=19))return"Capricorn ♑";
  if((m===1&&day>=20)||(m===2&&day<=18))return"Aquarius ♒";
  return"Pisces ♓";
}

function callClaude(prompt, systemPrompt="") {
  return fetch("https://api.anthropic.com/v1/messages",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514",
      max_tokens:1200,
      system: systemPrompt || "You are a mystical cosmic guide, astrologer, and spellcaster. Be deeply personal, magical, and empowering.",
      messages:[{role:"user",content:prompt}],
    }),
  }).then(r=>r.json()).then(d=>d.content?.[0]?.text||"");
}

// Text-to-Speech
function stripFormatting(text) {
  return text
    .replace(/[🌙✨🔮🕯️🌿⚡💫🌟🌸🌊🔥🌅🪐♈♉♊♋♌♍♎♏♐♑♒♓]/g,"")
    .replace(/#{1,6}\s*/g,"")
    .replace(/\*{1,3}([^*]*)\*{1,3}/g,"$1")
    .replace(/_{1,2}([^_]*)_{1,2}/g,"$1")
    .replace(/#+/g,"")
    .replace(/\*/g,"")
    .replace(/_/g,"")
    .replace(/~~/g,"")
    .replace(/`/g,"")
    .replace(/\n{3,}/g,"\n\n")
    .trim();
}

function speakText(text, onEnd) {
  window.speechSynthesis.cancel();
  const clean = stripFormatting(text);
  const utt = new SpeechSynthesisUtterance(clean);
  utt.rate = 0.88; utt.pitch = 1.05; utt.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v=>v.name.toLowerCase().includes("samantha")||v.name.toLowerCase().includes("victoria")||v.name.toLowerCase().includes("karen")||v.name.toLowerCase().includes("female"));
  if(preferred) utt.voice = preferred;
  if(onEnd) utt.onend = onEnd;
  window.speechSynthesis.speak(utt);
}

export default function App() {
  const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem("cm_user"))||null;}catch{return null;}});
  const [mood,setMood]=useState(0);
  const [tab,setTab]=useState("manifest");
  const [wish,setWish]=useState("");
  const [spell,setSpell]=useState("");
  const [spellLoading,setSpellLoading]=useState(false);
  const [particles,setParticles]=useState([]);
  const [released,setReleased]=useState(false);
  const [affirmation,setAffirmation]=useState("");
  const [journal,setJournal]=useState(()=>{try{return JSON.parse(localStorage.getItem("cm_journal"))||[];}catch{return[];}});
  const [journalEntry,setJournalEntry]=useState("");
  const [ritual,setRitual]=useState("");
  const [ritualLoading,setRitualLoading]=useState(false);
  const [selEvent,setSelEvent]=useState(null);
  const [astroReport,setAstroReport]=useState("");
  const [astroLoading,setAstroLoading]=useState(false);
  const [isSpeaking,setIsSpeaking]=useState(false);
  const [isListening,setIsListening]=useState(false);
  const [voiceSupported]=useState(()=>"SpeechRecognition" in window||"webkitSpeechRecognition" in window);
  const [ttsSupported]=useState(()=>"speechSynthesis" in window);
  const [spellVoiceOn,setSpellVoiceOn]=useState(true);
  const [ritualVoiceOn,setRitualVoiceOn]=useState(true);
  const btnRef=useRef();
  const recognitionRef=useRef(null);

  useEffect(()=>{
    const style=document.createElement("style");
    style.textContent=`@keyframes twinkle{from{opacity:0.2;transform:scale(0.8)}to{opacity:1;transform:scale(1.2)}}@keyframes pulse{0%,100%{box-shadow:0 0 20px rgba(167,139,250,0.4)}50%{box-shadow:0 0 40px rgba(167,139,250,0.8)}}@keyframes ripple{0%{transform:scale(1);opacity:1}100%{transform:scale(2.5);opacity:0}}@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;
    document.head.appendChild(style);
    window.speechSynthesis.getVoices();
  },[]);

  const moodObj=MOODS[mood];
  const zodiac=user?getZodiac(user.dob):"";

  const handleOnboard=(data)=>{
    localStorage.setItem("cm_user",JSON.stringify(data));
    setUser(data);
  };
  const saveJournal=(entries)=>{setJournal(entries);localStorage.setItem("cm_journal",JSON.stringify(entries));};

  // Voice input
  const startVoiceInput=(setter)=>{
    if(!voiceSupported)return;
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    const rec=new SR();
    rec.lang="en-US"; rec.interimResults=false; rec.maxAlternatives=1;
    rec.onstart=()=>setIsListening(true);
    rec.onend=()=>setIsListening(false);
    rec.onresult=(e)=>{const t=e.results[0][0].transcript;setter(prev=>prev?(prev+" "+t):t);};
    rec.onerror=()=>setIsListening(false);
    recognitionRef.current=rec;
    rec.start();
  };
  const stopVoice=()=>{recognitionRef.current?.stop();setIsListening(false);};

  const handleRelease=async(e)=>{
    if(!wish.trim())return;
    const rect=btnRef.current?.getBoundingClientRect();
    const np=Array.from({length:20},(_,i)=>({id:Date.now()+i,x:(rect?.left||200)+Math.random()*(rect?.width||100)-10,y:rect?.top||300}));
    setParticles(p=>[...p,...np]);
    setReleased(true); setSpellLoading(true); setSpell("");
    const prompt=`You are a mystical cosmic spellcaster. User: ${user.name}, zodiac: ${zodiac}${user.birthTime?`, birth time: ${user.birthTime}`:""}${user.birthPlace?`, born in: ${user.birthPlace}`:""}.
Manifestation wish: "${wish}"
Create a deeply personalised magical spell. Include:
1. 🕯️ A unique incantation (4-6 lines of mystical verse) — label it clearly as "THE INCANTATION" so user knows what to recite aloud
2. 🌿 Sacred ingredients (candle color, crystal, herb, element)
3. 🌙 Best moon phase & day
4. 🔮 Step-by-step ritual (3-4 steps)
5. ⚡ Personal power word for ${user.name}
Make it feel truly personal. Use emojis. Under 320 words.`;
    const result=await callClaude(prompt);
    setSpell(stripFormatting(result));
    setSpellLoading(false);
    const entry={id:Date.now(),wish,spell:result,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),mood:moodObj.label};
    saveJournal([entry,...journal]);
    if(spellVoiceOn&&ttsSupported){setIsSpeaking(true);speakText(result,()=>setIsSpeaking(false));}
  };

  const getAstroRitual=async(event)=>{
    setSelEvent(event); setRitual(""); setRitualLoading(true);
    const prompt=`Cosmic astrologer & ritual guide. User: ${user.name}, zodiac: ${zodiac}${user.birthPlace?`, from ${user.birthPlace}`:""}.
Event: ${event.name} on ${event.date} in ${event.sign} — ${event.meaning}.
Create a personalised ritual. Include:
1. 🌟 Why powerful for ${zodiac}
2. 🕯️ Preparation (what to gather, best time)
3. 🔮 The Ritual (3-5 steps) — include a clearly labelled "CHANT:" to say aloud
4. 💫 Affirmation to chant
5. 🌿 What to release & call in
Make it magical and personal. Use emojis. Under 300 words.`;
    const result=await callClaude(prompt);
    setRitual(stripFormatting(result)); setRitualLoading(false);
    if(ritualVoiceOn&&ttsSupported){setIsSpeaking(true);speakText(result,()=>setIsSpeaking(false));}
  };

  const generateAstroReport=async()=>{
    setAstroLoading(true); setAstroReport("");
    const manifestThemes=journal.filter(e=>e.wish).map(e=>e.wish).slice(0,8).join("; ");
    const prompt=`You are a master Vedic and Western astrologer. Provide a DETAILED astrology journey analysis for:
Name: ${user.name}
Date of Birth: ${user.dob}
Zodiac Sign: ${zodiac}
${user.birthTime?`Birth Time: ${user.birthTime}`:""}
${user.birthPlace?`Birth Place: ${user.birthPlace}`:""}
Their manifestation themes (from journal): ${manifestThemes||"love, abundance, growth"}

Provide a rich, detailed astrological analysis covering:

🌟 SOUL PROFILE
- Sun sign core traits & life mission for ${user.name}
- Key strengths & shadow work areas

🌙 EMOTIONAL LANDSCAPE  
- Moon sign energy (calculate from DOB) & emotional patterns
- How ${user.name} processes feelings & what nurtures them

⬆️ RISING & OUTER PLANETS
- Likely rising sign based on birth details
- Saturn lessons & karmic themes
- Jupiter blessings & expansion areas

💫 CURRENT COSMIC WEATHER (2026)
- Key transits affecting ${zodiac} right now
- What the universe is preparing ${user.name} for
- Best areas to focus manifestation energy

🔮 MANIFESTATION POWER ZONES
- Which life areas are most magnetically active
- Ideal manifestation windows based on their chart
- Their personal manifestation archetype

🌺 SPIRITUAL GIFTS & LIFE PATH
- Natural psychic/intuitive abilities
- Soul purpose clues from the stars
- A personal cosmic message for ${user.name}

Be deeply personal, specific, and empowering. Use ${user.name}'s name frequently. 400-500 words.`;
    const result=await callClaude(prompt);
    setAstroReport(stripFormatting(result)); setAstroLoading(false);
  };

  const drawAffirmation=()=>setAffirmation(AFFIRMATIONS[Math.floor(Math.random()*AFFIRMATIONS.length)]);

  const bgGrad=`linear-gradient(135deg,${moodObj.bg[0]} 0%,${moodObj.bg[1]} 60%,${moodObj.bg[2]}22 100%)`;

  if(!user) return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f0a1e,#1a0a3e,#2d1058)",fontFamily:"'Georgia',serif"}}>
      <StarField/><OnboardingScreen onDone={handleOnboard}/>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:bgGrad,fontFamily:"'Georgia',serif",color:"#e9d5ff",transition:"background 1s ease",position:"relative"}}>
      <StarField/>
      {particles.map(p=><Particle key={p.id} x={p.x} y={p.y} onDone={()=>setParticles(ps=>ps.filter(x=>x.id!==p.id))}/>)}

      {/* Header */}
      <div style={{position:"relative",zIndex:10,textAlign:"center",padding:"28px 20px 0"}}>
        <div style={{fontSize:36,marginBottom:4}}>🔮</div>
        <h1 style={{fontSize:22,fontWeight:700,color:moodObj.accent,margin:0,textShadow:`0 0 20px ${moodObj.accent}`}}>Cosmic Manifestation</h1>
        <p style={{color:"#c4b5fd",fontSize:13,margin:"4px 0 0"}}>Welcome back, {user.name} · {zodiac}</p>
        {ttsSupported&&isSpeaking&&(
          <div style={{display:"inline-flex",alignItems:"center",gap:6,marginTop:8,background:"rgba(124,58,237,0.3)",borderRadius:20,padding:"4px 14px",fontSize:12,color:"#c4b5fd"}}>
            <span style={{animation:"spin 1s linear infinite",display:"inline-block"}}>🔊</span> Speaking your spell...
            <button onClick={()=>{window.speechSynthesis.cancel();setIsSpeaking(false);}} style={{...btnStyle,padding:"2px 8px",fontSize:11,background:"rgba(255,255,255,0.15)",marginLeft:4}}>stop</button>
          </div>
        )}
      </div>

      {/* Mood */}
      <div style={{position:"relative",zIndex:10,display:"flex",justifyContent:"center",gap:8,padding:"16px 16px 0",flexWrap:"wrap"}}>
        {MOODS.map((m,i)=>(
          <button key={m.label} onClick={()=>setMood(i)} style={{...btnStyle,padding:"7px 14px",fontSize:13,background:mood===i?`linear-gradient(135deg,${m.bg[1]},${m.bg[2]}66)`:"rgba(255,255,255,0.07)",border:mood===i?`1.5px solid ${m.accent}`:"1.5px solid rgba(255,255,255,0.12)",boxShadow:mood===i?`0 0 14px ${m.accent}55`:"none"}}>{m.emoji} {m.label}</button>
        ))}
      </div>

      {/* Tabs */}
      <div style={{position:"relative",zIndex:10,display:"flex",justifyContent:"center",gap:6,padding:"14px 16px 0",flexWrap:"wrap"}}>
        {[["manifest","✨ Manifest"],["rituals","🌙 Rituals"],["astrology","🪐 Astrology"],["journal","📖 Journal"]].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{...btnStyle,padding:"8px 16px",fontSize:13,background:tab===key?"linear-gradient(135deg,#7c3aed,#db2777)":"rgba(255,255,255,0.07)",border:tab===key?"none":"1px solid rgba(255,255,255,0.15)"}}>{label}</button>
        ))}
      </div>

      <div style={{position:"relative",zIndex:10,maxWidth:660,margin:"0 auto",padding:"24px 16px 40px"}}>

        {/* ── MANIFEST TAB ── */}
        {tab==="manifest"&&(
          <div>
            {/* Affirmation */}
            <div style={{textAlign:"center",marginBottom:22}}>
              {affirmation?(
                <div style={{background:"rgba(255,255,255,0.07)",border:`1px solid ${moodObj.accent}55`,borderRadius:16,padding:"14px 20px",color:moodObj.accent,fontSize:15,fontStyle:"italic",animation:"pulse 3s infinite",position:"relative"}}>
                  {affirmation}
                  {ttsSupported&&<button onClick={()=>speakText(affirmation)} style={{...btnStyle,position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",padding:"4px 10px",fontSize:12,background:"rgba(255,255,255,0.1)"}}>🔊</button>}
                </div>
              ):(
                <button onClick={drawAffirmation} style={{...btnStyle,background:"rgba(255,255,255,0.08)",border:`1px solid ${moodObj.accent}55`,fontSize:14,color:moodObj.accent}}>🌟 Draw Today's Affirmation</button>
              )}
              {affirmation&&<button onClick={drawAffirmation} style={{...btnStyle,background:"transparent",border:"none",fontSize:12,color:"#a78bfa",marginTop:6}}>draw another</button>}
            </div>

            {/* Wish Input */}
            <div style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:20,padding:24}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                <label style={{color:moodObj.accent,fontSize:14,fontWeight:700}}>🌙 Write or speak your manifestation</label>
                <div style={{display:"flex",gap:8,alignItems:"center"}}>
                  {ttsSupported&&(
                    <label style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#a78bfa",cursor:"pointer"}}>
                      <input type="checkbox" checked={spellVoiceOn} onChange={e=>setSpellVoiceOn(e.target.checked)} style={{accentColor:"#7c3aed"}}/>
                      Auto-read spell 🔊
                    </label>
                  )}
                  {voiceSupported&&(
                    <button onClick={isListening?stopVoice:()=>startVoiceInput(setWish)} style={{...btnStyle,padding:"6px 14px",fontSize:13,background:isListening?"rgba(219,39,119,0.4)":"rgba(124,58,237,0.4)",border:`1px solid ${isListening?"#db2777":"#7c3aed"}`,animation:isListening?"pulse 1s infinite":"none"}}>
                      {isListening?"🛑 Stop":"🎙️ Speak"}
                    </button>
                  )}
                </div>
              </div>
              {isListening&&<div style={{color:"#f9a8d4",fontSize:13,marginBottom:8,textAlign:"center",animation:"pulse 1s infinite"}}>🎙️ Listening... speak your wish clearly</div>}
              <textarea value={wish} onChange={e=>{setWish(e.target.value);setReleased(false);setSpell("");}} placeholder="I am calling in... / I manifest... / My deepest desire is..." style={{...inputStyle,minHeight:110,resize:"vertical",lineHeight:1.7}}/>
              <button ref={btnRef} onClick={handleRelease} disabled={!wish.trim()||spellLoading} style={{...btnStyle,marginTop:14,width:"100%",fontSize:15,background:"linear-gradient(135deg,#7c3aed,#db2777)",opacity:(!wish.trim()||spellLoading)?0.5:1,cursor:(!wish.trim()||spellLoading)?"not-allowed":"pointer",animation:wish.trim()?"pulse 3s infinite":"none"}}>
                {spellLoading?"✨ The universe is listening...":released?"🔮 Cast Again":"✨ Send to the Universe"}
              </button>
            </div>

            {/* Spell Result */}
            {(spellLoading||spell)&&(
              <div style={{marginTop:20,background:"rgba(124,58,237,0.15)",backdropFilter:"blur(12px)",border:"1px solid #7c3aed55",borderRadius:20,padding:24}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
                  <div style={{color:"#c4b5fd",fontSize:13,fontWeight:700}}>🔮 YOUR PERSONAL SPELL</div>
                  {spell&&ttsSupported&&(
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{setIsSpeaking(true);speakText(spell,()=>setIsSpeaking(false));}} style={{...btnStyle,padding:"5px 12px",fontSize:12,background:"rgba(124,58,237,0.4)"}}>🔊 Read Spell Aloud</button>
                      {isSpeaking&&<button onClick={()=>{window.speechSynthesis.cancel();setIsSpeaking(false);}} style={{...btnStyle,padding:"5px 12px",fontSize:12,background:"rgba(255,255,255,0.1)"}}>⏹ Stop</button>}
                    </div>
                  )}
                </div>
                {spellLoading?(
                  <div style={{color:"#a78bfa",fontSize:14,textAlign:"center",padding:20}}>
                    <div style={{fontSize:28,marginBottom:8,animation:"spin 2s linear infinite",display:"inline-block"}}>✨</div>
                    <div>Weaving your spell from the cosmos...</div>
                  </div>
                ):(
                  <>
                    <div style={{color:"#e9d5ff",fontSize:14,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{spell}</div>
                    <div style={{marginTop:16,padding:"12px 16px",background:"rgba(219,39,119,0.15)",borderRadius:12,border:"1px solid rgba(219,39,119,0.3)"}}>
                      <div style={{color:"#f9a8d4",fontSize:12,fontWeight:700,marginBottom:4}}>🎙️ HOW TO USE YOUR SPELL</div>
                      <div style={{color:"#e9d5ff",fontSize:13,lineHeight:1.7}}>Find the incantation above and recite it aloud 3 times — once at dawn, once at noon, once at night. Press "Read Spell Aloud" to hear it spoken for you. Let your voice carry your intentions to the universe. 🌙</div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── RITUALS TAB ── */}
        {tab==="rituals"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
              <p style={{color:"#c4b5fd",fontSize:14,margin:0}}>Choose a cosmic event for your personalised ritual</p>
              {ttsSupported&&(
                <label style={{display:"flex",alignItems:"center",gap:5,fontSize:12,color:"#a78bfa",cursor:"pointer"}}>
                  <input type="checkbox" checked={ritualVoiceOn} onChange={e=>setRitualVoiceOn(e.target.checked)} style={{accentColor:"#7c3aed"}}/>
                  Auto-read ritual 🔊
                </label>
              )}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {ASTRO_EVENTS.map(ev=>(
                <button key={ev.name} onClick={()=>getAstroRitual(ev)} style={{...btnStyle,textAlign:"left",padding:"16px 20px",width:"100%",background:selEvent?.name===ev.name?"rgba(124,58,237,0.3)":"rgba(255,255,255,0.06)",border:selEvent?.name===ev.name?"1.5px solid #a78bfa":"1px solid rgba(255,255,255,0.12)",borderRadius:16}}>
                  <div style={{color:moodObj.accent,fontWeight:700,fontSize:15}}>🌙 {ev.name}</div>
                  <div style={{color:"#a78bfa",fontSize:13,marginTop:3}}>{ev.date} · {ev.sign}</div>
                  <div style={{color:"#c4b5fd",fontSize:12,marginTop:2}}>{ev.meaning}</div>
                </button>
              ))}
            </div>
            {(ritualLoading||ritual)&&(
              <div style={{marginTop:20,background:"rgba(124,58,237,0.15)",border:"1px solid #7c3aed55",borderRadius:20,padding:24}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
                  <div style={{color:"#c4b5fd",fontSize:13,fontWeight:700}}>🌟 YOUR PERSONALISED RITUAL</div>
                  {ritual&&ttsSupported&&(
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{setIsSpeaking(true);speakText(ritual,()=>setIsSpeaking(false));}} style={{...btnStyle,padding:"5px 12px",fontSize:12,background:"rgba(124,58,237,0.4)"}}>🔊 Read Aloud</button>
                      {isSpeaking&&<button onClick={()=>{window.speechSynthesis.cancel();setIsSpeaking(false);}} style={{...btnStyle,padding:"5px 12px",fontSize:12,background:"rgba(255,255,255,0.1)"}}>⏹ Stop</button>}
                    </div>
                  )}
                </div>
                {ritualLoading?(
                  <div style={{color:"#a78bfa",fontSize:14,textAlign:"center",padding:20}}>
                    <div style={{fontSize:28,marginBottom:8,animation:"spin 2s linear infinite",display:"inline-block"}}>🌙</div>
                    <div>Reading the stars for {user.name}...</div>
                  </div>
                ):(
                  <div style={{color:"#e9d5ff",fontSize:14,lineHeight:1.9,whiteSpace:"pre-wrap"}}>{ritual}</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── ASTROLOGY TAB ── */}
        {tab==="astrology"&&(
          <div>
            {/* Profile Card */}
            <div style={{background:"rgba(255,255,255,0.06)",border:`1px solid ${moodObj.accent}44`,borderRadius:20,padding:24,marginBottom:20,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:8}}>🪐</div>
              <div style={{color:moodObj.accent,fontSize:20,fontWeight:700}}>{user.name}'s Cosmic Profile</div>
              <div style={{color:"#c4b5fd",fontSize:14,marginTop:6}}>{zodiac}</div>
              {user.birthTime&&<div style={{color:"#a78bfa",fontSize:13,marginTop:2}}>Born at {user.birthTime}</div>}
              {user.birthPlace&&<div style={{color:"#a78bfa",fontSize:13,marginTop:2}}>📍 {user.birthPlace}</div>}
              <div style={{color:"#7c3aed",fontSize:13,marginTop:2}}>{new Date(user.dob).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}</div>
              <button onClick={generateAstroReport} disabled={astroLoading} style={{...btnStyle,marginTop:16,background:"linear-gradient(135deg,#7c3aed,#0e7490)",fontSize:14,opacity:astroLoading?0.6:1,padding:"12px 28px"}}>
                {astroLoading?"🌟 Channelling the cosmos...":"🔮 Generate My Full Astrology Report"}
              </button>
            </div>

            {(astroLoading||astroReport)&&(
              <div style={{background:"rgba(14,116,144,0.15)",border:"1px solid rgba(14,116,144,0.4)",borderRadius:20,padding:24}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
                  <div style={{color:"#a5f3fc",fontSize:14,fontWeight:700}}>🌟 {user.name.toUpperCase()}'S ASTROLOGY JOURNEY</div>
                  {astroReport&&ttsSupported&&(
                    <div style={{display:"flex",gap:8}}>
                      <button onClick={()=>{setIsSpeaking(true);speakText(astroReport,()=>setIsSpeaking(false));}} style={{...btnStyle,padding:"5px 12px",fontSize:12,background:"rgba(14,116,144,0.4)"}}>🔊 Read Report</button>
                      {isSpeaking&&<button onClick={()=>{window.speechSynthesis.cancel();setIsSpeaking(false);}} style={{...btnStyle,padding:"5px 12px",fontSize:12,background:"rgba(255,255,255,0.1)"}}>⏹ Stop</button>}
                    </div>
                  )}
                </div>
                {astroLoading?(
                  <div style={{color:"#a5f3fc",fontSize:14,textAlign:"center",padding:24}}>
                    <div style={{fontSize:32,marginBottom:10,animation:"spin 3s linear infinite",display:"inline-block"}}>🪐</div>
                    <div>Mapping your cosmic blueprint...</div>
                    <div style={{fontSize:12,color:"#7c3aed",marginTop:8}}>Reading your natal chart, transits & soul path</div>
                  </div>
                ):(
                  <div style={{color:"#e9d5ff",fontSize:14,lineHeight:2,whiteSpace:"pre-wrap"}}>{astroReport}</div>
                )}
              </div>
            )}

            {/* Manifestation Themes */}
            {journal.filter(e=>e.wish).length>0&&(
              <div style={{marginTop:20,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:20,padding:20}}>
                <div style={{color:moodObj.accent,fontSize:13,fontWeight:700,marginBottom:12}}>🌺 YOUR MANIFESTATION ENERGY PATTERNS</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                  {journal.filter(e=>e.wish).slice(0,6).map(e=>(
                    <div key={e.id} style={{background:"rgba(124,58,237,0.2)",border:"1px solid rgba(124,58,237,0.4)",borderRadius:20,padding:"5px 12px",fontSize:12,color:"#c4b5fd"}}>
                      ✨ {e.wish.slice(0,40)}{e.wish.length>40?"...":""}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── JOURNAL TAB ── */}
        {tab==="journal"&&(
          <div>
            <div style={{background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:20,padding:24,marginBottom:20}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                <label style={{color:moodObj.accent,fontSize:14,fontWeight:700}}>📖 Today's Reflection</label>
                {voiceSupported&&(
                  <button onClick={isListening?stopVoice:()=>startVoiceInput(setJournalEntry)} style={{...btnStyle,padding:"6px 14px",fontSize:13,background:isListening?"rgba(219,39,119,0.4)":"rgba(124,58,237,0.4)",border:`1px solid ${isListening?"#db2777":"#7c3aed"}`,animation:isListening?"pulse 1s infinite":"none"}}>
                    {isListening?"🛑 Stop":"🎙️ Speak"}
                  </button>
                )}
              </div>
              {isListening&&<div style={{color:"#f9a8d4",fontSize:13,marginBottom:8,textAlign:"center",animation:"pulse 1s infinite"}}>🎙️ Listening... speak your reflection</div>}
              <textarea value={journalEntry} onChange={e=>setJournalEntry(e.target.value)} placeholder="How are you feeling? What are you grateful for? What are you releasing?..." style={{...inputStyle,minHeight:100,resize:"vertical",lineHeight:1.7}}/>
              <button onClick={()=>{if(!journalEntry.trim())return;const entry={id:Date.now(),type:"journal",text:journalEntry,date:new Date().toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"}),mood:moodObj.label};saveJournal([entry,...journal]);setJournalEntry("");}} style={{...btnStyle,marginTop:12,background:"linear-gradient(135deg,#7c3aed,#db2777)",width:"100%"}}>
                💫 Save Entry
              </button>
            </div>
            {journal.length===0?(
              <div style={{textAlign:"center",color:"#7c3aed",padding:32,fontSize:14}}>Your cosmic journal awaits... ✨</div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:14}}>
                {journal.map(e=>(
                  <div key={e.id} style={{background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:16,padding:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:4}}>
                      <span style={{color:moodObj.accent,fontSize:12,fontWeight:700}}>{e.type==="journal"?"📖 Reflection":"✨ Manifestation"}</span>
                      <span style={{color:"#7c3aed",fontSize:12}}>{e.date} · {e.mood}</span>
                    </div>
                    <div style={{color:"#c4b5fd",fontSize:14,lineHeight:1.7}}>{e.wish||e.text}</div>
                    {e.spell&&(
                      <div style={{marginTop:10,padding:"10px 14px",background:"rgba(124,58,237,0.15)",borderRadius:10,color:"#e9d5ff",fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap"}}>
                        {e.spell.slice(0,200)}...
                        {ttsSupported&&<button onClick={()=>speakText(e.spell)} style={{...btnStyle,display:"block",marginTop:8,padding:"4px 12px",fontSize:11,background:"rgba(124,58,237,0.3)"}}>🔊 Hear spell</button>}
                      </div>
                    )}
                    <button onClick={()=>saveJournal(journal.filter(j=>j.id!==e.id))} style={{...btnStyle,background:"transparent",border:"none",color:"#7c3aed66",fontSize:11,padding:"6px 0",marginTop:6}}>remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}