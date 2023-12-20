"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'
import './style.css'

export default function Page() {

  const [formData,setFormData] = React.useState({})
  const [docSigRef,setDocSigRef] = React.useState(null)
  const [patientSigRef,setPatientSigRef] = React.useState(null)

  const makeKey = (key) => {
    return key.replaceAll(' ','_').toLowerCase()
  }
  const onCheckboxChange = (e,key=false,is_array=false,child_text=false,parent_key=false,parent_value=false,child_key=false) => {
    var data = formData;

  //  console.log(key,is_array,child_text,parent_key,child_key)

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

  const HeaderElements = () => {
    return (
      <ul className="info-form">
          <li>
              <label htmlFor="Name">Name, Vorname:</label>
              <input type="text" placeholder="Name, Vorname" onKeyUp={(e) => onTextChange(e,'name')}/>
          </li>
          <li>
              <label htmlFor="Vorname">Geburtsdatum:</label>
              <input type="text" placeholder="Geburtsdatum" onKeyUp={(e) => onTextChange(e,'geburtsdatum')}/>
          </li>
          <li>
              <label htmlFor="Diagnose">Diagnose:</label>
              <input type="text" placeholder="Diagnose" onKeyUp={(e) => onTextChange(e,'diagnose')}/>
          </li>
          <li>
              <label htmlFor="OP-Datum">OP-Datum:</label>
              <input type="date" placeholder="OP-Datum" onChange={(e) => onTextChange(e,'OP-Datum')}/>
          </li>
     </ul>
    )
  }
  const CheckBoxSectionElements = () => {
    return (
      <ul className="one-col-row">
           <li>
               <input type="checkbox" id="Voruntersuchungen" value="Voruntersuchungen (Blutwerte/EKG) sind durchgeführt und vom Arzt kontrolliert" onClick={(e) => onCheckboxChange(e,'Voruntersuchungen Arzt kontrolliert')}/>
               <label>Voruntersuchungen (Blutwerte/EKG) sind durchgeführt und vom Arzt kontrolliert</label>
           </li>
           <li>
               <input type="checkbox" id="Terminvergabe" value="Terminvergabe (Terminzettel erklären, OP Datum/Uhrzeit, Kontrolltermine)" onClick={(e) => onCheckboxChange(e,'Appointment allocation')}/>
               <label>Terminvergabe (Terminzettel erklären, OP Datum/Uhrzeit, Kontrolltermine)</label>
           </li>
           <li>
               <input type="checkbox" id="Anästhesiemappe" value="Anästhesiemappe, -Flyer, -Aufklärungsbogen geben" onClick={(e) => onCheckboxChange(e,'Anasthesiemappe Flyer Aufklarungsbogen geben')}/>
               <label>Anästhesiemappe, -Flyer, -Aufklärungsbogen geben</label>
           </li>
           <li>
               <input type="checkbox" id="Nüchtern" value="Nüchtern am OP-Tag! (6 Stunden nicht essen, 2 Stunden nicht trinken)" onClick={(e) => onCheckboxChange(e,'Nuchtern am OP Tag')}/>
               <label>Nüchtern am OP-Tag! (6 Stunden nicht essen, 2 Stunden nicht trinken)</label>
           </li>
           <li>
               <input type="checkbox" id="Medikamenten" value="Medikamenten-/ Jod-/ Soja-/ Pflaster-Allergien erfragen und auf der OP-Checkliste dokumentieren (Achtung dann bei Rezepten! Ggf. mit Arzt abklären)" onClick={(e) => onCheckboxChange(e,'Medikamenten Allergien abfragen und auf der OP Checkliste dokumentieren')} />
               <label>Medikamenten-/ Jod-/ Soja-/ Pflaster-Allergien erfragen und auf der OP-Checkliste dokumentieren (Achtung dann bei Rezepten! Ggf. mit Arzt abklären)</label>
           </li>
           <li>
               <input type="checkbox" id="Patienteninfo" value="Rezepte geben und Medikamente anhand der Patienteninfo erklären (Achtung Rezepte müssen vom Arzt kontrolliert und unterschrieben werden)" onClick={(e) => onCheckboxChange(e,'Rezepte geben und Medikamente anhand der Patienteninfo erklaren')} />
               <label>Rezepte geben und Medikamente anhand der Patienteninfo erklären (Achtung Rezepte müssen vom Arzt kontrolliert und unterschrieben werden):</label>
           </li>

       </ul>
    )
  }
  const HeadingTextElements = () => {
    return (
      <>
      <p><strong>Sofern keine Medikamentenallergien vorliegen. gilt:</strong></p>
      <p><strong>Pantoprazol</strong> zum Schutz des Magens 20mg, 1x tgl.</p>
      <p>Schmerzmittel <strong>lbuprofen</strong> 600mg, 3 x tgl. für die ersten 3-4 Tage nach OP</p>
      <p>Schmerzmittel <strong>Novalgin</strong> 30 Tropfen, bei Bedarf max. 4 x tgl., falls lbuprofen nicht ausreicht</p>
      <p>Antibiotikum <strong>Cefuroxim 500mg</strong> 2 x tgl., <strong>bei Penicillin-Allergie : Clindamycin 600mg</strong> 2 x tgl. für 5 Tage nach OP</p>
      <p><strong>Bromelain</strong> POS, 1-1-1, bis die Packung leer ist</p>
      <p>Desinfektionspray <strong>Octenisept®,</strong> ab dem ersten Tag nach der OP 1x tgl. morgens nach dem vorsichtigen Duschen die Genitalregion einsprühen</p>
      <p><strong>Rivanol ®</strong> Lösung mit <strong>Mullkompressen;</strong> Mullkornpressen mit der Lösung anfeuchten und 4-6x tgl. für 20 min als Umschlag auf dem OP-Gebiet einwirken lassen, ab dem 1. Tag nach OP damit anfangen für 1-2 Wochen (im Kühlschrank lagern), Achtung: gelbe Abfärbung, nicht mit der Lösung auf Kleidung tropfen, da kaum ab/auswaschbar</p>
      <p><strong>Bepanthen®</strong> Salbe, ca. 3 cm Streifen direkt abends nach der OP auf die Binde dünn auftragen, 2x tgl. wechseln für 2 Wochen nach OP</p>
      <p><strong>Emla®</strong> Salbe, ca. 3 cm Streifen direkt abends nach der OP auf die Binde mit der Bepanthensalbe dünn auftragen, 2x tgl. für die ersten 5 Tage nach OP</p>
      <p><strong>Clexane</strong> 20mg (40mg ab 75kg Körpergewicht) , immer abends um 18:00 in Bauchfett oder Oberschenkelfett (nicht in die OP-Zone spritzen! ), am Abend vor der OP und nach OP für weitere 9 Tage</p>
      <ul className="one-col-row">
          <li>
              <input type="checkbox" id="Thromboembolieprophylaxe" value="Thromboembolieprophylaxe" onClick={(e) => onCheckboxChange(e,false)} />
              <label><strong>Thromboembolieprophylaxe</strong> erklären und unterschreiben lassen:</label>
          </li>
      </ul>
      <p>Clexanespritze demonstrieren</p>
      <p>Aufforderung und Anleitung zu Eigenübungen der Muskulatur (Muskelpumpe der Beine, Füße kreisen), 1 x pro Stunde bei Bettruhe in den ersten zwei Wochen nach OP</p>
      <p>Aufklärungsbogen ausfüllen; Komplikationen in Thromboseprophylaxe Bogen: Bluterguss, Infektion, Schwellung , Rötung, allergische Reaktion eintragen</p>
      <ul className="one-col-row">
          <li>
              <input type="checkbox" id="Patientenaufklärungen" value="Patientenaufklärungen" onClick={(e) => onCheckboxChange(e,false)}/>
              <label><strong>Patientenaufklärungen</strong> durchgehen (OP erklären, Zeichnungen machen, ausfüllen, unterschreiben lassen):</label>
          </li>
      </ul>
      <p><strong>proCompliance Aufklärungsbogen:</strong> OP und Schnittführung erklären und ggf. aufzeichnen</p>
      <p>alle Komplikationen markieren, ggf. Ausrufezeichen, unterstreichen</p>
      <p>wichtigste Komplikationen hinten nochmals schriftlich auflisten dazu gehören: Blutung, Nachblutung, Schwellung, Thrombose,  Embolie, Infektion,  Nekrose, Narben,  -wucherung,-dehiszenz, Asymmetrie,  Sensibilitätsstörung,  Miktionsstörung, ungenügendes  kosmetisches Ergebnis, Folgeeingriffe kostenpflichtig, längere Arbeitsunfähigkeit mit Ausfall des Gehaltes</p>
      <p><strong>proCompliance Aufklärungsbogen</strong> unterschreiben lassen </p>
       <p><strong>Einverständniserklärung für kosmetische Operationen</strong> besprechen; alles ankreuzen, unterschreiben lassen</p>
       <p><strong>Verhaltenshinweise:</strong></p>
       <p>Am OP-Tag: Gründliche <strong>Rasur des Intimbereichs</strong></p>
       <p>In Begleitung nach Hause fahren (bitte nicht selbst Auto fahren)</p>
       <p>Strenge 14-tägige <strong>Schonfrist</strong> (1. Woche Bettruhe, 2. Woche entspannt auf dem Sofa liegen)</p>
       <p>Bitte genug <strong>Kühlkissen</strong> (im Kühlschrank, nicht im Eisfach) zu Hause vorbereiten und direkt nach der OP mit der Kühlung der Genitalregion anfangen für 1-2 Tage, 3x tgl. für 15 Minuten</p>
       <p>Vorsichtiges, seifenfreies <strong>Duschen</strong> ist ab dem ersten postoperativen Tag erlaubt; dann die Operationsregion beim Trocknen bitte nur ganz leicht abtupfen, nicht reiben oder rubbeln</p>
       <p>Einmal täglich die Genitalregion mit Octenisept ® Spray <strong>desinfizieren.</strong></p>
       <p>Dünnes Auftragen von <strong>Bepanthen-Salbe</strong> und in den ersten 5 Tag en in Kombination mit <strong>Emla-Salbe</strong> auf eine Binde als Vorlage in Ihren Slip ab dem ersten Op-Tag für 2 Wochen</p>
       <p>Nach jedem <strong>Toilettengang</strong> mit lauwarmem Wasser das Genitale abspülen für 10 Tage</p>
       <p>Falls Sie während der Heilungsphase Ihre Periode haben sollten, benutzen Sie bei Bedarf Tampons und achten Sie auf hygienische Bedingungen im Wundgebiet</p>
       <p>Die <strong>Nähte</strong> sind selbstauflösend und brauchen nicht gezogen zu werden. Im Rahmen des Heilungsprozesses können sie jedoch nach einigen Tagen zu jucken beginnen</p>
       <p><strong>Sport und Intimität</strong> frühestens nach 4-6 Wochen</p>
       <p><strong>Folgekostenversicherung</strong> (Informationsmaterial mitgegeben, auf Recherche hingewiesen, Alternativen prüfen!)</p>
       <p><strong>Abholung und Betreuung</strong> für 24 h zuhause organisiert</p>
       <p><strong>funktionstüchtiges Telefon</strong> vorhanden und aktuelle Nummer in der Praxis vorliegend</p>
       <p><strong>Angehörigen-Kontakt</strong> notiert</p>
       <p><strong>Notfallnummer</strong> mitgeben</p>
       <p><strong>Behandlungsvertrag und GOÄ-KV</strong> unterschreiben</p>
       <p><strong>OP-Honorar</strong> abrechnen</p>
       <ul className="social-info">
        <li>Noch Fragen?
              <ul className="radio-btns">
                  <li>
                      <input type="radio" name="Fragen" value="nein" onClick={(e) => onRadioChange(e,'Noch Fragen')}/>
                      <label htmlFor="">nein</label>
                  </li>
                  <li>
                      <input type="radio" name="Fragen" value="ja" onClick={(e) => onRadioChange(e,'Noch Fragen')}/>
                      <label htmlFor="">ja</label>
                  </li>
              </ul>
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
              <CheckBoxSectionElements />
           `   <HeadingTextElements />
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
