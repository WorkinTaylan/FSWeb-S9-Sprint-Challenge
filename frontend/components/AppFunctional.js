import React, { useState } from 'react';
import axios from 'axios';

// önerilen başlangıç stateleri
 //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
const [initialMessage, setInitialMessage] =useState('')
const [initialEmail,setInitialEmail] = useState('')
const [initialSteps,setInitialSteps] = useState(0)
const [initialIndex, setInitialIndex] = useState(4)
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  function getXY(index) {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.
    const x = (index % 3) + 1; // Get the x coordinate (remainder of initialIndex / 3)
    const y = Math.floor(index / 3)+1; // Get the y coordinate (integer division of initialIndex / 3)
    return { x, y }; // Return an object with x and y properties
  }

  
  function getXYMesaj(index) {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    const {x,y} = getXY(index);
    return (`Koordinatlar (${x}, ${y})`) 
  }

  function reset() {
    // Tüm stateleri başlangıc değerlerine sıfırlamak için bu helperı kullanın.
    setInitialEmail('');
    setInitialIndex(4);
    setInitialMessage('');
    setInitialSteps(0)
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    switch (yon) {
      case 'left':
        if (initialIndex % 3 !== 0) {
          setInitialIndex(initialIndex - 1);
          setInitialSteps(initialSteps+1);
        }
        break;
      case 'up':
        if (initialIndex >= 3) {
          setInitialIndex(initialIndex - 3);
          setInitialSteps(initialSteps+1);
        }
        break;
      case 'right':
        if (initialIndex % 3 !== 2) {
          setInitialIndex(initialIndex + 1);
          setInitialSteps(initialSteps+1);
        }
        break;
      case 'down':
        if (initialIndex <= 5) {
          setInitialIndex(initialIndex + 3);
          setInitialSteps(initialSteps+1);
        }
        break;
        default:
        break;
    }
      
    //setInitialMessage(`Koordinatlar (${initialIndex % 3}, ${Math.floor(initialIndex / 3)})`)
  }


  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz
    setInitialEmail(evt.target.value)
    //console.log(evt.target.value)
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    const username=initialEmail.split("@")[0];
    setInitialMessage(` ${username} #win`);

    axios.post('http://localhost:9000/api/result', {
      email: initialEmail,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 data-testid="koordinat" id="coordinates">{getXYMesaj(initialIndex)}</h3>
        <h3 id="steps">{`${initialSteps} kere ilerlediniz`}</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === initialIndex ? ' active' : ''}`}>
              {idx === initialIndex ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{initialMessage}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => sonrakiIndex('left')}>SOL</button>
        <button id="up" onClick={() => sonrakiIndex('up')}>YUKARI</button>
        <button id="right" onClick={() => sonrakiIndex('right')}>SAĞ</button>
        <button id="down" onClick={() => sonrakiIndex('down')}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit} >
        <input id="email" type="email" placeholder="email girin" value={initialEmail} onChange={onChange}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
