"use client"
import * as React from "react";

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

  const makeKey = (key) => {
    return key.replaceAll(' ','_').toLowerCase()
  }

  const HeaderElements = () => {
    return (
        <ul className="first-input-row">
            <li>
                <input type="checkbox" id="Zahlung" value="Zahlung erfolgt" onClick={(e) => onCheckboxChange(e,false)}/>
                <label htmlFor="Zahlung">Zahlung erfolgt</label>
            </li>
            <li>
                <input type="checkbox" id="Befunde" value="Befunde vollständig" onClick={(e) => onCheckboxChange(e,false)}/>
                <label htmlFor="Befunde">Befunde vollständig</label>
            </li>
            <li>
                <input type="checkbox" id="Allergien" value="Allergien" onClick={(e) => onCheckboxChange(e,false)}/>
                <label htmlFor="Allergien">Allergien</label>
            </li>
            <li>
                <input type="checkbox" id="SocialMedia" value="Social Media" onClick={(e) => onCheckboxChange(e,false)}/>
                <label htmlFor="SocialMedia">Social Media</label>
            </li>
            <li>
                <input type="checkbox" id="Concierge" value="Concierge" onClick={(e) => onCheckboxChange(e,false)}/>
                <label htmlFor="Concierge">Concierge</label>
            </li>
            <li>
                <input type="checkbox" id="star" value="⭐" onClick={(e) => onCheckboxChange(e,'star')}/>
                <label htmlFor="star">⭐</label>
            </li>
            <li>
                <input type="checkbox" id="eye" value="👁️" onClick={(e) => onCheckboxChange(e,'eye')}/>
                <label htmlFor="eye">👁️</label>
            </li>
        </ul>
      )
  }
    
  const NameAndOtherDetails = () => {
    return (
          <>
            <ul className="info-form">
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
              <li className="address">
                  <label htmlFor="Adresse">Adresse:</label>
                  <input type="text" id="Adresse" placeholder="Adresse" onKeyUp={(e) => onTextChange(e,'adresse')}/>
              </li>                  
              <li>
                  <label htmlFor="Hausarzt">Hausarzt:</label>
                  <input type="text" id="Hausarzt" placeholder="Hausarzt" onKeyUp={(e) => onTextChange(e,'hausarzt')}/>
              </li>                  
              <li>
                  <label htmlFor="Facharzt">Facharzt:</label>
                  <input type="text" id="Facharzt" placeholder="Facharzt" onKeyUp={(e) => onTextChange(e,'facharzt')}/>
              </li>                  
          </ul> 
          <ul className="two-col-row">
              <li>
                  <input type="checkbox" value="Ästhetische Indikation" onClick={(e) => onCheckboxChange(e,false)}/>
                  <label>Ästhetische Indikation</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Medizinische Indikation" onClick={(e) => onCheckboxChange(e,false)}/>
                  <label>Medizinische Indikation</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="beratender Arzt" onClick={(e) => onCheckboxChange(e,false,false,['beratender Arzt text'])}/>
                  <label> beratender Arzt<input type="text" id={makeKey('beratender Arzt text')} className="border-input" placeholder="beratender Arzt" onKeyUp={(e) => onTextChange(e,'beratender Arzt text','beratender Arzt')}/></label>
              </li>
              <li>
                  <input type="checkbox" id="" value="beratende Mitarbeiterin" onClick={(e) => onCheckboxChange(e,false,false,['beratende Mitarbeiterin text'])}/>
                  <label>beratende Mitarbeiterin:<input type="text" id={makeKey('beratende Mitarbeiterin text')} className="border-input" placeholder="beratende Mitarbeiterin" onKeyUp={(e) => onTextChange(e,'beratende Mitarbeiterin text','beratende Mitarbeiterin')}/></label>
              </li>
              <li>
                  <input type="radio" name="raucher" value="Raucher" onClick={(e) => onRadioChange(e,'raucher')}/>
                  <label>Raucher</label>
              </li>
              <li>
                  <input type="radio" name="raucher" value="Ex-Raucher" onClick={(e) => onRadioChange(e,'raucher')}/>
                  <label>Ex-Raucher</label>
              </li>                  
          </ul>
        </>
      )
  }

  const TopForm = () => {
    return (
          <>
            <h4 className="sub-heading">Benötigte Befunde:</h4> 
            <ul className="one-col-row">
              <li>
                  <input type="checkbox" value="HNO-Untersuchung mit Allergie-Testung" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>HNO-Untersuchung mit Allergie-Testung</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="HNO Rhinomanometrie" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>HNO Rhinomanometrie</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="CT Nase + NNH + Befundung" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>CT Nase + NNH + Befundung</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Sichtfeldmessung, Visusbestimmung (Ophthalmologie)" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>Sichtfeldmessung, Visusbestimmung (Ophthalmologie)</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Hautscreening (Dermatologie)" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>Hautscreening (Dermatologie)</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Sonographie Brust (Gynäkologie, Radiologie)" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>Sonographie Brust (Gynäkologie, Radiologie)</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Sonographie vordere Abdominalwand" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label> Sonographie vordere Abdominalwand</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Hormonstatus (Hausarzt)" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>Hormonstatus (Hausarzt)</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Röntgen Handskelett" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>Röntgen Handskelett</label>
              </li>                  
          </ul> 
          <h4 className="sub-heading">Vorerkrankungen: (X)</h4>  
          <ul className="two-col-row">                
              <li>
                  <input type="checkbox" id="" value="Keine" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Keine</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="aHT, KHK" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>aHT, KHK</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Schilddrüsenfunktionsstörung" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Schilddrüsenfunktionsstörung</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Diabetes Mellitus" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Diabetes Mellitus</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Leberfunktionsstörung" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Leberfunktionsstörung</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Nierenfunktionsstörung" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Nierenfunktionsstörung</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Blutungsneigung" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Blutungsneigung</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Thromboseneigung / Z.n. TVT" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true)}/>
                  <label>Thromboseneigung / Z.n. TVT</label>
              </li>                  
              <li className="full-row">
                  <input type="checkbox" id="" value="Sonstige" onClick={(e) => onCheckboxChange(e,'Vorerkrankungen',true,['Vorerkrankungen Sonstige text'])}/>
                  <label>Sonstige: <input type="text" id={makeKey('Vorerkrankungen Sonstige text')} className="border-input" placeholder="Sonstige:" onKeyUp={(e) => onTextChange(e,'Vorerkrankungen Sonstige text','Vorerkrankungen','Sonstige')}/></label>
              </li>                  
          </ul>
          <h4 className="sub-heading">Allergien: (X)</h4>  
          <ul className="two-col-row">                   
              <li>
                  <input type="checkbox" id="" value="Keine" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Keine</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Penicillin" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Penicillin</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Novaminsulfon (Metamizol)" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Novaminsulfon (Metamizol)</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Ibuprofen (NSAR)" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Ibuprofen (NSAR)</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Wespe" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Wespe</label>
              </li>                  
              <li>
                  <input type="checkbox" id="" value="Soja" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Soja</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Latex" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                  <label>Latex</label>
              </li> 
              <li className="full-row">
                  <input type="checkbox" id="" value="Sonstige" onClick={(e) => onCheckboxChange(e,'Allergien',true,['Allergien Sonstige text'])}/>
                  <label>Sonstige: <input id={makeKey('Allergien Sonstige text')} type="text" className="border-input" placeholder="Sonstige:" onKeyUp={(e) => onTextChange(e,'Allergien Sonstige text','Allergien','Sonstige')}/></label>
              </li>                                                       
                          
          </ul>  
          <h4 className="sub-heading">Hausmedikation: (X)</h4>  
          <ul className="two-col-row">
              <li>
                  <input type="checkbox" value="Keine" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                  <label>Keine</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Blutdrucksenker" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                  <label>Blutdrucksenker</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Metformin" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                  <label>Metformin</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Insulin" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                  <label>Insulin</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Blutverdünner (ASS, Marcumar, Eliquis)" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                  <label>Blutverdünner (ASS, Marcumar, Eliquis, …)</label>
              </li>
              <li>
                  <input type="checkbox" id="" value="Immunsuppressiva (MTX, Cortison, Tacrolimus)" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                  <label>Immunsuppressiva (MTX, Cortison, Tacrolimus, …)</label>
              </li>               
           
              <li className="full-row">
                  <input type="checkbox" id="" value="Sonstige" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true,['Hausmedikation Sonstige text'])}/>
                  <label>Sonstige: <input id={makeKey('Hausmedikation Sonstige text')} type="text" className="border-input" placeholder="Sonstige:" onKeyUp={(e) => onTextChange(e,'Hausmedikation Sonstige text','Hausmedikation','Sonstige')}/></label>
              </li> 
          </ul>  
          <h4 className="sub-heading">HNO-Anamnese</h4> 
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Allergie" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Allergie Pollen','Allergie Gras','Allergie Hausstaub','Allergie Milben'],false,false,'HNO Anamnese Allergie')}/>
                      <label>Allergie:</label>
                  </li>                        
              </ul>
              <ul>
                  <li>
                      <input id={makeKey('Allergie Pollen')} type="checkbox" value="Pollen" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Allergie',true,false,'HNO Anamnese','Allergie')}/>
                      <label>Pollen</label>
                  </li> 
                  <li>
                      <input id={makeKey('Allergie Gras')} type="checkbox" value="Gras" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Allergie',true,false,'HNO Anamnese','Allergie')}/>
                      <label>Gras</label>
                  </li> 
                  <li>
                      <input id={makeKey('Allergie Hausstaub')} type="checkbox" value="Hausstaub" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Allergie',true,false,'HNO Anamnese','Allergie')}/>
                      <label>Hausstaub</label>
                  </li> 
                  <li>
                      <input id={makeKey('Allergie Milben')} type="checkbox" value="Milben" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Allergie',true,false,'HNO Anamnese','Allergie')}/>
                      <label>Milben</label>
                  </li> 

              </ul>
          </div>
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Chronische Rhinitis" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true)}/>
                      <label>Chronische Rhinitis</label>
                  </li>                        
              </ul>
          </div>
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Chronische Rhinorrhoe" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true)}/>
                      <label>Chronische Rhinorrhoe</label>
                  </li> 
              </ul>
          </div>
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Pat. schnarcht nachts" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true)}/>
                      <label>Pat. schnarcht nachts</label>
                  </li> 
              </ul>
          </div>
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Chronische Nasenebenhöhlen Entzündungen" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true)}/>
                      <label>Chronische Nasenebenhöhlen Entzündungen </label>
                  </li>                        
              </ul>                   
          </div>
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Chron. Nasenspray-Abusus seit"  onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Chron Nasenspray Abusus seit Jahren text'])}/>
                      <label>Chron. Nasenspray-Abusus seit <input id={makeKey('Chron Nasenspray Abusus seit Jahren text')} type="text" className="border-input" placeholder="Jahren" onKeyUp={(e) => onTextChange(e,'Chron Nasenspray Abusus seit Jahren text','HNO Anamnese','Chron. Nasenspray-Abusus seit')}/> Jahren </label>
                  </li>                        
              </ul>                   
          </div>
          <div className="d-flex">
              <ul>
                  <li>
                      <input type="checkbox" value="Lippen-Kiefer-Gaumenspalte" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Lippe','Kiefer','harter Gaumen','weicher Gaumen'],false,false,'HNO Anamnese Lippen-Kiefer-Gaumenspalte')}/>
                      <label>Lippen-Kiefer-Gaumenspalte:</label>
                  </li>                        
              </ul>
              <ul>
                  <li>
                      <input type="checkbox" id={makeKey('Lippe')} value="Lippe" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Lippen-Kiefer-Gaumenspalte',true,false,'HNO Anamnese','Lippen-Kiefer-Gaumenspalte')}/>
                      <label>Lippe</label>
                  </li> 
                  <li>
                      <input type="checkbox" id={makeKey('Kiefer')} value="Kiefer" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Lippen-Kiefer-Gaumenspalte',true,false,'HNO Anamnese','Lippen-Kiefer-Gaumenspalte')}/>
                      <label>Kiefer</label>
                  </li>
                  <li>
                      <input type="checkbox" id={makeKey('harter Gaumen')} value="harter Gaumen" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Lippen-Kiefer-Gaumenspalte',true,false,'HNO Anamnese','Lippen-Kiefer-Gaumenspalte')}/>
                      <label>harter Gaumen</label>
                  </li>
                  <li>
                      <input type="checkbox" id={makeKey('weicher Gaumen')} value="weicher Gaumen" onClick={(e) => onCheckboxChange(e,'HNO Anamnese Lippen-Kiefer-Gaumenspalte',true,false,'HNO Anamnese','Lippen-Kiefer-Gaumenspalte')}/>
                      <label>weicher Gaumen</label>
                  </li>
              </ul>
          </div>
          <ul className="d-flex three-col-input">
              <li>
                  <input type="checkbox" value="Z.n. geschlossener SRP" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Z n geschlossener SRP im Jahr text','Z n geschlossener SRP Wo Jahr text'])}/>
                  <label>Z.n. geschlossener SRP</label>
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>im Jahr:</label>
                          <input id={makeKey('Z n geschlossener SRP im Jahr text')} type="text" className="border-input" placeholder="im Jahr:" onKeyUp={(e) => onTextChange(e,'Z n geschlossener SRP im Jahr text','HNO Anamnese','Z.n. geschlossener SRP')}/>
                      </li>                                                                                
                  </ul>                            
              </li>                        
              <li>
                  <ul>                           
                      <li>
                          <label>Wo Jahr:</label>
                          <input id={makeKey('Z n geschlossener SRP Wo Jahr text')} type="text" className="border-input" placeholder="Wo Jahr:" onKeyUp={(e) => onTextChange(e,'Z n geschlossener SRP Wo Jahr text','HNO Anamnese','Z.n. geschlossener SRP')}/>
                      </li>                             
                  </ul>                            
              </li>                        
          </ul>                    
          <ul className="d-flex three-col-input">
              <li>
                  <input type="checkbox" value="Z.n. offener SRP" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Z n offener SRP im Jahr text','Z n offener SRP Wo Jahr text'])}/>
                  <label>Z.n. offener SRP</label>
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>im Jahr:</label>
                          <input id={makeKey('Z n offener SRP im Jahr text')} type="text" className="border-input" placeholder="im Jahr:" onKeyUp={(e) => onTextChange(e,'Z n offener SRP im Jahr text','HNO Anamnese','Z.n. offener SRP')}/>
                      </li>                                                                                      
                  </ul>                            
              </li>                        
              <li>
                  <ul>                          
                      <li>
                          <label>Wo Jahr:</label>
                          <input id={makeKey('Z n offener SRP Wo Jahr text')} type="text" className="border-input" placeholder="Wo Jahr:" onKeyUp={(e) => onTextChange(e,'Z n offener SRP Wo Jahr text','HNO Anamnese','Z.n. offener SRP')}/>
                      </li>                                
                  </ul>                            
              </li>                        
          </ul>  
          <ul className="d-flex three-col-input">
              <li>
                  <input type="checkbox" value="Z.n. NNH Fensterung" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Z n NNH Fensterung im Jahr text','Z n NNH Fensterung Wo Jahr text'])}/>
                  <label>Z.n. NNH Fensterung</label>
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>im Jahr:</label>
                          <input id={makeKey('Z n NNH Fensterung im Jahr text')} type="text" className="border-input" placeholder="im Jahr:" onKeyUp={(e) => onTextChange(e,'Z n NNH Fensterung im Jahr text','HNO Anamnese','Z.n. NNH Fensterung')}/>
                      </li>                                                                            
                  </ul>                            
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>Wo Jahr:</label>
                          <input id={makeKey('Z n NNH Fensterung Wo Jahr text')} type="text" className="border-input" placeholder="Wo Jahr:" onKeyUp={(e) => onTextChange(e,'Z n NNH Fensterung Wo Jahr text','HNO Anamnese','Z.n. NNH Fensterung')}/>
                      </li>                                
                  </ul>                            
              </li>                        
          </ul>                    
          <ul className="d-flex three-col-input">
              <li>
                  <input type="checkbox" value="Z.n. Nasenmuschel-OP" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Z n Nasenmuschel OP im Jahr text','Z n Nasenmuschel OP Wo Jahr text'])}/>
                  <label>Z.n. Nasenmuschel-OP</label>
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>im Jahr:</label>
                          <input id={makeKey('Z n Nasenmuschel OP im Jahr text')} type="text" className="border-input" placeholder="im Jahr:" onKeyUp={(e) => onTextChange(e,'Z n Nasenmuschel OP im Jahr text','HNO Anamnese','Z.n. Nasenmuschel-OP')}/>
                      </li>                                                                            
                  </ul>                            
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>Wo Jahr:</label>
                          <input id={makeKey('Z n Nasenmuschel OP Wo Jahr text')} type="text" className="border-input" placeholder="Wo Jahr:" onKeyUp={(e) => onTextChange(e,'Z n Nasenmuschel OP Wo Jahr text','HNO Anamnese','Z.n. Nasenmuschel-OP')}/>
                      </li>                                
                  </ul>                            
              </li>                        
          </ul>                   
          <ul className="d-flex three-col-input">
              <li>
                  <input type="checkbox" value="Z.n. Trauma Nasenrücken" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Z n Trauma Nasenrucken im Jahr text','Z n Trauma Nasenrucken Wo Jahr text'])}/>
                  <label>Z.n. Trauma Nasenrücken </label>
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>im Jahr:</label>
                          <input id={makeKey('Z n Trauma Nasenrucken im Jahr text')} type="text" className="border-input" placeholder="im Jahr:" onKeyUp={(e) => onTextChange(e,'Z n Trauma Nasenrucken im Jahr text','HNO Anamnese','Z.n. Trauma Nasenrücken')}/>
                      </li>                                                                            
                  </ul>                            
              </li>                        
              <li>
                  <ul>
                      <li>
                          <label>Wo Jahr:</label>
                          <input id={makeKey('Z n Trauma Nasenrucken Wo Jahr text')} type="text" className="border-input" placeholder="Wo Jahr:" onKeyUp={(e) => onTextChange(e,'Z n Trauma Nasenrucken Wo Jahr text','HNO Anamnese','Z.n. Trauma Nasenrücken')}/>
                      </li>                                
                  </ul>                            
              </li>                        
          </ul>                   
          <ul className="d-flex">
              <li>
                  <input type="checkbox" value="Z.n. Entfernung Polypen" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['Z n Entfernung Polypen im Jahr text','mit Reposition','ohne Reposition'],false,false,'HNO Anamnese Z n Entfernung Polypen')}/>
                  <label>Z.n. Entfernung Polypen</label>
              </li>                        
              <li>
                  <ul className="m-0">
                      <li>
                          <label>im Jahr:</label>
                          <input id={makeKey('Z n Entfernung Polypen im Jahr text')} type="text" className="border-input" placeholder="im Jahr:" onKeyUp={(e) => onTextChange(e,'Z n Entfernung Polypen im Jahr text','HNO Anamnese','Z.n. Entfernung Polypen')}/>
                      </li>                                                                            
                  </ul>                            
              </li>                        
              <li>
                  <input type="radio" name="reposition" id={makeKey('mit Reposition')} value="mit Reposition" onClick={(e) => onRadioChange(e,'HNO Anamnese Z n Entfernung Polypen',true,'HNO Anamnese','Z.n. Entfernung Polypen')}/>
                  <label>mit Reposition</label>
              </li>                      
              <li>
                  <input type="radio" name="reposition" id={makeKey('ohne Reposition')} value="ohne Reposition" onClick={(e) => onRadioChange(e,'HNO Anamnese Z n Entfernung Polypen',true,'HNO Anamnese','Z.n. Entfernung Polypen')}/>
                  <label>ohne Reposition</label>
              </li>                      
           </ul>                   
          <ul className="d-flex">
              <li>
                  <input type="checkbox" value="Tinnitus"  onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['hno anamnese Tinnitus seit text','rechts','links','beidseits'],false,false,'hno anamnese Tinnitus')}/>
                  <label>Tinnitus</label>
              </li>                        
              <li>
                  <ul className="m-0">
                      <li>
                          <input type="radio" name="tinnitus_opt" id={makeKey('rechts')} value="rechts" onClick={(e) => onRadioChange(e,'hno anamnese Tinnitus',true,'HNO Anamnese','Tinnitus')}/>
                          <label>rechts</label>
                      </li> 
                      <li>
                          <input type="radio" name="tinnitus_opt" id={makeKey('links')} value="links" onClick={(e) => onRadioChange(e,'hno anamnese Tinnitus',true,'HNO Anamnese','Tinnitus')}/>
                          <label>links</label>
                      </li>                      
                      <li>
                          <input type="radio" name="tinnitus_opt" id={makeKey('beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'hno anamnese Tinnitus',true,'HNO Anamnese','Tinnitus')}/>
                          <label>beidseits</label>
                      </li>                      
                      <li>
                          <label>seit</label>
                          <input id={makeKey('hno anamnese Tinnitus seit text')} type="text" className="border-input" placeholder="seit" onKeyUp={(e) => onTextChange(e,'hno anamnese Tinnitus seit text','HNO Anamnese','Tinnitus')}/>
                      </li>                                                                           
                  </ul>                            
              </li>                        
                
                               
          </ul>  
          <ul className="d-flex">
              <li className="full-row">
                  <input type="checkbox" value="Sonstiges" onClick={(e) => onCheckboxChange(e,'HNO Anamnese',true,['hno anamnese Sonstiges text'])}/>
                  <label>Sonstiges:</label>
                  <input id={makeKey('hno anamnese Sonstiges text')} type="text" className="border-input" placeholder="Sonstiges:" onKeyUp={(e) => onTextChange(e,'hno anamnese Sonstiges text','HNO Anamnese','Sonstiges')}/>
              </li>  
          </ul>
          </>

      )
  }

  const Diagnosen = () => {
    return (
        <>
          <h2>Diagnosen:</h2>  
            <h3>1. äußere Inspektion/Palpation</h3>        
            <h4 className="sub-heading">Form:</h4>   
            <div className="d-flex">
                <ul>
                    <li>
                        <input type="checkbox" value="Höckerlangnase (HLN)" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true)}/>
                        <label>Höckerlangnase (HLN)</label>
                    </li>                        
                </ul>                   
            </div>   
            <ul className="d-flex three-col-input">
                <li>
                    <input type="checkbox" value="knöchern-knorpelige Schiefnase"  onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true,['knochern_knorpelige_schiefnase_opt n rechts','knochern_knorpelige_schiefnase_opt n links'],false,false,'knochern knorpelige Schiefnase')}/>
                    <label>knöchern-knorpelige Schiefnase</label>
                </li>                        
                <li>
                    <input type="radio" name="knochern_knorpelige_schiefnase_opt" id={makeKey('knochern_knorpelige_schiefnase_opt n rechts')} value="n. rechts" onClick={(e) => onRadioChange(e,'knochern knorpelige Schiefnase',true,'Diagnosen Form','knöchern-knorpelige Schiefnase')}/>
                    <label>n. rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="knochern_knorpelige_schiefnase_opt" id={makeKey('knochern_knorpelige_schiefnase_opt n links')} value="n. links" onClick={(e) => onRadioChange(e,'knochern knorpelige Schiefnase',true,'Diagnosen Form','knöchern-knorpelige Schiefnase')}/>
                    <label>n. links</label>
                </li>                        
            </ul>                  
            <ul className="d-flex three-col-input">
                <li>
                    <input type="checkbox" value="knorpelige Schiefnase" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true,['knorpelige_schiefnase_opt n rechts','knorpelige_schiefnase_opt n links'],false,false,'knorpelige Schiefnase')}/>
                    <label>knorpelige  Schiefnase</label>
                </li>                        
                <li>
                    <input type="radio" name="knorpelige_schiefnase_opt" id={makeKey('knorpelige_schiefnase_opt n rechts')} value="n. rechts" onClick={(e) => onRadioChange(e,'knorpelige Schiefnase',true,'Diagnosen Form','knorpelige Schiefnase')}/>
                    <label>n. rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="knorpelige_schiefnase_opt" id={makeKey('knorpelige_schiefnase_opt n links')} value="n. links" onClick={(e) => onRadioChange(e,'knorpelige Schiefnase',true,'Diagnosen Form','knorpelige Schiefnase')}/>
                    <label>n. links</label>
                </li>                        
            </ul>   
            <ul className="d-flex three-col-input">
                <li>
                    <input type="checkbox" value="Breitnase" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true)}/>
                    <label>Breitnase</label>
                </li>                        
                                                   
            </ul>                 
            <ul className="d-flex three-col-input">
                <li>
                    <input type="checkbox" value="Sattelnase" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true)}/>
                    <label>Sattelnase</label>
                </li>                            
            </ul>   
            <ul className="d-flex">
                <li>
                    <input type="checkbox" value="Spannungsnase" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true)}/>
                    <label>Spannungsnase</label>
                </li>                      
            </ul>
            <ul className="d-flex">
                <li>
                    <input type="checkbox" value="Boxy Tip" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true)}/>
                    <label>Boxy Tip</label>
                </li>                   
            </ul>
            <ul className="d-flex">
                <li>
                    <input type="checkbox" value="Parrot’s Peak" onClick={(e) => onCheckboxChange(e,'Diagnosen Form',true)}/>
                    <label>Parrot’s Peak</label>
                </li>                  
            </ul>     
            <h4 className="sub-heading">Nasenrücken:</h4>
            <ul className="d-flex">
                <li>
                    <input type="checkbox" value="knöcherne Konturstufen Nasenrücken" onClick={(e) => onCheckboxChange(e,'Diagnosen Nasenrucken',true)}/>
                    <label>knöcherne Konturstufen Nasenrücken</label>
                </li>  
            </ul>
            <ul className="d-flex">                    
                <li>
                    <input type="checkbox" value="Open Roof" onClick={(e) => onCheckboxChange(e,'Diagnosen Nasenrucken',true)}/>
                    <label>Open Roof</label>
                </li>          
            </ul>
            <ul>            
                <li>
                    <input type="checkbox" value="Silikonsplint Nasenrücken palpabel" onClick={(e) => onCheckboxChange(e,'Diagnosen Nasenrucken',true)}/>
                    <label>Silikonsplint Nasenrücken palpabel</label>
                </li>
             </ul>   
            <ul className="d-flex">
                <li>
                    <input type="checkbox" value="mobiles Fragment am Nasenrücken" onClick={(e) => onCheckboxChange(e,'Diagnosen Nasenrucken',true,['mobiles Fragment am Nasenrucken lth text','mobiles Fragment am Nasenrucken wth text'])}/>
                    <label>mobiles Fragment am Nasenrücken <input id={makeKey('mobiles Fragment am Nasenrucken lth text')} type="text" className="border-input" placeholder="x" onKeyUp={(e) => onTextChange(e,'mobiles Fragment am Nasenrucken lth text','Diagnosen Nasenrucken','mobiles Fragment am Nasenrücken')}/> x <input id={makeKey('mobiles Fragment am Nasenrucken wth text')} type="text" className="border-input" placeholder="mm" onKeyUp={(e) => onTextChange(e,'mobiles Fragment am Nasenrucken wth text','Diagnosen Nasenrucken','mobiles Fragment am Nasenrücken')}/> mm</label>
                </li>
            </ul>             
            <h4 className="sub-heading">Nasenflügel:</h4>
            <ul className="d-flex four-col-row">
                <li>
                    <input type="checkbox" value="Retraktion Nasenflügel" onClick={(e) => onCheckboxChange(e,'Diagnosen Nasenflugel',true,['retraktion_nasenflugel_opt rechts','retraktion_nasenflugel_opt links','retraktion_nasenflugel_opt beidseits'],false,false,'Retraktion Nasenflugel')}/>
                    <label>Retraktion Nasenflügel</label>
                </li>
                <li>
                    <input type="radio" name="retraktion_nasenflugel_opt" id={makeKey('retraktion_nasenflugel_opt rechts')} value="rechts"  onClick={(e) => onRadioChange(e,'Retraktion Nasenflugel',true,'Diagnosen Nasenflugel','Retraktion Nasenflügel')}/>
                    <label>rechts</label>
                </li>
                <li>
                    <input type="radio" name="retraktion_nasenflugel_opt" id={makeKey('retraktion_nasenflugel_opt links')} value="links"  onClick={(e) => onRadioChange(e,'Retraktion Nasenflugel',true,'Diagnosen Nasenflugel','Retraktion Nasenflügel')}/>
                    <label>links</label>
                </li>
                <li>
                    <input type="radio" name="retraktion_nasenflugel_opt" id={makeKey('retraktion_nasenflugel_opt beidseits')} value="beidseits"  onClick={(e) => onRadioChange(e,'Retraktion Nasenflugel',true,'Diagnosen Nasenflugel','Retraktion Nasenflügel')}/>
                    <label>beidseits</label>
                </li>
            </ul>
            <ul className="d-flex four-col-row">
                <li>
                    <input type="checkbox" value="Asymmetrie Nasenflüge" onClick={(e) => onCheckboxChange(e,'Diagnosen Nasenflugel',true,['asymmetrie_nasenfluge_opt rechts lt links','asymmetrie_nasenfluge_opt rechts gt links'],false,false,'Asymmetrie Nasenfluge')}/>
                    <label>Asymmetrie Nasenflüge</label>
                </li>
                <li>
                    <input type="radio" name="asymmetrie_nasenfluge_opt" id={makeKey('asymmetrie_nasenfluge_opt rechts lt links')} value="rechts < links" onClick={(e) => onRadioChange(e,'Asymmetrie Nasenfluge',true,'Diagnosen Nasenflugel','Asymmetrie Nasenflüge')}/>
                    <label>rechts &lt; links</label>
                </li>
                <li>
                    <input type="radio" name="asymmetrie_nasenfluge_opt" id={makeKey('asymmetrie_nasenfluge_opt rechts gt links')} value="rechts > links" onClick={(e) => onRadioChange(e,'Asymmetrie Nasenfluge',true,'Diagnosen Nasenflugel','Asymmetrie Nasenflüge')}/>
                    <label>rechts &gt; links</label>
                </li>                   
            </ul>
            <h4 className="sub-heading">Narben:</h4>
            <ul className="d-flex four-col-row">
                <li>
                    <input type="checkbox" value="Z.n. NFR" onClick={(e) => onCheckboxChange(e,'Diagnosen Narben',true,['z_n_nfr_opt rechts','z_n_nfr_opt links','z_n_nfr_opt beidseits'],false,false,'Narben Z n NFR')}/>
                    <label>Z.n. NFR</label>
                </li>
                <li>
                    <input type="radio" name="z_n_nfr_opt" id={makeKey('z_n_nfr_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Narben Z n NFR',true,'Diagnosen Narben','Z.n. NFR')}/>
                    <label>rechts</label>
                </li>
                <li>
                    <input type="radio" name="z_n_nfr_opt" id={makeKey('z_n_nfr_opt links')} value="links" onClick={(e) => onRadioChange(e,'Narben Z n NFR',true,'Diagnosen Narben','Z.n. NFR')}/>
                    <label>links</label>
                </li>
                <li>
                    <input type="radio" name="z_n_nfr_opt" id={makeKey('z_n_nfr_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Narben Z n NFR',true,'Diagnosen Narben','Z.n. NFR')}/>
                    <label>beidseits</label>
                </li>
            </ul>
            <ul className="d-flex four-col-row">
                <li>
                    <input type="checkbox" value="Z.n. Transcolumella-Schnitt" onClick={(e) => onCheckboxChange(e,'Diagnosen Narben',true,['z_n_transcolumella_schnitt_opt Stufenform','z_n_transcolumella_schnitt_opt inverted V','z_n_transcolumella_schnitt_opt V'],false,false,'Z n Transcolumella Schnitt')}/>
                    <label> Z.n. Transcolumella-Schnitt</label>
                </li>
                <li>
                    <input type="radio" name="z_n_transcolumella_schnitt_opt" id={makeKey('z_n_transcolumella_schnitt_opt V')} value="V" onClick={(e) => onRadioChange(e,'Z n Transcolumella Schnitt',true,'Diagnosen Narben','Z.n. Transcolumella-Schnitt')}/>
                    <label>V</label>
                </li>
                <li>
                    <input type="radio" name="z_n_transcolumella_schnitt_opt" id={makeKey('z_n_transcolumella_schnitt_opt inverted V')} value="inverted V" onClick={(e) => onRadioChange(e,'Z n Transcolumella Schnitt',true,'Diagnosen Narben','Z.n. Transcolumella-Schnitt')}/>
                    <label>inverted V</label>
                </li>
                <li>
                    <input type="radio" name="z_n_transcolumella_schnitt_opt" id={makeKey('z_n_transcolumella_schnitt_opt Stufenform')} value="Stufenform" onClick={(e) => onRadioChange(e,'Z n Transcolumella Schnitt',true,'Diagnosen Narben','Z.n. Transcolumella-Schnitt')}/>
                    <label>Stufenform</label>
                </li>
            </ul>
            <ul className="d-flex four-col-row">
                <li>
                    <input type="checkbox" value="massive Vernarbunge" onClick={(e) => onCheckboxChange(e,'Diagnosen Narben',true,['Tip','Nasenrücken','Vernarbungen Septale Mucosa'],false,false,'massive Vernarbunge')}/>
                    <label>massive Vernarbunge</label>
                </li>
                <li>
                    <input type="checkbox" id={makeKey('Tip')} value="Tip" onClick={(e) => onCheckboxChange(e,'massive Vernarbunge',true,false,'Diagnosen Narben','massive Vernarbunge')}/>
                    <label>Tip</label>
                </li>
                <li>
                    <input type="checkbox" id={makeKey('Nasenrücken')} value="Nasenrücken" onClick={(e) => onCheckboxChange(e,'massive Vernarbunge',true,false,'Diagnosen Narben','massive Vernarbunge')}/>
                    <label>Nasenrücken</label>
                </li>                  
            </ul>
            <ul className="d-flex four-col-row">
                <li>                     
                </li>
                <li>
                    <input type="checkbox" id={makeKey('Vernarbungen Septale Mucosa')} value="Vernarbungen Septale Mucosa" onClick={(e) => onCheckboxChange(e,'massive Vernarbunge',true,false,'Diagnosen Narben','massive Vernarbunge')}/>
                    <label>Vernarbungen Septale Mucosa</label>
                </li>                                
            </ul>
            <h4 className="sub-heading">Columella/Septum:</h4>
            <ul className="d-flex three-col-input">              
                <li>
                    <input type="radio" name="columella_septum_opt" value="instabile Columella" onClick={(e) => onRadioChange(e,'Diagnosen Columella Septum 1')}/>
                    <label>instabile Columella</label>
                </li>                        
                <li>
                    <input type="radio" name="columella_septum_opt" value="retrahierte Columella" onClick={(e) => onRadioChange(e,'Diagnosen Columella Septum 1')}/>
                    <label>retrahierte Columella</label>
                </li>                        
            </ul>
            <ul className="d-flex three-col-input">              
                <li>
                    <input type="radio" name="columella_septum_opt2" value="Septum palpatorisch stabil" onClick={(e) => onRadioChange(e,'Diagnosen Columella Septum 2')}/>
                    <label>Septum palpatorisch stabil</label>
                </li>                        
                <li>
                    <input type="radio" name="columella_septum_opt2" value="Septum palpatorisch instabil" onClick={(e) => onRadioChange(e,'Diagnosen Columella Septum 2')}/>
                    <label>Septum palpatorisch instabil</label>
                </li>                        
            </ul>
            <h4 className="sub-heading">Haut:</h4>
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="radio" name="haut_opt" value="gute Durchblutung" onClick={(e) => onRadioChange(e,'Diagnosen Haut 1')}/>
                    <label>gute Durchblutung</label>
                </li>                        
                <li>
                    <input type="radio" name="haut_opt" value="schlechte Durchblutung" onClick={(e) => onRadioChange(e,'Diagnosen Haut 1')}/>
                    <label> schlechte Durchblutung</label>
                </li>                        
            </ul>
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="radio" name="haut_opt2" value="dünne Haut" onClick={(e) => onRadioChange(e,'Diagnosen Haut 2')}/>
                    <label>dünne Haut</label>
                </li>                        
                <li>
                    <input type="radio" name="haut_opt2" value="mitteldicke Haut" onClick={(e) => onRadioChange(e,'Diagnosen Haut 2')}/>
                    <label>mitteldicke Haut</label>
                </li>                        
                <li>
                    <input type="radio" name="haut_opt2" value="dicke Haut" onClick={(e) => onRadioChange(e,'Diagnosen Haut 2')}/>
                    <label>dicke Haut</label>
                </li>                        
                <li>
                    <input type="radio" name="haut_opt2" value="sehr dicke Haut" onClick={(e) => onRadioChange(e,'Diagnosen Haut 2')}/>
                    <label>sehr dicke Haut</label>
                </li>                        
            </ul>
            <h3>2. endonasale Inspektion mit Spekulum</h3>        
            <h4 className="sub-heading">Septum:</h4> 
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="checkbox" value="Septumdeviation" onClick={(e) => onCheckboxChange(e,'Diagnosen Septum',true,['septumdeviation_opt s formig','septumdeviation_opt links','septumdeviation_opt rechts'],false,false,'Septumdeviation')}/>
                    <label>Septumdeviation</label>
                </li>                        
                <li>
                    <input type="radio" name="septumdeviation_opt" id={makeKey('septumdeviation_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Septumdeviation',true,'Diagnosen Septum','Septumdeviation')}/>
                    <label>rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="septumdeviation_opt" id={makeKey('septumdeviation_opt links')} value="links" onClick={(e) => onRadioChange(e,'Septumdeviation',true,'Diagnosen Septum','Septumdeviation')}/>
                    <label>links</label>
                </li>                        
                <li>
                    <input type="radio" name="septumdeviation_opt" id={makeKey('septumdeviation_opt s formig')} value="s-förmig" onClick={(e) => onRadioChange(e,'Septumdeviation',true,'Diagnosen Septum','Septumdeviation')}/>
                    <label>s-förmig</label>
                </li>                        
            </ul> 
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="checkbox" value="Septumleiste" onClick={(e) => onCheckboxChange(e,'Diagnosen Septum',true,['septumleiste_opt beidseits','septumleiste_opt links','septumleiste_opt rechts'],false,false,'Septumleiste')}/>
                    <label>Septumleiste</label>
                </li>                        
                <li>
                    <input type="radio" name="septumleiste_opt" id={makeKey('septumleiste_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Septumleiste',true,'Diagnosen Septum','Septumleiste')}/>
                    <label>rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="septumleiste_opt" id={makeKey('septumleiste_opt links')} value="links" onClick={(e) => onRadioChange(e,'Septumleiste',true,'Diagnosen Septum','Septumleiste')}/>
                    <label>links</label>
                </li>                        
                <li>
                    <input type="radio" name="septumleiste_opt" id={makeKey('septumleiste_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Septumleiste',true,'Diagnosen Septum','Septumleiste')}/>
                    <label>beidseits</label>
                </li>                        
            </ul> 
            <ul className="d-flex two-col-row">              
                <li>
                    <input type="checkbox" value="Septumperforation Area" onClick={(e) => onCheckboxChange(e,'Diagnosen Septum',true,['septumperforation_area_opt I','septumperforation_area_opt II','septumperforation_area_opt III','septumperforation_area_opt IV'],false,false,'Septumperforation Area')}/>
                    <label>Septumperforation Area</label>
                </li> 
                <li>
                    <ul>
                        <li>
                            <input type="radio" name="septumperforation_area_opt" id={makeKey('septumperforation_area_opt I')} value="I" onClick={(e) => onRadioChange(e,'Septumperforation Area',true,'Diagnosen Septum','Septumperforation Area')}/>
                            <label> I</label>
                        </li>                        
                        <li>
                            <input type="radio" name="septumperforation_area_opt" id={makeKey('septumperforation_area_opt II')} value="II" onClick={(e) => onRadioChange(e,'Septumperforation Area',true,'Diagnosen Septum','Septumperforation Area')}/>
                            <label> II</label>
                        </li>                        
                        <li>
                            <input type="radio" name="septumperforation_area_opt" id={makeKey('septumperforation_area_opt III')} value="III" onClick={(e) => onRadioChange(e,'Septumperforation Area',true,'Diagnosen Septum','Septumperforation Area')}/>
                            <label>III</label>
                        </li>                        
                        <li>
                            <input type="radio" name="septumperforation_area_opt" id={makeKey('septumperforation_area_opt IV')} value="IV" onClick={(e) => onRadioChange(e,'Septumperforation Area',true,'Diagnosen Septum','Septumperforation Area')}/>
                            <label>IV</label>
                        </li> 
                    </ul>
                </li>                      
                                       
            </ul> 
            <h4 className="sub-heading">Conchae:</h4> 
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="checkbox" value="Hyperplasie concha nasalis inferior" onClick={(e) => onCheckboxChange(e,'Diagnosen Conchae',true,['hyperplasie_concha_nasalis_inferior_opt rechts','hyperplasie_concha_nasalis_inferior_opt links','hyperplasie_concha_nasalis_inferior_opt beidseits'],false,false,'Hyperplasie concha nasalis inferior')}/>
                    <label>Hyperplasie concha nasalis inferior</label>
                </li>                        
                <li>
                    <input type="radio" name="hyperplasie_concha_nasalis_inferior_opt" id={makeKey('hyperplasie_concha_nasalis_inferior_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Hyperplasie concha nasalis inferior',true,'Diagnosen Conchae','Hyperplasie concha nasalis inferior')}/>
                    <label>rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="hyperplasie_concha_nasalis_inferior_opt" id={makeKey('hyperplasie_concha_nasalis_inferior_opt links')} value="links" onClick={(e) => onRadioChange(e,'Hyperplasie concha nasalis inferior',true,'Diagnosen Conchae','Hyperplasie concha nasalis inferior')}/>
                    <label>links</label>
                </li>                        
                <li>
                    <input type="radio" name="hyperplasie_concha_nasalis_inferior_opt" id={makeKey('hyperplasie_concha_nasalis_inferior_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Hyperplasie concha nasalis inferior',true,'Diagnosen Conchae','Hyperplasie concha nasalis inferior')}/>
                    <label>beidseits</label>
                </li>                
            </ul> 
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="checkbox" value="Concha bullosa" onClick={(e) => onCheckboxChange(e,'Diagnosen Conchae',true,['caaoncha_bullosa_opt rechts','caaoncha_bullosa_opt links','caaoncha_bullosa_opt beidseits'],false,false,'Concha bullosa')}/>
                    <label>Concha bullosa</label>
                </li>                        
                <li>
                    <input type="radio" name="caaoncha_bullosa_opt" id={makeKey('caaoncha_bullosa_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Concha bullosa',true,'Diagnosen Conchae','Concha bullosa')}/>
                    <label>rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="caaoncha_bullosa_opt" id={makeKey('caaoncha_bullosa_opt links')} value="links" onClick={(e) => onRadioChange(e,'Concha bullosa',true,'Diagnosen Conchae','Concha bullosa')}/>
                    <label>links</label>
                </li>                        
                <li>
                    <input type="radio" name="caaoncha_bullosa_opt" id={makeKey('caaoncha_bullosa_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Concha bullosa',true,'Diagnosen Conchae','Concha bullosa')}/>
                    <label>beidseits</label>
                </li>                
            </ul> 
            <ul className="d-flex four-col-row">              
                <li>
                    <input type="checkbox" value="Kontaktseptum" onClick={(e) => onCheckboxChange(e,'Diagnosen Conchae',true,['kontaktseptum_opt rechts','kontaktseptum_opt links','kontaktseptum_opt beidseits'],false,false,'Kontaktseptum')}/>
                    <label>Kontaktseptum</label>
                </li>                        
                <li>
                    <input type="radio" name="kontaktseptum_opt" id={makeKey('kontaktseptum_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Kontaktseptum',true,'Diagnosen Conchae','Kontaktseptum')}/>
                    <label>rechts</label>
                </li>                        
                <li>
                    <input type="radio" name="kontaktseptum_opt" id={makeKey('kontaktseptum_opt links')} value="links" onClick={(e) => onRadioChange(e,'Kontaktseptum',true,'Diagnosen Conchae','Kontaktseptum')}/>
                    <label>links</label>
                </li>                        
                <li>
                    <input type="radio" name="kontaktseptum_opt" id={makeKey('kontaktseptum_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Kontaktseptum',true,'Diagnosen Conchae','Kontaktseptum')}/>
                    <label>beidseits</label>
                </li>                
            </ul> 
            <ul className="d-flex">              
                <li>
                    <input type="checkbox" value="Empty-Nose-Syndrome" onClick={(e) => onCheckboxChange(e,'Diagnosen Conchae',true)}/>
                    <label>Empty-Nose-Syndrome </label>
                </li>                       
            </ul> 
            <h4 className="sub-heading">Bony Vault:</h4> 
            <ul className="d-flex">              
                <li>
                    <input type="checkbox" value="Stenose der bony vault durch zu enges knöchernes Nasenskelett" onClick={(e) => onCheckboxChange(e,'Diagnosen Bony Vault',true)}/>
                    <label>Stenose der bony vault durch zu enges knöchernes Nasenskelett</label>
                </li>                       
            </ul> 
            <h4 className="sub-heading">innere/äußere Nasenklappe:</h4> 
            <ul className="d-flex four-col-row">              
                <li className="innere-w">
                    <input type="checkbox" value="Stenose innere Nasenklappe" onClick={(e) => onCheckboxChange(e,'Diagnosen innere aubere Nasenklappe',true,['stenose_innere_nasenklappe_opt rechts','stenose_innere_nasenklappe_opt links','stenose_innere_nasenklappe_opt beidseits'],false,false,'Stenose innere Nasenklappe')}/>
                    <label>Stenose innere Nasenklappe</label>
                </li>                       
                <li>
                    <input type="radio" name="stenose_innere_nasenklappe_opt" id={makeKey('stenose_innere_nasenklappe_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Stenose innere Nasenklappe',true,'Diagnosen innere aubere Nasenklappe','Stenose innere Nasenklappe')}/>
                    <label>rechts</label>
                </li>                       
                <li>
                    <input type="radio" name="stenose_innere_nasenklappe_opt" id={makeKey('stenose_innere_nasenklappe_opt links')} value="links" onClick={(e) => onRadioChange(e,'Stenose innere Nasenklappe',true,'Diagnosen innere aubere Nasenklappe','Stenose innere Nasenklappe')}/>
                    <label>links</label>
                </li>                       
                <li>
                    <input type="radio" name="stenose_innere_nasenklappe_opt" id={makeKey('stenose_innere_nasenklappe_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Stenose innere Nasenklappe',true,'Diagnosen innere aubere Nasenklappe','Stenose innere Nasenklappe')}/>
                    <label>beidseits</label>
                </li>                  
            </ul> 
            <ul className="d-flex four-col-row">              
                <li className="innere-w">
                    <input type="checkbox" value="Z.n. Amputation laterale FKs" onClick={(e) => onCheckboxChange(e,'Diagnosen innere aubere Nasenklappe',true,['z_n_mputation_laterale_fks_opt rechts','z_n_mputation_laterale_fks_opt links','z_n_mputation_laterale_fks_opt beidseits'],false,false,'Z n Amputation laterale FKs')}/>
                    <label>Z.n. Amputation laterale FKs</label>
                </li>                       
                <li>
                    <input type="radio" name="z_n_mputation_laterale_fks_opt" id={makeKey('z_n_mputation_laterale_fks_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Z n Amputation laterale FKs',true,'Diagnosen innere aubere Nasenklappe','Z.n. Amputation laterale FKs')}/>
                    <label>rechts</label>
                </li>                       
                <li>
                    <input type="radio" name="z_n_mputation_laterale_fks_opt" id={makeKey('z_n_mputation_laterale_fks_opt links')} value="links" onClick={(e) => onRadioChange(e,'Z n Amputation laterale FKs',true,'Diagnosen innere aubere Nasenklappe','Z.n. Amputation laterale FKs')}/>
                    <label>links</label>
                </li>                       
                <li>
                    <input type="radio" name="z_n_mputation_laterale_fks_opt" id={makeKey('z_n_mputation_laterale_fks_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Z n Amputation laterale FKs',true,'Diagnosen innere aubere Nasenklappe','Z.n. Amputation laterale FKs')}/>
                    <label>beidseits</label>
                </li>                  
            </ul> 
            <ul className="d-flex four-col-row">              
                <li className="innere-w">
                    <input type="checkbox" value="Stenose äußere Nasenklappe" onClick={(e) => onCheckboxChange(e,'Diagnosen innere aubere Nasenklappe',true,['stenose_aubere_nasenklapp_opt rechts','stenose_aubere_nasenklapp_opt links','stenose_aubere_nasenklapp_opt beidseits'],false,false,'Stenose aubere Nasenklappe')}/>
                    <label>Stenose äußere Nasenklappe</label>
                </li>                       
                <li>
                    <input type="radio" name="stenose_aubere_nasenklapp_opt" id={makeKey('stenose_aubere_nasenklapp_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Stenose aubere Nasenklappe',true,'Diagnosen innere aubere Nasenklappe','Stenose äußere Nasenklappe')}/>
                    <label>rechts</label>
                </li>                       
                <li>
                    <input type="radio" name="stenose_aubere_nasenklapp_opt" id={makeKey('stenose_aubere_nasenklapp_opt links')} value="links" onClick={(e) => onRadioChange(e,'Stenose aubere Nasenklappe',true,'Diagnosen innere aubere Nasenklappe','Stenose äußere Nasenklappe')}/>
                    <label>links</label>
                </li>                       
                <li>
                    <input type="radio" name="stenose_aubere_nasenklapp_opt" id={makeKey('stenose_aubere_nasenklapp_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Stenose aubere Nasenklappe',true,'Diagnosen innere aubere Nasenklappe','Stenose äußere Nasenklappe')}/>
                    <label>beidseits</label>
                </li>                  
            </ul> 
            <ul className="d-flex five-col-row">              
                <li>
                    <input type="checkbox" value="Ansaugphänomen" onClick={(e) => onCheckboxChange(e,'Diagnosen innere aubere Nasenklappe',true,['ansaugphanomen_opt rechts','ansaugphanomen_opt links','ansaugphanomen_opt beidseits','ansaugphanomen_opt massiv'],false,false,'Ansaugphanomen')}/>
                    <label>Ansaugphänomen:</label>
                </li>                       
                <li>
                    <input type="radio" name="ansaugphanomen_opt" id={makeKey('ansaugphanomen_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'Ansaugphanomen',true,'Diagnosen innere aubere Nasenklappe','Ansaugphänomen')}/>
                    <label>rechts</label>
                </li>                       
                <li>
                    <input type="radio" name="ansaugphanomen_opt" id={makeKey('ansaugphanomen_opt links')} value="links" onClick={(e) => onRadioChange(e,'Ansaugphanomen',true,'Diagnosen innere aubere Nasenklappe','Ansaugphänomen')}/>
                    <label>links</label>
                </li>                       
                <li>
                    <input type="radio" name="ansaugphanomen_opt" id={makeKey('ansaugphanomen_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'Ansaugphanomen',true,'Diagnosen innere aubere Nasenklappe','Ansaugphänomen')}/>
                    <label>beidseits</label>
                </li>                  
                <li>
                    <input type="radio" name="ansaugphanomen_opt" id={makeKey('ansaugphanomen_opt massiv')} value="massiv" onClick={(e) => onRadioChange(e,'Ansaugphanomen',true,'Diagnosen innere aubere Nasenklappe','Ansaugphänomen')}/>
                    <label>massiv </label>
                </li>                  
            </ul> 
            <ul className="d-flex five-col-row">              
                <li>
                    <input type="checkbox" value="Cottle-Test positiv" onClick={(e) => onCheckboxChange(e,'Diagnosen innere aubere Nasenklappe',true)}/>
                    <label> Cottle-Test positiv</label>
                </li>                
                               
            </ul>
            <ul className="d-flex">
                <li className="full-row">
                    <input type="checkbox" value="Sonstiges" onClick={(e) => onCheckboxChange(e,'Diagnosen innere aubere Nasenklappe',true,['innere aubere Nasenklappe Sonstiges text'])}/>
                    <label>Sonstiges:</label>
                    <input id={makeKey('innere aubere Nasenklappe Sonstiges text')} type="text" className="border-input" onKeyUp={(e) => onTextChange(e,'innere aubere Nasenklappe Sonstiges text','Diagnosen innere aubere Nasenklappe','Sonstiges')}/>
                </li>  
            </ul>
        </>
    )
  }

  const GeplanteEingriffe = () => {
      return (
          <>
            <h2>GEPLANTE EINGRIFFE:</h2>
              <h4 className="sub-heading">Operateur:</h4>
              <ul className="d-flex four-col-row">              
                  <li>
                      <input type="checkbox" value="Berkei" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Operateur',true)}/>
                      <label>Berkei</label>
                  </li>                        
                  <li>
                      <input type="checkbox" value="Tosun" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Operateur',true)}/>
                      <label>Tosun</label>
                  </li>                        
                  <li>
                      <input type="checkbox" value="Elzebair" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Operateur',true)}/>
                      <label>Elzebair</label>
                  </li>                        
              </ul> 
              <h4 className="sub-heading">Assistenz:</h4>
              <ul className="d-flex four-col-row">              
                  <li>
                      <input type="checkbox" value="Berkei" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Assistenz',true)}/>
                      <label>Berkei</label>
                  </li>                        
                  <li>
                      <input type="checkbox" value="Tosun" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Assistenz',true)}/>
                      <label>Tosun</label>
                  </li>                        
                  <li>
                      <input type="checkbox" value="Elzebair" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Assistenz',true)}/>
                      <label>Elzebair</label>
                  </li>                         
                  <li className="d-flex"> 
                      <input type="checkbox" value="Assistenz" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Assistenz',true,['Assistenz text'])}/>
                      <label><input id={makeKey('Assistenz text')} type="text" className="border-input" placeholder="Assistenz:" onKeyUp={(e) => onTextChange(e,'Assistenz text','GEPLANTE EINGRIFFE Assistenz','Assistenz')}/></label>           
                  </li>                
              </ul> 
              <h3>1.)</h3>
              <ul className="d-flex">              
                  <li>
                      <input type="checkbox" value="Rhino 1 (nur Tip)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',true)}/>
                      <label>Rhino 1 (nur Tip)</label>   
                  </li>
              </ul>
              <ul className="d-flex"> 
                  <li>
                      <input type="checkbox" value="Rhino 2 (Tip, Spreader Grafts, TP, keine Osteotomien)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',true)}/>
                      <label>Rhino 2 (Tip, Spreader Grafts, TP, keine Osteotomien)</label>   
                  </li>
              </ul>
              <ul className="d-flex"> 
                  <li>
                      <input type="checkbox" value="Rhino 3 (Primäre SRP)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',true)}/>
                      <label>Rhino 3 (Primäre SRP)</label>   
                  </li>
              </ul>
              <ul className="d-flex"> 
                  <li>
                      <input type="checkbox" value="Rhino 4 (Komplexe SRP)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',true)}/>
                      <label>Rhino 4 (Komplexe SRP)</label>   
                  </li>
              </ul>
              <ul className="d-flex"> 
                  <li>
                      <input type="checkbox" value="Rhino 5 (Revision ggf. Ohr)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',true)}/>
                      <label> Rhino 5 (Revision ggf. Ohr)</label>   
                  </li>
              </ul>               
              <ul className="two-col-row multi-content-row">                
                  <li>
                      <input type="checkbox" id=""  value="Rhino 6 (Revision-Komplex)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',true,['Rhino 6 text','MI','AI'],false,false,'GEPLANTE EINGRIFFE Rhino 6')}/>
                      <label>Rhino 6 (Revision-Komplex)</label>
                  </li>
                  <li>
                      <ul className="d-flex">
                          <li className="d-flex">                                
                              <label><input id={makeKey('Rhino 6 text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Rhino 6 text','GEPLANTE EINGRIFFE 1','Rhino 6 (Revision-Komplex)')}/>€</label>                  
                          </li>                      
                          <li className="d-flex">
                              <input type="checkbox" id={makeKey('MI')} value="MI" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Rhino 6',true,false,'GEPLANTE EINGRIFFE 1','Rhino 6 (Revision-Komplex)')}/>
                              <label>MI</label>
                          </li>
                          <li className="d-flex">
                              <input type="checkbox" id={makeKey('AI')} value="AI" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Rhino 6',true,false,'GEPLANTE EINGRIFFE 1','Rhino 6 (Revision-Komplex)')}/>
                              <label>AI</label>
                          </li>
                      </ul>
                  </li>
              </ul>

              <h4 className="sub-heading">Besonderheiten:</h4>
              <ul className="d-flex five-col-row"> 
                  <li>
                      <label>Nasenrücken:</label>   
                  </li>
                  <li>
                      <input type="radio" name="nasenrucken_opt" value="gerade" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Besonderheiten Nasenrucken')}/>
                      <label>gerade</label>   
                  </li>
                  <li>
                      <input type="radio" name="nasenrucken_opt" value="leichter Schwung" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Besonderheiten Nasenrucken')}/>
                      <label>leichter Schwung</label>   
                  </li>
                  <li>
                      <input type="radio" name="nasenrucken_opt" value="großer Schwung" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Besonderheiten Nasenrucken')}/>
                      <label>großer Schwung</label>   
                  </li>
              </ul>    
              <ul className="d-flex tip-row">                 
                  <li>
                      <label>Tip:</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="kleiner" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Tip',true)}/>
                      <label>kleiner</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="größer" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Tip',true)}/>
                      <label>größer</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="spitzer" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Tip',true)}/>
                      <label>spitzer</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="runder" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Tip',true)}/>
                      <label>runder</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="höher" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Tip',true)}/>
                      <label>höher</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="tiefer" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Tip',true)}/>
                      <label>tiefer</label>   
                  </li>
              </ul>
              <ul className="d-flex five-col-row">                 
                  <li>
                      <label>Nasenlöcher</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="kleiner" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Nasenlocher',true)}/>
                      <label>kleiner</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="größer" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Nasenlocher',true)}/>
                      <label>größer</label>   
                  </li>
                  <li>
                      <input type="checkbox" value="Form" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Besonderheiten Nasenlocher',true)}/>
                      <label>Form</label>   
                  </li>                    
              </ul>    
              <ul className="d-flex">
                  <li className="full-row">
                      <label>Wortlaut</label>
                      <input type="text" className="border-input" placeholder="Wortlaut" onKeyUp={(e) => onTextChange(e,'Wortlaut text')}/>
                  </li>  
              </ul>
              <h3>2.) notwendige OP-Schritte:</h3>
              <h4 className="sub-heading">Endonasales Septum:</h4>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Begradigung Septumdeviation" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Endonasales Septum',true)}/>
                      <label> Begradigung Septumdeviation </label>   
                  </li>
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="Entfernung Septumleiste" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Endonasales Septum',true,['entfernung_septumleiste_opt rechts','entfernung_septumleiste_opt links','entfernung_septumleiste_opt beidseits'],false,false,'GEPLANTE EINGRIFFE Entfernung Septumleiste')}/>
                      <label>Entfernung Septumleiste:</label>   
                  </li>
                  <li>
                      <input type="radio" name="entfernung_septumleiste_opt" id={makeKey('entfernung_septumleiste_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Entfernung Septumleiste',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Endonasales Septum','Entfernung Septumleiste')}/>
                      <label>rechts</label>   
                  </li>
                  <li>
                      <input type="radio" name="entfernung_septumleiste_opt" id={makeKey('entfernung_septumleiste_opt links')} value="links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Entfernung Septumleiste',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Endonasales Septum','Entfernung Septumleiste')}/>
                      <label>links</label>   
                  </li>
                  <li>
                      <input type="radio" name="entfernung_septumleiste_opt" id={makeKey('entfernung_septumleiste_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Entfernung Septumleiste',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Endonasales Septum','Entfernung Septumleiste')}/>
                      <label>beidseits</label>   
                  </li>
              </ul>
              <h4 className="sub-heading">Conchae:</h4>
              <ul className="d-flex  four-col-row">                 
                  <li>
                      <input type="checkbox" value="Muschelkaustik" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Conchae',true,['muschelkaustik_opt rechts','muschelkaustik_opt links','muschelkaustik_opt beidseits'],false,false,'GEPLANTE EINGRIFFE Muschelkaustik')}/>
                      <label>Muschelkaustik:</label>   
                  </li>
                  <li>
                      <input type="radio" name="muschelkaustik_opt" id={makeKey('muschelkaustik_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Muschelkaustik',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Conchae','Muschelkaustik')}/>
                      <label>rechts</label>   
                  </li>
                  <li>
                      <input type="radio" name="muschelkaustik_opt" id={makeKey('muschelkaustik_opt links')} value="links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Muschelkaustik',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Conchae','Muschelkaustik')}/>
                      <label>links</label>   
                  </li>
                  <li>
                      <input type="radio" name="muschelkaustik_opt" id={makeKey('muschelkaustik_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Muschelkaustik',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Conchae','Muschelkaustik')}/>
                      <label>beidseits</label>   
                  </li>
              </ul>
              <h4 className="sub-heading">Osteotomie:</h4>
              <ul className="d-flex  four-col-row">                 
                  <li>
                      <input type="checkbox" value="Osteotomie" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Osteotomie',true,['osteotomie_opt rechts','osteotomie_opt links','osteotomie_opt beidseits'],false,false,'GEPLANTE EINGRIFFE Osteotomie')}/>
                      <label>Osteotomie:</label>   
                  </li>
                  <li>
                      <input type="radio" name="osteotomie_opt" id={makeKey('osteotomie_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Osteotomie',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Osteotomie','Osteotomie')}/>
                      <label>rechts</label>   
                  </li>
                  <li>
                      <input type="radio" name="osteotomie_opt" id={makeKey('osteotomie_opt links')} value="links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Osteotomie',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Osteotomie','Osteotomie')}/>
                      <label>links</label>   
                  </li>
                  <li>
                      <input type="radio" name="osteotomie_opt" id={makeKey('osteotomie_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Osteotomie',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Osteotomie','Osteotomie')}/>
                      <label>beidseits</label>   
                  </li>
              </ul>
              <h4 className="sub-heading">statische Grafts:</h4>
              <ul className="d-flex">                
                  <li>
                      <input type="checkbox" value="Spreader grafts" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts',true,['spreader_grafts_opt rechts','spreader_grafts_opt links','spreader_grafts_opt beidseits'],false,false,'GEPLANTE EINGRIFFE Spreader grafts')}/>
                      <label>Spreader grafts:</label>   
                  </li>
                  <ul className="d-flex four-col-row">
                      <li>
                          <input type="radio" name="spreader_grafts_opt" id={makeKey('spreader_grafts_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Spreader grafts',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Spreader grafts')}/>
                          <label>rechts</label>   
                      </li>
                      <li>
                          <input type="radio" name="spreader_grafts_opt" id={makeKey('spreader_grafts_opt links')} value="links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Spreader grafts',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Spreader grafts')}/>
                          <label>links</label>   
                      </li>
                      <li>
                          <input type="radio" name="spreader_grafts_opt" id={makeKey('spreader_grafts_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Spreader grafts',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Spreader grafts')}/>
                          <label>beidseits</label>   
                      </li>
                  </ul>
              </ul>
              <ul className="d-flex">
                  <li>
                      <input type="checkbox" value="Columella Strut" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts',true,['columella_strut_opt von re','columella_strut_opt von li'],false,false,'GEPLANTE EINGRIFFE Columella Strut')}/>
                      <label>Columella Strut:</label>   
                  </li>
                  <ul className="d-flex four-col-row">
                    <li>
                        <input type="radio" name="columella_strut_opt" id={makeKey('columella_strut_opt von re')} value="von re." onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Columella Strut',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Columella Strut')}/>
                        <label>von re.</label>   
                    </li>
                    <li>
                        <input type="radio" name="columella_strut_opt" id={makeKey('columella_strut_opt von li')} value="von li." onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Columella Strut',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Columella Strut')}/>
                        <label>von li.</label>   
                    </li>
                  </ul>
              </ul>
              <ul className="d-flex">
                  <li>
                      <input type="checkbox" value="Distal Septal Extention Graft" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts',true,['distal_septal_extention_graft_opt von re','distal_septal_extention_graft_opt von li'],false,false,'GEPLANTE EINGRIFFE Distal Septal Extention Graft')}/>
                      <label>Distal Septal Extention Graft:</label>   
                  </li>
                  <ul className="d-flex four-col-row">
                    <li>
                        <input type="radio" name="distal_septal_extention_graft_opt" id={makeKey('distal_septal_extention_graft_opt von re')} value="von re." onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Distal Septal Extention Graft',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Distal Septal Extention Graft')}/>
                        <label>von re.</label>   
                    </li>
                    <li>
                        <input type="radio" name="distal_septal_extention_graft_opt" id={makeKey('distal_septal_extention_graft_opt von li')} value="von li." onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Distal Septal Extention Graft',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','Distal Septal Extention Graft')}/>
                        <label>von li.</label>   
                    </li>
                  </ul>
              </ul>
              <ul className="d-flex">
                  <li>
                      <input type="checkbox" value="AARG" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts',true,['aarg_opt rechts gt links','aarg_opt rechts lt links'],false,false,'GEPLANTE EINGRIFFE AARG')}/>
                      <label>AARG</label>   
                  </li>
                  <ul className="d-flex four-col-row">
                    <li>
                        <input type="radio" name="aarg_opt" id={makeKey('aarg_opt rechts lt links')} value="rechts < links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE AARG',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','AARG')}/>
                        <label>rechts &lt; links</label>   
                    </li>
                    <li>
                        <input type="radio" name="aarg_opt" id={makeKey('aarg_opt rechts gt links')} value="rechts > links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE AARG',true,'GEPLANTE EINGRIFFE notwendige OP Schritte statische Grafts','AARG')}/>
                        <label>rechts &gt; links</label>   
                    </li>
                  </ul>
              </ul>
              <h4 className="sub-heading">Rekonstruktion:</h4>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Rekonstruktion laterale FKs" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion',true)}/>
                      <label>Rekonstruktion laterale FKs:</label>   
                  </li>                   
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Rekonstruktion distales Septum" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion',true)}/>
                      <label>Rekonstruktion distales Septum</label>   
                  </li>                   
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Turn under Flap / Stabilisierung Nasenflügel" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion',true)}/>
                      <label>Turn under Flap / Stabilisierung Nasenflügel</label>   
                  </li>                   
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="Ohrknorpelentnahme" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion',true,['ohrknorpelentnahme_opt ggf notig','ohrknorpelentnahme_opt sicher notig'],false,false,'GEPLANTE EINGRIFFE Ohrknorpelentnahme')}/>
                      <label>Ohrknorpelentnahme</label>   
                  </li>  
                  <li>
                      <input type="radio" name="ohrknorpelentnahme_opt" id={makeKey('ohrknorpelentnahme_opt ggf notig')} value="ggf.nötig" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Ohrknorpelentnahme',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion','Ohrknorpelentnahme')}/>
                      <label>ggf.nötig</label>   
                  </li>  
                  <li>
                      <input type="radio" name="ohrknorpelentnahme_opt" id={makeKey('ohrknorpelentnahme_opt sicher notig')} value="sicher nötig" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Ohrknorpelentnahme',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion','Ohrknorpelentnahme')}/>
                      <label>sicher nötig</label>   
                  </li>                   
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Extrakorporale Septumrekonstruktion" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Rekonstruktion',true)}/>
                      <label>Extrakorporale Septumrekonstruktion</label>   
                  </li>                   
              </ul>
              <h4 className="sub-heading">Sonstiges:</h4>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Nase gerade" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>Nase gerade</label>   
                  </li>                   
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="TP Nasenrücken" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true,['tp_nasenrucken_opt dick','tp_nasenrucken_opt dunn'],false,false,'GEPLANTE EINGRIFFE TP Nasenrucken')}/>
                      <label>TP Nasenrücken</label>   
                  </li>                   
                  <li>
                      <input type="radio" name="tp_nasenrucken_opt" id={makeKey('tp_nasenrucken_opt dick')} value="dick" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE TP Nasenrucken',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','TP Nasenrücken')}/>
                      <label>dick</label>   
                  </li>                   
                  <li>
                      <input type="radio" name="tp_nasenrucken_opt" id={makeKey('tp_nasenrucken_opt dunn')} value="dünn" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE TP Nasenrucken',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','TP Nasenrücken')}/>
                      <label>dünn</label>   
                  </li>                   
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="Tip Rotation" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>Tip Rotation</label>   
                  </li>         
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="De-Rotation Tip" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>De-Rotation Tip</label>   
                  </li>             
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="Tip Shield" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>Tip Shield</label>   
                  </li>            
              </ul>
              <ul className="d-flex four-col-row">                 
                  <li>
                      <input type="checkbox" value="Columella Shield" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>Columella Shield</label>   
                  </li>             
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Spina kürzen" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>Spina kürzen </label>   
                  </li>                
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="BGW Resektion zwischen footplates" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>BGW Resektion zwischen footplates</label>   
                  </li>                
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Hautausdünnung am Tip" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true)}/>
                      <label>Hautausdünnung am Tip</label>   
                  </li>                
              </ul>
              <ul className="d-flex five-col-row">                 
                  <li className="NFR-width">
                      <input type="checkbox" value="Nasenflügelrandschnitt (NFR)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true,['nasenflugelrandschnitt_nfr_opt ggf','nasenflugelrandschnitt_nfr_opt links','nasenflugelrandschnitt_nfr_opt rechts','nasenflugelrandschnitt_nfr_opt beidseits'],false,false,'GEPLANTE EINGRIFFE Nasenflugelrandschnitt NFR')}/>
                      <label>Nasenflügelrandschnitt (NFR)</label>   
                  </li>                
                  <li>
                      <input type="radio" name="nasenflugelrandschnitt_nfr_opt" id={makeKey('nasenflugelrandschnitt_nfr_opt ggf')} value="ggf." onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Nasenflugelrandschnitt NFR',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','Nasenflügelrandschnitt (NFR)')}/>
                      <label>ggf.</label>   
                  </li>                
                  <li>
                      <input type="radio" name="nasenflugelrandschnitt_nfr_opt" id={makeKey('nasenflugelrandschnitt_nfr_opt links')} value="links" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Nasenflugelrandschnitt NFR',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','Nasenflügelrandschnitt (NFR)')}/>
                      <label>links</label>   
                  </li>                
                  <li>
                      <input type="radio" name="nasenflugelrandschnitt_nfr_opt" id={makeKey('nasenflugelrandschnitt_nfr_opt rechts')} value="rechts" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Nasenflugelrandschnitt NFR',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','Nasenflügelrandschnitt (NFR)')}/>
                      <label>rechts</label>   
                  </li>                
                  <li>
                      <input type="radio" name="nasenflugelrandschnitt_nfr_opt" id={makeKey('nasenflugelrandschnitt_nfr_opt beidseits')} value="beidseits" onClick={(e) => onRadioChange(e,'GEPLANTE EINGRIFFE Nasenflugelrandschnitt NFR',true,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','Nasenflügelrandschnitt (NFR)')}/>
                      <label>beidseits</label>   
                  </li>                
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="NNH Fensterung geplant mit Dr." onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges',true,['NNH Fensterung geplant mit Dr text'])}/>
                      <label>NNH Fensterung geplant mit Dr. <input id={makeKey('NNH Fensterung geplant mit Dr text')} type="text" className="border-input" placeholder="NNH Fensterung geplant mit Dr." onKeyUp={(e) => onTextChange(e,'NNH Fensterung geplant mit Dr text','GEPLANTE EINGRIFFE notwendige OP Schritte Sonstiges','NNH Fensterung geplant mit Dr.')}/></label>   
                  </li>                
                  <li>
                      <label>ca. 1.000 €</label>   
                  </li>                                 
              </ul>
              <h3>3.) Postoperativ:</h3>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="ggf. Cortison post OP" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Postoperativ',true)}/>
                      <label>ggf. Cortison post OP</label>   
                  </li>                
                  <li>
                      <label>1 Behandlung inklusive</label>   
                  </li>                                 
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="Hyaluronsäure" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Postoperativ',true)}/>
                      <label>Hyaluronsäure</label>   
                  </li>                
                  <li>
                      <label>1 Behandlung inklusive</label>   
                  </li>                                 
              </ul>
              <ul className="d-flex">                 
                  <li>
                      <input type="checkbox" value="CO2 Fraxal-Laser Narben" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Postoperativ',true)}/>
                      <label>CO2 Fraxal-Laser Narben </label>   
                  </li>                
                  <li>
                      <label>inklusive</label>   
                  </li>                                 
              </ul>
              <h3>4.) Sonstige Eingriffe:</h3>
              <ul className="two-col-row multi-content-row">                
                  <li>
                      <input type="checkbox" id="" value="Sonstige Eingriffe" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Sonstige Eingriffe',true,['Sonstige Eingriffe text'])}/>
                      <label><input id={makeKey('Sonstige Eingriffe text')} type="text" className="border-input" placeholder="Sonstige Eingriffe" onKeyUp={(e) => onTextChange(e,'Sonstige Eingriffe text','GEPLANTE EINGRIFFE Sonstige Eingriffe','Sonstige Eingriffe')}/></label>
                  </li>
                  <li>
                      <ul className="d-flex">
                          <li className="d-flex">                                
                              <label><input type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Sonstige Eingriffe euro text')}/>€</label>                  
                          </li>                      
                          <li className="d-flex">
                              <input type="checkbox" id="" placeholder="MI" value="MI" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Sonstige Eingriffe',true)}/>
                              <label>MI</label>
                          </li>
                          <li className="d-flex">
                              <input type="checkbox" id="" placeholder="AI" value="AI" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Sonstige Eingriffe',true)}/>
                              <label>AI</label>
                          </li>
                      </ul>
                  </li>    
              </ul>                
              <ul className="d-flex flex-end">    
                  <li>
                   <label><strong>SUMME OP-HONORAR</strong><input type="text" className="border-input" placeholder="SUMME OP-HONORAR" onKeyUp={(e) => onTextChange(e,'SUMME OP HONORAR euro text')}/>€</label>
                  </li>                                 
              </ul>
          </>
        )
  }

  const Klink = () => {
    return (
          <>
            <h2>KLINIK:</h2>
            <ul className="d-flex five-col-row">    
                <li>
                    <label>Anästhesie:</label>
                </li> 
                <li>
                    <input type="radio" id="" name="anasthesie_opt" value="LOK" onClick={(e) => onRadioChange(e,'KLINIK Anasthesie')}/>
                    <label>LOK</label>
                </li>                                
                <li>
                    <input type="radio" id="" name="anasthesie_opt" value="ITN" onClick={(e) => onRadioChange(e,'KLINIK Anasthesie')}/>
                    <label>ITN</label>
                </li>                                
            </ul>
            <ul className="d-flex">    
                <li>
                    <label>ambulant</label>
                </li> 
                <li>
                    <input type="radio" id="" name="ambulant_opt" value="1 Nächt" onClick={(e) => onRadioChange(e,'KLINIK ambulant 1')}/>
                    <label>1 Nächt</label>
                </li>                                
                <li>
                    <input type="radio" id="" name="ambulant_opt" value="2 Nächte" onClick={(e) => onRadioChange(e,'KLINIK ambulant 1')}/>
                    <label>2 Nächte</label>
                </li>
                <li>
                    <input type="radio" id="" name="ambulant_opt" value="3 Nächte" onClick={(e) => onRadioChange(e,'KLINIK ambulant 1')}/>
                    <label>3 Nächte</label>
                </li>
                <li>
                    <input type="radio" id="" name="ambulant_opt2" value="EZ" onClick={(e) => onRadioChange(e,'KLINIK ambulant 2')}/>
                    <label>EZ</label>
                </li>                                
                <li>
                    <input type="radio" id="" name="ambulant_opt2" value="DZ" onClick={(e) => onRadioChange(e,'KLINIK ambulant 2')}/>
                    <label>DZ</label>
                </li>
            </ul>
            <ul className="d-flex">    
                <li>
                 <label>OP-Dauer<input type="text" className="border-input" placeholder="OP-Dauer" onKeyUp={(e) => onTextChange(e,'KLINIK OP Dauer text')}/></label>
                </li>                                 
                <li>
                 <label><strong>SUMME KLINIK-KOSTEN </strong><input type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'KLINIK SUMME KLINIK KOSTEN euro text')}/>€</label>
                </li>                                 
            </ul>
            <ul className="d-flex">    
                <li>
                 <label>Geplantes OP-Datum:<input type="text" className="border-input" placeholder="Geplantes OP-Datum:" onKeyUp={(e) => onTextChange(e,'KLINIK Geplantes OP Datum text')}/></label>
                </li>                                 
                <li>
                 <label>Aufklärungsgespräch (OPVG) am:<input type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'KLINIK Aufklarungsgesprach OPVG am euro text')}/>€</label>
                </li>                                 
            </ul>
            <ul className="d-flex">    
                <li>
                 <label>OP-Honorar Summe gezahlt:<input type="text" className="border-input" placeholder="OP-Honorar Summe gezahlt:" onKeyUp={(e) => onTextChange(e,'KLINIK OP Honorar Summe gezahlt text')}/></label>
                </li>                                 
                <li>
                <input type="checkbox" id="" value="Kartenzahlung" onClick={(e) => onCheckboxChange(e,'KLINIK OP Honorar Summe gezahlt',true)}/>
                 <label>Kartenzahlung</label>
                </li>                                 
                <li>
                <input type="checkbox" id="" value="Rechnung" onClick={(e) => onCheckboxChange(e,'KLINIK OP Honorar Summe gezahlt',true)}/>
                 <label>Rechnung </label>
                </li>                                 
            </ul>
            <ul className="d-flex">  
               <li>
                    <input type="checkbox" id="" value="OP-Honorar bezahlt" onClick={(e) => onCheckboxChange(e,'KLINIK OP Honorar bezahlt')}/>
                    <label>OP-Honorar bezahlt</label>
                </li>                               
            </ul>
            <ul className="d-flex">
                <li className="full-row">
                    <label>Besonderheiten:</label>
                    <input type="text" className="border-input" placeholder="Besonderheiten:" onKeyUp={(e) => onTextChange(e,'KLINIK Besonderheiten text')}/>
                </li>  
            </ul>
            <h4 className="sub-heading">Kompressionswäsche:</h4>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Stirnband" onClick={(e) => onCheckboxChange(e,'KLINIK Kompressionswasche',true,['stirnband_opt Grobe S','stirnband_opt Grobe M','stirnband_opt Grobe L','stirnband_opt Grobe XL'],false,false,'KLINIK Stirnband')}/>
                    <label>Stirnband</label>
                </li>  
                <li>
                    <input type="radio" name="stirnband_opt" id={makeKey('stirnband_opt Grobe S')} value="Größe S" onClick={(e) => onRadioChange(e,'KLINIK Stirnband',true,'KLINIK Kompressionswasche','Stirnband')}/>
                    <label>Größe S</label>
                </li>  
                <li>
                    <input type="radio" name="stirnband_opt" id={makeKey('stirnband_opt Grobe M')} value="Größe M" onClick={(e) => onRadioChange(e,'KLINIK Stirnband',true,'KLINIK Kompressionswasche','Stirnband')}/>
                    <label>Größe M</label>
                </li>  
                <li>
                    <input type="radio" name="stirnband_opt" id={makeKey('stirnband_opt Grobe L')} value="Größe L" onClick={(e) => onRadioChange(e,'KLINIK Stirnband',true,'KLINIK Kompressionswasche','Stirnband')}/>
                    <label>Größe L</label>
                </li>  
                <li>
                    <input type="radio" name="stirnband_opt" id={makeKey('stirnband_opt Grobe XL')} value="Größe XL" onClick={(e) => onRadioChange(e,'KLINIK Stirnband',true,'KLINIK Kompressionswasche','Stirnband')}/>
                    <label>Größe XL</label>
                </li>  
            </ul>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Kinn" onClick={(e) => onCheckboxChange(e,'KLINIK Kompressionswasche',true,['kinn_opt Grobe S','kinn_opt Grobe M','kinn_opt Grobe L','kinn_opt Grobe XL'],false,false,'KLINIK Kinn')}/>
                    <label>Kinn</label>
                </li>  
                <li>
                    <input type="radio" name="kinn_opt" id={makeKey('kinn_opt Grobe S')} value="Größe S" onClick={(e) => onRadioChange(e,'KLINIK Kinn',true,'KLINIK Kompressionswasche','Kinn')}/>
                    <label>Größe S</label>
                </li>  
                <li>
                    <input type="radio" name="kinn_opt" id={makeKey('kinn_opt Grobe M')} value="Größe M" onClick={(e) => onRadioChange(e,'KLINIK Kinn',true,'KLINIK Kompressionswasche','Kinn')}/>
                    <label>Größe M</label>
                </li>  
                <li>
                    <input type="radio" name="kinn_opt" id={makeKey('kinn_opt Grobe L')} value="Größe L" onClick={(e) => onRadioChange(e,'KLINIK Kinn',true,'KLINIK Kompressionswasche','Kinn')}/>
                    <label>Größe L</label>
                </li>  
                <li>
                    <input type="radio" name="kinn_opt" id={makeKey('kinn_opt Grobe XL')} value="Größe XL" onClick={(e) => onRadioChange(e,'KLINIK Kinn',true,'KLINIK Kompressionswasche','Kinn')}/>
                    <label>Größe XL</label>
                </li>  
            </ul>
            <ul className="d-flex">
                <li>   <input type="checkbox" value="Sonstiges" onClick={(e) => onCheckboxChange(e,'KLINIK Kompressionswasche',true,['KLINIK Kompressionswasche Sonstiges text'])}/>              
                    <label>Sonstiges: <input id={makeKey('KLINIK Kompressionswasche Sonstiges text')} type="text" className="border-input" placeholder="Sonstiges" onKeyUp={(e) => onTextChange(e,'KLINIK Kompressionswasche Sonstiges text','KLINIK Kompressionswasche','Sonstiges')}/></label>
                </li>                      
            </ul>
            <h4 className="sub-heading">Utensilien:</h4>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Lasersonde" onClick={(e) => onCheckboxChange(e,'KLINIK Utensilien',true)}/>
                    <label>Lasersonde</label>
                </li>
            </ul>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Hyaluronsäure" onClick={(e) => onCheckboxChange(e,'KLINIK Utensilien',true)}/>
                    <label>Hyaluronsäure</label>
                </li>  
            </ul>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Lipofilling-Kanüle" onClick={(e) => onCheckboxChange(e,'KLINIK Utensilien',true)}/>
                    <label>Lipofilling-Kanüle</label>
                </li>  
            </ul>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Rauchabsaugung" onClick={(e) => onCheckboxChange(e,'KLINIK Utensilien',true)}/>
                    <label>Rauchabsaugung</label>
                </li>                  
            </ul>
            <ul className="d-flex five-col-row">
                <li>
                    <input type="checkbox" value="Tumeszenzlösung" onClick={(e) => onCheckboxChange(e,'KLINIK Utensilien',true)}/>
                    <label>Tumeszenzlösung</label>
                </li>                    
            </ul>
            <ul className="d-flex">
                <li> <input type="checkbox" value="Anderes" onClick={(e) => onCheckboxChange(e,'KLINIK Utensilien',true,['KLINIK Utensilien Anderes text'])}/>                
                    <label>Anderes: <input id={makeKey('KLINIK Utensilien Anderes text')} type="text" className="border-input" placeholder="Anderes:" onKeyUp={(e) => onTextChange(e,'KLINIK Utensilien Anderes text','KLINIK Utensilien','Anderes')}/></label>
                </li>                      
            </ul>
            <h4 className="sub-heading">Lagerung:</h4>
            <ul className="d-flex four-col-row">
                <li>    
                    <input type="checkbox" value="Rückenlagerung" onClick={(e) => onCheckboxChange(e,'KLINIK Lagerung',true)}/>             
                    <label>Rückenlagerung</label>
                </li>               
            </ul>
            <ul className="d-flex four-col-row">
                <li>    
                    <input type="checkbox" value="Bauchlagerung" onClick={(e) => onCheckboxChange(e,'KLINIK Lagerung',true)}/>             
                    <label>Bauchlagerung</label>
                </li>             
            </ul>
            <ul className="d-flex four-col-row">
                <li>    
                    <input type="checkbox" value="Steinschnittlagerung" onClick={(e) => onCheckboxChange(e,'KLINIK Lagerung',true)}/>             
                    <label>Steinschnittlagerung</label>
                </li>                      
            </ul>
            <ul className="d-flex four-col-row">
                <li>    
                    <input type="checkbox" value="Seitlagerung links" onClick={(e) => onCheckboxChange(e,'KLINIK Lagerung',true)}/>             
                    <label>Seitlagerung links</label>
                </li>                 
            </ul>
            <ul className="d-flex four-col-row">
                <li>    
                    <input type="checkbox" value="Seitlagerung rechts" onClick={(e) => onCheckboxChange(e,'KLINIK Lagerung',true)}/>             
                    <label>Seitlagerung rechts</label>
                </li>                   
            </ul>
            <ul className="d-flex four-col-row">
                <li>    
                    <input type="checkbox" value="Umlagern intraoperativ" onClick={(e) => onCheckboxChange(e,'KLINIK Lagerung',true)}/>             
                    <label>Umlagern intraoperativ</label>
                </li>                      
            </ul>
            <h4 className="sub-heading">Erreichbarkeit Recall:</h4>
            <ul className="d-flex">
                <li>    
                    <input type="radio" name="erreichbarkeit_recall_opt" value="Montag" onClick={(e) => onRadioChange(e,'KLINIK Erreichbarkeit Recall 1')}/>             
                    <label>Montag</label>
                </li> 
                <li>    
                    <input type="radio" name="erreichbarkeit_recall_opt" value="Dienstag" onClick={(e) => onRadioChange(e,'KLINIK Erreichbarkeit Recall 1')}/>             
                    <label>Dienstag</label>
                </li> 
                <li>    
                    <input type="radio" name="erreichbarkeit_recall_opt" value="Mittwoch" onClick={(e) => onRadioChange(e,'KLINIK Erreichbarkeit Recall 1')}/>             
                    <label>Mittwoch</label>
                </li>
            </ul>
            <ul className="d-flex">                   
                <li>    
                    <input type="radio" name="erreichbarkeit_recall_opt2" value="09:00-12:00" onClick={(e) => onRadioChange(e,'KLINIK Erreichbarkeit Recall 2')}/>             
                    <label>09:00-12:00</label>
                </li>                      
                <li>    
                    <input type="radio" name="erreichbarkeit_recall_opt2" value="12:00-15:00" onClick={(e) => onRadioChange(e,'KLINIK Erreichbarkeit Recall 2')}/>             
                    <label>12:00-15:00</label>
                </li>                      
                <li>    
                    <input type="radio" name="erreichbarkeit_recall_opt2" value="15:00-18:00" onClick={(e) => onRadioChange(e,'KLINIK Erreichbarkeit Recall 2')}/>             
                    <label>15:00-18:00</label>
                </li>                      
            </ul>
            <ul className="d-flex">
                <li>   
                    <input type="checkbox" value="Recall erfolgt durch" onClick={(e) => onCheckboxChange(e,'KLINIK Erreichbarkeit Recall',true,['KLINIK Erreichbarkeit Recall erfolgt durch text'])}/>              
                    <label>Recall erfolgt durch: <input id={makeKey('KLINIK Erreichbarkeit Recall erfolgt durch text')} type="text" className="border-input" placeholder="Recall erfolgt durch:" onKeyUp={(e) => onTextChange(e,'KLINIK Erreichbarkeit Recall erfolgt durch text','KLINIK Erreichbarkeit Recall','Recall erfolgt durch')}/></label>
                </li> 
            </ul>
            <ul className="d-flex">
                <li>   
                    <input type="checkbox" value="Nachweis Folgekostenversicherung liegt vor" onClick={(e) => onCheckboxChange(e,'KLINIK Erreichbarkeit Recall',true)}/>              
                    <label>Nachweis Folgekostenversicherung liegt vor</label>
                </li> 
            </ul>
            <h4 className="sub-heading">Simulation:</h4>
            <ul className="d-flex">
                <li>   
                    <input type="checkbox" value="Patient hat Foto von SIM gemacht" onClick={(e) => onCheckboxChange(e,'KLINIK Simulation',true)}/>              
                    <label><strong>Patient hat Foto von SIM gemacht:</strong></label>
                </li> 
                <li>   
                    <input type="checkbox" value="seitlich" onClick={(e) => onCheckboxChange(e,'KLINIK Simulation',true)}/>              
                    <label><strong>seitlich</strong></label>
                </li> 
                <li>   
                    <input type="checkbox" value="vorne" onClick={(e) => onCheckboxChange(e,'KLINIK Simulation',true)}/>              
                    <label><strong>vorne</strong></label>
                </li> 
            </ul>
          </>
      )
  }
  return (
    <>
      <div className="form-section">
          <form action="">           
              
              <HeaderElements />

              <h1 className="form-heading">OP-CHECKLISTE (funkt. Rhinoplastik) </h1> 
              
              <NameAndOtherDetails />

              <TopForm /> 
              
              <Diagnosen />
              
              <GeplanteEingriffe />
              
              <Klink />

         </form>              
      </div> 
    </>
  )
}