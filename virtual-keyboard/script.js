const textArea = document.querySelector('.use-keyboard-input');

let soundKeyEn = document.querySelector('.audio_main');
let soundKeyRu = document.querySelector('.audio_en');
let soundShift = document.querySelector('audio_shift');
let soundEnter = document.querySelector('audio_enter');
let soundCaps = document.querySelector('audio_caps');
let soundBackspace = document.querySelector('audio_backspace');


let keyPress = effect => {
    effect.animate([
        {color: 'white', background: 'rgba(255, 255, 255, 0.12)'},
        { color: 'white', background: 'rgba(255, 255, 255, 0.12)' }],
        {
            duration: 130
        })
};



const Keyboard = {
    elements: {
      main: null,
      keysContainer: null,
      keys: []
    },

  
    eventHandlers: {
      oninput: null,
      onclose: null
    },
  
    properties: {
      value: "",
      capsLock: false,
      shift: false,
      lang: 'en',
      sound: true,
      start: 0,
      end: 0,
      keyboardInput: null,  
    },
  
    init() {

      this.elements.main = document.createElement("div");
      this.elements.keysContainer = document.createElement("div");
  
      this.elements.main.classList.add("keyboard", "keyboard--hidden");
      this.elements.keysContainer.classList.add("keyboard__keys");
      this.elements.keysContainer.appendChild(this._createKeys());
  
      this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
  
      this.elements.main.appendChild(this.elements.keysContainer);
      document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
        });
      });

      element.addEventListener('click', () => {
        this.properties.start = textArea.selectionStart;
        this.properties.end = textArea.selectionEnd;
    });

    element.addEventListener("keypress", key => {
        if (key.which === 13) keyPress(document.querySelector('.btn-enter'));
        if (key.which === 32) keyPress(document.querySelector('.btn-space'));

        for (let effect of this.elements.keys) {
            if (key.key === effect.textContent) keyPress(effect);
        }
        this.properties.value += key.key;
        this.open(element.value, currentValue => {
            if (this.properties.start > element.value.length) {
                element.value += currentValue.substring(currentValue.length - 1, currentValue.length);
            }
            else {
                element.value = element.value.substring(0, this.properties.start - 1)
                    + currentValue.substring(this.properties.start - 1, this.properties.end)
                    + element.value.substring(this.properties.end - 1, element.value.length);
            }
        });
        this.properties.start++;
        this.properties.end++;
    });



    element.addEventListener('keydown', key => {
				if (key.which === 37) {
					keyPress(document.querySelector('.btn-left'));
					this.properties.start--;
					this.properties.end--;
					if (this.properties.start < 0) this.properties.start = 0;
					if (this.properties.end < 0) this.properties.end = 0;
				}

				if (key.which === 39) {
					keyPress(document.querySelector('.btn-right'));
					this.properties.start++;
					this.properties.end++;
					if (this.properties.start > this.properties.value.length) this.properties.start = this.properties.value.length;
					if (this.properties.end > this.properties.value.length) this.properties.end = this.properties.value.length;
				}

				if (key.which === 8) {
					keyPress(document.querySelector('.btn-backspace'));
					textArea.focus();
					textArea.click();
					let delta = this.properties.end - this.properties.start;
					this.properties.end -= delta;


					textArea.focus();
				}

				if (key.which === 20) {
					keyPress(document.querySelector('.caps'));
					this._toggleCapsLock();
				}

				if (key.which === 16) {
					this._toggleShift();
					keyPress(document.querySelector('.btn-shift'));
				}
			});
});
  },

  
    _createKeys() {
      const fragment = document.createDocumentFragment();
      let textarea = document.getElementById("TextArea");
      const keyLayout = [
        "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", 
        "caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\", 
        "shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter", 
        "done", "en", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", 
        "sound", "left", "space", "right"
      ];

      const keyLayoutRu = [
          "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace", 
          "caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\", 
          "shift", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter", 
          "done", "ru", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", 
          "sound", "left", "space", "right"
      ];

      const keyLayoutEnShift = [
          "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace", 
          "caps", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "{", "}", "|", 
          "shift", "A", "S", "D", "F", "G", "H", "J", "K", "L", ":", '"', "enter", 
          "done", "en", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", 
          "sound", "left", "space", "right"
      ];

      const keyLayoutRuShift = [
        "Ё", "!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace", 
        "caps", "Й", "Ц", "У", "К", "Е", "Н", "Г", "Ш", "Щ", "З", "Х", "Ъ", "/", 
        "shift", "Ф", "Ы", "В", "А", "П", "Р", "О", "Л", "Д", "Ж", "Э", "enter", 
        "done", "ru", "Я", "Ч", "С", "М", "И", "Т", "Ь", "Б", "Ю", ",", 
        "sound", "left", "space", "right"        
      ];

      let mainLayout;

      if (this.properties.lang === 'en') {
          if(this.properties.shift) {
              mainLayout = keyLayoutEnShift;
              layoutInsertLine = ["backspace", "|", "enter", "?"];
          } else {
              mainLayout = keyLayout;
              layoutInsertLine = ["backspace", "\\", "enter", "/"];
          }
      } else {
          if(this.properties.shift) {
              mainLayout = keyLayoutRuShift;
              layoutInsertLine = ["backspace", "/", "enter", ","];
          } else {
              mainLayout = keyLayoutRu;
              layoutInsertLine = ["backspace", "\\", "enter", "."]
          }
      };


  
      // Creates HTML for an icon
      const createIconHTML = (icon_name) => {
        return `<i class="material-icons">${icon_name}</i>`;
      };

  
      mainLayout.forEach(key => {
        const keyElement = document.createElement("button");
        const insertLineBreak = layoutInsertLine.indexOf(key) !== -1;

        const input = document.activeElement;

        let start = input.selectionStart;
        let end = input.selectionEnd;
  
        // Add attributes/classes
        keyElement.setAttribute("type", "button");
        keyElement.classList.add("keyboard__key");
  
        switch (key) {
          case "backspace":
            keyElement.classList.add("keyboard__key--wide", "btn-backspace");
            keyElement.innerHTML = createIconHTML("backspace");
           
            keyElement.addEventListener('click', () => {

                this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                this._triggerEvent('oninput');

                this.properties.start--;
                this.properties.end--;
                if (this.properties.start < 0) this.properties.start = 0;
                if (this.properties.end < 0) this.properties.end = 0;

                if (this.properties.volume) { document.querySelector('.audio_backspace').play(); }

                textArea.focus();
            });
  
            break;
  
          case "caps":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable", "caps");
            keyElement.innerHTML = createIconHTML("keyboard_capslock");
  
            keyElement.addEventListener("click", () => {
              this._toggleCapsLock();
              keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);


              textArea.focus();
            });    

            break;

          case "shift": {
            if (this.properties.shift) {
                keyElement.classList.add('btn-shift', 'keyboard__key--wide', 'keyboard__key--activatable', 'keyboard__key--active');
            } else {
                keyElement.classList.add('keyboard__key--wide', 'keyboard__key--activatable');
            }
            keyElement.innerHTML = createIconHTML('north');
            keyElement.setAttribute('id', 'shift');

            keyElement.addEventListener('click', () => {   
                keyElement.classList.toggle('keyboard__key--active', this.properties.shift);
                this._toggleShift();
            });

            break;
        }
          case "enter":
            keyElement.classList.add("keyboard__key--wide", "btn-enter");
            keyElement.innerHTML = createIconHTML("keyboard_return");
  
            keyElement.addEventListener("click", () => {
              this.properties.value += "\n";
              this._triggerEvent("oninput");
            });
  
            break;
  
          case "space":
            keyElement.classList.add("keyboard__key--extra-wide","btn-space");
            keyElement.innerHTML = createIconHTML("space_bar");
  
            keyElement.addEventListener("click", () => {
              this.properties.value += " ";
              this._triggerEvent("oninput");
            });
  
            break;

          case "left": 
            keyElement.classList.add("keyboard__key", "btn-left");
            keyElement.innerHTML = createIconHTML("arrow_back");

            keyElement.addEventListener('click', () => {
                if (this.properties.volume) {
                    document.querySelector('#additional-audio').play();
                }

                this.properties.start--;
                this.properties.end--;

                if (this.properties.start < 0) this.properties.start = 0;
                if (this.properties.end < 0) this.properties.end = 0;
                this.properties.start = this.properties.end;
                textArea.setSelectionRange(this.properties.start, this.properties.end);

                textArea.focus();
            });

            break;

          case "right":
            keyElement.classList.add("keyboard__key", "btn-right");
            keyElement.innerHTML = createIconHTML("arrow_forward");

            keyElement.addEventListener('click', () => {
                if (this.properties.volume) {
                    document.querySelector('#additional-audio').play();
            }

            this.properties.start++;
			this.properties.end++;

				if (this.properties.start > this.properties.value.length) this.properties.start = this.properties.value.length;
				if (this.properties.end > this.properties.value.length) this.properties.end = this.properties.value.length;
				this.properties.start = this.properties.end;
                textArea.setSelectionRange(this.properties.start, this.properties.end);
                
                textArea.focus();
        });
           
            break;

  
          case "done":
            keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
            keyElement.innerHTML = createIconHTML("check_circle");
  
            keyElement.addEventListener("click", () => {
              this.close();
              this._triggerEvent("onclose");
            });
  
            break;

          case 'en':
          case 'ru': {
            keyElement.textContent = key.toLowerCase();
            keyElement.addEventListener('click', () => {
                this._toggleLang();
            });
            break;
          }

          case 'sound': {
            keyElement.innerHTML = createIconHTML('volume_up');

            keyElement.addEventListener('click', () => {
                this.properties.volume = !this.properties.volume;
                if (this.properties.volume === false) {
                    keyElement.innerHTML = createIconHTML('volume_off');
                } else {
                    keyElement.innerHTML = createIconHTML('volume_up');
                    document.querySelector('.audio_main').play();
                }
            });

            break;

        }

          
  
          default:
            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener("click", () => {
              this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
              this._triggerEvent("oninput");
            });
      
  break;
        }
  
        fragment.appendChild(keyElement);
  
        if (insertLineBreak) {
          fragment.appendChild(document.createElement("br"));
        }
      });
  
      return fragment;
    },
  
    _triggerEvent(handlerName) {
      if (typeof this.eventHandlers[handlerName] == "function") {
        this.eventHandlers[handlerName](this.properties.value);
      }
    },

    _toggleSound() {
        this.properties.sound = !this.properties.sound;
        const sound = document.querySelector('#sound > i');

        if (this.properties.sound) {
            sound.textContent = 'volume_up';
        } else {
            sound.textContent = 'volume_off';
        }
    },


    changeLayot() {
        this.elements.keysContainer.innerHTML = '';
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');
        this.properties.capsLock === this.properties.capsLock;
      },

    _toggleLang() {
        this.properties.lang = this.properties.lang === 'en' ? 'ru' : 'en';
        this.changeLayot();
    },
  
    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        capsLockState = this.properties.capsLock;
        for (const key of this.elements.keys) {
          if (key.childElementCount === 0 && (key.textContent !== 'ru' && key.textContent !== 'en')) {
              if ((this.properties.capsLock && !this.properties.shift) ||
                  (!this.properties.capsLock && this.properties.shift)) {
                  key.textContent = key.textContent.toUpperCase();
              } else {
                  key.textContent = key.textContent.toLowerCase();
              }
          }
      }
      },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        this.changeLayot();
        for (const key of this.elements.keys) {
          if (key.childElementCount === 0 && (key.textContent !== 'ru' && key.textContent !== 'en'  && key.textContent !== 'caps')) {
              if ((this.properties.capsLock && !this.properties.shift) ||
                  (!this.properties.capsLock && this.properties.shift)) {
                  key.textContent = key.textContent.toUpperCase();
              } else {
                  key.textContent = key.textContent.toLowerCase();
              }
          }
      }
      },


  
    open(initialValue, oninput, onclose) {
      this.properties.value = initialValue || "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.remove("keyboard--hidden");
    },
  
    close() {
      this.properties.value = "";
      this.eventHandlers.oninput = oninput;
      this.eventHandlers.onclose = onclose;
      this.elements.main.classList.add("keyboard--hidden");
    }
  };
  
  window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
  });
  