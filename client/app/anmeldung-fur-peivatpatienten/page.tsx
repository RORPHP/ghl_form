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

  const makeKey = (key) => {
    return key.replaceAll(' ','_').toLowerCase()
  }
  
  return (
    <>
        <div className="form-section">
            <form action="">      
                <div className="header-logo">
                    <img src="header-logo.png" alt="Image" />
                </div>
                <h1 className="form-heading">ANMELDUNG FÜR PRIVATPATIENTEN</h1>
                <ul className="info-form">
                    <li>
                        <label htmlFor="Name">Name:</label>
                        <input type="text" id="Name" placeholder="Name" onKeyUp={(e) => onTextChange(e,'name')}/>
                    </li>                  
                    <li>
                        <label htmlFor="Vorname">Vorname:</label>
                        <input type="text" id="Vorname" placeholder="Vorname" onKeyUp={(e) => onTextChange(e,'Vorname')}/>
                    </li>                  
                    <li>
                        <label htmlFor="Geburtsname">Geburtsname:</label>
                        <input type="text" id="Geburtsname" placeholder="Geburtsname" onKeyUp={(e) => onTextChange(e,'Geburtsname')}/>
                    </li>                  
                    <li>
                        <label htmlFor="Geburtsdatum">Geburtsdatum:</label>
                        <input type="text" id="Geburtsdatum" placeholder="Geburtsdatum" onKeyUp={(e) => onTextChange(e,'Geburtsdatum')}/>
                    </li>                  
                    <li className="input-full-w">
                        <label htmlFor="Adresse">Versicherung:</label>
                        <input type="text" id="Adresse" placeholder="Versicherung" onKeyUp={(e) => onTextChange(e,'Versicherung')}/>
                    </li>                  
                    <li className="input-full-w">
                        <label htmlFor="Hausarzt">Name und Geburtsdatum des Hauptversicherten:</label>
                        <input type="text" id="Hausarzt" placeholder="Name und Geburtsdatum des Hauptversicherten" onKeyUp={(e) => onTextChange(e,'Name und Geburtsdatum des Hauptversicherten')}/>
                    </li>                  
                    <li className="input-full-w">
                        <label htmlFor="Anschrift">Anschrift:</label>
                        <input type="text" id="Anschrift" placeholder="Anschrift" onKeyUp={(e) => onTextChange(e,'Anschrift')}/>
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
                        <label htmlFor="E-Mail">E-Mail:</label>
                        <input type="text" id="E-Mail" placeholder="E-Mail" onKeyUp={(e) => onTextChange(e,'E-Mail')}/>
                    </li>                  
                    <li>
                        <label htmlFor="Beruf">Beruf:</label>
                        <input type="text" id="Beruf" placeholder="Beruf" onKeyUp={(e) => onTextChange(e,'Beruf')}/>
                    </li>                  
                    <li className="input-full-w">
                        <label htmlFor="anschrift-hausarzt">Anschrift Hausarzt:</label>
                        <input type="text" id="anschrift-hausarzt" placeholder="Anschrift Hausarzt" onKeyUp={(e) => onTextChange(e,'Anschrift Hausarzt')}/>
                    </li>                  
                    <li className="input-full-w">
                        <label htmlFor="anschrift_einweisender_facharzt">Anschrift einweisender Facharzt:</label>
                        <input type="text" id="anschrift_einweisender_facharzt" placeholder="Anschrift einweisender Facharzt" onKeyUp={(e) => onTextChange(e,'Anschrift einweisender Facharzt')}/>
                    </li>                  
                </ul>
                <p>Sehr geehrte Patientinnen und Patienten,</p>
                <p>Unser Ziel ist es, Ihnen während der anschließenden Konsultation einen umfassenden und möglichst lückenlosen Überblick über die für Sie spezielle Frage kommende Behandlung zu geben. Zu Beginn und ggf. zum Ende der Beratung wird Ihnen eine Assistentin/ein Assistent der Praxis einige zusätzliche Fragen stellen und einen allgemeinen Überblick zum Ablauf der Behandlung in unserer Praxis bzw. in der Klinik geben.</p>
                <p>Unsere Abrechnung erfolgt auf der Grundlage der Gebührenordnung für Ärzte (GOÄ), welche Sie auf Wunsch jederzeit in unserer Praxis einsehen können. Für von uns veranlasste Leistungen anderer Ärzte, wie beispielsweise Laborleistungen, Gewebeuntersuchungen oder Anästhesie erhalten Sie von den beauftragten Ärzten ebenfalls eine Rechnung gemäß GOÄ. Aufgrund der Vielzahl unterschiedlich vereinbarter Versicherungstarife und der unterschiedlichen Handhabung in der Erstattung von Seiten der privaten Krankenversicherungen möchten wir Sie darauf hinweisen, dass die Differenz zwischen ärztlicher Rechnung und Erstattung von Ihnen getragen werden muss. Bei der Umsetzung einer vollständigen Erstattung seitens Ihrer Versicherung sind wir Ihnen selbstverständlich gerne behilflich.</p>
                <p>Ich bin mir bewusst, dass dieses Beratungsgespräch kostenpflichtig ist (300,- EUR) und der Betrag heute am Empfang (Karten- oder Barzahlung) zu begleichen ist.</p>
                <ul className="d-flex">
                    <li>Frankfurt am Main, den:<input type="text" className="border-input mr-20" placeholder="Frankfurt am Main, den" onKeyUp={(e) => onTextChange(e,'Frankfurt am Main den')}/>Unterschrift Patient/in:<input type="text" className="border-input" placeholder="Unterschrift Patient/in" onKeyUp={(e) => onTextChange(e,'Unterschrift Patient in')}/></li>
                </ul>
                <p className="text-center history-text">ANAMNESEBOGEN (FRAGEN ZUR KRANKENGESCHICHTE)</p>
                <p>Sehr geehrte Patientinnen und Patienten,</p>
                <p>Um Ihre Untersuchung und Behandlung optimal durchführen zu können, ist es für uns wichtig, Ihre Krankengeschichte, vorbestehende Krankheiten, Allergien, einzunehmende Medikamente oder durchgeführte Operationen zu kennen. Wir bitten Sie, die nachfolgenden Fragen sorgfältig zu beantworten. Haben oder hatten Sie eine der folgenden Krankheiten?</p>
                <ul className="d-flex">
                    <li>Körpergröße (cm):<input type="text" className="border-input mr-20" placeholder="Körpergröße (cm)" onKeyUp={(e) => onTextChange(e,'Korpergrobe')}/>Körpergewicht (kg):<input type="text" className="border-input" placeholder="Körpergewicht (kg)" onKeyUp={(e) => onTextChange(e,'Korpergewicht')}/></li>
                </ul>
                <ul className="one-col-row"> 
                    <li>
                        <input type="checkbox" value="Herzerkrankungen (z.B. KHK, Klappenfehler, Rhythmusstörungen)" onClick={(e) => onCheckboxChange(e,'Herzerkrankungen z B KHK Klappenfehler Rhythmusstorungen')}/>
                        <label>Herzerkrankungen (z.B. KHK, Klappenfehler, Rhythmusstörungen)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Kreislauferkrankungen (z.B. hoher oder niedriger Blutdruck o.a.)" onClick={(e) => onCheckboxChange(e,'Kreislauferkrankungen z B hoher oder niedriger Blutdruck o a')}/>
                        <label>Kreislauferkrankungen (z.B. hoher oder niedriger Blutdruck o.a.)</label>
                    </li> 
                    <li>
                        <input type="checkbox" value="Lungenerkrankungen (z.B. Asthma, Pneumonie, Tuberkulose o.a.)" onClick={(e) => onCheckboxChange(e,'Lungenerkrankungen z B Asthma Pneumonie Tuberkulose o a')}/>
                        <label>Lungenerkrankungen (z.B. Asthma, Pneumonie, Tuberkulose o.a.)</label>
                    </li>            
                    <li>
                        <input type="checkbox" value="Lebererkrankungen (z.B. Gelbsucht, Hepatitis, Fettleber o.a.)" onClick={(e) => onCheckboxChange(e,'Lebererkrankungen z B Gelbsucht Hepatitis Fettleber o a')}/>
                        <label>Lebererkrankungen (z.B. Gelbsucht, Hepatitis, Fettleber o.a.)</label>
                    </li>                
                    <li>
                        <input type="checkbox" value="Magen-Darmerkrankungen (z.B. Magengeschwür o.a.)" onClick={(e) => onCheckboxChange(e,'Magen Darmerkrankungen (z B Magengeschwur o a')}/>
                        <label>Magen-Darmerkrankungen (z.B. Magengeschwür o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Nierenerkrankungen (z.B. Nierensteine, Nierenentzündungen o.a.)" onClick={(e) => onCheckboxChange(e,'Nierenerkrankungen z B Nierensteine Nierenentzundungen o a')}/>
                        <label>Nierenerkrankungen (z.B. Nierensteine, Nierenentzündungen o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Stoffwechselerkrankungen (z.B. Diabetes mellitus , Gicht o.a.)" onClick={(e) => onCheckboxChange(e,'Stoffwechselerkrankungen z B Diabetes mellitus Gicht o a')}/>
                        <label>Stoffwechselerkrankungen (z.B. Diabetes mellitus , Gicht o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Hormonerkrankungen (z.B. Schilddrüsenfehlfunktion o.a.)" onClick={(e) => onCheckboxChange(e,'Hormonerkrankungen z B Schilddrusenfehlfunktion o a')}/>
                        <label>Hormonerkrankungen (z.B. Schilddrüsenfehlfunktion o.a.)</label>
                    </li>           
                    <li>
                        <input type="checkbox" value="Bluterkrankungen (z.B. Anämie, Leukämie o.a.)" onClick={(e) => onCheckboxChange(e,'Bluterkrankungen z B Anamie Leukamie o a')}/>
                        <label>Bluterkrankungen (z.B. Anämie, Leukämie o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Blutgerinnungsstörung (z.B. Neigung zu Blutergüssen o.a.)" onClick={(e) => onCheckboxChange(e,'Blutgerinnungsstorung z B Neigung zu Blutergussen o a')}/>
                        <label>Blutgerinnungsstörung (z.B. Neigung zu Blutergüssen o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Nervensystemerkrankungen (z.B. Migräne, Parkinson, Epilepsie)" onClick={(e) => onCheckboxChange(e,'Nervensystemerkrankungen z B Migrane Parkinson Epilepsie')}/>
                        <label>Nervensystemerkrankungen (z.B. Migräne, Parkinson, Epilepsie)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Gemütsleiden (z.B. Depressionen, Psychosen o.a.)" onClick={(e) => onCheckboxChange(e,'Gemutsleiden z B Depressionen Psychosen o a')}/>
                        <label>Gemütsleiden (z.B. Depressionen, Psychosen o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Augenerkrankungen (z.B. grüner oder grauer Star o.a.)" onClick={(e) => onCheckboxChange(e,'Augenerkrankungen z B gruner oder grauer Star o a')}/>
                        <label>Augenerkrankungen (z.B. grüner oder grauer Star o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Hauterkrankungen (z.B. Neurodermitis, Psoriasis, Ekzeme o.a.)" onClick={(e) => onCheckboxChange(e,'Hauterkrankungen z B Neurodermitis Psoriasis Ekzeme o a')}/>
                        <label>Hauterkrankungen (z.B. Neurodermitis, Psoriasis, Ekzeme o.a.)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Herpes" onClick={(e) => onCheckboxChange(e,false)}/>
                        <label>Herpes</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Infektionserkrankungen (insbesondere aktuell oder chronisch), wenn ja, welche" onClick={(e) => onCheckboxChange(e,'Infektionserkrankungen insbesondere aktuell oder chronisch wenn ja welche',false,['Infektionserkrankungen insbesondere aktuell oder chronisch wenn ja welche text'])}/>
                        <label>Infektionserkrankungen (insbesondere aktuell oder chronisch), wenn ja, welche: <input type="text" id={makeKey('Infektionserkrankungen insbesondere aktuell oder chronisch wenn ja welche text')} className="border-input" placeholder="Infektionserkrankungen" onKeyUp={(e) => onTextChange(e,'Infektionserkrankungen insbesondere aktuell oder chronisch wenn ja welche text','Infektionserkrankungen insbesondere aktuell oder chronisch wenn ja welche','Infektionserkrankungen (insbesondere aktuell oder chronisch), wenn ja, welche')}/>.</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Tumorerkrankungen (bösartige)" onClick={(e) => onCheckboxChange(e,'Tumorerkrankungen bosartige',false,['Tumorerkrankungen bosartigee text'])} />
                        <label>Tumorerkrankungen (bösartige): <input type="text" id={makeKey('Tumorerkrankungen bosartigee text')} className="border-input" placeholder="Tumorerkrankungen" onKeyUp={(e) => onTextChange(e,'Tumorerkrankungen bosartigee text','Tumorerkrankungen bosartige','Tumorerkrankungen')}/>.</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Autoimmunerkrankungen (z.B. Rheuma)" onClick={(e) => onCheckboxChange(e,'Autoimmunerkrankungen z B Rheuma')}/>
                        <label>Autoimmunerkrankungen (z.B. Rheuma)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Nikotinkonsum, aktuell oder innerhalb der letzten 6 Monate" onClick={(e) => onCheckboxChange(e,'Nikotinkonsum aktuell oder innerhalb der letzten 6 Monate')}/>
                        <label>Nikotinkonsum, aktuell oder innerhalb der letzten 6 Monate</label>
                    </li>
                    <li>
                        <input type="checkbox" value="kein oder niedriger Alkoholkonsum (weniger als zwei Standardgläser pro Tag)" onClick={(e) => onCheckboxChange(e,'kein oder niedriger Alkoholkonsum weniger als zwei Standardglaser pro Tag')}/>
                        <label>kein oder niedriger Alkoholkonsum (weniger als zwei Standardgläser pro Tag)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="häufiger Alkoholkonsum (mehr als oder zwei Standardgläser pro Tag)" onClick={(e) => onCheckboxChange(e,'haufiger Alkoholkonsum mehr als oder zwei Standardgläser pro Tag')}/>
                        <label>häufiger Alkoholkonsum (mehr als oder zwei Standardgläser pro Tag)</label>
                    </li>
                </ul>
                <h4 className="sub-heading">Allergien:</h4>
                <ul className="d-flex three-col-row">
                    <li>
                        <input type="checkbox" value="Penicillin" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                        <label htmlFor="">Penicillin</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Novaminsulfon (Metamizol)" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                        <label htmlFor="">Novaminsulfon (Metamizol)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Ibuprofen (NSAR)" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                        <label htmlFor="">Ibuprofen (NSAR)</label>
                    </li>
                </ul>
                <ul className="d-flex three-col-row">
                    <li>
                        <input type="checkbox" value="Wespe" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                        <label htmlFor="">Wespe</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Soja" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                        <label htmlFor="">Soja</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Latex" onClick={(e) => onCheckboxChange(e,'Allergien',true)}/>
                        <label htmlFor="">Latex</label>
                    </li>
                </ul>           
                <ul className="d-flex">
                    <li className="full-row">
                        <input type="checkbox" value="Sonstige" onClick={(e) => onCheckboxChange(e,'Allergien',true,['Allergien Sonstige text'])}/>
                        <label>Sonstige:</label>
                        <input type="text" id={makeKey('Allergien Sonstige text')} className="border-input" placeholder="Sonstige:" onKeyUp={(e) => onTextChange(e,'Allergien Sonstige text','Allergien','Sonstige')}/>
                    </li>  
                </ul>
                <h4 className="sub-heading">Hausmedikation:</h4>
                <ul className="d-flex two-col-row">
                    <li>
                        <input type="checkbox" value="Keine" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                        <label htmlFor="">Keine</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Blutdrucksenker" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                        <label htmlFor="">Blutdrucksenker</label>
                    </li>               
                </ul>  
                <ul className="d-flex two-col-row">
                    <li>
                        <input type="checkbox" value="Metformin" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                        <label htmlFor="">Metformin</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Insulin" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                        <label htmlFor="">Insulin</label>
                    </li>               
                </ul> 
                <ul className="d-flex two-col-row">
                    <li>
                        <input type="checkbox" value="Blutverdünner (ASS, Marcumar, Eliquis, …)" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                        <label htmlFor="">Blutverdünner (ASS, Marcumar, Eliquis, …)</label>
                    </li>
                    <li>
                        <input type="checkbox" value="Immunsuppressiva (MTX, Cortison, Tacrolimus)" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true)}/>
                        <label htmlFor="">Immunsuppressiva (MTX, Cortison, Tacrolimus)</label>
                    </li>               
                </ul>   
                <ul className="d-flex">
                    <li className="full-row">
                        <input type="checkbox" value="Sonstige" onClick={(e) => onCheckboxChange(e,'Hausmedikation',true,['Hausmedikation Sonstige text'])}/>
                        <label>Sonstige:</label>
                        <input type="text" id={makeKey('Hausmedikation Sonstige text')} className="border-input" placeholder="Sonstige:" onKeyUp={(e) => onTextChange(e,'Hausmedikation Sonstige text','Hausmedikation','Sonstige')} />
                    </li>  
                </ul>          
                <ul className="d-flex">
                    <li className="full-row">
                        <label>Welchen Operationen haben Sie sich wann unterzogen? OP/Jahr:<br />
                            OP/Jahr:<input type="text" className="border-input" placeholder="Welchen Operationen haben Sie sich wann unterzogen? OP/Jahr:" onKeyUp={(e) => onTextChange(e,'operation and year')}/></label>                    
                    </li>  
                </ul>          
                <ul className="d-flex">
                    <li className="d-flex align-items-start">
                        <input type="checkbox" value="Möchten Sie, dass wir Ihrem Hausarzt bzw. überweisendem Arzt einen Arztbrief mit den  Untersuchungsbefunden zusenden?" onClick={(e) => onCheckboxChange(e,'send results to doctor')}/>
                        <label>Möchten Sie, dass wir Ihrem Hausarzt bzw. überweisendem Arzt einen Arztbrief mit den  Untersuchungsbefunden zusenden?</label>                    
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