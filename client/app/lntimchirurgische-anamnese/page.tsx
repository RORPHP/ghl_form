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
            
            <h4 className="sub-heading text-center">lntimchirurgische Anamnese</h4>

            <BasicDetails />

            <p>Liebe Patientin,</p>
            <p>Gerne möchte ich mir einen genauen Überblick über Ihre intimchirurgischen Bedürfnisse, Wünsche und Probleme schaffen und auch einen Überblick über ihren Gesundheitszustand verschaffen. Dies dient im Falle einer Operation ihrer Sicherheit. Alle Angaben werden von mir selbstverständlich streng vertraulich behandelt.</p>
            <ul className="one-col-row"> 
                <li><strong>Wofür interessieren Sie sich?</strong></li>
                <li>
                    <input type="checkbox" value="Korrektur der Inneren (kleinen) Schamlippen" onClick={(e) => onCheckboxChange(e,'Wofur interessieren',true)}/>
                    <label>Korrektur der Inneren (kleinen) Schamlippen</label>
                </li>
                <li>
                    <input type="checkbox" value="Korrektur der Äußeren (großen) Schamlippen" onClick={(e) => onCheckboxChange(e,'Wofur interessieren',true)}/>
                    <label>Korrektur der Äußeren (großen) Schamlippen </label>
                </li>
                <li>
                    <input type="checkbox" value="Venushügelkorrektur" onClick={(e) => onCheckboxChange(e,'Wofur interessieren',true)}/>
                    <label>Venushügelkorrektur</label>
                </li>
            </ul>
            <ul className="one-col-row"> 
                <li><strong>Haben oder hatten Sie eine der folgenden Beschwerden?</strong></li>
                <li>
                    <input type="checkbox" value="Vermehrte Fettgewebsansammlung am Venushügel?" onClick={(e) => onCheckboxChange(e,'Beschwerden',true)}/>
                    <label>Vermehrte Fettgewebsansammlung am Venushügel?</label>
                </li>
                <li>
                    <input type="checkbox" value="Wunde Stellen im Bereich der Leisten / des Venushügels" onClick={(e) => onCheckboxChange(e,'Beschwerden',true)}/>
                    <label>Wunde Stellen im Bereich der Leisten / des Venushügels</label>
                </li>
                <li>
                    <input type="checkbox" value="Vergrößerung der äußeren Schamlippen" onClick={(e) => onCheckboxChange(e,'Beschwerden',true)}/>
                    <label>Vergrößerung der äußeren Schamlippen</label>
                </li>
                <li>
                    <input type="checkbox" value="Vergrößerung der inneren Schamlippen" onClick={(e) => onCheckboxChange(e,'Beschwerden',true)}/>
                    <label>Vergrößerung der inneren Schamlippen</label>
                </li>
                <li>
                    <input type="checkbox" value="Asymmetrie der inneren Schamlippen" onClick={(e) => onCheckboxChange(e,'Beschwerden',true)}/>
                    <label>Asymmetrie der inneren Schamlippen</label>
                </li>
                <li>
                    <input type="checkbox" value="Veränderung der Schamlippen durch bspw. Schwangerschaft/Entbindung" onClick={(e) => onCheckboxChange(e,'Beschwerden',true)}/>
                    <label>Veränderung der Schamlippen durch bspw. Schwangerschaft/Entbindung</label>
                </li>
            </ul>
            <ul className="one-col-row"> 
                <li><strong>Haben Sie funktionelle Beeinträchtigungen im Alltag ?</strong></li>
                <li>
                    <input type="checkbox" value="Schmerzen beim Sport/Fahrrad fahren / Reiten" onClick={(e) => onCheckboxChange(e,'funktionelle Beeintrachtigungen',true)}/>
                    <label>Schmerzen beim Sport/Fahrrad fahren / Reiten</label>
                </li>
                <li>
                    <input type="checkbox" value="Schmerzen beim Geschlechtsverkehr" onClick={(e) => onCheckboxChange(e,'funktionelle Beeintrachtigungen',true)}/>
                    <label>Schmerzen beim Geschlechtsverkehr</label>
                </li>
                <li>
                    <input type="checkbox" value="Festkleben der Schamlippen im Sommer/enger Kleidung/Unterwäsche" onClick={(e) => onCheckboxChange(e,'funktionelle Beeintrachtigungen',true)}/>
                    <label>Festkleben der Schamlippen im Sommer/enger Kleidung/Unterwäsche</label>
                </li>
                <li>
                    <input type="checkbox" value="Wunde Stellen im Bereich der Schamlippen" onClick={(e) => onCheckboxChange(e,'funktionelle Beeintrachtigungen',true)}/>
                    <label>Wunde Stellen im Bereich der Schamlippen</label>
                </li>
                <li>
                    <input type="checkbox" value="Hautprobleme im Intimbereich/ an den Schamlippen" onClick={(e) => onCheckboxChange(e,'funktionelle Beeintrachtigungen',true)}/>
                    <label>Hautprobleme im Intimbereich/ an den Schamlippen</label>
                </li>
                <li>
                    <input type="checkbox" value="Andere Probleme" onClick={(e) => onCheckboxChange(e,'funktionelle Beeintrachtigungen',true,['Andere Probleme text'])}/>
                    <label>Andere Probleme:<input type="text" id={makeKey('Andere Probleme text')} className="border-input" placeholder="Andere Probleme:" onKeyUp={(e) => onTextChange(e,'Andere Probleme text','funktionelle Beeintrachtigungen','Andere Probleme')}/></label>
                </li>
            </ul>
            <ul className="one-col-row"> 
                <li><strong>Wie wichtig ist Ihnen das Aussehen/der ästhetische Aspekt?</strong></li>
                <li>
                    <input type="checkbox" value="Ästhetik steht im Vordergrund" onClick={(e) => onCheckboxChange(e,'Aussehen  asthetische Aspekt',true)}/>
                    <label>Ästhetik steht im Vordergrund</label>
                </li>
                <li>
                    <input type="checkbox" value="Die funktionellen Beschwerden stehen im Vordergrund" onClick={(e) => onCheckboxChange(e,'Aussehen  asthetische Aspekt',true)}/>
                    <label>Die funktionellen Beschwerden stehen im Vordergrund</label>
                </li>           
            </ul>
            <ul className="one-col-row"> 
                <li><strong>Wie sehr stören Sie die oben genannten Probleme?</strong></li>
                <li>
                    <input type="radio" name="oben-genannten-probleme" value="stark" onClick={(e) => onRadioChange(e,'oben genannten Probleme')}/>
                    <label>stark</label>
                </li>
                <li>
                    <input type="radio" name="oben-genannten-probleme" value="ziemlich" onClick={(e) => onRadioChange(e,'oben genannten Probleme')}/>
                    <label>ziemlich</label>
                </li>           
                <li>
                    <input type="radio" name="oben-genannten-probleme" value="ein wenig" onClick={(e) => onRadioChange(e,'oben genannten Probleme')}/>
                    <label>ein wenig</label>
                </li>           
                <li>
                    <input type="radio" name="oben-genannten-probleme" value="nicht zutreffend - ich habe kein Problem" onClick={(e) => onRadioChange(e,'oben genannten Probleme')}/>
                    <label>nicht zutreffend - ich habe kein Problem.</label>
                </li>           
            </ul>
            <ul className="date-location-row">
                <li><input type="date" placeholder="Datum" className="border-input" onChange={(e) => onTextChange(e,'Datum')}/><br />Datum</li>
                <li><input type="text" placeholder="Ort" className="border-input" onKeyUp={(e) => onTextChange(e,'Ort')}/><br />Ort</li>
                <li>
                  {/*<input type="text" placeholder="Signatur Arzt" className="border-input" /><br />Signatur Arzt*/}

                  <SignatureCanvas 
                    penColor='black' 
                    canvasProps={{width: 400, height: 200, className: 'sigCanvas'}} 
                    onEnd={(e)=>{
                      // console.log(e)
                      // console.log(formData.doc_sig.toData())
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
                  {/*<input type="text" placeholder="Signatur Patient / gesetzlicher Vertreter" className="border-input" /><br />Signatur Patient / gesetzlicher Vertreter*/}
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