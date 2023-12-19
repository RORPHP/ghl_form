"use client"
import * as React from "react";
import './style.css'

export default function Page() {

  const [formData,setFormData] = React.useState({})

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
              <li>
                  <input type="checkbox" id="" value="Attext Gynäkologie (medizinische Indikation)" onClick={(e) => onCheckboxChange(e,'Benötigte Befunde',true)}/>
                  <label>Attext Gynäkologie (medizinische Indikation)</label>
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
            <h4 className="sub-heading">Anamnese:</h4> 
            <ul className="two-col-row">
                <li>
                  <input type="checkbox" value="hoher psychischer Leidensdruck" onClick={(e) => onCheckboxChange(e,'Anamnese',true)}/>
                  <label>hoher psychischer Leidensdruck</label>
                </li>
                <li>
                  <input type="checkbox" id="" value="Schmerzen beim Sport" onClick={(e) => onCheckboxChange(e,'Anamnese',true)}/>
                  <label>Schmerzen beim Sport</label>
                </li>
                <li>
                  <input type="checkbox" id="" value="chronische Vulvitis" onClick={(e) => onCheckboxChange(e,'Anamnese',true)}/>
                  <label>chronische Vulvitis</label>
                </li>
                <li>
                  <input type="checkbox" id="" value="Schmerzen in enger Kleidung" onClick={(e) => onCheckboxChange(e,'Anamnese',true)}/>
                  <label>Schmerzen in enger Kleidung</label>
                </li>
                <li>
                  <input type="checkbox" id="" value="Schmerzen beim Geschlechtsverkehr" onClick={(e) => onCheckboxChange(e,'Anamnese',true)}/>
                  <label>Schmerzen beim Geschlechtsverkehr</label>
                </li>
                <li>
                  <input type="checkbox" id="" value="Entzündungen / Risse an Labia minora" onClick={(e) => onCheckboxChange(e,'Anamnese',true)}/>
                  <label>Entzündungen / Risse an Labia minora</label>
                </li>               
            </ul>
          </>
      )
  }

  const Diagnosen = () => {
    return (
        <>
          <h2>Diagnosen:</h2> 
          <ul className="d-flex four-col-row">                 
            <li>
                <input type="checkbox" value="Hypertrophie" id="" onClick={(e) => onCheckboxChange(e,'Diagnosen Hypertrophie',true,['Labia majora','Klitorismantel'],false,false,'Hypertrophie')}/>
                <label>Hypertrophie</label>
            </li>
            <li>
                <input type="checkbox" value="Labia majora" id="" onClick={(e) => onCheckboxChange(e,'Hypertrophie',true,false,'Diagnosen Hypertrophie','Hypertrophie')}/>
                <label>Labia majora</label>
            </li>
            <li>
                <input type="checkbox" value="Klitorismantel" id="" onClick={(e) => onCheckboxChange(e,'Hypertrophie',true,false,'Diagnosen Hypertrophie','Hypertrophie')}/>
                <label>Klitorismantel</label>
            </li>              
        </ul>
        <ul className="d-flex four-col-row">                
            <li>
                <input type="checkbox" id="" value="Asymmetrie Labia minora" onClick={(e) => onCheckboxChange(e,'Diagnosen',true,['Asymmetrie Labia minora_opt rechts lt links','Asymmetrie Labia minora_opt rechts gt links'],false,false,'Asymmetrie Labia minora')}/>
                <label>Asymmetrie Labia minora:</label>
            </li>
            <li>
                <input type="radio" name="Asymmetrie Labia minora_opt" id={makeKey('Asymmetrie Labia minora_opt rechts lt links')} value="rechts < links" onClick={(e) => onRadioChange(e,'Asymmetrie Labia minora',true,'Diagnosen','Asymmetrie Labia minora')}/>
                <label>rechts &lt; links</label>
            </li>
            <li>
                <input type="radio" name="Asymmetrie Labia minora_opt" id={makeKey('Asymmetrie Labia minora_opt rechts gt links')} value="rechts > links" onClick={(e) => onRadioChange(e,'Asymmetrie Labia minora',true,'Diagnosen','Asymmetrie Labia minora')}/>
                <label>rechts &gt; links</label>
            </li>            
        </ul>
        <ul className="d-flex">                 
             <li>
                 <input type="checkbox" id="" value="Z.n. Intim OP in alio loco" onClick={(e) => onCheckboxChange(e,'Diagnosen',true,['Z n Intim OP in alio loco im Jahr text','Z n Intim OP in alio loco wo Jahr text'])}/>
                 <label> Z.n. Intim OP in alio loco im Jahr:<input type="text" id={makeKey('Z n Intim OP in alio loco im Jahr text')} className="border-input" placeholder="im Jahr" onKeyUp={(e) => onTextChange(e,'Z n Intim OP in alio loco im Jahr text','Diagnosen','Z.n. Intim OP in alio loco')} />wo:<input type="text" id={makeKey('Z n Intim OP in alio loco wo Jahr text')} className="border-input" placeholder="wo:" onKeyUp={(e) => onTextChange(e,'Z n Intim OP in alio loco wo Jahr text','Diagnosen','Z.n. Intim OP in alio loco')}/></label>
             </li>
         </ul>
          <ul className="d-flex">                 
             <li>
                 <input type="checkbox" id="" value="Z.n. Labienriss zur Entbindung" onClick={(e) => onCheckboxChange(e,'Diagnosen',true,['Z n Labienriss zur Entbindung im Jahr text'])}/>
                 <label>Z.n. Labienriss zur Entbindung im Jahr:<input id={makeKey('Z n Labienriss zur Entbindung im Jahr text')} type="text" className="border-input" placeholder="im Jahr" onKeyUp={(e) => onTextChange(e,'Z n Labienriss zur Entbindung im Jahr text','Diagnosen','Z.n. Labienriss zur Entbindung')}/></label>
             </li>
         </ul>
          <ul>
             <li className="full-row">
                <input type="checkbox" id="" value="Sonstige Diagnosen" onClick={(e) => onCheckboxChange(e,'Diagnosen',true,['Sonstige Diagnosen text'])}/>
                <label>Sonstige Diagnosen: <input type="text" id={makeKey('Sonstige Diagnosen text')} className="border-input" placeholder="Sonstige Diagnosen:" onKeyUp={(e) => onTextChange(e,'Sonstige Diagnosen text','Diagnosen','Sonstige Diagnosen')}/></label>
            </li>
         </ul>
         <ul>
             <li className="full-row">
                <input type="checkbox" id="" value="Wunsch der Patientin" onClick={(e) => onCheckboxChange(e,'Diagnosen',true,['Wunsch der Patientin text'])}/>
                <label>Wunsch der Patientin: <input type="text" id={makeKey('Wunsch der Patientin text')}className="border-input" placeholder="Wunsch der Patientin:" onKeyUp={(e) => onTextChange(e,'Wunsch der Patientin text','Diagnosen','Wunsch der Patientin')}/></label>
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
              <ul className="two-col-row multi-content-row">                
                    <li><strong>1.)</strong>
                        <input type="checkbox" id="" value="Labienplastik innen (LP)" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 1',false,['Labienplastik innen LP euro text','Labienplastik innen LP MI','Labienplastik innen LP AI'],false,false,'GEPLANTE EINGRIFFE Labienplastik innen LP')}/>
                        <label><strong>Labienplastik innen (LP)</strong></label>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('Labienplastik innen LP euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Labienplastik innen LP euro text','GEPLANTE EINGRIFFE 1','Labienplastik innen (LP)')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('Labienplastik innen LP MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Labienplastik innen LP',true,false,'GEPLANTE EINGRIFFE 1','Labienplastik innen (LP)')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('Labienplastik innen LP AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Labienplastik innen LP',true,false,'GEPLANTE EINGRIFFE 1','Labienplastik innen (LP)')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>
                </ul>
                <ul className="two-col-row multi-content-row">                
                    <li><strong>2.)</strong>
                        <input type="checkbox" id="" value="LP & Klitorismantelstraffung" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 2',false,['LP Klitorismantelstraffung euro text','LP Klitorismantelstraffung MI','LP Klitorismantelstraffung AI'],false,false,'GEPLANTE EINGRIFFE LP Klitorismantelstraffung')}/>
                        <label><strong>LP & Klitorismantelstraffung</strong></label>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('LP Klitorismantelstraffung euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'LP Klitorismantelstraffung euro text','GEPLANTE EINGRIFFE 2','LP & Klitorismantelstraffung')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('LP Klitorismantelstraffung MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE LP Klitorismantelstraffung',true,false,'GEPLANTE EINGRIFFE 2','LP & Klitorismantelstraffung')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('LP Klitorismantelstraffung AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE LP Klitorismantelstraffung',true,false,'GEPLANTE EINGRIFFE 2','LP & Klitorismantelstraffung')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>
                </ul>
                <ul className="two-col-row multi-content-row">                
                    <li><strong>3.)</strong>
                        <input type="checkbox" id="" value="Reduktion äußere Schamlippen (Labia majora) mt Leonardo-Laser" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 3',false,['Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser euro text','Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser MI','Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser AI'],false,false,'GEPLANTE EINGRIFFE Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser')}/>
                        <label><strong>Reduktion äußere Schamlippen (Labia majora) mt Leonardo-Laser</strong></label>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser euro text','GEPLANTE EINGRIFFE 3','Reduktion äußere Schamlippen (Labia majora) mt Leonardo-Laser')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser',true,false,'GEPLANTE EINGRIFFE 3','Reduktion äußere Schamlippen (Labia majora) mt Leonardo-Laser')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Reduktion aubere Schamlippen Labia majora mt Leonardo-Laser',true,false,'GEPLANTE EINGRIFFE 3','Reduktion äußere Schamlippen (Labia majora) mt Leonardo-Laser')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>
                </ul>
                 <ul className="two-col-row multi-content-row">                
                    <li><strong>4.)</strong>
                        <input type="checkbox" id="" value="Reduktion äußere Schamlippen (Labia majora) mittels Schnitt" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 4',false,['Reduktion aubere Schamlippen Labia majora mittels Schnitt euro text','Reduktion aubere Schamlippen Labia majora mittels Schnitt MI','Reduktion aubere Schamlippen Labia majora mittels Schnitt AI'],false,false,'GEPLANTE EINGRIFFE Reduktion aubere Schamlippen Labia majora mittels Schnitt')}/>
                        <label><strong>Reduktion äußere Schamlippen (Labia majora) mittels Schnitt</strong></label>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('Reduktion aubere Schamlippen Labia majora mittels Schnitt euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Reduktion aubere Schamlippen Labia majora mittels Schnitt euro text','GEPLANTE EINGRIFFE 4','Reduktion äußere Schamlippen (Labia majora) mittels Schnitt')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('Reduktion aubere Schamlippen Labia majora mittels Schnitt MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Reduktion aubere Schamlippen Labia majora mittels Schnitt',true,false,'GEPLANTE EINGRIFFE 4','Reduktion äußere Schamlippen (Labia majora) mittels Schnitt')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('Reduktion aubere Schamlippen Labia majora mittels Schnitt AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Reduktion aubere Schamlippen Labia majora mittels Schnitt',true,false,'GEPLANTE EINGRIFFE 4','Reduktion äußere Schamlippen (Labia majora) mittels Schnitt')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>
                </ul>
                <ul className="two-col-row multi-content-row">                
                    <li><strong>5.)</strong>
                        <input type="checkbox" id="" value="Liposuktion Mons Pubis" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 5',false,['Liposuktion Mons Pubis euro text','Liposuktion Mons Pubis MI','Liposuktion Mons Pubis AI'],false,false,'GEPLANTE EINGRIFFE Liposuktion Mons Pubis')}/>
                        <label><strong>Liposuktion Mons Pubis </strong></label>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('Liposuktion Mons Pubis euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Liposuktion Mons Pubis euro text','GEPLANTE EINGRIFFE 5','Liposuktion Mons Pubis')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('Liposuktion Mons Pubis MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Liposuktion Mons Pubis',true,false,'GEPLANTE EINGRIFFE 5','Liposuktion Mons Pubis')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('Liposuktion Mons Pubis AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Liposuktion Mons Pubis',true,false,'GEPLANTE EINGRIFFE 5','Liposuktion Mons Pubis')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>
                </ul>
                <ul className="two-col-row multi-content-row">                
                    <li><strong>6.)</strong>
                        <input type="checkbox" id="" value="Leo-Laser Mons Pubis" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 6',false,['Leo Laser Mons Pubis euro text','Leo Laser Mons Pubis MI','Leo Laser Mons Pubis AI'],false,false,'GEPLANTE EINGRIFFE Leo Laser Mons Pubis')}/>
                        <label><strong>Leo-Laser Mons Pubis</strong></label>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('Leo Laser Mons Pubis euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Leo Laser Mons Pubis euro text','GEPLANTE EINGRIFFE 6','Leo-Laser Mons Pubis')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('Leo Laser Mons Pubis MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Leo Laser Mons Pubis',true,false,'GEPLANTE EINGRIFFE 6','Leo-Laser Mons Pubis')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('Leo Laser Mons Pubis AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Leo Laser Mons Pubis',true,false,'GEPLANTE EINGRIFFE 6','Leo-Laser Mons Pubis')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>
                </ul>               
                <ul className="two-col-row multi-content-row">                
                    <li><strong>7.)</strong>
                        <input type="checkbox" id="" value="Sonstige Eingriffe" onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE 7',false,['Sonstige Eingriffe text','Sonstige Eingriffe euro text','Sonstige Eingriffe MI','Sonstige Eingriffe AI'],false,false,'GEPLANTE EINGRIFFE Sonstige Eingriffe')}/>
                        <label><strong>Sonstige Eingriffe:</strong></label>
                    </li>                   
                </ul>
                <ul className="two-col-row multi-content-row">                
                    <li>
                        <input type="text" id={makeKey('Sonstige Eingriffe text')} placeholder="Sonstige Eingriffe" className="border-input" onKeyUp={(e) => onTextChange(e,'Sonstige Eingriffe text','GEPLANTE EINGRIFFE 7','Sonstige Eingriffe')}/>
                    </li>
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><input id={makeKey('Sonstige Eingriffe euro text')} type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'Sonstige Eingriffe euro text','GEPLANTE EINGRIFFE 7','Sonstige Eingriffe')}/>€</label>
                            </li>                      
                            <li className="d-flex">
                                <input type="checkbox" value="MI" id={makeKey('Sonstige Eingriffe MI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Sonstige Eingriffe',true,false,'GEPLANTE EINGRIFFE 7','Sonstige Eingriffe')}/>
                                <label>MI</label>
                            </li>
                            <li className="d-flex">
                                <input type="checkbox" value="AI" id={makeKey('Sonstige Eingriffe AI')} onClick={(e) => onCheckboxChange(e,'GEPLANTE EINGRIFFE Sonstige Eingriffe',true,false,'GEPLANTE EINGRIFFE 7','Sonstige Eingriffe')}/>
                                <label>AI</label>
                            </li>
                        </ul>                        
                    </li>              
                </ul>
                <ul className="d-flex flex-end">             
                  
                    <li>
                        <ul className="d-flex">
                            <li className="d-flex">                                
                                <label><strong>SUMME OP-HONORAR</strong><input type="text" className="border-input" placeholder="€" onKeyUp={(e) => onTextChange(e,'SUMME OP HONORAR euro text')}/>€</label>                  
                            </li>                     
                        </ul>
                    </li>
                </ul>
          </>
        )
  }

  const Klink = () => {
    return (
          <>
            <h2>KLINIK KOSTEN:</h2>
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

              <HeaderElements />

              <h1 className="form-heading">OP-CHECKLISTE (funkt. Rhinoplastik) </h1> 
              
              <NameAndOtherDetails />

              <TopForm /> 
              
              <Diagnosen />
              
              <GeplanteEingriffe />
              
              <Klink />

              <div className="footer-logo">
                  <img src="footer-logo.png" alt="Image" />
              </div>

         </form>              
      </div> 
    </>
  )
}