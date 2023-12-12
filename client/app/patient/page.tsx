"use client"
// import { FormEvent,useState } from 'react'
import * as React from "react";
// import styles from './page.module.css'

export default function Page() {

  const client_id = process.env.NEXT_PUBLIC_GCP_CLIENT_ID
  const client_secret = process.env.NEXT_PUBLIC_GCP_CLIENT_SECRET
  const redirect_uri = process.env.NEXT_PUBLIC_GCP_REDIRECT_URL
  const user_type = process.env.NEXT_PUBLIC_GHL_USER_TYPE

  const [name,setName] = React.useState('')
  const [hnoAnamnese,setHnoAnamnese] = React.useState([])
  const [hnoAnamneseAllergies,setHnoAnamneseAllergies] = React.useState([])
  const [hnoAnamneseChronischeRhinitis,setHnoAnamneseChronischeRhinitis] = React.useState('')
  const [hnoAnamneseNasenAbususSeit,setHnoAnamneseNasenAbususSeit] = React.useState('')
  const [hnoAnamneseLippenKieferGaumenspalte,setHnoAnamneseLippenKieferGaumenspalte] = React.useState('')
  const [hnoAnamneseSonstiges,setHnoAnamneseSonstiges] = React.useState('')

  var contactName = (e) => {
    // console.log(e.target.value)
    setName(e.target.value)
  }

  var contactHnoAnamnese = (e) => {
    var opt = hnoAnamnese
    if(e.target.checked){
      opt.push(e.target.value)
      setHnoAnamnese(opt)
    }else{
      opt.splice(opt.indexOf(e.target.value), 1)
      setHnoAnamnese(opt)
    }

  }

  var contactHnoAnamneseAllergies = (e) => {
    var opt = hnoAnamneseAllergies
    if(e.target.checked){
      opt.push(e.target.value)
      setHnoAnamneseAllergies(opt)
    }else{
      opt.splice(opt.indexOf(e.target.value), 1)
      setHnoAnamneseAllergies(opt)
    }

    if(hnoAnamnese.indexOf('Allergy') == -1){
        alert('Please select Allergy box.')
        event.preventDefault();
        event.stopPropagation();
        return false
    }

  }

  var contactHnoAnamneseChronischeRhinitis = (e) => {

    setHnoAnamneseChronischeRhinitis(e.target.value)

    if(hnoAnamnese.indexOf('Chronische Rhinitis') == -1){
        alert('Please select Chronische Rhinitis box.')
        event.preventDefault();
        event.stopPropagation();
        return false
    }
  }

  var contactHnoAnamneseNasenAbususSeit = (e) => {
    setHnoAnamneseNasenAbususSeit(e.target.value)
    if(hnoAnamnese.indexOf('Chron. Nasenspray-Abusus seit') == -1){
        alert('Please select Chron. Nasenspray-Abusus seit box.')
        return false
    }
  }

  var contactHnoAnamneseLippenKieferGaumenspalte = (e) => {
    setHnoAnamneseLippenKieferGaumenspalte(e.target.value)
    if(hnoAnamnese.indexOf('Lippen-Kiefer-Gaumenspalte') == -1){
        alert('Please select Lippen Kiefer Gaumenspalte box.')
        event.preventDefault();
        event.stopPropagation();
        return false
    }

  }

  var contactHnoAnamneseSonstiges = (e) => {
    setHnoAnamneseSonstiges(e.target.value)
    if(hnoAnamnese.indexOf('Sonstiges') == -1){
        alert('Please select Sonstiges box.')
        event.preventDefault();
        event.stopPropagation();
        return false
    }
  }

  var makeid = (length) => {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }

  var refreshAccessToken = (refreshToken) => {
      event.preventDefault()

      // var res = fetch(api_url+"/token/get", {
      var res = fetch("/api/token/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response){
        return response.json()
      }).then(function(data) {
        // data = JSON.parse(data.token)
        data = data.token
        // console.log(data.refresh_token)
        // alert(data.token.refresh_token)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", client_id);
        urlencoded.append("client_secret", client_secret);
        urlencoded.append("grant_type", "refresh_token");
        urlencoded.append("refresh_token", data.refresh_token);
        urlencoded.append("redirect_uri", redirect_uri);
        urlencoded.append("user_type", user_type);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        fetch("https://services.leadconnectorhq.com/oauth/token", requestOptions)
        .then(response => response.text())
        .then((result) => {
            // console.log(result)
            result = JSON.parse(result)
            if(result.hasOwnProperty('refresh_token')){
              // const res = fetch(api_url+"/token/save", {
              const res = fetch("/api/token/save", {
                method: "POST",
                body: JSON.stringify({
                  token: result
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              }).then(function(response){
                return response.json()
              }).then(function(data) {
                alert(data.response)
              });
            }else{
              alert(`${result.error}\n${result.error_description}`)
            }

        })
        .catch(error => console.log('error', error));
      });

  }

  var onSubmit = async (event) => {
    event.preventDefault()

    // var res = await fetch(api_url+"/token/get", {
    var res = await fetch("/api/token/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response){
        return response.json()
      }).then(function(data) {

          data = data.token

          if(data.hasOwnProperty('access_token')){

              makeGHLRequest(data.access_token,data.locationId)
          }
      })

  }

  var makeGHLRequest = async (access_token,locationId) => {
    const url = 'https://services.leadconnectorhq.com/contacts/';
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        Version: '2021-07-28',
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
            "firstName": name,
            "lastName": name,
            "name": name,
            "email": `${makeid(5)}@deos.com`,
            "locationId": locationId,
            "gender": "male",
            "phone": `+1 ${Math.floor(100000000 + Math.random() * 900000000)}`,
            "address1": "3535 1st St N",
            "city": "Dolomite",
            "state": "AL",
            "postalCode": "35061",
            "website": "https://www.tesla.com",
            "timezone": "America/Chihuahua",
            "dnd": true,
            "dndSettings": {
              "Call": {
                "status": "active",
                "message": "string",
                "code": "string"
              },
              "Email": {
                "status": "active",
                "message": "string",
                "code": "string"
              },
              "SMS": {
                "status": "active",
                "message": "string",
                "code": "string"
              },
              "WhatsApp": {
                "status": "active",
                "message": "string",
                "code": "string"
              },
              "GMB": {
                "status": "active",
                "message": "string",
                "code": "string"
              },
              "FB": {
                "status": "active",
                "message": "string",
                "code": "string"
              }
            },
            "inboundDndSettings": {
              "all": {
                "status": "active",
                "message": "string"
              }
            },
            "tags": [
              "nisi sint commodo amet",
              "consequat"
            ],
            "customFields": [
              {
                "key": "hnoanamnese",
                "field_value": hnoAnamnese
              },
              {
                "key": "hnoanamese_allergie",
                "field_value": hnoAnamnese.indexOf('Allergy') != -1 ? hnoAnamneseAllergies : ''
              },
              {
                "id": "NhiAyYb5NkMxHwgFqfa9",
                "field_value": hnoAnamnese.indexOf('Chronische Rhinitis') != -1 ? hnoAnamneseChronischeRhinitis : ''
              },
              {
                "key": "hnoanamese_chron_nasensprayabusus_seit",
                "field_value": hnoAnamnese.indexOf('Chron. Nasenspray-Abusus seit') != -1 ? hnoAnamneseNasenAbususSeit : ''
              },
              {
                "id": "rDP1C479njAjf63wClM9",
                "field_value": hnoAnamnese.indexOf('Lippen-Kiefer-Gaumenspalte') != -1 ? hnoAnamneseLippenKieferGaumenspalte : ''
              },
              {
                "key": "hnoanamese_sonstiges",
                "field_value": hnoAnamnese.indexOf('Sonstiges') != -1 ? hnoAnamneseSonstiges : ''
              }
            ],
            "source": "public api",
            "country": "US",
            "companyName": "DGS VolMAX"
          })
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      // console.log(data);
      alert(`New Contact ID: ${data.contact.id} has been created.`)
    } catch (error) {
      alert(error)
    }
  }
 
  return (
    <>
      <div class="form-section">
          <form action="">           
                  <ul class="first-input-row">
                      <li>
                          <input type="checkbox" id="Zahlung" />
                          <label for="Zahlung">Zahlung erfolgt</label>
                      </li>
                      <li>
                          <input type="checkbox" id="Befunde" />
                          <label for="Befunde">Befunde vollständig</label>
                      </li>
                      <li>
                          <input type="checkbox" id="Allergien" />
                          <label for="Allergien">Allergien</label>
                      </li>
                      <li>
                          <input type="checkbox" id="SocialMedia" />
                          <label for="SocialMedia">Social Media</label>
                      </li>
                      <li>
                          <input type="checkbox" id="Concierge" />
                          <label for="Concierge">Concierge</label>
                      </li>
                      <li>
                          <input type="checkbox" id="star" />
                          <label for="star">⭐</label>
                      </li>
                      <li>
                          <input type="checkbox" id="eye" />
                          <label for="eye">👁️</label>
                      </li>
                  </ul>
                  <h1 class="form-heading">OP-CHECKLISTE (funkt. Rhinoplastik) </h1> 
                  <ul class="info-form">
                      <li>
                          <label for="Name">Name:</label>
                          <input type="text" id="Name" placeholder="Name" />
                      </li>                  
                      <li>
                          <label for="Vorname">Vorname:</label>
                          <input type="text" id="Vorname" placeholder="Vorname" />
                      </li>                  
                      <li>
                          <label for="Geburtsname">Geburtsname:</label>
                          <input type="text" id="Geburtsname" placeholder="Geburtsname" />
                      </li>                  
                      <li>
                          <label for="Geburtsdatum">Geburtsdatum:</label>
                          <input type="text" id="Geburtsdatum" placeholder="Geburtsdatum" />
                      </li>                  
                      <li class="address">
                          <label for="Adresse">Adresse:</label>
                          <input type="text" id="Adresse" placeholder="Adresse" />
                      </li>                  
                      <li>
                          <label for="Hausarzt">Hausarzt:</label>
                          <input type="text" id="Hausarzt" placeholder="Hausarzt" />
                      </li>                  
                      <li>
                          <label for="Facharzt">Facharzt:</label>
                          <input type="text" id="Facharzt" placeholder="Facharzt" />
                      </li>                  
                  </ul> 
                  <ul class="two-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Ästhetische Indikation</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Medizinische Indikation</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label> beratender Arzt<input type="text" class="border-input" placeholder="beratender Arzt" /></label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>beratende Mitarbeiterin:<input type="text" class="border-input" placeholder="beratende Mitarbeiterin" /></label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Raucher</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Ex-Raucher</label>
                      </li>                  
                  </ul> 
                  <h4 class="sub-heading">Benötigte Befunde:</h4>  
                  <ul class="one-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>HNO-Untersuchung mit Allergie-Testung</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>HNO Rhinomanometrie</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>CT Nase + NNH + Befundung</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Sichtfeldmessung, Visusbestimmung (Ophthalmologie)</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Hautscreening (Dermatologie)</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Sonographie Brust (Gynäkologie, Radiologie)</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label> Sonographie vordere Abdominalwand</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label>Hormonstatus (Hausarzt)</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label>Röntgen Handskelett</label>
                      </li>                  
                  </ul> 
                  <h4 class="sub-heading">Vorerkrankungen: (X)</h4>  
                  <ul class="two-col-row">                
                      <li>
                          <input type="checkbox" id="" />
                          <label>Keine</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>aHT, KHK</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Schilddrüsenfunktionsstörung</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Diabetes Mellitus</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Leberfunktionsstörung</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label>Nierenfunktionsstörung</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label>Blutungsneigung</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label>Thromboseneigung / Z.n. TVT</label>
                      </li>                  
                      <li class="full-row">
                          <input type="checkbox" id="" />
                          <label>Sonstige: <input type="text" class="border-input" placeholder="Sonstige:" /></label>
                      </li>                  
                  </ul>
                  <h4 class="sub-heading">Allergien: (X)</h4>  
                  <ul class="two-col-row">                   
                      <li>
                          <input type="checkbox" id="" />
                          <label>Keine</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Penicillin</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Novaminsulfon (Metamizol)</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Ibuprofen (NSAR)</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Wespe</label>
                      </li>                  
                      <li>
                          <input type="checkbox" id="" />
                          <label>Soja</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Latex</label>
                      </li> 
                      <li class="full-row">
                          <input type="checkbox" id="" />
                          <label>Sonstige: <input type="text" class="border-input" placeholder="Sonstige:" /></label>
                      </li>                                                       
                                  
                  </ul>  
                  <h4 class="sub-heading">Hausmedikation: (X)</h4>  
                  <ul class="two-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Keine</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Blutdrucksenker</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Metformin</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Insulin</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Blutverdünner (ASS, Marcumar, Eliquis, …)</label>
                      </li>
                      <li>
                          <input type="checkbox" id="" />
                          <label>Immunsuppressiva (MTX, Cortison, Tacrolimus, …)</label>
                      </li>               
                   
                      <li class="full-row">
                          <input type="checkbox" id="" />
                          <label>Sonstige: <input type="text" class="border-input" placeholder="Sonstige:" /></label>
                      </li> 
                  </ul>  
                  <h4 class="sub-heading">HNO-Anamnese</h4> 
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Allergie:</label>
                          </li>                        
                      </ul>
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Pollen</label>
                          </li> 
                          <li>
                              <input type="checkbox"/>
                              <label>Gras</label>
                          </li> 
                          <li>
                              <input type="checkbox"/>
                              <label>Hausstaub</label>
                          </li> 
                          <li>
                              <input type="checkbox"/>
                              <label>Milben</label>
                          </li> 

                      </ul>
                  </div>
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Chronische Rhinitis</label>
                          </li>                        
                      </ul>
                  </div>
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Chronische Rhinorrhoe</label>
                          </li> 
                      </ul>
                  </div>
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Pat. schnarcht nachts</label>
                          </li> 
                      </ul>
                  </div>
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Chronische Nasenebenhöhlen Entzündungen </label>
                          </li>                        
                      </ul>                   
                  </div>
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Chron. Nasenspray-Abusus seit <input type="text" class="border-input" placeholder="Jahren" /> Jahren </label>
                          </li>                        
                      </ul>                   
                  </div>
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Lippen-Kiefer-Gaumenspalte:</label>
                          </li>                        
                      </ul>
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Lippe</label>
                          </li> 
                          <li>
                              <input type="checkbox"/>
                              <label>Kiefer</label>
                          </li>
                          <li>
                              <input type="checkbox"/>
                              <label>harter Gaumen</label>
                          </li>
                          <li>
                              <input type="checkbox"/>
                              <label>weicher Gaumen</label>
                          </li>
                      </ul>
                  </div>
                  <ul class="d-flex three-col-input">
                      <li>
                          <label>Z.n. geschlossener SRP</label>
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                                
                          </ul>                            
                      </li>                        
                      <li>
                          <ul>                           
                              <li>
                                  <label>Wo Jahr:</label>
                                  <input type="text" class="border-input" placeholder="Wo Jahr:" />
                              </li>                             
                          </ul>                            
                      </li>                        
                  </ul>                    
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. offener SRP</label>
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                                      
                          </ul>                            
                      </li>                        
                      <li>
                          <ul>                          
                              <li>
                                  <label>Wo Jahr:</label>
                                  <input type="text" class="border-input" placeholder="Wo Jahr:" />
                              </li>                                
                          </ul>                            
                      </li>                        
                  </ul>  
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. NNH Fensterung</label>
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                            
                          </ul>                            
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>Wo Jahr:</label>
                                  <input type="text" class="border-input" placeholder="Wo Jahr:" />
                              </li>                                
                          </ul>                            
                      </li>                        
                  </ul>                   
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. NNH Fensterung </label>
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                            
                          </ul>                            
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>Wo Jahr:</label>
                                  <input type="text" class="border-input" placeholder="Wo Jahr:" />
                              </li>                                
                          </ul>                            
                      </li>                        
                  </ul>                   
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. Nasenmuschel-OP</label>
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                            
                          </ul>                            
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>Wo Jahr:</label>
                                  <input type="text" class="border-input" placeholder="Wo Jahr:" />
                              </li>                                
                          </ul>                            
                      </li>                        
                  </ul>                   
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. Trauma Nasenrücken </label>
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                            
                          </ul>                            
                      </li>                        
                      <li>
                          <ul>
                              <li>
                                  <label>Wo Jahr:</label>
                                  <input type="text" class="border-input" placeholder="Wo Jahr:" />
                              </li>                                
                          </ul>                            
                      </li>                        
                  </ul>                   
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. Entfernung Polypen</label>
                      </li>                        
                      <li>
                          <ul class="m-0">
                              <li>
                                  <label>im Jahr:</label>
                                  <input type="text" class="border-input" placeholder="im Jahr:" />
                              </li>                                                                            
                          </ul>                            
                      </li>                        
                      <li>
                          <input type="checkbox"/>
                          <label>mit Reposition</label>
                      </li>                      
                      <li>
                          <input type="checkbox"/>
                          <label>ohne Reposition</label>
                      </li>                      
                   </ul>                   
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Tinnitus</label>
                      </li>                        
                      <li>
                          <ul class="m-0">
                              <li>
                                  <input type="radio" name="tinnitus_opt"/>
                                  <label>rechts</label>
                              </li> 
                              <li>
                                  <input type="radio" name="tinnitus_opt"/>
                                  <label>links</label>
                              </li>                      
                              <li>
                                  <input type="radio" name="tinnitus_opt"/>
                                  <label>beidseits</label>
                              </li>                      
                              <li>
                                  <label>seit</label>
                                  <input type="text" class="border-input" placeholder="seit" />
                              </li>                                                                           
                          </ul>                            
                      </li>                        
                        
                                       
                  </ul>  
                  <ul class="d-flex">
                      <li class="full-row">
                          <input type="checkbox"/>
                          <label>Sonstiges:</label>
                          <input type="text" class="border-input" placeholder="Sonstiges:" />
                      </li>  
                  </ul>       
                  <h2>Diagnosen:</h2>  
                  <h3>1. äußere Inspektion/Palpation</h3>        
                  <h4 class="sub-heading">Form:</h4>   
                  <div class="d-flex">
                      <ul>
                          <li>
                              <input type="checkbox"/>
                              <label>Höckerlangnase (HLN)</label>
                          </li>                        
                      </ul>                   
                  </div>   
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>knöchern-knorpelige Schiefnase</label>
                      </li>                        
                      <li>
                          <input type="radio" name="knochern_knorpelige_schiefnase_opt"/>
                          <label>n. rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="knochern_knorpelige_schiefnase_opt"/>
                          <label>n. links</label>
                      </li>                        
                  </ul>                  
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>knorpelige  Schiefnase</label>
                      </li>                        
                      <li>
                          <input type="radio" name="knorpelige_schiefnase_opt"/>
                          <label>n. rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="knorpelige_schiefnase_opt"/>
                          <label>n. links</label>
                      </li>                        
                  </ul>   
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Breitnase</label>
                      </li>                        
                                                         
                  </ul>                 
                  <ul class="d-flex three-col-input">
                      <li>
                          <input type="checkbox"/>
                          <label>Sattelnase</label>
                      </li>                            
                  </ul>   
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Spannungsnase</label>
                      </li>                      
                  </ul>
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Boxy Tip</label>
                      </li>                   
                  </ul>
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Parrot’s Peak</label>
                      </li>                  
                  </ul>     
                  <h4 class="sub-heading">Nasenrücken:</h4>
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>knöcherne Konturstufen Nasenrücken</label>
                      </li>  
                  </ul>
                  <ul class="d-flex">                    
                      <li>
                          <input type="checkbox"/>
                          <label>Open Roof</label>
                      </li>          
                  </ul>
                  <ul>            
                      <li>
                          <input type="checkbox"/>
                          <label>Silikonsplint Nasenrücken palpabel</label>
                      </li>
                   </ul>   
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>mobiles Fragment am Nasenrücken <input type="text" class="border-input" placeholder="x" /> x <input type="text" class="border-input" placeholder="mm" /> mm</label>
                      </li>
                  </ul>             
                  <h4 class="sub-heading">Nasenflügel:</h4>
                  <ul class="d-flex four-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Retraktion Nasenflügel</label>
                      </li>
                      <li>
                          <input type="radio" name="retraktion_nasenflugel_opt"/>
                          <label>rechts</label>
                      </li>
                      <li>
                          <input type="radio" name="retraktion_nasenflugel_opt"/>
                          <label>links</label>
                      </li>
                      <li>
                          <input type="radio" name="retraktion_nasenflugel_opt"/>
                          <label>beidseits</label>
                      </li>
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Asymmetrie Nasenflüge</label>
                      </li>
                      <li>
                          <input type="radio" name="asymmetrie_nasenfluge_opt"/>
                          <label>rechts &lt; links</label>
                      </li>
                      <li>
                          <input type="radio" name="asymmetrie_nasenfluge_opt"/>
                          <label>rechts &gt; links</label>
                      </li>                   
                  </ul>
                  <h4 class="sub-heading">Narben:</h4>
                  <ul class="d-flex four-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Z.n. NFR</label>
                      </li>
                      <li>
                          <input type="radio" name="z_n_nfr_opt"/>
                          <label>rechts</label>
                      </li>
                      <li>
                          <input type="radio" name="z_n_nfr_opt"/>
                          <label>links</label>
                      </li>
                      <li>
                          <input type="radio" name="z_n_nfr_opt"/>
                          <label>beidseits</label>
                      </li>
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label> Z.n. Transcolumella-Schnitt</label>
                      </li>
                      <li>
                          <input type="radio" name="z_n_transcolumella_schnitt_opt"/>
                          <label>V</label>
                      </li>
                      <li>
                          <input type="radio" name="z_n_transcolumella_schnitt_opt"/>
                          <label>inverted V</label>
                      </li>
                      <li>
                          <input type="radio" name="z_n_transcolumella_schnitt_opt"/>
                          <label>Stufenform</label>
                      </li>
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>massive Vernarbunge</label>
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>Tip</label>
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>Nasenrücken</label>
                      </li>                  
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>                     
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>Vernarbungen Septale Mucosa</label>
                      </li>                                
                  </ul>
                  <h4 class="sub-heading">Columella/Septum:</h4>
                  <ul class="d-flex three-col-input">              
                      <li>
                          <input type="radio" name="columella_septum_opt"/>
                          <label>instabile Columella</label>
                      </li>                        
                      <li>
                          <input type="radio" name="columella_septum_opt"/>
                          <label>retrahierte Columella</label>
                      </li>                        
                  </ul>
                  <ul class="d-flex three-col-input">              
                      <li>
                          <input type="radio" name="columella_septum_opt2"/>
                          <label>Septum palpatorisch stabil</label>
                      </li>                        
                      <li>
                          <input type="radio" name="columella_septum_opt2"/>
                          <label>Septum palpatorisch instabil</label>
                      </li>                        
                  </ul>
                  <h4 class="sub-heading">Haut:</h4>
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="radio" name="haut_opt"/>
                          <label>gute Durchblutung</label>
                      </li>                        
                      <li>
                          <input type="radio" name="haut_opt"/>
                          <label> schlechte Durchblutung</label>
                      </li>                        
                  </ul>
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="radio" name="haut_opt2"/>
                          <label>dünne Haut</label>
                      </li>                        
                      <li>
                          <input type="radio" name="haut_opt2"/>
                          <label>mitteldicke Haut</label>
                      </li>                        
                      <li>
                          <input type="radio" name="haut_opt2"/>
                          <label>dicke Haut</label>
                      </li>                        
                      <li>
                          <input type="radio" name="haut_opt2"/>
                          <label>sehr dicke Haut</label>
                      </li>                        
                  </ul>
                  <h3>2. endonasale Inspektion mit Spekulum</h3>        
                  <h4 class="sub-heading">Septum:</h4> 
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Septumdeviation</label>
                      </li>                        
                      <li>
                          <input type="radio" name="septumdeviation_opt"/>
                          <label>rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="septumdeviation_opt"/>
                          <label>links</label>
                      </li>                        
                      <li>
                          <input type="radio" name="septumdeviation_opt"/>
                          <label>s-förmig</label>
                      </li>                        
                  </ul> 
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Septumleiste</label>
                      </li>                        
                      <li>
                          <input type="radio" name="septumleiste_opt"/>
                          <label>rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="septumleiste_opt"/>
                          <label>links</label>
                      </li>                        
                      <li>
                          <input type="radio" name="septumleiste_opt"/>
                          <label>beidseits</label>
                      </li>                        
                  </ul> 
                  <ul class="d-flex two-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Septumperforation Area</label>
                      </li> 
                      <li>
                          <ul>
                              <li>
                                  <input type="radio" name="septumperforation_area_opt"/>
                                  <label> I</label>
                              </li>                        
                              <li>
                                  <input type="radio" name="septumperforation_area_opt"/>
                                  <label> II</label>
                              </li>                        
                              <li>
                                  <input type="radio" name="septumperforation_area_opt"/>
                                  <label>III</label>
                              </li>                        
                              <li>
                                  <input type="radio" name="septumperforation_area_opt"/>
                                  <label>IV</label>
                              </li> 
                          </ul>
                      </li>                      
                                             
                  </ul> 
                  <h4 class="sub-heading">Conchae:</h4> 
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Hyperplasie concha nasalis inferior</label>
                      </li>                        
                      <li>
                          <input type="radio" name="hyperplasie_concha_nasalis_inferior_opt"/>
                          <label>rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="hyperplasie_concha_nasalis_inferior_opt"/>
                          <label>links</label>
                      </li>                        
                      <li>
                          <input type="radio" name="hyperplasie_concha_nasalis_inferior_opt"/>
                          <label>beidseits</label>
                      </li>                
                  </ul> 
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Concha bullosa</label>
                      </li>                        
                      <li>
                          <input type="radio" name="caaoncha_bullosa_opt"/>
                          <label>rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="caaoncha_bullosa_opt"/>
                          <label>links</label>
                      </li>                        
                      <li>
                          <input type="radio" name="caaoncha_bullosa_opt"/>
                          <label>beidseits</label>
                      </li>                
                  </ul> 
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Kontaktseptum</label>
                      </li>                        
                      <li>
                          <input type="radio" name="kontaktseptum_opt"/>
                          <label>rechts</label>
                      </li>                        
                      <li>
                          <input type="radio" name="kontaktseptum_opt"/>
                          <label>links</label>
                      </li>                        
                      <li>
                          <input type="radio" name="kontaktseptum_opt"/>
                          <label>beidseits</label>
                      </li>                
                  </ul> 
                  <ul class="d-flex">              
                      <li>
                          <input type="checkbox"/>
                          <label>Empty-Nose-Syndrome </label>
                      </li>                       
                  </ul> 
                  <h4 class="sub-heading">Bony Vault:</h4> 
                  <ul class="d-flex">              
                      <li>
                          <input type="checkbox"/>
                          <label>Stenose der bony vault durch zu enges knöchernes Nasenskelett</label>
                      </li>                       
                  </ul> 
                  <h4 class="sub-heading">innere/äußere Nasenklappe:</h4> 
                  <ul class="d-flex four-col-row">              
                      <li class="innere-w">
                          <input type="checkbox"/>
                          <label>Stenose innere Nasenklappe</label>
                      </li>                       
                      <li>
                          <input type="radio" name="stenose_innere_nasenklappe_opt"/>
                          <label>rechts</label>
                      </li>                       
                      <li>
                          <input type="radio" name="stenose_innere_nasenklappe_opt"/>
                          <label>links</label>
                      </li>                       
                      <li>
                          <input type="radio" name="stenose_innere_nasenklappe_opt"/>
                          <label>beidseits</label>
                      </li>                  
                  </ul> 
                  <ul class="d-flex four-col-row">              
                      <li class="innere-w">
                          <input type="checkbox"/>
                          <label>Z.n. Amputation laterale FKs</label>
                      </li>                       
                      <li>
                          <input type="radio" name="z_n_mputation_laterale_fks_opt"/>
                          <label>rechts</label>
                      </li>                       
                      <li>
                          <input type="radio" name="z_n_mputation_laterale_fks_opt"/>
                          <label>links</label>
                      </li>                       
                      <li>
                          <input type="radio" name="z_n_mputation_laterale_fks_opt"/>
                          <label>beidseits</label>
                      </li>                  
                  </ul> 
                  <ul class="d-flex four-col-row">              
                      <li class="innere-w">
                          <input type="checkbox"/>
                          <label>Stenose äußere Nasenklappe</label>
                      </li>                       
                      <li>
                          <input type="radio" name="stenose_aubere_nasenklapp_opt"/>
                          <label>rechts</label>
                      </li>                       
                      <li>
                          <input type="radio" name="stenose_aubere_nasenklapp_opt"/>
                          <label>links</label>
                      </li>                       
                      <li>
                          <input type="radio" name="stenose_aubere_nasenklapp_opt"/>
                          <label>beidseits</label>
                      </li>                  
                  </ul> 
                  <ul class="d-flex five-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Ansaugphänomen:</label>
                      </li>                       
                      <li>
                          <input type="radio" name="ansaugphanomen_opt"/>
                          <label>rechts</label>
                      </li>                       
                      <li>
                          <input type="radio" name="ansaugphanomen_opt"/>
                          <label>links</label>
                      </li>                       
                      <li>
                          <input type="radio" name="ansaugphanomen_opt"/>
                          <label>beidseits</label>
                      </li>                  
                      <li>
                          <input type="radio" name="ansaugphanomen_opt"/>
                          <label>massiv </label>
                      </li>                  
                  </ul> 
                  <ul class="d-flex five-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label> Cottle-Test positiv</label>
                      </li>                
                                     
                  </ul>
                  <ul class="d-flex">
                      <li class="full-row">
                          <input type="checkbox"/>
                          <label>Sonstiges:</label>
                          <input type="text" class="border-input" />
                      </li>  
                  </ul>
                  <h2>GEPLANTE EINGRIFFE:</h2>
                  <h4 class="sub-heading">Operateur:</h4>
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Berkei</label>
                      </li>                        
                      <li>
                          <input type="checkbox"/>
                          <label>Tosun</label>
                      </li>                        
                      <li>
                          <input type="checkbox"/>
                          <label>Elzebair</label>
                      </li>                        
                      <li>              
                      </li>                
                  </ul> 
                  <h4 class="sub-heading">Assistenz:</h4>
                  <ul class="d-flex four-col-row">              
                      <li>
                          <input type="checkbox"/>
                          <label>Berkei</label>
                      </li>                        
                      <li>
                          <input type="checkbox"/>
                          <label>Tosun</label>
                      </li>                        
                      <li>
                          <input type="checkbox"/>
                          <label>Elzebair</label>
                      </li>                        
                      <li class="d-flex"> 
                          <input type="checkbox"/>
                          <label><input type="text" class="border-input" placeholder="Assistenz:" /></label>           
                      </li>                
                  </ul> 
                  <h3>1.)</h3>
                  <ul class="d-flex">              
                      <li>
                          <input type="checkbox"/>
                          <label>Rhino 1 (nur Tip)</label>   
                      </li>
                  </ul>
                  <ul class="d-flex"> 
                      <li>
                          <input type="checkbox"/>
                          <label>Rhino 2 (Tip, Spreader Grafts, TP, keine Osteotomien)</label>   
                      </li>
                  </ul>
                  <ul class="d-flex"> 
                      <li>
                          <input type="checkbox"/>
                          <label>Rhino 3 (Primäre SRP)</label>   
                      </li>
                  </ul>
                  <ul class="d-flex"> 
                      <li>
                          <input type="checkbox"/>
                          <label>Rhino 4 (Komplexe SRP)</label>   
                      </li>
                  </ul>
                  <ul class="d-flex"> 
                      <li>
                          <input type="checkbox"/>
                          <label> Rhino 5 (Revision ggf. Ohr)</label>   
                      </li>
                  </ul>               
                  <ul class="two-col-row multi-content-row">                
                      <li>
                          <input type="checkbox" id="" />
                          <label>Rhino 6 (Revision-Komplex)</label>
                      </li>
                      <li>
                          <ul class="d-flex">
                              <li class="d-flex">                                
                                  <label><input type="text" class="border-input" placeholder="€" />€</label>                  
                              </li>                      
                              <li class="d-flex">
                                  <input type="checkbox" id="" />
                                  <label>MI</label>
                              </li>
                              <li class="d-flex">
                                  <input type="checkbox" id="" />
                                  <label>AI</label>
                              </li>
                          </ul>
                      </li>
                  </ul>

                  <h4 class="sub-heading">Besonderheiten:</h4>
                  <ul class="d-flex five-col-row"> 
                      <li>
                          <label>Nasenrücken:</label>   
                      </li>
                      <li>
                          <input type="radio" name="nasenrucken_opt"/>
                          <label>gerade</label>   
                      </li>
                      <li>
                          <input type="radio" name="nasenrucken_opt"/>
                          <label>leichter Schwung</label>   
                      </li>
                      <li>
                          <input type="radio" name="nasenrucken_opt"/>
                          <label>großer Schwung</label>   
                      </li>
                  </ul>    
                  <ul class="d-flex tip-row">                 
                      <li>
                          <label>Tip:</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>kleiner</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>größer</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>spitzer</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>runder</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>höher</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>tiefer</label>   
                      </li>
                  </ul>
                  <ul class="d-flex five-col-row">                 
                      <li>
                          <label>Nasenlöcher</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>kleiner</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>größer</label>   
                      </li>
                      <li>
                          <input type="checkbox"/>
                          <label>Form</label>   
                      </li>                    
                  </ul>    
                  <ul class="d-flex">
                      <li class="full-row">
                          <label>Wortlaut</label>
                          <input type="text" class="border-input" placeholder="Wortlaut" />
                      </li>  
                  </ul>
                  <h3>2.) notwendige OP-Schritte:</h3>
                  <h4 class="sub-heading">Endonasales Septum:</h4>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label> Begradigung  Septumdeviation </label>   
                      </li>
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Entfernung Septumleiste:</label>   
                      </li>
                      <li>
                          <input type="radio" name="entfernung_septumleiste_opt"/>
                          <label>rechts</label>   
                      </li>
                      <li>
                          <input type="radio" name="entfernung_septumleiste_opt"/>
                          <label>links</label>   
                      </li>
                      <li>
                          <input type="radio" name="entfernung_septumleiste_opt"/>
                          <label>beidseits</label>   
                      </li>
                  </ul>
                  <h4 class="sub-heading">Conchae:</h4>
                  <ul class="d-flex  four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Muschelkaustik:</label>   
                      </li>
                      <li>
                          <input type="radio" name="muschelkaustik_opt"/>
                          <label>rechts</label>   
                      </li>
                      <li>
                          <input type="radio" name="muschelkaustik_opt"/>
                          <label>links</label>   
                      </li>
                      <li>
                          <input type="radio" name="muschelkaustik_opt"/>
                          <label>beidseits</label>   
                      </li>
                  </ul>
                  <h4 class="sub-heading">Osteotomie:</h4>
                  <ul class="d-flex  four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Osteotomie:</label>   
                      </li>
                      <li>
                          <input type="radio" name="osteotomie_opt"/>
                          <label>rechts</label>   
                      </li>
                      <li>
                          <input type="radio" name="osteotomie_opt"/>
                          <label>links</label>   
                      </li>
                      <li>
                          <input type="radio" name="osteotomie_opt"/>
                          <label>beidseits</label>   
                      </li>
                  </ul>
                  <h4 class="sub-heading">statische Grafts:</h4>
                  <ul class="d-flex">                
                      <li>
                          <input type="checkbox"/>
                          <label>Spreader grafts:</label>   
                      </li>
                      <ul class="d-flex four-col-row">
                          <li>
                              <input type="radio" name="spreader_grafts_opt"/>
                              <label>rechts</label>   
                          </li>
                          <li>
                              <input type="radio" name="spreader_grafts_opt"/>
                              <label>links</label>   
                          </li>
                          <li>
                              <input type="radio" name="spreader_grafts_opt"/>
                              <label>beidseits</label>   
                          </li>
                      </ul>
                  </ul>
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Columella Strut:</label>   
                      </li>
                      <ul class="d-flex four-col-row">
                        <li>
                            <input type="radio" name="columella_strut_opt"/>
                            <label>von re.</label>   
                        </li>
                        <li>
                            <input type="radio" name="columella_strut_opt"/>
                            <label>von li.</label>   
                        </li>
                      </ul>
                  </ul>
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>Distal Septal Extention Graft:</label>   
                      </li>
                      <ul class="d-flex four-col-row">
                        <li>
                            <input type="radio" name="distal_septal_extention_graft_opt"/>
                            <label>von re.</label>   
                        </li>
                        <li>
                            <input type="radio" name="distal_septal_extention_graft_opt"/>
                            <label>von li.</label>   
                        </li>
                      </ul>
                  </ul>
                  <ul class="d-flex">
                      <li>
                          <input type="checkbox"/>
                          <label>AARG</label>   
                      </li>
                      <ul class="d-flex four-col-row">
                        <li>
                            <input type="radio" name="aarg_opt"/>
                            <label>rechts &lt; links</label>   
                        </li>
                        <li>
                            <input type="radio" name="aarg_opt"/>
                            <label>rechts &gt; links</label>   
                        </li>
                      </ul>
                  </ul>
                  <h4 class="sub-heading">Rekonstruktion:</h4>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Rekonstruktion laterale FKs:</label>   
                      </li>                   
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Rekonstruktion distales Septum</label>   
                      </li>                   
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Turn under Flap / Stabilisierung Nasenflügel</label>   
                      </li>                   
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Ohrknorpelentnahme</label>   
                      </li>  
                      <li>
                          <input type="radio" name="ohrknorpelentnahme_opt"/>
                          <label>ggf.nötig</label>   
                      </li>  
                      <li>
                          <input type="radio" name="ohrknorpelentnahme_opt"/>
                          <label>sicher  nötig</label>   
                      </li>                   
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Extrakorporale Septumrekonstruktion</label>   
                      </li>                   
                  </ul>
                  <h4 class="sub-heading">Sonstiges:</h4>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Nase gerade</label>   
                      </li>                   
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>TP Nasenrücken</label>   
                      </li>                   
                      <li>
                          <input type="radio" name="tp_nasenrucken_opt"/>
                          <label>dick</label>   
                      </li>                   
                      <li>
                          <input type="radio" name="tp_nasenrucken_opt"/>
                          <label>dünn</label>   
                      </li>                   
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Tip Rotation</label>   
                      </li>         
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>De-Rotation Tip</label>   
                      </li>             
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Tip Shield</label>   
                      </li>            
                  </ul>
                  <ul class="d-flex four-col-row">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Columella Shield</label>   
                      </li>             
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Spina kürzen </label>   
                      </li>                
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>BGW Resektion zwischen footplates</label>   
                      </li>                
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Hautausdünnung am Tip</label>   
                      </li>                
                  </ul>
                  <ul class="d-flex five-col-row">                 
                      <li class="NFR-width">
                          <input type="checkbox"/>
                          <label>Nasenflügelrandschnitt (NFR)</label>   
                      </li>                
                      <li>
                          <input type="radio" name="nasenflugelrandschnitt_nfr_opt"/>
                          <label>ggf.</label>   
                      </li>                
                      <li>
                          <input type="radio" name="nasenflugelrandschnitt_nfr_opt"/>
                          <label>links</label>   
                      </li>                
                      <li>
                          <input type="radio" name="nasenflugelrandschnitt_nfr_opt"/>
                          <label>rechts</label>   
                      </li>                
                      <li>
                          <input type="radio" name="nasenflugelrandschnitt_nfr_opt"/>
                          <label>beidseits</label>   
                      </li>                
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>NNH Fensterung geplant mit Dr. <input type="text" class="border-input" placeholder="NNH Fensterung geplant mit Dr." /></label>   
                      </li>                
                      <li>
                          <label>ca. 1.000 €</label>   
                      </li>                                 
                  </ul>
                  <h3>3.) Postoperativ:</h3>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>ggf. Cortison post OP</label>   
                      </li>                
                      <li>
                          <label>1 Behandlung inklusive</label>   
                      </li>                                 
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>Hyaluronsäure</label>   
                      </li>                
                      <li>
                          <label>1 Behandlung inklusive</label>   
                      </li>                                 
                  </ul>
                  <ul class="d-flex">                 
                      <li>
                          <input type="checkbox"/>
                          <label>CO2 Fraxal-Laser Narben </label>   
                      </li>                
                      <li>
                          <label>inklusive</label>   
                      </li>                                 
                  </ul>
                  <h3>4.) Sonstige Eingriffe:</h3>
                  <ul class="two-col-row multi-content-row">                
                      <li>
                          <input type="checkbox" id="" />
                          <label><input type="text" class="border-input" placeholder="Sonstige Eingriffe" /></label>
                      </li>
                      <li>
                          <ul class="d-flex">
                              <li class="d-flex">                                
                                  <label><input type="text" class="border-input" placeholder="€" />€</label>                  
                              </li>                      
                              <li class="d-flex">
                                  <input type="checkbox" id="" placeholder="MI" />
                                  <label>MI</label>
                              </li>
                              <li class="d-flex">
                                  <input type="checkbox" id="" placeholder="AI" />
                                  <label>AI</label>
                              </li>
                          </ul>
                      </li>    
                  </ul>                
                  <ul class="d-flex flex-end">    
                      <li>
                       <label><strong>SUMME OP-HONORAR</strong><input type="text" class="border-input" placeholder="SUMME OP-HONORAR" />€</label>
                      </li>                                 
                  </ul>
                  <h2>KLINIK:</h2>
                  <ul class="d-flex five-col-row">    
                      <li>
                          <label>Anästhesie:</label>
                      </li> 
                      <li>
                          <input type="radio" id="" name="anasthesie_opt"/>
                          <label>LOK</label>
                      </li>                                
                      <li>
                          <input type="radio" id="" name="anasthesie_opt"/>
                          <label>ITN</label>
                      </li>                                
                  </ul>
                  <ul class="d-flex">    
                      <li>
                          <label>ambulant</label>
                      </li> 
                      <li>
                          <input type="radio" id="" name="ambulant_opt"/>
                          <label>1 Nacht</label>
                      </li>                                
                      <li>
                          <input type="radio" id="" name="ambulant_opt"/>
                          <label>2 Nächte</label>
                      </li>
                      <li>
                          <input type="radio" id="" name="ambulant_opt"/>
                          <label>3 Nächte</label>
                      </li>
                      <li>
                          <input type="radio" id="" name="ambulant_opt2"/>
                          <label>EZ</label>
                      </li>                                
                      <li>
                          <input type="radio" id="" name="ambulant_opt2"/>
                          <label>DZ</label>
                      </li>
                  </ul>
                  <ul class="d-flex">    
                      <li>
                       <label>OP-Dauer<input type="text" class="border-input" placeholder="OP-Dauer" /></label>
                      </li>                                 
                      <li>
                       <label><strong>SUMME KLINIK-KOSTEN </strong><input type="text" class="border-input" placeholder="€" />€</label>
                      </li>                                 
                  </ul>
                  <ul class="d-flex">    
                      <li>
                       <label>Geplantes OP-Datum:<input type="text" class="border-input" placeholder="Geplantes OP-Datum:" /></label>
                      </li>                                 
                      <li>
                       <label>Aufklärungsgespräch (OPVG) am:<input type="text" class="border-input" placeholder="€" />€</label>
                      </li>                                 
                  </ul>
                  <ul class="d-flex">    
                      <li>
                       <label>OP-Honorar Summe gezahlt:<input type="text" class="border-input" placeholder="OP-Honorar Summe gezahlt:" /></label>
                      </li>                                 
                      <li>
                      <input type="checkbox" id="" />
                       <label>Kartenzahlung</label>
                      </li>                                 
                      <li>
                      <input type="checkbox" id="" />
                       <label>Rechnung </label>
                      </li>                                 
                  </ul>
                  <ul class="d-flex">  
                     <li>
                          <input type="checkbox" id="" />
                          <label>OP-Honorar bezahlt</label>
                      </li>                               
                  </ul>
                  <ul class="d-flex">
                      <li class="full-row">
                          <label>Besonderheiten:</label>
                          <input type="text" class="border-input" placeholder="Besonderheiten:" />
                      </li>  
                  </ul>
                  <h4 class="sub-heading">Kompressionswäsche:</h4>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Stirnband</label>
                      </li>  
                      <li>
                          <input type="radio" name="stirnband_opt"/>
                          <label>Größe S</label>
                      </li>  
                      <li>
                          <input type="radio" name="stirnband_opt"/>
                          <label>Größe M</label>
                      </li>  
                      <li>
                          <input type="radio" name="stirnband_opt"/>
                          <label>Größe L</label>
                      </li>  
                      <li>
                          <input type="radio" name="stirnband_opt"/>
                          <label>Größe XL</label>
                      </li>  
                  </ul>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Kinn</label>
                      </li>  
                      <li>
                          <input type="radio" name="kinn_opt"/>
                          <label>Größe S</label>
                      </li>  
                      <li>
                          <input type="radio" name="kinn_opt"/>
                          <label>Größe M</label>
                      </li>  
                      <li>
                          <input type="radio" name="kinn_opt"/>
                          <label>Größe L</label>
                      </li>  
                      <li>
                          <input type="radio" name="kinn_opt"/>
                          <label>Größe XL</label>
                      </li>  
                  </ul>
                  <ul class="d-flex">
                      <li>   <input type="checkbox"/>              
                          <label>Sonstiges: <input type="text" class="border-input" placeholder="Sonstiges" /></label>
                      </li>                      
                  </ul>
                  <h4 class="sub-heading">Utensilien:</h4>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Lasersonde</label>
                      </li>
                  </ul>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Hyaluronsäure</label>
                      </li>  
                  </ul>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Lipofilling-Kanüle</label>
                      </li>  
                  </ul>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Rauchabsaugung</label>
                      </li>                  
                  </ul>
                  <ul class="d-flex five-col-row">
                      <li>
                          <input type="checkbox"/>
                          <label>Tumeszenzlösung</label>
                      </li>                    
                  </ul>
                  <ul class="d-flex">
                      <li> <input type="checkbox"/>                
                          <label>Anderes: <input type="text" class="border-input" placeholder="Anderes:" /></label>
                      </li>                      
                  </ul>
                  <h4 class="sub-heading">Lagerung:</h4>
                  <ul class="d-flex four-col-row">
                      <li>    
                          <input type="checkbox"/>             
                          <label>Rückenlagerung</label>
                      </li>               
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>    
                          <input type="checkbox"/>             
                          <label>Bauchlagerung</label>
                      </li>             
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>    
                          <input type="checkbox"/>             
                          <label>Steinschnittlagerung</label>
                      </li>                      
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>    
                          <input type="checkbox"/>             
                          <label>Seitlagerung links</label>
                      </li>                 
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>    
                          <input type="checkbox"/>             
                          <label>Seitlagerung rechts</label>
                      </li>                   
                  </ul>
                  <ul class="d-flex four-col-row">
                      <li>    
                          <input type="checkbox"/>             
                          <label>Umlagern intraoperativ</label>
                      </li>                      
                  </ul>
                  <h4 class="sub-heading">Erreichbarkeit Recall:</h4>
                  <ul class="d-flex">
                      <li>    
                          <input type="radio" name="erreichbarkeit_recall_opt"/>             
                          <label>Montag</label>
                      </li> 
                      <li>    
                          <input type="radio" name="erreichbarkeit_recall_opt"/>             
                          <label>Dienstag</label>
                      </li> 
                      <li>    
                          <input type="radio" name="erreichbarkeit_recall_opt"/>             
                          <label>Mittwoch</label>
                      </li>
                  </ul>
                  <ul class="d-flex">                   
                      <li>    
                          <input type="radio" name="erreichbarkeit_recall_opt2"/>             
                          <label>09:00-12:00</label>
                      </li>                      
                      <li>    
                          <input type="radio" name="erreichbarkeit_recall_opt2"/>             
                          <label>12:00-15:00</label>
                      </li>                      
                      <li>    
                          <input type="radio" name="erreichbarkeit_recall_opt2"/>             
                          <label>15:00-18:00</label>
                      </li>                      
                  </ul>
                  <ul class="d-flex">
                      <li>   
                          <input type="checkbox"/>              
                          <label>Recall erfolgt durch: <input type="text" class="border-input" placeholder="Recall erfolgt durch:" /></label>
                      </li> 
                  </ul>
                  <ul class="d-flex">
                      <li>   
                          <input type="checkbox"/>              
                          <label>Nachweis Folgekostenversicherung liegt vor</label>
                      </li> 
                  </ul>
                  <h4 class="sub-heading">Simulation:</h4>
                  <ul class="d-flex">
                      <li>   
                          <input type="checkbox"/>              
                          <label><strong>Patient hat Foto von SIM gemacht:</strong></label>
                      </li> 
                      <li>   
                          <input type="checkbox"/>              
                          <label><strong>seitlich</strong></label>
                      </li> 
                      <li>   
                          <input type="checkbox"/>              
                          <label><strong>vorne</strong></label>
                      </li> 
                  </ul>

         </form>              
      </div> 
    </>
  )
}