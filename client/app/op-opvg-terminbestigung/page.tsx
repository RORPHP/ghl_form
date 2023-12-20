"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'
import './style.css'

export default function Page() {
  const [formData,setFormData] = React.useState({})

  const onCheckboxChange = (e,key=false,is_array=false,child_text=false,parent_key=false,parent_value=false,child_key=false) => {
    var data = formData;

    console.log(key,is_array,child_text,parent_key,child_key)

    if(parent_key){
      parent = makeKey(parent_key)
      if(!data.hasOwnProperty(parent) || data[parent].indexOf(parent_value) == -1){
          alert(`${parent_value} is required`)
          e.preventDefault();
          e.stopPropagation();
          return false
      }
    }

    if(is_array){

      if(key){
        key = makeKey(key)
        var arr = data.hasOwnProperty(key) == false ? [] :  (Array.isArray(data[key]) ? data[key] : [])
        if(e.target.checked){
          arr.push(e.target.value)

        }else{
          arr.splice(arr.indexOf(e.target.value), 1)

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }

        }

        data[key] = arr

      }else{
        key = makeKey(e.target.value)
        var arr = data.hasOwnProperty(key) == false || data.key.length == 0 ? [] :  data[key]
        if(e.target.checked){
          arr.push(e.target.value)
        }else{

          arr.splice(arr.indexOf(e.target.value), 1)

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }

        }
        data[key] = arr
      }

    }else{

      if(key){
        key = makeKey(key)
        var arr = data.hasOwnProperty(key) == false ? [] :  data[key]
        if(e.target.checked){
          data[key] = e.target.value

        }else{

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }

          delete data[key]
        }
      }else{
        key = makeKey(e.target.value)
        var arr = data.hasOwnProperty(key) == false ? [] :  data[key]
        if(e.target.checked){
          data[key] = e.target.value
        }else{

          if(child_key){
            var child = makeKey(child_key)
            delete data[child]
          }

          if(child_text){
            child_text.map((ct) => {
              ct = makeKey(ct)

              if(document.getElementById(ct) != null){
                if(document.getElementById(ct).type=='text'){
                  document.getElementById(ct).value = ''
                }else{
                  document.getElementById(ct).checked = false
                }
              }

              delete data[ct]
            })
          }
          delete data[key]
        }
      }
    }

    setFormData(data)
    console.log(data)
  }

  const onSelectChange = (e,key=false) => {

      var data = formData
      key = key ? makeKey(key) : makeKey(e.target.name)

      if(e.target.value == ""){
          if(data.hasOwnProperty(key)){
            delete data[key]
          }
      }else{
        data[key] = e.target.value
      }

      setFormData(data)

      console.log(formData)
  }

  const makeKey = (key) => {
    return key.replaceAll(' ','_').toLowerCase()
  }

  const onRadioChange = (e,key,in_array=false,parent_key=false,parent_value=false) => {
    var data = formData;

    if(parent_key){

      var parent = makeKey(parent_key)

      if(in_array){
        if(data.hasOwnProperty(parent)){
          if(data[parent].indexOf(parent_value) == -1){
            alert(`${parent_value} is required.`)
            e.preventDefault();
            e.stopPropagation();
            return false
          }
        }else{
            alert(`${parent_value} is required.`)
            e.preventDefault();
            e.stopPropagation();
            return false
        }
      }
    }

    if(key){
      if(e.target.checked){
        key = makeKey(key)

        if(!data.hasOwnProperty(key)){
          data[key] = e.target.value
        }else{
          if(e.target.value == data[key]){
            e.target.checked = false
            delete data[key]
          }else{
            data[key] = e.target.value
          }
        }

      }else{

        key = makeKey(key)
        delete data[key]
      }
    }else{
      if(e.target.checked){
        key = makeKey(e.target.value)
        if(!data.hasOwnProperty(key)){
          data[key] = e.target.value
        }else{
          if(e.target.value == data[key]){
            e.target.checked = false
            delete data[key]
          }else{
            data[key] = e.target.value
          }
        }
      }else{
        key = makeKey(e.target.value)
        delete data[key]
      }
    }

    setFormData(data)
    console.log(data)
  }

  const onTextChange = (e,key,parent_key=false,in_array=false) => {
    key = makeKey(key)
    var data = formData;

    if(parent_key){
      parent = makeKey(parent_key)
      // console.log(parent)
      if(!data.hasOwnProperty(parent)){

        if(in_array){
          alert(`${in_array} is required`)
          if(document.getElementById(key) != null){
            document.getElementById(key).value = ''
          }
          return false;
        }else{
          alert(`${parent_key} is required`)
          if(document.getElementById(key) != null){
            document.getElementById(key).value = ''
          }
          return false;
        }

      }else{
        if(in_array && data[parent].indexOf(in_array) == -1){
          alert(`${in_array} is required`)
          if(document.getElementById(key) != null){
            document.getElementById(key).value = ''
          }
          return false;
        }
      }
    }

    data[key] = e.target.value
    setFormData(data)
    console.log(data)
  }

  const HeaderElements = () => {
    return (
        <ul className="info-form">
        <li className="input-full-w">
            <label htmlFor="geschlecht">Geschlecht:</label>
            <select name="geschlecht" id="geschlecht" onChange={(e) => onSelectChange(e)}>
              <option value="">Selecteer alstublieft</option>
              <option value="Mānnlich">Mānnlich</option>
              <option value="Weiblich">Weiblich</option>
              <option value="Divers">Divers</option>
            </select>
        </li>
        <li>
            <label htmlFor="Name">Name:</label>
            <input type="text" id="Name" placeholder="Name" onKeyUp={(e) => onTextChange(e,'name')}/>
        </li>
        <li>
            <label htmlFor="Vorname">Vorname:</label>
            <input type="text" id="Vorname" placeholder="Vorname" onKeyUp={(e) => onTextChange(e,'vorname')}/>
        </li>
        <li>
            <label htmlFor="Geburtsname">Geburtsname:</label>
            <input type="text" id="Geburtsname" placeholder="Geburtsname" onKeyUp={(e) => onTextChange(e,'geburtsname')}/>
        </li>
        <li>
            <label htmlFor="Geburtsdatum">Geburtsdatum:</label>
            <input type="text" id="Geburtsdatum" placeholder="Geburtsdatum" onKeyUp={(e) => onTextChange(e,'geburtsdatum')}/>
        </li>
        <li>
            <label htmlFor="Adresse">Versicherung:</label>
            <input type="text" id="Adresse" placeholder="Versicherung" onKeyUp={(e) => onTextChange(e,'Versicherung')}/>
        </li>
        <li>
            <label htmlFor="Hausarzt">Name des Hauptversicherten:</label>
            <input type="text" id="Hausarzt" placeholder="Name des Hauptversicherten" onKeyUp={(e) => onTextChange(e,'Name des Hauptversicherten')}/>
        </li>
        <li>
            <label htmlFor="Hausarzt">Geburtsdatum des Hauptversicherten:</label>
            <input type="text" id="Hausarzt" placeholder="Geburtsdatum des Hauptversicherten" onKeyUp={(e) => onTextChange(e,'Geburtsdatum des Hauptversicherten')}/>
        </li>
        <li>
            <label htmlFor="Facharzt">Anschrit:</label>
            <input type="text" id="Facharzt" placeholder="Anschrit" onKeyUp={(e) => onTextChange(e,'Anschrit')}/>
        </li>
         <li>
            <label htmlFor="Facharzt">E-Mail:</label>
            <input type="text" id="Facharzt" placeholder="E-Mail" onKeyUp={(e) => onTextChange(e,'E-Mail`')}/>
        </li>
        <li>
            <label htmlFor="Facharzt">Telefon:</label>
            <input type="text" id="Facharzt" placeholder="Telefon" onKeyUp={(e) => onTextChange(e,'Telefon')}/>
        </li>
        <li>
            <label htmlFor="Facharzt">Handy:</label>
            <input type="text" id="Facharzt" placeholder="Handy" onKeyUp={(e) => onTextChange(e,'Handy')}/>
        </li>
        <li>
            <label htmlFor="Facharzt">Beruf:</label>
            <input type="text" id="" placeholder="Beruf" onKeyUp={(e) => onTextChange(e,'Beruf')}/>
        </li>
        <li>
            <label htmlFor="Facharzt">Anschrift Hausarzt:</label>
            <input type="text" id="" placeholder="Anschrift Hausarzt" onKeyUp={(e) => onTextChange(e,'Anschrift Hausarzt')}/>
        </li>
        <li>
            <label htmlFor="Facharzt">Anschrift einweisender Facharzt:</label>
            <input type="text" id="" placeholder="Anschrift einweisender Facharzt" onKeyUp={(e) => onTextChange(e,'Anschrift einweisender Facharzt')}/>
        </li>
          <li className="radio-row">
             <label htmlFor="raucher">Raucher?
             <input type="radio" name="raucher" value="raucher" onClick={(e) => onRadioChange(e,'raucher')}/></label>
             <label htmlFor="raucher">Ex-Raucher?
             <input type="radio" name="raucher" value="ex-raucher" onClick={(e) => onRadioChange(e,'raucher')}/></label>
         </li>
        </ul>
      )
  }

return (
  <>
    <div className="form-section">
        <form action="">
            <div className="header-logo">
                <img src="header-logo.png" alt="Image" />
            </div>
            <HeaderElements />
            <ul>
                <li>-persönlich-</li>
                <li>Herr/Frau Vorname Nachname</li>
                <li>Straße Hausnummer</li>
                <li>PLZ Ort</li>
                <li className="input-row">Frankfurt a.M., den
                <input type="text" className="border-input" placeholder="Frankfurt a.M., den" onKeyUp={(e) => onTextChange(e,'Frankfurt a M den')}/>
                </li>
            </ul>
            <p>Sehr geehrte Frau XXX / Sehr geehrter Herr XXX,</p>
            <p>Gerne möchten wir Ihnen hiermit Ihren <span className="underline">OPERATIONSTERMIN</span> am:</p>
            <p className="text-center">
            <strong>XXXX</strong>
            <br></br>
            <strong>in der Berger Klinik, Mainzer Landstraße 65,  60329 Frankfurt am Main</strong></p>
            <p>verbindlich bestätigen. Sie sind mit Ihrer Anmeldung fest in unseren Operations-Ablaufplan eingetragen. Genaue Angaben, wann Sie in der Klinik erscheinen sollen,  werden Ihnen am Tag des Operationsvorgesprächs mitgeteilt.</p>
            <p>Ihr <span className="underline">OPERATIONSVORGESPRÄCHSTERMIN</span> zur Besprechung aller offenen Fragen und Klärung weiterer Schritte erfolgt am:</p>
            <p className="text-center">
            <strong>XXXX – 00:00 Uhr</strong>
            <br></br>
            <strong>in der Praxis Dr. Berkei, Goethestrasse 25, 60313 Frankfurt am Main</strong></p>
            <p>Bitte bringen Sie zum OP-Vorgespräch <strong>alle Ergebnisse der Blutwerte</strong>, ggf. der Zusatzuntersuchungen und den Nachweis einer abgeschlossenen Folgekostenversicherung mit. Das ist die Voraussetzung dafür, dass der Eingriff durchgeführt werden kann. Des Weiteren bitten wir Sie darum, die <strong>Formulare und Aufklärungsbögen vorab auszufüllen</strong>, welche Sie am Beratungstermin erhalten haben.</p>
            <p>Weiterhin dürfen wir Sie freundlich darauf hinweisen, dass am Tag des Operationsvorgesprächs das von uns veranschlagte <strong>OP-Honorar zu begleichen ist</strong>. Dazu bieten wir Ihnen die Möglichkeit, den fälligen Betrag als Kredit- oder EC-Kartenzahlung in unserer Praxis zu bezahlen.</p>
            <p>Herzlichst, Ihr Berkei Aesthetik Team und</p>
            <p>Ihre Praxismanagerin</p>
            <div className="footer-logo">
                <img src="footer-logo.png" alt="Image" />
            </div>
       </form>
    </div>
  </>
)
}
