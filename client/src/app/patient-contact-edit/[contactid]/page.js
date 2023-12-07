"use client"
import * as React from "react";
import styles from './page.module.css'

export default function Page({ params : {contactid} }) {

  const client_id = process.env.NEXT_PUBLIC_GCP_CLIENT_ID
  const client_secret = process.env.NEXT_PUBLIC_GCP_CLIENT_SECRET
  const redirect_uri = process.env.NEXT_PUBLIC_GCP_REDIRECT_URL
  const user_type = process.env.NEXT_PUBLIC_GHL_USER_TYPE

  const contactId = contactid

  const [ghlAccessToken,setGhlAccessToken] = React.useState(null)
  const [name,setName] = React.useState('')
  const [hnoAnamnese,setHnoAnamnese] = React.useState([])
  const [hnoAnamneseAllergies,setHnoAnamneseAllergies] = React.useState([])
  const [hnoAnamneseChronischeRhinitis,setHnoAnamneseChronischeRhinitis] = React.useState('')
  const [hnoAnamneseNasenAbususSeit,setHnoAnamneseNasenAbususSeit] = React.useState('')
  const [hnoAnamneseLippenKieferGaumenspalte,setHnoAnamneseLippenKieferGaumenspalte] = React.useState('')
  const [hnoAnamneseSonstiges,setHnoAnamneseSonstiges] = React.useState('')
  const [isLoaded,setIsLoaded] = React.useState(false)
  

  React.useEffect(() => {
    setIsLoaded(true)
    if(ghlAccessToken == null && isLoaded == true){
        var res = fetch("/api/token/get", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(function(response){
          return response.json()
        }).then(function(data) {
         if(data.hasOwnProperty('token')){
            data = data.token
            setGhlAccessToken(data)
            getGHLContact(data.access_token)
          }else{
            alert('You do not have any access.')
            return false
          }
        })
    }
  },[ghlAccessToken,isLoaded])
  
  var getGHLContact = async (access_token) => {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Version", "2021-07-28");
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`https://services.leadconnectorhq.com/contacts/${contactId}`, requestOptions)
    .then(response => response.text())
    .then((result) => {
      result = JSON.parse(result)
      if(result.hasOwnProperty('error')){
        alert(result.error)
        return false
      }
      // console.log(result.contact.customFields)

      document.getElementsByName('name').forEach((name)=>{
        if(result.contact.hasOwnProperty('firstName')){
            name.value = result.contact.firstName
            setName(result.contact.firstName)
        }
      })

      result.contact.customFields.map((customField)=>{
          if(customField.id == "obB3fTlgTd5ZOm6r2Vqh"){
              var opt = []
              customField.value.map((value)=>{
                document.getElementsByName('hnoanamnese').forEach((hnoanamnese)=>{
                  if(hnoanamnese.value == value){
                    opt.push(value)
                    hnoanamnese.checked = true
                  }
                })
              })

              setHnoAnamnese(opt)

          }else if(customField.id == "TrE0VWKuPNnrn67QbYij"){
              var opt = []
              customField.value.map((value)=>{
                document.getElementsByName('hnoanamese_allergie').forEach((hnoanamese_allergie)=>{
                  if(hnoanamese_allergie.value == value){
                    opt.push(value)
                    hnoanamese_allergie.checked = true
                  }
                })
              })
              setHnoAnamneseAllergies(opt)
          }else if(customField.id == "NhiAyYb5NkMxHwgFqfa9"){
              document.getElementsByName('chronische_rhinitis_options').forEach((chronische_rhinitis_options)=>{
                if(chronische_rhinitis_options.value == customField.value){
                  chronische_rhinitis_options.checked = true
                }
              })
              setHnoAnamneseChronischeRhinitis(customField.value)
          }else if(customField.id == "rDP1C479njAjf63wClM9"){
              document.getElementsByName('lippen_kiefer_gaumenspalte_opt').forEach((lippen_kiefer_gaumenspalte_opt)=>{
                if(lippen_kiefer_gaumenspalte_opt.value == customField.value){
                  lippen_kiefer_gaumenspalte_opt.checked = true
                }
              })
              setHnoAnamneseLippenKieferGaumenspalte(customField.value)
          }else if(customField.id == "lBHzEjpKz56uyMZx4TPo"){
              document.getElementsByName('hnoanamese_chron_nasensprayabusus_seit').forEach((hnoanamese_chron_nasensprayabusus_seit)=>{
                  hnoanamese_chron_nasensprayabusus_seit.value = customField.value
              })
              setHnoAnamneseNasenAbususSeit(customField.value)
          }else if(customField.id == "Rh4FxpUb46ZNz34ODlNh"){
              document.getElementsByName('hnoanamese_sonstiges').forEach((hnoanamese_sonstiges)=>{
                  hnoanamese_sonstiges.value = customField.value
              })
              setHnoAnamneseSonstiges(customField.value)
          }
      })

    })
    .catch(error => console.log('error', error));

  }

  var contactName = (e) => {
    // console.log(e.target.value)
    setName(e.target.value)
  }

  var contactHnoAnamnese = (e) => {
    var opt = hnoAnamnese
    if(e.target.checked){
      opt.push(e.target.value)

      if(e.target.value == 'Chron. Nasenspray-Abusus seit'){
        document.getElementsByName('hnoanamese_chron_nasensprayabusus_seit').forEach((hnoanamese_chron_nasensprayabusus_seit) => {
            hnoanamese_chron_nasensprayabusus_seit.disabled = false
        })
      }else if(e.target.value == 'Sonstiges'){
        document.getElementsByName('hnoanamese_sonstiges').forEach((hnoanamese_sonstiges) => {
            hnoanamese_sonstiges.disabled = false
        })
      }

      setHnoAnamnese(opt)
    }else{
      opt.splice(opt.indexOf(e.target.value), 1)
      setHnoAnamnese(opt)

      if(e.target.value == 'Allergy'){
        document.getElementsByName('hnoanamese_allergie').forEach((hnoanamese_allergie) => {
            hnoanamese_allergie.checked = false
        })
        setHnoAnamneseAllergies([])
      }else if(e.target.value == 'Chronische Rhinitis'){
        document.getElementsByName('chronische_rhinitis_options').forEach((chronische_rhinitis_options) => {
            chronische_rhinitis_options.checked = false
        })
        setHnoAnamneseChronischeRhinitis('')
      }else if(e.target.value == 'Chron. Nasenspray-Abusus seit'){
        document.getElementsByName('hnoanamese_chron_nasensprayabusus_seit').forEach((hnoanamese_chron_nasensprayabusus_seit) => {
            hnoanamese_chron_nasensprayabusus_seit.value = ''
            hnoanamese_chron_nasensprayabusus_seit.disabled = true
        })
        setHnoAnamneseNasenAbususSeit('')
      }else if(e.target.value == 'Lippen-Kiefer-Gaumenspalte'){
        document.getElementsByName('lippen_kiefer_gaumenspalte_opt').forEach((lippen_kiefer_gaumenspalte_opt) => {
            lippen_kiefer_gaumenspalte_opt.checked = false
        })
        setHnoAnamneseLippenKieferGaumenspalte('')
      }else if(e.target.value == 'Sonstiges'){
        document.getElementsByName('hnoanamese_sonstiges').forEach((hnoanamese_sonstiges) => {
            hnoanamese_sonstiges.value = ''
            hnoanamese_sonstiges.disabled = true
        })
        setHnoAnamneseSonstiges('')
      }

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
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", client_id);
        urlencoded.append("client_secret", client_secret);
        urlencoded.append("grant_type", "refresh_token");
        urlencoded.append("refresh_token", ghlAccessToken.refresh_token);
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

  }

  var onSubmit = async (event) => {
    event.preventDefault()

    if(ghlAccessToken.hasOwnProperty('access_token')){
        updateGHLRequest(ghlAccessToken.access_token,ghlAccessToken.locationId)
    }

  }

  var updateGHLRequest = async (access_token,locationId) => {

    var url = `https://services.leadconnectorhq.com/contacts/${contactId}`;
    var options = {
      method: 'PUT',
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
            // "email": `${makeid(5)}@deos.com`,
            // "phone": `+1 ${Math.floor(100000000 + Math.random() * 900000000)}`,
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
      var response = await fetch(url, options);
      var data = await response.json();
      // console.log(data);
      alert(`New Contact ID: ${data.contact.id} has been updated.`)
    } catch (error) {
      alert(error)
    }
  }
 
  return (
    <form>
      <label className={styles.label}>Customer Name
        <input type="text" name="name" onKeyUp={contactName}/>
      </label>
      <p></p>
      <h1>HNO-Anamnese</h1>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Allergy" onChange={contactHnoAnamnese} />
            Allergy
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}><label className={styles.label}>
                  <input type="checkbox" name="hnoanamese_allergie" value="Pollen" onChange={contactHnoAnamneseAllergies}/>
                  Pollen
                </label>
            </li>
            <li className={styles.li}><label className={styles.label}>
                  <input type="checkbox" name="hnoanamese_allergie" value="Gras" onChange={contactHnoAnamneseAllergies}/>
                  Gras
                </label>
            </li>
            <li className={styles.li}><label className={styles.label}>
                  <input type="checkbox" name="hnoanamese_allergie" value="Hausstaub" onChange={contactHnoAnamneseAllergies}/>
                  Hausstaub
                </label>
            </li>
            <li className={styles.li}><label className={styles.label}>
                  <input type="checkbox" name="hnoanamese_allergie" value="Milben" onChange={contactHnoAnamneseAllergies}/>
                  Milben
                </label>
            </li>
          </ul>
        </li>
        <li className={styles.li}>
          
          
          <label className={styles.ul}>
            <input type="checkbox" name="hnoanamnese" value="Chronische Rhinitis" onChange={contactHnoAnamnese}/>
            Chronische Rhinitis
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}><label className={styles.label}>
                  <input type="radio" data-id="NhiAyYb5NkMxHwgFqfa9" name="chronische_rhinitis_options" value="Chronische Rhinorrhoe" onChange={contactHnoAnamneseChronischeRhinitis}/>
                  Chronische Rhinorrhoe
                </label>
            </li>
            <li className={styles.li}><label className={styles.label}>
                  <input type="radio" data-id="NhiAyYb5NkMxHwgFqfa9" name="chronische_rhinitis_options" value="Pat. schnarcht nachts" onChange={contactHnoAnamneseChronischeRhinitis}/>
                  Pat. schnarcht nachts
                </label>
            </li>
          </ul>
        </li>
        
        
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Chronische Nasenebenhöhlen Entzündungen" onChange={contactHnoAnamnese}/>
            Chronische Nasenebenhöhlen Entzündungen
          </label>
          
        </li>
        
        
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Chron. Nasenspray-Abusus seit" onChange={contactHnoAnamnese}/>
            Chron. Nasenspray-Abusus seit
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}>
                <label className={styles.label}>HNO-ANAMESE_Chron. Nasenspray-Abusus Seit
                
                  <input type="text" data-id="lBHzEjpKz56uyMZx4TPo" name="hnoanamese_chron_nasensprayabusus_seit" onKeyUp={contactHnoAnamneseNasenAbususSeit}/>
                </label>
            </li>
          </ul>
        </li>
        
        
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Lippen-Kiefer-Gaumenspalte" onChange={contactHnoAnamnese}/>
            Lippen Kiefer Gaumenspalte
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" data-id="rDP1C479njAjf63wClM9" name="lippen_kiefer_gaumenspalte_opt" value="Lippee" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                Lippe
              </label>
            </li>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" data-id="rDP1C479njAjf63wClM9" name="lippen_kiefer_gaumenspalte_opt" value="Kiefer" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                Kiefer
              </label>
            </li>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" data-id="rDP1C479njAjf63wClM9" name="lippen_kiefer_gaumenspalte_opt" value="harter Gaumen" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                harter Gaumen
              </label>
            </li>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" data-id="rDP1C479njAjf63wClM9" name="lippen_kiefer_gaumenspalte_opt" value="weicher Gaumen" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                weicher Gaumen
              </label>
            </li>
          </ul>
        </li>
        
        
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Sonstiges" onChange={contactHnoAnamnese}/>
            Sonstiges
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}>
                <label className={styles.label}>HNO-ANAMESE_Sonstiges
                
                  <input type="text" name="hnoanamese_sonstiges" onKeyUp={contactHnoAnamneseSonstiges}/>
                </label>
            </li>
          </ul>
        </li>
      </ul>

      
      
      <button type="submit" onClick={onSubmit}>Submit</button>
      <button onClick={refreshAccessToken}>Refresh Authorization</button>
    </form>
  )
}