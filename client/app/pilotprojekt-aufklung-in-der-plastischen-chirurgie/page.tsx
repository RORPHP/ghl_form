"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'
import './style.css'

export default function Page() {

  const [formData,setFormData] = React.useState({})
  const [patientSigRef,setPatientSigRef] = React.useState(null)

  const makeKey = (key) => {
    return key.replaceAll(' ','_').toLowerCase()
  }
  const onCheckboxChange = (e,key=false,is_array=false,child_text=false,parent_key=false,parent_value=false,child_key=false) => {
    var data = formData;

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


  return (
    <>
      <div className="form-section">
        <form action="">   
            <div className="header-logo">
                <img src="header-logo.png" alt="Image" />
            </div>   
            <h1 className="form-heading">PILOTPROJEKT: AUFKLÄRUNG IN DER PLASTISCHEN CHIRURGIE</h1>
            <p>Patienteneinwilligungserklärung zur Foto- und Videodokumentation auf verschiedenen Medienkanälen</p>
            <ul className="info-form">
                <li>
                    <label htmlFor="Name">Vorname:</label>
                    <input type="text" placeholder="Vorname" onKeyUp={(e) => onTextChange(e,'Vorname')}/>
                </li>                  
                <li>
                    <label htmlFor="Vorname">Nachname:</label>
                    <input type="text" placeholder="Nachname" onKeyUp={(e) => onTextChange(e,'Nachname')}/>
                </li>                  
                <li>
                    <label htmlFor="Geburtsname">Geburtsdatum:</label>
                    <input type="text" placeholder="Geburtsdatum" onKeyUp={(e) => onTextChange(e,'Geburtsdatum')}/>
                </li>                  
                <li>
                    <label htmlFor="Straße">Straße:</label>
                    <input type="text" placeholder="Straße" onKeyUp={(e) => onTextChange(e,'Strabe')}/>
                </li>                  
                <li className="input-full-w">
                    <label htmlFor="PLZ/Wohnort">PLZ/Wohnort:</label>
                    <input type="text" placeholder="PLZ/Wohnort" onKeyUp={(e) => onTextChange(e,'PLZ Wohnort')}/>
                </li>          
            </ul>    
            <p>Die Aufbereitung der Behandlungen durch Bildmaterialien sowie deren Veröffentlichung ist für die Aufklärung der Patienten sowie zur Fortentwicklung der Behandlungsmethoden unerlässlich.</p>
            <p>Ich erkläre mich damit einverstanden, dass Fotos/Videos meiner Behandlung und/ oder Operationsergebnisse angefertigt und aufbewahrt werden und dass diese fotografische Dokumentation für die Präsentation in Beratungsgesprächen, zur Veröffentlichung in sämtlichen Medien (in print- und digitaler Form, Datenbanken, Internet, Fernsehen, etc.) sowie zu wissenschaftlichen Zwecken von Frau Dr. Julia Berkei sowie ihren Mitarbeitern verwendet werden. Dies umfasst auch die Verwendung zur Werbung für ihre Behandlung sowie für derartige Veröffentlichungen. Die Bildmaterialien dürfen bearbeitet und geändert werden, soweit das Abbild dadurch nicht entstellt ist.</p> 
            <p>Ich bin darüber informiert worden, dass:</p>      
            <ol>
                <li>mein Gesicht und meine Stimme erkennbar ist (   )</li>
                <li>über die Schulter gefilmt wird, d.h. mein Körper von hinten und meine Stimme erkennbar ist (   )</li>
                <li>über die Schulter gefilmt wird, d.h. mein Körper von hinten erkennbar und meine Stimme mit Hilfe eines Spracherkennungssystems verfälscht wird (   )</li>
                <li>lediglich meine Stimme erkennbar ist (   )</li>
                <li>meine Stimme aufgenommen wird, darf aber mittels Spracherkennungssystem verfälscht werden (   )</li>
                <li>Aufnahmen von Frau Dr. Berkei (während sie mich behandelt und mit mir spricht, bei den Operationen gemacht werden, aber mein Gesicht oder meine Stimme dabei nicht erkennbar ist (   )</li>
            </ol>
            <p>Das Bildmaterial kann mit Angaben über das Krankheitsbild sowie über die Behandlungsmethoden etc. verbunden werden. Die Bilddaten bleiben anonymisiert (ohne Namen und Geburtsdatum) und lassen keinen Rückschluss auf die Person zu. Die Verwendung der Bildmaterialien ist unbefristet. Damit bin ich einverstanden.</p>
            <ul className="social-info">
                <li><strong>Instagram</strong></li>
                <li><em>Ich wäre bereit…</em></li>
                <li>auf den Instagram Profilseiten von Dr. Berkei gepostet zu werden 
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="instagram" onClick={(e) => onRadioChange(e,'auf den Instagram Profilseiten von Dr. Berkei gepostet zu werden ')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="instagram" onClick={(e) => onRadioChange(e,'auf den Instagram Profilseiten von Dr Berkei gepostet zu werden ')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li>auf den Instagram Storys von Dr. Berkei gepostet zu werden 
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="instagram1" onClick={(e) => onRadioChange(e,'auf den Instagram Storys von Dr Berkei gepostet zu werden ')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="instagram1" onClick={(e) => onRadioChange(e,'auf den Instagram Storys von Dr Berkei gepostet zu werden ')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li>mit Dr. Berkei ein Instagram Livestream zu drehen 
                <ul className="radio-btns">
                    <li>
                        <input type="radio" value="ja" name="instagram2" onClick={(e) => onRadioChange(e,'mit Dr Berkei ein Instagram Livestream zu drehen ')}/>
                        <label htmlFor="">ja</label>
                    </li>
                    <li>
                        <input type="radio" value="nein" name="instagram2" onClick={(e) => onRadioChange(e,'mit Dr Berkei ein Instagram Livestream zu drehen ')}/>
                        <label htmlFor="">nein</label>
                    </li>
                </ul>
                </li>
                <li>mein Video für Werbezwecke zur Verfügung zu stellen / freizugeben 
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="instagram3" onClick={(e) => onRadioChange(e,'mein Video fur Werbezwecke zur Verfugung zu stellen freizugeben')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="instagram3" onClick={(e) => onRadioChange(e,'mein Video fur Werbezwecke zur Verfugung zu stellen freizugeben')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li className="social-info-link"><strong>Dein Instagram</strong><input type="text" className="border-input" placeholder="Dein Instagram" onKeyUp={(e) => onTextChange(e,'Dein Instagram')}/></li>
            </ul>
            <ul className="social-info">
                <li><strong>Facebook/Meta</strong></li>
                <li><em>Ich wäre bereit...</em></li>             
                <li>auf den Facebook Profilseiten von Dr. Berkei gepostet zu werden 
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="facebook" onClick={(e) => onRadioChange(e,'auf den Facebook Profilseiten von Dr Berkei gepostet zu werden')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="facebook" onClick={(e) => onRadioChange(e,'auf den Facebook Profilseiten von Dr Berkei gepostet zu werden')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li>in der Facebook Story von Dr. Berkei gepostet zu werden
                <ul className="radio-btns">
                    <li>
                        <input type="radio" value="ja" name="facebook1" onClick={(e) => onRadioChange(e,'in der Facebook Story von Dr Berkei gepostet zu werden')}/>
                        <label htmlFor="">ja</label>
                    </li>
                    <li>
                        <input type="radio" value="nein" name="facebook1" onClick={(e) => onRadioChange(e,'in der Facebook Story von Dr Berkei gepostet zu werden')}/>
                        <label htmlFor="">nein</label>
                    </li>
                </ul>
                </li>
                <li>in der Facebook Gruppe von Dr. Berkei erwähnt zu werden
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="facebook3" onClick={(e) => onRadioChange(e,'in der Facebook Gruppe von Dr Berkei erwahnt zu werden')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="facebook3" onClick={(e) => onRadioChange(e,'in der Facebook Gruppe von Dr Berkei erwahnt zu werden')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li>meinen Content für Werbezwecke zu Verfügung zu stellen / freizugeben 
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="facebook4" onClick={(e) => onRadioChange(e,'meinen Content fur Werbezwecke zu Verfugung zu stellen freizugeben')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="facebook4" onClick={(e) => onRadioChange(e,'meinen Content fur Werbezwecke zu Verfugung zu stellen freizugeben')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li className="social-info-link"><strong>Dein Facebook</strong><input type="text" className="border-input" placeholder="Dein Facebook" onKeyUp={(e) => onTextChange(e,'Dein Facebook')}/></li>
            </ul>
            <ul className="social-info">
                <li><strong>Youtube</strong></li>
                <li><em>Ich wäre bereit…</em></li>             
                <li>ein Interview mit Dr. Berkei zu führen 
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="youtube" onClick={(e) => onRadioChange(e,'ein Interview mit Dr Berkei zu fuhren')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="youtube" onClick={(e) => onRadioChange(e,'ein Interview mit Dr Berkei zu fuhren')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li>auf dem Youtube-Kanal von Dr. berkei gepostet zu werden
                <ul className="radio-btns">
                    <li>
                        <input type="radio" value="ja" name="youtube1" onClick={(e) => onRadioChange(e,'auf dem Youtube Kanal von Dr berkei gepostet zu werden')}/>
                        <label htmlFor="">ja</label>
                    </li>
                    <li>
                        <input type="radio" value="nein" name="youtube1" onClick={(e) => onRadioChange(e,'auf dem Youtube Kanal von Dr berkei gepostet zu werden')}/>
                        <label htmlFor="">nein</label>
                    </li>
                </ul>
                </li>
                <li>mein Video für Werbezwecke zur Verfügung zu stellen (freizugeben)
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="youtube2" onClick={(e) => onRadioChange(e,'mein Video fur Werbezwecke zur Verfügung zu stellen freizugeben')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="youtube2" onClick={(e) => onRadioChange(e,'mein Video fur Werbezwecke zur Verfügung zu stellen freizugeben')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>             
                <li className="social-info-link"><strong>Dein Youtube</strong><input type="text" className="border-input" placeholder="Dein Youtube" onKeyUp={(e) => onTextChange(e,'Dein Youtube')}/></li>
            </ul>
            <ul className="social-info">
                <li><strong>Allgemein</strong></li>
                <li><em>Ich wäre bereit…</em></li>             
                <li>Vorher und Nachher Bilder bereit zu stellen / freizugeben
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="Allgemein" onClick={(e) => onRadioChange(e,'Vorher und Nachher Bilder bereit zu stellen freizugeben')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="Allgemein" onClick={(e) => onRadioChange(e,'Vorher und Nachher Bilder bereit zu stellen freizugeben')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>
                <li>Vorher und Nachher Bilder bereit zu stellen ohne Gesichtserkennung
                <ul className="radio-btns">
                    <li>
                        <input type="radio" value="ja" name="Allgemein1" onClick={(e) => onRadioChange(e,'Vorher und Nachher Bilder bereit zu stellen ohne Gesichtserkennung')}/>
                        <label htmlFor="">ja</label>
                    </li>
                    <li>
                        <input type="radio" value="nein" name="Allgemein1" onClick={(e) => onRadioChange(e,'Vorher und Nachher Bilder bereit zu stellen ohne Gesichtserkennung')}/>
                        <label htmlFor="">nein</label>
                    </li>
                </ul>
                </li>
                <li>Rabattcode, Behandlungstipps & Gutscheine? Wir schicken Ihnen
                    <ul className="radio-btns">
                        <li>
                            <input type="radio" value="ja" name="Allgemein2" onClick={(e) => onRadioChange(e,'Vorher und Nachher Bilder bereit zu stellen ohne Gesichtserkennung')}/>
                            <label htmlFor="">ja</label>
                        </li>
                        <li>
                            <input type="radio" value="nein" name="Allgemein2" onClick={(e) => onRadioChange(e,'Vorher und Nachher Bilder bereit zu stellen ohne Gesichtserkennung')}/>
                            <label htmlFor="">nein</label>
                        </li>
                    </ul>
                </li>             
                <li>gerne unseren Newsletter zu.</li>             
                <li className="social-info-link"><strong>E-Mail</strong><input type="text" className="border-input" placeholder="E-Mail" onKeyUp={(e) => onTextChange(e,'E Mail')}/></li>
            </ul>
            <p>Hiermit erkläre ich mich bereit, bei der Produktion unter Verzicht auf eine Vergütung mitzuwirken. Ich räume Dr. Berkei exklusiv und ohne zeitliche, räumliche und inhaltliche Begrenzung das Recht ein, sämtliche von mir im Rahmen des vorgenannten Projektes angefertigten Bild- und Tonaufnahmen in den oben genannten Medien zu nutzen.
            </p>
            <p>          
             Die Einräumung der vorgenannten Rechte erfolgt unter der Voraussetzung, dass die Verwendung der erwähnten Materialien nicht sinnentstellend ist. Ich wurde über das Vorhaben sowie den Umfang des geplanten Verwendungszwecks der fotografischen Dokumentation meiner Behandlung aufgeklärt.
            </p>
            <ul className="date-location-row">
                <li><input type="date" placeholder="Datum" className="border-input" onChange={(e) => onTextChange(e,'Datum')}/><br />Datum</li>
                <li><input type="text" placeholder="Ort" className="border-input" onKeyUp={(e) => onTextChange(e,'Ort')}/><br />Ort</li>
                <li>
                  <SignatureCanvas
                    penColor='black'
                    canvasProps={{width: 400, height: 200, className: 'sigCanvas'}}
                    onEnd={(e)=>{
                      // console.log(e)
                      formData.patient_sig = patientSigRef.toDataURL()
                      console.log(formData)
                    }}
                    backgroundColor='white'
                    ref={(ref) => {
                      setPatientSigRef(ref)
                    }}
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      patientSigRef.clear()
                      delete formData.patient_sig
                      console.log(formData)
                    }}>Clear</button>
                </li>
            </ul>   
            <div className="footer-logo">
                <img src="footer-logo.png" alt="Image" />
            </div>     

        </form>
      </div>
    </>
  )
}
