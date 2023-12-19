"use client"
import * as React from "react";
import ReactDOM from 'react-dom'
import SignatureCanvas from 'react-signature-canvas'
import './style.css'

export default function Page() {

  const [formData,setFormData] = React.useState({})
  const [docSigRef,setDocSigRef] = React.useState(null)
  const [patientSigRef,setPatientSigRef] = React.useState(null)

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
            <h1 className="form-heading">PATIENTENINFORMATION ZUM DATENSCHUTZ</h1>
            <p>Sehr geehrte Patientin, sehr geehrter Patient,</p>
            <p>der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nach der EU-Datenschutz-Grundverordnung (DSGVO) sind wir verpflichtet, Sie darüber zu informieren, zu welchem Zweck unsere Praxis Daten erhebt, speichert oder weiterleitet. Der Information können Sie auch entnehmen, welche Rechte Sie in puncto Datenschutz haben.</p>         
            <h4 className="sub-heading">1. VERANTWORTLICHKEIT FÜR DIE DATENVERARBEITUNG:</h4>  
            <p>Verantwortlich für die Datenverarbeitung ist:</p>
            <p>Praxis für Plastische & Ästhetische Chirurgie Dr. Julia Berkei<br/>
                 Goethestraße 20, 60313 Frankfurt am Main<br/>
                 Mail: info@berkei-aesthetik.de<br/>
                 Tel.: +49 (0)69 920 200 96</p>
            <h4 className="sub-heading">2. ZWECK DER DATENVERARBEITUNG</h4>
            <p>Die Datenverarbeitung erfolgt aufgrund gesetzlicher Vorgaben, um den Behandlungsvertrag zwischen Ihnen und Ihrem Arzt und die damit verbundenen Pflichten zu erfüllen</p>
            <p>Hierzu verarbeiten wir Ihre personenbezogenen Daten, insbesondere Ihre Gesundheitsdaten. Dazu zählen Anamnesen, Diagnosen, Therapievorschläge und Befunde, die wir oder andere Ärzte erheben. Zu diesen Zwecken können uns auch andere Ärzte oder Psychotherapeuten,bei denen Sie in Behandlung sind, Daten zur Verfügung stellen (z.B. in Arztbriefen).</p>
            <p>Die Erhebung von Gesundheitsdaten ist Voraussetzung für Ihre Behandlung. Werden die notwendigen Informationen nicht bereitgestellt, kann eine sorgfältige Behandlung nicht erfolgen.</p>
            <h4 className="sub-heading">3. EMPFÄNGER IHRER DATEN</h4>
            <p>Wir übermitteln Ihre personenbezogenen Daten nur dann an Dritte, wenn dies gesetzlich erlaubt ist oder Sie eingewilligt haben.</p>
            <p>Empfänger Ihrer personenbezogenen Daten können vor allem andere Ärzte/Psychotherapeuten , Kassenärztliche Vereinigungen, Krankenkassen, der Medizinische Dienst der Krankenversicherung, Ärztekammern und privatärztliche Verrechnungsstellen sein.</p>
            <p>Die Übermittlung erfolgt überwiegend zum Zwecke der Abrechnung der bei Ihnen erbrachten Leistungen, zur Klärung von medizinischen und sich aus Ihrem Versicherungsverhältnis ergebenden Fragen. Im Einzelfall erfolgt die Übermittlung von Daten an weitere berechtigte Empfänger.</p>
            <h4 className="sub-heading">4. SPEICHERUNG IHRER DATEN</h4>
            <p>Aufgrund rechtlicher Vorgaben sind wir dazu verpflichtet, Ihre Daten mindestens 10 Jahre nach Abschluss der Behandlung aufzubewahren. Nach anderen Vorschriften können sich längere Aufbewahrungsfristen ergeben, z.B. bei Röntgenaufzeichnungen laut Paragraph 28 Absatz 3 der Röntgenverordnung bis zu 30 Jahre.</p>
            <h4 className="sub-heading">5. IHRE RECHTE</h4>
            <p>Sie haben das Recht, über die Sie betreffenden personenbezogenen Daten Auskunft zu erhalten. Auch können Sie die Berichtigung unrichtiger Daten verlangen.</p>
            <p>Darüber hinaus steht Ihnen unter bestimmten Voraussetzungen das Recht auf Löschung von Daten, das Recht auf Einschränkung der Datenverarbeitung sowie das Recht auf Datenübertragbarkeit zu.</p>
            <p>Die Verarbeitung Ihrer Daten erfolgt auf Basis von gesetzlichen Regelungen. Nur in Ausnahmefällen benötigen wir Ihr Einverständnis. In diesen Fällen haben Sie das Recht , die Einwilligung für die zukünftige Verarbeitung zu widerrufen.</p>
            <p>Sie haben ferner das Recht, sich bei der zuständigen Aufsichtsbehörde für den Datenschutz zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer personenbezogenen Daten nicht rechtmäßig erfolgt.</p>
            <h4 className="sub-heading">6. RECHTLICHE GRUNDLAGEN</h4>
            <p>Rechtsgrundlage für die Verarbeitung Ihrer Daten ist Artikel 9 Absatz 2 lit h) DSGVO in Verbindung mit Paragraf 22 Absatz 1 Nr. 1 lit. b) Bundesdatenschutzgesetz, Sollten Sie Fragen haben, können Sie sich gern an uns wenden.</p>
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