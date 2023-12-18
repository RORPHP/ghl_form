"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'
import './style.css'

export default function Page() {

  const [formData,setFormData] = React.useState({})
  const [docSigRef,setDocSigRef] = React.useState(null)
  const [patientSigRef,setPatientSigRef] = React.useState(null)

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
        var arr = data.hasOwnProperty(key) == false ? [] :  data[key]
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
  
  const BasicDetails = () => {
    return (
        <>
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
                <label htmlFor="Versicherung">Versicherung:</label>
                <input type="text" id="Versicherung" placeholder="Versicherung" onKeyUp={(e) => onTextChange(e,'Versicherung')}/>
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
                <label htmlFor="Anschrit">Anschrit:</label>
                <input type="text" id="Anschrit" placeholder="Anschrit" onKeyUp={(e) => onTextChange(e,'Anschrit')}/>
            </li>  
             <li>
                <label htmlFor="E-Mail">E-Mail:</label>
                <input type="text" id="e-mail" placeholder="E-Mail" onKeyUp={(e) => onTextChange(e,'E-Mail')}/>
            </li>                
            <li>
                <label htmlFor="Telefon">Telefon:</label>
                <input type="text" id="Telefon" placeholder="Telefon" onKeyUp={(e) => onTextChange(e,'Telefon')}/>
            </li>                  
            <li>
                <label htmlFor="Handy">Handy:</label>
                <input type="text" id="Handy" placeholder="Handy" onKeyUp={(e) => onTextChange(e,'Handy')}/>
            </li>              
            <li>
                <label htmlFor="Beruf">Beruf:</label>
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
        </>
      )
  }

  return (
      <>
        <div className="form-section">
          <form action="">  
              <div className="header-logo">
                  <img src="header-logo.png" alt="Image" />
              </div> 
              <h1 className="form-heading">Einverständniserklärung zur inneren/äußeren<br /> Schamlippenkorrektur (inkl. seitliche Klitorismantelstraffung)</h1>
              
              <BasicDetails />
              
              <ul className="info-form">               
                <li className="input-full-w">
                    <label htmlFor="aufklarender_arzt">Aufklärender Arzt:</label>
                    <select name="aufklarender_arzt" id="aufklarender_arzt" onChange={(e) => onSelectChange(e)}>
                      <option value="">Selecteer alstublieft</option>
                    </select>
                </li> 
              </ul>  

              <p>Ich erkläre, dass heute mit mir über Art, Hergang, Bedeutung, mögliche Folgen und Risiken der vorgesehenen kosmetischen Operation bzw. Behandlung, sowie über das zu erwartende Operationsergebnis und die zu erwartenden bleibenden Narben mit der Ärztin/ dem Arzt ein umfassendes, abschließendes Aufklärungsgespräch geführt wurde. Ich habe die Aufklärung verstanden und konnte alle mich interessierenden Fragen an die Ärztin/ den Arzt stellen.</p>
              <p>Ich willige nach gründlicher Überlegung in den vorgesehenen kosmetischen Eingriff einschließlich der Schmerzbetäubung, sowie der erforderlichen Untersuchung und Nebeneingriffe ein. Soweit sich während der Durchführung der vorgesehenen Maßnahmen zwangsläufig Änderungen oder Erweiterung en sowie medizinische Indikationen für weitere Eingriffe ergeben sollten bin ich auch hiermit einverstanden. Auch darüber wurde ich umfassend aufgeklärt.</p>
              <p>Mir ist bewusst, dass die Gewähr, das angestrebte Ergebnis der ärztlichen Bemühungen zu erreichen, vom Arzt und seinen Assistenten nicht übernommen werden kann.</p>
              <p>Insbesondere wurde auf die Mög lichkeit folgender Komplikationen hingewiesen:</p>
              <ul className="one-col-row"> 
                  <li>
                      <input type="checkbox" value="Durchblutungs- und Wundheilungsstörungen, sekundäre Wundheilung" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Durchblutungs- und Wundheilungsstörungen, sekundäre Wundheilung</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Asymmetrie" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Asymmetrie</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Über-/Unterkorrektur" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Über-/Unterkorrektur</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Überempfindlichkeitsreaktion auf Betäubungsmittel oder Medikamente" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Überempfindlichkeitsreaktion auf Betäubungsmittel oder Medikamente</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Blutgerinnsel, Embolie, Thrombose" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Blutgerinnsel, Embolie, Thrombose</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Nachblutungen und Blutergüsse" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Nachblutungen und Blutergüsse</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Infektionen lokal oder systemisch" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Infektionen lokal oder systemisch</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Störung beim Wasserlassen" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Störung beim Wasserlassen</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Wundränder weichen auseinander (Narbendehisenz)" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Wundränder weichen auseinander (Narbendehisenz)</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Wulstige, dicke Narben (Hypertrophe Narbe, Keloid)" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Wulstige, dicke Narben (Hypertrophe Narbe, Keloid)</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Verfärbte und schmerzhafte Narben" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Verfärbte und schmerzhafte Narben</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Schwellungen, Blutergüsse" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Schwellungen, Blutergüsse</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Beeinträchtigung der Sensibilität" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Beeinträchtigung der Sensibilität</label>
                  </li>
                  <li>
                      <input type="checkbox" value="Verletzung von Nerven und Gefäßen" onClick={(e) => onCheckboxChange(e,'besondere mogliche Komplikationen',true)}/>
                      <label>Verletzung von Nerven und Gefäßen</label>
                  </li>
              </ul>  
              <ul className="date-location-row">
                <li><input type="date" placeholder="Datum" className="border-input" onChange={(e) => onTextChange(e,'Datum')}/><br />Datum</li>
                <li><input type="text" placeholder="Ort" className="border-input" onKeyUp={(e) => onTextChange(e,'Ort')}/><br />Ort</li>
                <li>
                  <SignatureCanvas 
                    penColor='black' 
                    canvasProps={{width: 400, height: 200, className: 'sigCanvas'}} 
                    onEnd={(e)=>{
                      formData.doc_sig = docSigRef.toDataURL()
                      console.log(formData)
                    }}
                    backgroundColor='white'
                    ref={(ref) => { 
                      setDocSigRef(ref)
                    }}
                  />
                  <button onClick={(e) => {
                    e.preventDefault()
                    docSigRef.clear()
                    delete formData.doc_sig
                    console.log(formData)
                  }}>Clear</button>
                </li>
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