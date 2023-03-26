const countries = {
    "am-ET": "Amharic",
    "ar-SA": "Arabic",
    "sq-AL": "Albanian",
    "be-BY": "Bielarus",
    "my-MM": "Burmese",
    "bem-ZM": "Bemba",
    "bi-VU": "Bislama",
    "bjs-BB": "Bajan",
    "bn-IN": "Bengali",
    "br-FR": "Breton",
    "bs-BA": "Bosnian",
    "eu-ES": "Basque",
    "ca-ES": "Catalan",
    "cop-EG": "Coptic",
    "hr-HR": "Croatian",
    "cs-CZ": "Czech",
    "nl-NL": "Dutch",
    "da-DK": "Danish",
    "dz-BT": "Dzongkha",
    "en-GB": "English",
    "et-EE": "Estonian",
    "fi-FI": "Finnish",
    "fn-FNG": "Fanagalo",
    "fo-FO": "Faroese",
    "fr-FR": "French",
    "de-DE": "German",
    "el-GR": "Greek",
    "gl-ES": "Galician",
    "gu-IN": "Gujarati",
    "ha-NE": "Hausa",
    "he-IL": "Hebrew",
    "hi-IN": "Hindi",
    "hu-HU": "Hungarian",
    "id-ID": "Indonesian",
    "is-IS": "Icelandic",
    "it-IT": "Italian",
    "ja-JP": "Japanese",
    "kk-KZ": "Kazakh",
    "km-KM": "Khmer",
    "rn-BI": "Kirundi",
    "kn-IN": "Kannada",
    "ko-KR": "Korean",
    "ku-TR": "Kurdish",
    "ky-KG": "Kyrgyz",
    "la-VA": "Latin",
    "lo-LA": "Lao",
    "lv-LV": "Latvian",
    "dv-MV": "Maldivian",
    "men-SL": "Mende",
    "mg-MG": "Malagasy",
    "mi-NZ": "Maori",
    "ms-MY": "Malay",
    "mt-MT": "Maltese",
    "ne-NP": "Nepali",
    "niu-NU": "Niuean",
    "no-NO": "Norwegian",
    "ny-MW": "Nyanja",
    "ur-PK": "Pakistani",
    "pau-PW": "Palauan",
    "fa-IR": "Persian",
    "pa-IN": "Panjabi",
    "ps-PK": "Pashto",
    "pis-SB": "Pijin",
    "pl-PL": "Polish",
    "pt-PT": "Portuguese",
    "ro-RO": "Romanian",
    "ru-RU": "Russian",
    "sg-CF": "Sango",
    "si-LK": "Sinhala",
    "es-ES": "Spanish",
    "sk-SK": "Slovak",
    "sm-WS": "Samoan",
    "sn-ZW": "Shona",
    "so-SO": "Somali",
    "sr-RS": "Serbian",
    "sv-SE": "Swedish",
    "sw-SZ": "Swahili",
    "bo-CN": "Tibetan",
    "ta-LK": "Tamil",
    "te-IN": "Telugu",
    "tet-TL": "Tetum",
    "tg-TJ": "Tajik",
    "th-TH": "Thai",
    "ti-TI": "Tigrinya",
    "tk-TM": "Turkmen",
    "tl-PH": "Tagalog",
    "tn-BW": "Tswana",
    "to-TO": "Tongan",
    "tr-TR": "Turkish",
    "uk-UA": "Ukrainian",
    "uz-UZ": "Uzbek",
    "vi-VN": "Vietnamese",
    "cy-GB": "Welsh",
    "wo-SN": "Wolof",
    "xh-ZA": "Xhosa",
    "yi-YD": "Yiddish",
    "zu-ZA": "Zulu"
}

// Declaring all the Html classes, Id files from 
const selectTag = document.querySelectorAll("select");
translationbtn = document.querySelector("button");
const mytext = document.querySelector(".mytext")
const replacetext = document.querySelector(".replacetext")
const exchange = document.querySelector(".exchange")
const icon = document.querySelectorAll(".row i")



// Select tag for all language from countries variable that's why using forEach element
selectTag.forEach((tag, id) =>{
    //Adding all countries from the variables in our text editor section without writing html section
    for (const country_code in countries) {



        // Selecting English to Bangla in editor for first look
        let selected;
        if (id ==0 && country_code ==  "en-GB"){
            selected = "selected"
        } else if(id ==1 && country_code ==  "bn-IN"){
            selected = "selected";
        }


        //Adding all countries from the variables in our text editor section without writing html section
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend",option); 

    
    }        
})



// Adding button tag and change the language 
translationbtn.addEventListener ("click", ()=>{ 
    let text = mytext.value;
    translateFrom = selectTag[0].value; 
    translateTo = selectTag[1].value;
    if(!text)return;
    

    //API selecting for change the language from countries variable 
    let apiurl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
    fetch(apiurl).then(res => res.json()).then(data =>{
        replacetext.value =data.responseData.translatedText;
        replacetext.setAttribute("placeholder", "Translating...")
    });
})



// exchange the text from english to bangla by click the arrow of exchange:
exchange.addEventListener("click",()=>{
    // Text will change when you click on arrow
    let text1 = mytext.value
    mytext.value = replacetext.value;
    replacetext.value = text1;
    // Select langauge will exchange when you click on the arrow
    LangugeExchange = selectTag[0].value
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = LangugeExchange;   

})


icon.forEach(icons =>{
    icons.addEventListener("click",({target})=>{
        if(target.classList.contains("fa-copy")){
            // It's copy tag work
            if(target.id == "from"){
                navigator.clipboard.writeText(mytext.value);

            } else {
                navigator.clipboard.writeText(replacetext.value);
            }

        } else{
            let utterance;
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(mytext.value)
                utterance.lang = selectTag[0].value;
               

            } else {
                utterance = new SpeechSynthesisUtterance(replacetext.value);
                utterance.lang = selectTag[1].value;
                
            }
            speechSynthesis.speak(utterance);
        }
    })

})






























// const selectTag = document.querySelectorAll("select");
// selectTag.forEach((tag, id) =>{
//   for (const country_code in countries) {
//     let Done;
//     if(id ==0 && country_code == "en-GB"){
//         Done = "Done";
//     }else if(id ==1 && country_code == "bn-IN"){
//         Done = "Done";
//     }
//   let option = `<option value ="${country_code}" ${Done}>${countries[country_code]}</option>`
//   tag.insertAdjacentHTML("beforeend",option); 
  
// }
// })