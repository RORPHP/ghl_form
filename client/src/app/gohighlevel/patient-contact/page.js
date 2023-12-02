"use client"

import * as React from "react";
import styles from './page.module.css'

export default function Page() {

  const client_id = '656833bb18e41b56516d261a-lpkurjqq'
  const client_secret = '3e89da6d-5547-457a-86a2-1ad98e42f270'
  const user_type = 'Location'
  const redirect_uri = 'http://stagingwebsites.info:3000/gohighlevel/oauth'

  const [name,setName] = React.useState('')
  const [hnoAnamnese,setHnoAnamnese] = React.useState([])
  const [hnoAnamneseAllergies,setHnoAnamneseAllergies] = React.useState([])
  const [hnoAnamneseChronischeRhinitis,setHnoAnamneseChronischeRhinitis] = React.useState('')
  const [hnoAnamneseNasenAbususSeit,setHnoAnamneseNasenAbususSeit] = React.useState('')
  const [hnoAnamneseLippenKieferGaumenspalte,setHnoAnamneseLippenKieferGaumenspalte] = React.useState('')
  const [hnoAnamneseSonstiges,setHnoAnamneseSonstiges] = React.useState('')

  var contactName = (e) => {
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

      var res = fetch("/api/token/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response){
        return response.json()
      }).then(function(data) {
        data = JSON.parse(data.token)
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

    var res = await fetch("/api/token/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response){
        return response.json()
      }).then(function(data) {

          data = JSON.parse(data.token)

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
    <form>
      <label className={styles.label}>Customer Name
        <input type="text" name="name" onKeyUp={contactName}/>
      </label>
      <p></p>
      <h1>HNO-Anamnese</h1>

      <ul className={styles.ul}>
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Allergy" onChange={contactHnoAnamnese}/>
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
          
          {/*<br/>*/}
          <label className={styles.ul}>
            <input type="checkbox" name="hnoanamnese" value="Chronische Rhinitis" onChange={contactHnoAnamnese}/>
            Chronische Rhinitis
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}><label className={styles.label}>
                  <input type="radio" name="NhiAyYb5NkMxHwgFqfa9" value="Chronische Rhinorrhoe" onChange={contactHnoAnamneseChronischeRhinitis}/>
                  Chronische Rhinorrhoe
                </label>
            </li>
            <li className={styles.li}><label className={styles.label}>
                  <input type="radio" name="NhiAyYb5NkMxHwgFqfa9" value="Pat. schnarcht nachts" onChange={contactHnoAnamneseChronischeRhinitis}/>
                  Pat. schnarcht nachts
                </label>
            </li>
          </ul>
        </li>
        
        {/*<br/>*/}
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Chronische Nasenebenhöhlen Entzündungen" onChange={contactHnoAnamnese}/>
            Chronische Nasenebenhöhlen Entzündungen
          </label>
          
        </li>
        
        {/*<br/>*/}
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Chron. Nasenspray-Abusus seit" onChange={contactHnoAnamnese}/>
            Chron. Nasenspray-Abusus seit
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}>
                <label className={styles.label}>HNO-ANAMESE_Chron. Nasenspray-Abusus Seit
                {/*<br/>*/}
                  <input type="text" name="hnoanamese_chron_nasensprayabusus_seit" onKeyUp={contactHnoAnamneseNasenAbususSeit}/>
                </label>
            </li>
          </ul>
        </li>
        
        {/*<br/>*/}
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Lippen-Kiefer-Gaumenspalte" onChange={contactHnoAnamnese}/>
            Lippen Kiefer Gaumenspalte
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" name="rDP1C479njAjf63wClM9" value="Lippee" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                Lippe
              </label>
            </li>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" name="rDP1C479njAjf63wClM9" value="Kiefer" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                Kiefer
              </label>
            </li>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" name="rDP1C479njAjf63wClM9" value="harter Gaumen" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                harter Gaumen
              </label>
            </li>
            <li className={styles.li}>
              <label className={styles.label}>
                <input type="radio" name="rDP1C479njAjf63wClM9" value="weicher Gaumen" onChange={contactHnoAnamneseLippenKieferGaumenspalte}/>
                weicher Gaumen
              </label>
            </li>
          </ul>
        </li>
        
        {/*<br/>*/}
        <li className={styles.li}>
          <label className={styles.label}>
            <input type="checkbox" name="hnoanamnese" value="Sonstiges" onChange={contactHnoAnamnese}/>
            Sonstiges
          </label>
          <ul className={styles.ul}>
            <li className={styles.li}>
                <label className={styles.label}>HNO-ANAMESE_Sonstiges
                {/*<br/>*/}
                  <input type="text" name="hnoanamese_sonstiges" onKeyUp={contactHnoAnamneseSonstiges}/>
                </label>
            </li>
          </ul>
        </li>
      </ul>

      
      {/*<br/>*/}
      <button type="submit" onClick={onSubmit}>Submit</button>
      <button onClick={refreshAccessToken}>Refresh Authorization</button>
    </form>
  )
}