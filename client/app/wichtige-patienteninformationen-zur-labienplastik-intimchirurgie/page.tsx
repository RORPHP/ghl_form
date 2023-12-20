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
    <>
    <h1 className="form-heading">Wichtige Patienteninformationen zur Labienplastik</h1>
    <p>Sehr geehrte Patientin,</p>
    <p>wir möchten die von Ihnen beabsichtigte Intimoperation so sicher wie möglich durchführen. Bitte lesen Sie alle folgenden Seiten gründlich vor dem OP-Vorgespräch durch und notieren Sie sich eventuelle Fragen!</p>
    <h4 className="sub-heading text-center text-underline">OP-VORBEREITUNG:</h4>
    <p>Bitte lesen Sie <span className="text-underline">gründlich</span> alle Unterlag en in der weißen Mappe durch!</p>
    <p><strong>6 Wochen vor der OP:</strong> Verpflichtende Untersuchungen beim <span className="text-underline">Hausarzt/Internisten</span> mit <span className="text-underline">Körpercheck, EKG und Blutentnahme</span> (Sie erhalt en im Beratungsgespräch in der weißen Mappe Formulare dazu, welche der Hausarzt ausfüllen muss). Bitte beachten Sie, dass ältere Befunde nicht gültig und gewisse Untersuchungen kostenpflichtig sind !</p>
    <p><strong>4 Wochen vor der OP:</strong> <span className="text-underline">OP-Vorgespräch in der Praxis</span>. Bezahlung des OP-Honorars erfolgt an diesem Termin. Bitte bringen Sie Folgendes mit:</p>
    <ol>
        <li>Alle Befunde der von uns angeordneten Voruntersuchungen (Hausarzt etc.)</li>
        <li>Ihre weiße Mappe mit <span className="text-underline">durchgelesenen</span> und <span className="text-underline">ausgefüllten</span> Unterlagen</li>
        <li><span className="text-underline">OP-Honorar</span> (bar oder mit EC/Kreditkarte, keine Überweisung möglich). Falls Sie mit Karte bezahlen möchten, denken Sie bitte an Ihr Tageslimit.</li>
        <li>Offene Fragen</li>
    </ol>
    <p><strong>2 Wochen vor der OP:</strong> Das Aufklärungsgespräch über die Narkose findet regulär immer am OP-Tag statt. Wenn Sie das Bedürfnis haben, vorher mit dem Narkosearzt zu sprechen, dann vereinbaren Sie hierzu telefonisch einen separaten Termin.</p>
    <p><strong>Allgemeine Information:</strong></p>
    <ul>
        <li><span>-</span> Medikamente zur Beeinflussung der Blutgerinnung (ASS/Aspirin, Markumar, Heparin, Plavix, Pradaxa, Eliquis, Xarelto, Multivitamine u.a.)müssen 14 Tage vor dem Eingriff nach Rücksprache mit Ihrem Hausarzt abgesetzt werden.</li>
        <li><span>-</span> Gehen Sie 1 Woche vor der Operation nicht in die intensive Sonne oder in das Sonnenstudio, da dies Schwellungen hervorruft und die Wundheilung negativ beeinflusst.</li>
        <li><span>-</span> Alle Medikamente, die für Sie relevant sind, werden von uns verordnet.</li>
        <li><span>-</span> Vermeiden Sie am Tag und am Abend vor der Operation Alkoholkonsum.</li>
        <li><span>-</span> Bitte stellen Sie mind. 21 Tage vor und nach der Operation das Rauchen ein. Rauchen stört und verzögert den Heilungsprozess.</li>
        <li><span>-</span> Aufgrund von engmaschigen Kontrollen in den ersten postoperativen Tagen empfehlen wir für weit angereiste Patienten einen kurzen Aufenthalt in einem angeschlossenen Hotel in Frankfurt mit Begleitperson zu planen (je nach Möglichkeiten und in Absprache ca. 5 Tage).</li>
    </ul>
    <p><strong>Am Tag vor der Operation:</strong></p>
    <ul>
        <li><span>-</span> Unterstützen Sie uns bei den Hygienemaßnahmen und rasieren Sie sich den Intimbereich vollständig.</li>
        <li><span>-</span> <p>Antithrombosespritze am <span className="text-underline">Abend vor der OP</span> gegen 18 Uhr in das Bauch-/Oberschenkelfett injizieren. Wir demonstrieren Ihnen in der Praxis, wie Sie sich die Antithrombosespritze spritzen sollten und geben Ihnen ein Rezept zum OP-Vorgespräch mit (Lagerung bei max. 25°C). Bei Schwierigkeiten der eigenständigen Verabreichung wenden Sie sich bitte rechtzeitig an Ihren Hausarzt oder auch gerne an uns.</p></li>
        <li><span>-</span> Am Tag vor der OP werden Sie von der Klinik angerufen. Ihnen wird die genaue Uhrzeit, zu der Sie bitte am OP-Tag in der Klinik erscheinen sollen, mitgeteilt. Es kann zu kurzfristigen Änderungen kommen.</li>
    </ul>
    <p><strong>Am Tag der Operation:</strong></p>
    <ul>
        <li><span>-</span> <p>Am Tag der Operation insgesamt <strong>6 Stunden vor der OP nichts essen</strong> und insgesamt <strong>2 Stunden vor der OP nichts trinken</strong> (falls Sie Dauermedikamente einnehmen, sprechen Sie das mit uns ab).</p></li>
        <li><span>-</span> Bitte bringen Sie die von uns verordneten Medikamente am OP-Tag mit.</li>
        <li><span>-</span> Tragen Sie komfortable Kleidung (möglichst keine engen T-Shirts oder Pullover).</li>
        <li><span>-</span> Melden Sie sich bitte zur vereinbarten Uhrzeit an der Anmeldung der OP-Klinik.</li>
        <li><span>-</span> Bitte lassen Sie Ihren Schmuck und Wertsachen zu Hause.</li>
    </ul>
    <p><strong>Verhaltenshinweise nach der OP:</strong></p>
    <ol>
        <li>In <strong>Begleitung</strong> nach Hause fahren, bitte nicht selbst Auto fahren.</li>
        <li>Strenge 14-tägige <strong>Schonfrist</strong> (1. Woche Bettruhe, 2. Woche entspannt auf dem Sofa liegen).</li>
        <li>Bitte genug <strong>Kühlkissen</strong> (im Kühlschrank, nicht im Eisfach) zu Hause vorbereiten und direkt nach der OP mit der Kühlung der Genitalregion anfangen für 1-2 Tage, 3x tgl. für 15 Minuten.</li>
        <li>Vorsichtiges, seifenfreies <strong>Duschen</strong> ist ab dem ersten postoperativen Tag erlaubt; dann die Operationsregion beim Trocknenbitte nur ganz leicht abtupfen, nicht reiben oder rubbeln.</li>
        <li>Nach jedem <strong>Toilettengang</strong> die Genitalregion mit lauwarmen Wasser abspülen und mit Octenisept ®-Spray desinfizieren (ca. 10 Tage lang).</li>
        <li>Dünnes Auftragen von <strong>Bepanthen ®-Salbe</strong> und in den ersten 5 Tagen in Kombination mit <strong>Emla ®- Salbe</strong> auf eine Binde als Vorlage in Ihren Slip ab dem ersten OP-Tag für 2 Wochen.</li>
        <li>Falls Sie während der Heilungsphase Ihre Periode haben sollen, benutzen Sie bei Bedarf Tampons und achten Sie auf hygienische Bedingungen im Wundgebiet</li>
        <li>Die <strong>Nähte</strong> sind selbstauflösend und  brauchen  nicht  gezogen  zu  werden.  Im  Rahmen  des Heilungsprozesses können sie jedoch nach einigen Tagen zu jucken beginnen</li>
        <li><strong>Sport und Intimität</strong> frühestens nach 4-6 Wochen</li>
    </ol>
    <h4 className="sub-heading text-center">Medikation:</h4>
    <p className="text-underline">Sofern keine Medikamentenallergien vorliegen, gilt:</p>
    <ol>
        <li><strong>Pantoprazol</strong> zum Schutz des Magens 20 mg, zur Nacht einnehmen, 0-0-1 bis fünf Tage nach OP</li>
        <li>Schmerzmittel <strong>lbuprofen</strong> 600mg, direkt nach der OP abends die erste Tablette einnehmen, 1-1-1 für die ersten 5 Tage nach OP.</li>
        <li>Schmerzmittel <strong>Novalgin</strong> 30 Tropfen, bei Bedarf max. 3x täglich, falls lbuprofen nicht ausreicht.</li>
        <li>Abschwellende Mittel <strong>Bromelain</strong> POS, 1-1-1, ab dem ersten Tag nach der OP bis die Packung leer ist (im Kühlschrank lagern).</li>
        <li>Desinfektionspray <strong>Octenisept®,</strong> ab dem ersten Tag nach der OP 1 x tgl. morgens nach dem vorsichtigen Duschen die Genitalregion einsprühen.</li>
        <li><strong>Rivanol ®</strong> Lösung mit <strong>Mullkompressen;</strong> Mullkompressen mit der Lösung anfeuchten und 4-6x tgl. für 20 Min. als Umschlag auf dem OP-Gebiet einwirken lassen, ab dem 1. Tag nach OP damit anfangen für 1-2 Wochen (im Kühlschrank lagern), Achtung: gelbe Abfärbung, nicht  mit  der  Lösung  auf Kleidung  tropfen, da kaum ab/auswaschbar.</li>
        <li><strong>Bepanthen®</strong> Salbe, ca. 3 cm Streifen direkt abends nach der OP auf die Binde dünn auftragen, 2x tägl. wechseln für 2 Wochen nach OP.</li>
        <li><strong>Emla®</strong> Salbe, ca. 3 cm Streifen direkt abends nach der OP auf die Binde mit der Bepanthensalbe dünn auftragen, 2x tgl. nur für die ersten 5 Tage nach OP.</li>
        <li>Antithrombosespritze <strong>Clexane</strong> 20mg (40mg ab 75kg Körpergewicht), immer abends um 18 Uhr in Bauchfett oder Oberschenkelfett <strong>(nicht in die OP-Zone spritzen! ),</strong> am Abend vor der OP und nach OP für weitere 9 Tage (nicht über 25°C lagern).</li>
    </ol>
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
              <div className="footer-logo">
                  <img src="footer-logo.png" alt="Image" />
              </div>
         </form>
      </div>
    </>
  )
}
