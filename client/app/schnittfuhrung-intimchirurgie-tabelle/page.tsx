"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'

import { PinturaEditor } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import '@pqina/pintura/pintura.css';

import './style.css'

export default function Page() {

  const [formData,setFormData] = React.useState({})
  const [patientSigRef,setPatientSigRef] = React.useState(null)
  // const [inlineResult, setInlineResult] = React.useState();


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

  const toBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <>

      <div className="form-section">
        <form action="">  
            <div className="header-logo">
                <img src="header-logo.png" alt="Image" />
            </div> 
            <h1 className="form-heading">Schnittführung Intimchirurgie</h1>
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
                    <input type="text" id="Name" placeholder="Name" onChange={(e) => onTextChange(e,'Name')}/>
                </li>                 
                <li>
                    <label htmlFor="Vorname">Vorname:</label>
                    <input type="text" id="Vorname" placeholder="Vorname" onChange={(e) => onTextChange(e,'Vorname')}/>
                </li>                  
                <li>
                    <label htmlFor="Geburtsname">Geburtsname:</label>
                    <input type="text" id="Geburtsname" placeholder="Geburtsname" onChange={(e) => onTextChange(e,'Geburtsname')}/>
                </li>                  
                <li>
                    <label htmlFor="Geburtsdatum">Geburtsdatum:</label>
                    <input type="text" id="Geburtsdatum" placeholder="Geburtsdatum" onChange={(e) => onTextChange(e,'Geburtsdatum')}/>
                </li>                  
                <li>
                    <label htmlFor="Adresse">Versicherung:</label>
                    <input type="text" id="Adresse" placeholder="Versicherung" onChange={(e) => onTextChange(e,'Versicherung')}/>
                </li>
                <li>
                    <label htmlFor="Hausarzt">Name des Hauptversicherten:</label>
                    <input type="text" id="Hausarzt" placeholder="Name des Hauptversicherten" onChange={(e) => onTextChange(e,'Name des Hauptversicherten')}/>
                </li>                   
                <li>
                    <label htmlFor="Hausarzt">Geburtsdatum des Hauptversicherten:</label>
                    <input type="text" id="Hausarzt" placeholder="Geburtsdatum des Hauptversicherten" onChange={(e) => onTextChange(e,'Geburtsdatum des Hauptversicherten')}/>
                </li>                  
                <li>
                    <label htmlFor="Facharzt">Anschrit:</label>
                    <input type="text" id="Facharzt" placeholder="Anschrit" onChange={(e) => onTextChange(e,'Anschrit')}/>
                </li>  
                 <li>
                    <label htmlFor="Facharzt">E-Mail:</label>
                    <input type="text" id="Facharzt" placeholder="E-Mail" onChange={(e) => onTextChange(e,'E Mail')}/>
                </li>                
                <li>
                    <label htmlFor="Facharzt">Telefon:</label>
                    <input type="text" id="Facharzt" placeholder="Telefon" onChange={(e) => onTextChange(e,'Telefon')}/>
                </li>                  
                <li>
                    <label htmlFor="Facharzt">Handy:</label>
                    <input type="text" id="Facharzt" placeholder="Handy" onChange={(e) => onTextChange(e,'Handy')}/>
                </li>              
                <li>
                    <label htmlFor="Facharzt">Beruf:</label>
                    <input type="text" id="" placeholder="Beruf" onChange={(e) => onTextChange(e,'Beruf')}/>
                </li>                  
                <li>
                    <label htmlFor="Facharzt">Anschrift Hausarzt:</label>
                    <input type="text" id="" placeholder="Anschrift Hausarzt" onChange={(e) => onTextChange(e,'Anschrift Hausarzt')}/>
                </li>                  
                <li>
                    <label htmlFor="Facharzt">Anschrift einweisender Facharzt:</label>
                    <input type="text" id="" placeholder="Anschrift einweisender Facharzt" onChange={(e) => onTextChange(e,'Anschrift einweisender Facharzt')}/>
                </li>
                 <li className="radio-row">
                    <label htmlFor="Raucher"><input type="radio" value="roucher" name="raucher" onClick={(e) => onRadioChange(e,'raucher')}/>Raucher?</label>
                    <label htmlFor="Raucher"><input type="radio" value="ex-roucher" name="raucher" onClick={(e) => onRadioChange(e,'raucher')}/>Ex-Raucher?</label>
                    
                </li>                  
            </ul>         
            <ul className="one-col-row"> 
                <li>
                    <label>Diagnose:</label>
                </li>
                <li>
                    <input type="checkbox" value="Hypertrophie Labia minora" onClick={(e) => onCheckboxChange(e,'Diagnose',true)}/>
                    <label>Hypertrophie Labia minora</label>
                </li>
                <li>
                    <input type="checkbox" value="Hypertrophie Klitorismantel" onClick={(e) => onCheckboxChange(e,'Diagnose',true)}/>
                    <label>Hypertrophie Klitorismantel</label>
                </li>
                <li>
                    <input type="checkbox" value="Hypertrophie Labia majora" onClick={(e) => onCheckboxChange(e,'Diagnose',true)}/>
                    <label>Hypertrophie Labia majora</label>
                </li>              
            </ul>            
            <ul className="mt-20">
                <li>Besonderheiten:</li>
            </ul>        
            <ul className="d-flex three-col-row mb-20"> 
                <li>
                     <input type="checkbox" value="Penicillin-Allergie" onClick={(e) => onCheckboxChange(e,'Besonderheiten',true)}/>
                    <label>Penicillin-Allergie</label>
                </li>
                <li>
                   
                    <input type="checkbox" value="Latex-Allergie" onClick={(e) => onCheckboxChange(e,'Besonderheiten',true)}/>
                    <label>Latex-Allergie</label>
                </li>
                <li>
                    <input type="checkbox" value="Novalgin-Allergie" onClick={(e) => onCheckboxChange(e,'Besonderheiten',true)}/>
                    <label>Novalgin-Allergie</label>
                </li>                           
            </ul>          
             <ul className="one-col-row"> 
                <li>Therapie:</li>
                <li>
                    <input type="checkbox" value="Labienplastik (LP)" onClick={(e) => onCheckboxChange(e,'Therapie',true)}/>
                    <label>Labienplastik (LP)</label>
                </li>
                <li>
                    <input type="checkbox" value="Klitorismantelstraffung" onClick={(e) => onCheckboxChange(e,'Therapie',true)}/>
                    <label>Klitorismantelstraffung</label>
                </li>
                <li>
                    <input type="checkbox" value="Reduktion äußere Schamlippen (Labia majora)" onClick={(e) => onCheckboxChange(e,'Therapie',true)}/>
                    <label>Reduktion äußere Schamlippen (Labia majora)</label>
                </li>              
            </ul> 
            <div className="img-wrapper">
                <div style={{height: '80vh'}}>
                    <PinturaEditor
                        {...getEditorDefaults()}
                        src="incision_in_intimate_surgery.png"
                        onProcess={async (res) => {

                            // formData.patient_img = URL.createObjectURL(res.dest) //returns blob
                            formData.patient_img = await toBase64(res.dest as File); //returns base64 image code
                            console.log(formData)
                        }}
                    />
                </div>
            </div>              
            <div className="footer-logo">
                <img src="footer-logo.png" alt="Image" />
            </div>
         </form>
      </div>
    </>
  )
}
