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
            <h1 className="form-heading">Empfehlungen von Frau Gudrun von Stein</h1>
            <BasicDetails />
            <p>Liebe Patienten,</p>
            <p>Aus meiner langjährigen Behandlung von Patienten, die sich einer Operation unterziehen mussten oder wollten, habe ich äußerst positive Erfahrungen bei der Einnahme von homöopathischen Mitteln nach Operationen machen können.</p>
            <p>Es betrifft hier vor allem die Schmerzbekämpfung und eine schnelle und komplikationslose Heilung durch Arnica, als auch das meist sehr gute Ergebnis bei der Narbenbildung durch Staphysagria. Alle meine Patienten konnten damit auf zusätzliche Schmerzmittel oder Antibiotika verzichten.</p>
            <p>Da bei Operationen nicht auszuschließen ist, dass Nerven verletzt werden und danach Taubheitsgefühle entstehen können, geben wir Homöopathen Hypericum, welches in relativ kurzer Zeit die Taubheit verschwinden lässt.</p>
            <p>Sollten Sie sich für den Einsatz homöopathischer Arzneimittel entschließen, müssen Sie allerdings ab Beginn der Einnahme leider für etwa 4 Wochen auf Kaffee und Cola verzichten! <span className="underline-text">Sie kaufen dann in Ihrer Apotheke C-Potenzen</span> (nicht D-Potenzen):</p>
            <ul className="c200-row">
                <li>Arnica C 200</li>
                <li>Staphysagria C 200</li>
                <li>Hypericum C 200</li>                
            </ul>
            <div className="border-box">
                <p><span className="underline-text">Einnahme der Globuli</span> (Anleitung):</p>
                <p>Generell gilt für die Einnahme von Globulis: 3 Kügelchen auf die Zunge legen und zergehen lassen, was innerhalb von 1-2 Min. der Fall sein wird. Vor und nach der Einnahme jeweils 10 Min. nichts essen oder trinken. Die Kügelchen werden über die Mundschleimhaut in die Blutbahn aufgenommen. Das bedeutet:</p>
                <ol>
                    <li><span className="underline-text">Bei OP am Vormittag: </span>Arnica nach OP einnehmen, am selben Abend Staphysagria einnehmen.; Am 2. & 3. Tag morgens Arnica - abends Staphysagria einnehmen.</li>
                    <li><span className="underline-text">Bei OP am Nachmittag:</span> Arnica nach OP einnehmen; Am 2. & 3. Tag morgensStaphysagria - abends Arnica einnehmen; Am 4. Tag morgens einmal Staphysagria einnehmen.</li>
                </ol>
                <p>Danach warten Sie einige Tage. Sollten wieder Schmerzen auftreten mit Röte, wiederholen Sie noch einmal mit Arnica. Sollte sich ein Taubheitsgefühl im OP Gebiet einstellen, beginnen Sie mit der Einnahme von „Hypericum" etwa 10 Tage nach der OP: drei Tage lang nur einmal 3 Globuli. </p>
            </div>
            <p>Für weitere Fragen stehe ich Ihnen gerne zur Verfügung unter: <a href="mailto:gudrun.vonstein@tiscali.it">gudrun.vonstein@tiscali.it</a></p>
            <h4 className="sub-heading underline-text">Generell nach Operationen: </h4>  
            <div className="list-content">
                <h4>Arnica</h4>
                <ul>
                    <li>Postoperative Zustände sowohl zur Linderung der Schmerzen, als auch zur Beschleunigung der Heilung</li>
                    <li>Wundschmerz und Zerschlagenheitsgefühl in dem Körperteil, auf dem man gelegen hat. Der Patient muss sich bewegen und wirkt daher ruhelos.</li>
                    <li>Bemerkenswert beschleunigte Resorption von Blut nach plastischen Operationen, bei der es oft zu starken Blutungen in das weiche Gewebe kommt.</li>
                    <li>Nach chirurgischer Verletzung, die mit einer Quetschung des Gewebes verbunden ist.</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Suphysagria</h4>
                <ul>
                    <li>Folgen von Blutverlust, Operationsschock, Verletzungen durch scharfe Instrumente und Schnittwunden.</li>
                    <li>zusammendrückende, zerquetschende oder stechend-beißende Schmerzen.</li>
                    <li>Narben sind empfindlich und schmerzhaft.</li>
                    <li>Nach chirurgischer Verletzung, die mit einer Quetschung des Gewebes verbunden ist.</li>
                    <li>Bei glatten Schnittwunden, wenn die Wunde schlecht aussieht oder wenn sie stechende oder auchbrennende Schmerzen verursacht, ist Staph. das Mittel, das sofort die erforderliche Granulationsbildunghervorruft.</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Hypericum</h4>
                <ul>
                    <li>Kribbeln und Taubheitsgefühle durch Verletzungen von Nerven.</li>
                    <li>Schmerzhafte Narben bei großer Berührungsempfindlichkeit.</li>
                    <li>Schmerz in alten Narben.</li>
                    <li>Klaffende, geschwollene, nicht heilen wollende Wunde mit trockenen, glänzenden Rändern und mitbrennenden, stechenden, reißenden Schmerzen.</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Millefolium</h4>
                <ul>
                    <li>Blutandrang bei starken, schmerzlosen, hellroten, dünnflüssigen Blutungen - auch Sickerblutungen an denRändern von Operationswunden.</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Calendula</h4>
                <ul>
                    <li>Heilmittel bei offenen Riss-oder Schnittverletzungen.</li>
                    <li>Gezackte, zerklüftete oder eiternde Wunden, überstarke Schmerzen. Fördert die Bildung von gesundemGranulationsgewebe und eine rasche primäre Wundheilung, verhindert Pyämie, Sepsis und Gangrän.</li>
                    <li>Blutungen nach Zahnextraktion.</li>
                    <li>Verletzungen der Muskeln.</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Bellis perennis</h4>
                <ul>
                    <li>Besonders nützlich bei Traumata der tiefen Gewebe oder septischen Wunden der Bauch- und Beckenorgane nach Operationen.</li>
                    <li>Unerträgliche Schmerzen, besser Kälteanwendungen.</li>
                    <li>Beseitigt Exsudate mit Anschwellungen mannigfacher Art, die durch Verletzungen entstanden sind.</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Ruta</h4>
                <ul>
                    <li>Bei chirurgischen Indikationen: periostitische Beschwerden nach Verletzungen, Empfindlichkeit derKnochenhaut an Stellen, die relativ ungeschützt sind.</li>
                    <li>Verschlimmerung durch Kälte und Feuchtigkeit</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Rhus-toxicodendron</h4>
                <ul>
                    <li>Verletzungen der Muskeln.</li>
                    <li>Schmerzen schlimmer nachts, Ruhen ist ausgeschlossen</li>
                    <li>Schlimmer auf der Seite, auf der er liegt, Besser</li>
                    <li>Hitze, Bewegung</li>
                </ul>
            </div>      
            <div className="list-content">
                <h4>Calcarea auorica</h4>
                <ul>
                    <li>Beseitigt die Neigung zu Schwartenbildung und Verwachsungen nach Operationen und resorbiert diese</li>
                    <li>Schlimmer Kälte, besser Wärmeanwendungen</li>                   
                </ul>
            </div>  
            <div className="footer-logo">
                <img src="footer-logo.png" alt="Image" />
            </div>
        </form>
      </div>
    </>
  )
}